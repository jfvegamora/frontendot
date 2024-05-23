import axios from "axios";
import { signal } from "@preact/signals-react";

import { getArmazones, openDatabase, setArmazones } from "./indexedDB";
import { URLBackend } from "../hooks/useCrud";
import { toast } from "react-toastify";
import { EnumGrid as EnumReserva } from "../views/mantenedores/MReservaArmazones";
import {
  A1_DP,
  a1_armazon,
  a2_armazon,
  a3_armazon,
  codigoProyecto,
  punto_venta,
  tipo_de_anteojo,
  validar_parametrizacion,
} from "./signalStateOT";
import {
  validationFechaDespacho,
  validationFechaEntregaCliente,
  validationFechaEntregaTaller,
  validationProyectos,
  validationTipoAnteojos,
  validation_A1_DP,
  validation_A1_armazon,
  validation_A2_armazon,
} from "./validationOT";
import { validation_tipo_anteojo } from "./OTReceta_utils";
import {
  isDataLocal,
  responseArmazones,
} from "../views/forms/FReservarArmazones";

//?VARIABLES GLOBLAES
export const isOnline = signal(false);
export const isShowReservaButton = signal(false);
export const inputOnlyReadReserva = signal(false);

//? FETCH DE DATOS A SPRESERVA ARMAZONES
export const fetchReservaArmazones = async (
  punto_venta_props: string,
  cod_proyecto: string,
  usuarioID: string,
  _solo_consulta?: boolean
): Promise<any> => {
  const entidad = "almacenesstock";

  const reservaJSON = {
    proyecto: cod_proyecto,
    punto_venta: punto_venta_props,
    usuario: usuarioID,
  };

  try {
    const response = await axios(
      `${URLBackend}/api/${entidad}/listado/?query=06&_pkToDelete=${encodeURIComponent(
        JSON.stringify(reservaJSON)
      )}`
    );
    punto_venta.value = "";

    if (response.data && response.data[0] && response.data[0][0] == "ONLINE") {
      isOnline.value = true;
      isDataLocal.value = false;
      return;
    } else {
      isOnline.value = false;
      if (response.data.length === 0) {
        toast.error(
          "No se encontraron Armazones disponibles en Bodega OFFLINE."
        );
        responseArmazones.value = [];
        isDataLocal.value = false;
      } else {
        openDatabase().then(async (db: IDBDatabase) => {
          const armazonesData = await getArmazones(db);
          if (armazonesData.length > 0) {
            isDataLocal.value = true;
          } else {
            responseArmazones.value = response.data;
          }
        });
      }
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

//? METODO ENCARGADO DE TOMAR RESPUSTA DE ALMACEN Y COMPARAR CON "DB LOCAL ARMAZONES"
export const getLocalArmazones = async (reservaJSON: any) => {
  try {
    if (responseArmazones.value.length === 0) {
      return toast.error(
        "No se encontraron Armazones disponibles en Bodega OFFLINE."
      );
    }

    let armazonesLocal: any = [];

    await openDatabase().then(async (db) => {
      armazonesLocal = await getArmazones(db);
    });

    isShowReservaButton.value = true;
    isOnline.value = false;

    if (armazonesLocal.length === 0) {
      let firstTime = true;
      responseArmazones.value.forEach(async (armazonData: any) => {
        let codArmazon = armazonData[0];
        let cantidad = armazonData[1];
        let aro = armazonData[2];
        let puente = armazonData[3];
        let diagonal = armazonData[4];

        let data = {
          codArmazon,
          cantidad,
          aro,
          puente,
          diagonal,
        };
        await openDatabase().then(async (db: IDBDatabase) => {
          await setArmazones(db, data, reservaJSON, firstTime);
          isDataLocal.value = true;
          db.close();
        });
      });
      toast.success("Muestrario Cargado Correctamente.");
      isDataLocal.value = true;
    } else {
      console.log("ya hay datos previos, retornando");
      toast.error("Ya hay un Muestrario en memoria.");
      return;
    }
  } catch (error) {
    console.log("Error al obtener armazones", error);
  }
};

export const setLocalArmazones = async (response: any) => {
  console.log(response);
};

export const fetchReservaBeneficiario = async (rut: string) => {
  try {
    console.log(rut);

    const response = await axios(
      `${URLBackend}/api/otreservaarmazones/listado/?query=01&_p1=${rut}`
    );

    // console.log(response)

    if (response["data"].length > 0) {
      console.log("hay data");
      const proyecto_codigo = response["data"][0][EnumReserva["proyecto"]];
      validationProyectos(response["data"][0][EnumReserva["proyecto"]]);
      validationFechaEntregaTaller("22");
      validationFechaDespacho("22");
      validationFechaEntregaCliente("22");

      const proyecto_titulo =
        response["data"][0][EnumReserva["proyecto_titulo"]];
      const rut_beneficiario = response["data"][0][EnumReserva["cliente_rut"]];

      let mensaje = `Existe una Reserva para el rut: ${rut_beneficiario}.`;

      if (proyecto_codigo !== codigoProyecto.value) {
        mensaje = `Existe una Reserva para el rut: ${rut_beneficiario} para un Proyecto distinto al seleccionado: ${proyecto_titulo}.`;
      }

      alert(mensaje);

      console.log(response["data"][0][EnumReserva["cod_armazon1"]]);

      codigoProyecto.value = proyecto_codigo;
      punto_venta.value = response["data"][0][EnumReserva["punto_venta_id"]];
      A1_DP.value = response["data"][0][EnumReserva["dp"]];
      validation_A1_DP(response["data"][0][EnumReserva["dp"]]);

      //?VALIDACIONES ARMAZONES:
      validar_parametrizacion.value = "2";
      inputOnlyReadReserva.value = true;
      tipo_de_anteojo.value =
        response["data"][0][EnumReserva["tipo_anteojo_id"]].toString();
      validation_tipo_anteojo();
      validationTipoAnteojos(
        response["data"][0][EnumReserva["tipo_anteojo_id"]].toString()
      );

      //?ARMAZON 1:
      a1_armazon.value = response["data"][0][EnumReserva["cod_armazon1"]];
      validation_A1_armazon(response["data"][0][EnumReserva["cod_armazon1"]]);

      //?ARMAZON 2:
      a2_armazon.value = response["data"][0][EnumReserva["cod_armazon2"]];
      validation_A2_armazon(response["data"][0][EnumReserva["cod_armazon2"]]);

      //?ARMAZON 3:
      a3_armazon.value = response["data"][0][EnumReserva["cod_armazon3"]];

      console.log(a1_armazon.value);
    }
  } catch (error) {
    console.log(error);
  }
};
