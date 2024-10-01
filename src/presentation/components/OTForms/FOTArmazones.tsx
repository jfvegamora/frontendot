import React, { useEffect, useState } from "react";
import axios from "axios";
import { EnumGrid } from "../../views/mantenedores/MOTHistorica";
import {
  validationOTlevel2,
  validation_A1_armazon,
  validation_A2_armazon,
  validation_Cristal1_od,
  validation_Cristal1_oi,
  validation_Cristal2_od,
  validation_Cristal2_oi,
} from "../../utils/validationOT";
import { toast } from "react-toastify";
import {
  A1_CR_OD,
  A1_CR_OI,
  A1_DP,
  A1_Diametro,
  A1_GRUPO_OD,
  A1_GRUPO_OI,
  A2_CR_OD,
  A2_CR_OI,
  A2_DP,
  A2_Diametro,
  A2_GRUPO_OD,
  A2_GRUPO_OI,
  a1_armazon,
  a2_armazon,
  a2_od_cil,
  a2_od_esf,
  a2_oi_cil,
  a2_oi_esf,
  a3_armazon,
  codigoProyecto,
  dioptrias_receta,
  punto_venta,
  tipo_de_anteojo,
  validacionIncompleta,
  validar_parametrizacion,
} from "../../utils";
// import TextInputInteractive from '../forms/TextInputInteractive';
// import { AppStore, useAppSelector } from '../../../redux/store';
import { OTTextInputComponent } from ".";
import { inputOnlyReadReserva } from "../../utils/FReservaArmazones_utils";
import { signal } from "@preact/signals-react";
// import { areaActualOT } from "../OTAreasButtons";
import { URLBackend } from "../../utils/config";

interface IArmazones {
  control: any;
  onDataChange: any;
  formValues: any;
  formValuesCompleto: any;
  data: any;
  onlyRead?: boolean;
  permiso_usuario_armazones: boolean;
  permiso_areas_armazones: boolean;
  isEditting?: boolean;
  setSelectedTab?: any;
}

const empty_jsonGrupo = {
  marca: "",
  diseno: "",
  indice: "",
  material: "",
  color: "",
  tratamiento: "",
  diametro: "",
  esferico: "",
  cilindrico: "",
  punto_venta: "",
};

// const emppty_jsonCliente = {
//     "cliente_sexo"      : '',
//     "cliente_fecha_nax" : ''
// }

export const amrazones_originales = signal<any>({
  a1_armazon_id: "",
  a2_armazon_id: "",
});

const FOTArmazones: React.FC<IArmazones> = ({
  control,
  onDataChange,
  formValues,
  data,
  permiso_usuario_armazones,
  permiso_areas_armazones,
  isEditting,
  formValuesCompleto,
  // setSelectedTab
}) => {
  // const endpoint  =`${URLBackend}/api/armazones/listado/?query=02&_p6=${ isEditting ? (validar_parametrizacion.value) : 1 }&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;
  // const endpoint2 =`${URLBackend}/api/armazones/editar/`;
  const endpoint3 = `${URLBackend}/api/armazones/listado/?query=02`;

  // const json_data = [{
  //     armazon        : "",
  //     proyecto       : "",
  //     punto_venta    : "",
  //     dp             : "",
  //     diametro       : "",
  //     validar_parametrizacion: "",
  //     solo_consulta  : "",
  //     tipo_anteojo   : "",
  //     numero_armazon : ""
  // }]

  useEffect(() => {
    if (isEditting) {
      punto_venta.value = data?.[EnumGrid.punto_venta_id];

      amrazones_originales.value.a1_armazon_id = data?.[EnumGrid.a1_armazon_id];
      amrazones_originales.value.a2_armazon_id = data?.[EnumGrid.a2_armazon_id];
    }
  }, []);

  // const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas["areaActual"]);

  // const [codArmazon1, setCodArmazon1] = useState( formValues && formValues["codigo_armazon_1"] || 0);
  const [codArmazon1, setCodArmazon1] = useState(
    formValues
      ? formValues["a1_armazon_id"]
      : (data && data[EnumGrid.a1_armazon_id]) || ""
  );
  const [codArmazon2, setCodArmazon2] = useState(
    formValues
      ? formValues["a2_armazon_id"]
      : (data && data[EnumGrid.a2_armazon_id]) || ""
  );
  const [codArmazon3, setCodArmazon3] = useState(
    formValues
      ? formValues["a3_armazon_id"]
      : (data && data[EnumGrid.a3_armazon_id]) || ""
  );

  const [armazon1, setArmazon1] = useState<any>([]);
  const [armazon2, setArmazon2] = useState<any>([]);
  const [armazon3, setArmazon3] = useState<any>([]);

  // const [render, setRender] = useState(false)

  const {
    cristal1_marca_od_id,
    cristal1_diseno_od_id,
    cristal1_indice_od_id,
    cristal1_material_od_id,
    cristal1_color_od_id,
    cristal1_tratamiento_od_id,
    cristal1_od_diametro,
    cristal1_marca_oi_id,
    cristal1_diseno_oi_id,
    cristal1_indice_oi_id,
    cristal1_material_oi_id,
    cristal1_color_oi_id,
    cristal1_tratamiento_oi_id,
    cristal1_oi_diametro,
    cristal2_marca_od_id,
    cristal2_diseno_od_id,
    cristal2_indice_od_id,
    cristal2_material_od_id,
    cristal2_color_od_id,
    cristal2_tratamiento_od_id,
    cristal2_od_diametro,
    cristal2_marca_oi_id,
    cristal2_diseno_oi_id,
    cristal2_indice_oi_id,
    cristal2_material_oi_id,
    cristal2_color_oi_id,
    cristal2_tratamiento_oi_id,
    cristal2_oi_diametro,
  } = (formValuesCompleto && formValuesCompleto["cristales"]) || {};

  const _pkToDelete1_od = {
    marca: cristal1_marca_od_id || data?.[EnumGrid.cristal1_od_marca_id],
    diseno: cristal1_diseno_od_id || data?.[EnumGrid.cristal1_od_diseno_id],
    indice: cristal1_indice_od_id || data?.[EnumGrid.cristal1_od_indice_id],
    material:
      cristal1_material_od_id || data?.[EnumGrid.cristal1_od_material_id],
    color: cristal1_color_od_id || data?.[EnumGrid.cristal1_od_color_id],
    tratamiento:
      cristal1_tratamiento_od_id || data?.[EnumGrid.cristal1_od_tratamiento_id],
    diametro: cristal1_od_diametro || data?.[EnumGrid.cristal1_od_diametro],
    esferico: dioptrias_receta.value.a1_od.esf ?? 0,
    cilindrico: dioptrias_receta.value.a1_od.cil ?? 0,
    punto_venta: punto_venta.value,
  };

  const _pkToDelete1_oi = {
    marca: cristal1_marca_oi_id || data?.[EnumGrid.cristal1_oi_marca_id],
    diseno: cristal1_diseno_oi_id || data?.[EnumGrid.cristal1_oi_diseno_id],
    indice: cristal1_indice_oi_id || data?.[EnumGrid.cristal1_oi_indice_id],
    material:
      cristal1_material_oi_id || data?.[EnumGrid.cristal1_oi_material_id],
    color: cristal1_color_oi_id || data?.[EnumGrid.cristal1_oi_color_id],
    tratamiento:
      cristal1_tratamiento_oi_id || data?.[EnumGrid.cristal1_oi_tratamiento_id],
    diametro: cristal1_oi_diametro || data?.[EnumGrid.cristal1_oi_diametro],
    esferico: dioptrias_receta.value.a1_oi.esf ?? 0,
    cilindrico: dioptrias_receta.value.a1_oi.cil ?? 0,
    punto_venta: punto_venta.value,
  };

  const _pkToDelete2_od = {
    marca: cristal2_marca_od_id || data?.[EnumGrid.cristal2_od_marca_id],
    diseno: cristal2_diseno_od_id || data?.[EnumGrid.cristal2_od_diseno_id],
    indice: cristal2_indice_od_id || data?.[EnumGrid.cristal2_od_indice_id],
    material:
      cristal2_material_od_id || data?.[EnumGrid.cristal2_od_material_id],
    color: cristal2_color_od_id || data?.[EnumGrid.cristal2_od_color_id],
    tratamiento:
      cristal2_tratamiento_od_id || data?.[EnumGrid.cristal2_od_tratamiento_id],
    diametro: cristal2_od_diametro || data?.[EnumGrid.cristal2_od_diametro],
    esferico: a2_od_esf.value ?? 0,
    cilindrico: a2_od_cil.value ?? 0,
    punto_venta: punto_venta.value,
  };

  const _pkToDelete2_oi = {
    marca: cristal2_marca_oi_id || data?.[EnumGrid.cristal2_oi_marca_id],
    diseno: cristal2_diseno_oi_id || data?.[EnumGrid.cristal2_oi_diseno_id],
    indice: cristal2_indice_oi_id || data?.[EnumGrid.cristal2_oi_indice_id],
    material:
      cristal2_material_oi_id || data?.[EnumGrid.cristal2_oi_material_id],
    color: cristal2_color_oi_id || data?.[EnumGrid.cristal2_oi_color_id],
    tratamiento:
      cristal2_tratamiento_oi_id || data?.[EnumGrid.cristal2_oi_tratamiento_id],
    diametro: cristal2_oi_diametro || data?.[EnumGrid.cristal2_oi_diametro],
    esferico: a2_oi_esf.value ?? 0,
    cilindrico: a2_oi_cil.value ?? 0,
    punto_venta: punto_venta.value,
  };

  // const _jsonCliente = {
  //     "cliente_sexo"      : (cliente_sexo === 'Femenino' ? 2 : (cliente_sexo === 'Masculino') ? 2 : 3)    || data?.[EnumGrid.cliente_sexo],
  //     "cliente_fecha_nac" : cliente_fecha_nacimiento || data?.[EnumGrid.cliente_fecha_nacimiento]
  // }

  //TODO! =========================== ENVIAR DP EN _P4 PARA VALIDAR ARMAZONES ===========================================================================

  const fetchArmazones1 = async (inputName: string, codArmazon: string) => {
    let dp = 0;
    let diametro = 0;
    let pkJSONGrupo: any = {};
    let jsonGrupo = {};

    let json_data: any = [{}];

    // let pkJSONCliente:any = {}
    // let jsonCliente       = {}

    // const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
    // const encodedJSON = encodeURIComponent(pkJSON)

    // console.log(codArmazon)

    if (codArmazon && codArmazon.trim() === "") {
      return;
    }

    const toastLoading = toast.loading("Cargando...");

    switch (inputName) {
      case "a1_armazon_id":
        json_data = [
          {
            armazon: (codArmazon || "").trim(),
            proyecto: codigoProyecto.value,
            punto_venta: punto_venta.value,
            dp: A1_DP.value,
            diametro: A1_Diametro.value,
            validar_parametrizacion: isEditting
              ? validar_parametrizacion.value
              : 1,
            // solo_consulta           : (isEditting ?  (areaActualOT as any === 10 ? 1 : (data?.[EnumGrid.bodega_procesado] === 1 ? 0 : 1))     : 1),
            solo_consulta: isEditting
              ? permiso_usuario_armazones && permiso_areas_armazones
                ? 1
                : data?.[EnumGrid.bodega_procesado] === 1
                ? 0
                : 1
              : 1,

            tipo_anteojo: tipo_de_anteojo.value,
            numero_armazon: 1,
          },
        ];
        dp = A1_DP.value as any;
        diametro = A1_Diametro.value as any;
        pkJSONGrupo =
          json_data[0]?.solo_consulta === 1
            ? JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
            : JSON.stringify([empty_jsonGrupo, empty_jsonGrupo]);
        jsonGrupo = encodeURIComponent(pkJSONGrupo);
        //  pkJSONCliente  = JSON.stringify([_jsonCliente])
        //  jsonCliente    = encodeURIComponent(pkJSONCliente)
        break;
      case "a2_armazon_id":
        json_data = [
          {
            armazon: (codArmazon || "").trim(),
            proyecto: codigoProyecto.value,
            punto_venta: punto_venta.value,
            dp: tipo_de_anteojo.value === "3" ? A2_DP.value : A1_DP.value,
            diametro:
              tipo_de_anteojo.value === "3"
                ? A1_Diametro.value
                : A1_Diametro.value,
            validar_parametrizacion: isEditting
              ? validar_parametrizacion.value
              : 1,
            solo_consulta: isEditting
              ? permiso_usuario_armazones && permiso_areas_armazones
                ? 1
                : data?.[EnumGrid.bodega_procesado] === 1
                ? 0
                : 1
              : 1,
            tipo_anteojo: tipo_de_anteojo.value,
            numero_armazon: 2,
          },
        ];
        dp = A2_DP.value as any;
        diametro = A2_Diametro.value as any;
        pkJSONGrupo = JSON.stringify([_pkToDelete2_od, _pkToDelete2_oi]);
        jsonGrupo =
          tipo_de_anteojo.value === "3"
            ? json_data[0].solo_consulta === 1
              ? encodeURIComponent(pkJSONGrupo)
              : encodeURIComponent(
                  JSON.stringify([empty_jsonGrupo, empty_jsonGrupo])
                )
            : json_data[0].solo_consulta === 1
            ? encodeURIComponent(
                JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
              )
            : encodeURIComponent(
                JSON.stringify([empty_jsonGrupo, empty_jsonGrupo])
              );
        break;
      case "a3_armazon_id":
        json_data = [
          {
            armazon: (codArmazon || "").trim(),
            proyecto: codigoProyecto.value,
            punto_venta: punto_venta.value,
            dp: A1_DP.value,
            diametro: A1_Diametro.value,
            validar_parametrizacion: isEditting
              ? validar_parametrizacion.value
              : 1,
            solo_consulta: isEditting
              ? permiso_usuario_armazones && permiso_areas_armazones
                ? 1
                : data?.[EnumGrid.bodega_procesado] === 1
                ? 0
                : 1
              : 1,
            tipo_anteojo: tipo_de_anteojo.value,
            numero_armazon: 3,
          },
        ];
        dp = A1_DP.value as any;
        diametro = A1_Diametro.value as any;
        pkJSONGrupo =
          json_data[0]?.solo_consulta === 1
            ? JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
            : JSON.stringify([empty_jsonGrupo, empty_jsonGrupo]);
        jsonGrupo = encodeURIComponent(pkJSONGrupo);
        // pkJSONCliente  = JSON.stringify([_jsonCliente])
        // jsonCliente    = encodeURIComponent(pkJSONCliente);
        break;
      default:
        break;
    }

    try {
      console.log(dp);
      console.log(diametro);

      // const {data} = await axios((validar_parametrizacion.value === '1' )
      //                                        ? (`${endpoint
      //                                                             }&_p1=${codArmazon && codArmazon.trim() !== '' ? codArmazon.trim() : ""
      //                                                             }&_p4=${
      //                                                                 tipo_de_anteojo.value === '3'
      //                                                                 ? (
      //                                                                     typeof dp === 'number'
      //                                                                         ? (typeof dp === 'number' ? dp : 0)
      //                                                                         : (typeof dp === 'string' ? dp: 0)
      //                                                                 )
      //                                                                 : (
      //                                                                     typeof A1_DP.value === 'number'
      //                                                                         ? (typeof A1_DP.value === 'number' ? A1_DP.value : 0)
      //                                                                         : (typeof A1_DP.value === 'string' ? A1_DP.value : 0)
      //                                                                 )

      //                                                             }&_p5=${
      //                                                                 tipo_de_anteojo.value === '3'
      //                                                                 ? (
      //                                                                     typeof diametro === 'number'
      //                                                                         ? (typeof diametro === 'number' ? diametro :  "" )
      //                                                                         : (typeof diametro === 'string' ? diametro : "")
      //                                                                 )
      //                                                                 : (
      //                                                                     typeof A1_Diametro.value === 'number'
      //                                                                         ? (typeof A1_Diametro.value === 'number' ? A1_Diametro.value :  "" )
      //                                                                         : (typeof A1_Diametro.value === 'string' ? A1_Diametro.value : "")
      //                                                                 )
      //                                                             }&_jsonGrupo=${jsonGrupo}&_id=${
      //                                                                 inputOnlyReadReserva.value === true ? 0 : (permiso_areas_armazones === true ? (inputName === 'a3_armazon_id' ? 0 : (isEditting === true ? (formValues === undefined ?  0 : (amrazones_originales.value[inputName] === codArmazon ? 0 : 1))   : ( ( tipo_de_anteojo.value === '3' && inputName === 'a2_armazon_id') ? 1 : (inputName === 'a1_armazon_id' ? 1 : 0)))) : 0)}
      //                                                             `)
      //    : (`${endpoint}&_jsonGrupo=${encodeURIComponent(JSON.stringify([empty_jsonGrupo, empty_jsonGrupo]))}&_p1=${codArmazon && codArmazon.trim() !== '' ? codArmazon : ''}&_id=${ inputOnlyReadReserva.value === true ? 0 : (permiso_areas_armazones === true ? (inputName === 'a3_armazon_id' ? 0 : (isEditting === true ? ((formValues === undefined ?  0 : (amrazones_originales.value[inputName] === codArmazon ? 0 : 1))) : 0)) : 0)}`))

      // console.log(data[0])
      // console.log(data)
      // console.log(data[0][19])
      const { data } = await axios(
        `${endpoint3}&_jsonData=${encodeURIComponent(
          JSON.stringify(json_data)
        )}&_jsonGrupo=${jsonGrupo}`
      );

      // const {data} = await axios.post(endpoint2, json_data);

      //?VALIDACION DE ARMAZONES IGUALES
      // if (data && data[0][19] === "") {
      //   switch (inputName) {
      //     case "a1_armazon_id":
      //       if (
      //         data[0][0] === a2_armazon.value.trim() ||
      //         data[0][0] === a3_armazon.value.trim()
      //       ) {
      //         toast.error(
      //           `Código Armazon 1 no puede ser igual a Código ${
      //             data[0][0] === a2_armazon.value.trim()
      //               ? "Armazon 2"
      //               : "Armazon 3"
      //           }`
      //         );
      //         onDataChange({ ["a1_armazon_id"]: " " });
      //         a1_armazon.value = " ";
      //         setCodArmazon1(" ");
      //         setArmazon1([]);
      //         validation_A1_armazon("");
      //         console.log("render");
      //         toast.dismiss(toastLoading);
      //         return;
      //       }
      //       break;
      //     case "a2_armazon_id":
      //       if (
      //         data[0][0] === a1_armazon.value.trim() ||
      //         data[0][0] === a3_armazon.value.trim()
      //       ) {
      //         toast.error(
      //           `Código Armazon 2 no puede ser igual a Código ${
      //             data[0][0] === a1_armazon.value.trim()
      //               ? "Armazon 1"
      //               : "Armazon 3"
      //           }`
      //         );
      //         onDataChange({ ["a2_armazon_id"]: " " });
      //         a2_armazon.value = " ";
      //         setCodArmazon2(" ");
      //         setArmazon2([]);
      //         validation_A2_armazon("");
      //         toast.dismiss(toastLoading);
      //         return;
      //       }
      //       break;
      //     case "a3_armazon_id":
      //       if (
      //         data[0][0] === a1_armazon.value.trim() ||
      //         data[0][0] === a2_armazon.value.trim()
      //       ) {
      //         toast.error(
      //           `Código Armazon 3 no puede ser igual a Código ${
      //             data[0][0] === a1_armazon.value.trim()
      //               ? "Armazon 1"
      //               : "Armazon 2"
      //           }`
      //         );
      //         onDataChange({ ["a3_armazon_id"]: " " });
      //         setCodArmazon3(" ");
      //         setArmazon3([]);
      //         setCodArmazon3(" ");
      //         toast.dismiss(toastLoading);
      //         return;
      //       }
      //       break;
      //     default:
      //       break;
      //   }
      // }

      if (data && data[0][19] !== "") {
        // _señal = " "
        onDataChange({ [inputName]: " " });

        switch (data[0][19]) {
          case "ODOI":
            //?VALIDANDO CODIGOS ARMAZONES SEAN DISTINTOS
            switch (inputName) {
              case "a1_armazon_id":
                localStorage.setItem("a1_armazon", data[0]);
                setArmazon1(data[0]);
                setCodArmazon1(data[0][0]);
                validation_A1_armazon(data[0][0]);
                break;
              case "a2_armazon_id":
                localStorage.setItem("a2_armazon", data[0]);
                setArmazon2(data[0]);
                setCodArmazon2(data[0][0]);
                validation_A2_armazon(data[0][0]);
                break;
              case "a3_armazon_id":
                localStorage.setItem("a3_armazon", data[0]);
                setArmazon3(data[0]);
                setCodArmazon3(data[0][0]);
                break;
              default:
                break;
            }
            validacionIncompleta.value.check = true;
            validacionIncompleta.value.a1_od = true;
            validacionIncompleta.value.a1_oi = true;

            if (tipo_de_anteojo.value === "3") {
              validacionIncompleta.value.a2_od = true;
              validacionIncompleta.value.a2_oi = true;
            }
            toast.error(data[0][20]);
            toast.dismiss(toastLoading);
            return;
          case "OD":
            switch (inputName) {
              case "a1_armazon_id":
                localStorage.setItem("a1_armazon", data[0]);
                setArmazon1(data[0]);
                setCodArmazon1(data[0][0]);
                validation_A1_armazon(data[0][0]);
                break;
              case "a2_armazon_id":
                localStorage.setItem("a2_armazon", data[0]);
                setArmazon2(data[0]);
                setCodArmazon2(data[0][0]);
                validation_A2_armazon(data[0][0]);
                break;
              case "a3_armazon_id":
                localStorage.setItem("a3_armazon", data[0]);
                setArmazon3(data[0]);
                setCodArmazon3(data[0][0]);
                break;
              default:
                break;
            }
            validacionIncompleta.value.check = true;
            validacionIncompleta.value.a1_od = true;
            validacionIncompleta.value.a1_oi = false;

            if (tipo_de_anteojo.value === "3") {
              validacionIncompleta.value.a2_od = true;
              validacionIncompleta.value.a2_oi = false;
            }
            toast.error(data[0][20]);
            toast.dismiss(toastLoading);
            return;
          case "OI":
            switch (inputName) {
              case "a1_armazon_id":
                localStorage.setItem("a1_armazon", data[0]);
                setArmazon1(data[0]);
                setCodArmazon1(data[0][0]);
                validation_A1_armazon(data[0][0]);
                break;
              case "a2_armazon_id":
                localStorage.setItem("a2_armazon", data[0]);
                setArmazon2(data[0]);
                setCodArmazon2(data[0][0]);
                validation_A2_armazon(data[0][0]);
                break;
              case "a3_armazon_id":
                localStorage.setItem("a3_armazon", data[0]);
                setArmazon3(data[0]);
                setCodArmazon3(data[0][0]);
                break;
              default:
                break;
            }
            validacionIncompleta.value.check = true;
            validacionIncompleta.value.a1_od = false;
            validacionIncompleta.value.a1_oi = true;

            if (tipo_de_anteojo.value === "3") {
              validacionIncompleta.value.a2_od = false;
              validacionIncompleta.value.a2_oi = true;
            }
            toast.error(data[0][20]);
            toast.dismiss(toastLoading);
            return;
          default:
            break;
        }

        console.log("render");

        if (inputName === "a1_armazon_id") {
          console.log("render");
          setArmazon1([]);
          setCodArmazon1(" ");
          validation_A1_armazon("");

          A1_GRUPO_OD.value = "";
          A1_GRUPO_OI.value = "";
          A1_CR_OD.value = "";
          A1_CR_OI.value = "";
          console.log();
          validation_Cristal1_od("");
          validation_Cristal1_oi("");
          toast.error(data[0][19]);
        }

        if (inputName === "a2_armazon_id") {
          setArmazon2([]);
          setCodArmazon2(" ");
          validation_A2_armazon("");
          if (tipo_de_anteojo.value === "3") {
            (A2_GRUPO_OD.value = ""),
              (A2_GRUPO_OI.value = ""),
              (A2_CR_OD.value = ""),
              (A2_CR_OI.value = ""),
              validation_Cristal2_od("");
            validation_Cristal2_oi("");
          }
          toast.error(data[0][19]);
        }

        if (inputName === "a3_armazon_id") {
          setArmazon3([]);
          setCodArmazon3(" ");
          toast.error(data[0][19]);
        }
        toast.dismiss(toastLoading);
        return;
      } else {
        if (data[0]) {
          onDataChange({ [inputName]: data[0][0] });
          if (inputName === "a1_armazon_id") {
            localStorage.setItem("a1_armazon", data[0]);
            setArmazon1(data[0]);
            setCodArmazon1(data[0][0]);

            if (!inputOnlyReadReserva.value) {
              if (data[0][15] === "") {
                toast.dismiss(toastLoading);
                return;
              }
              A1_GRUPO_OD.value = data[0][15];
              a1_armazon.value = data[0][0];
              A1_GRUPO_OI.value = data[0][16];

              A1_CR_OD.value = data[0][17];
              A1_CR_OI.value = data[0][18];

              if (data[0][17] === "") {
                validation_Cristal1_oi("32");
                validation_Cristal1_od("32");
              } else {
                validation_Cristal1_oi(data[0][17]);
                validation_Cristal1_od(data[0][18]);
              }
            }

            validation_A1_armazon(data[0][0]);
          }

          if (inputName === "a2_armazon_id") {
            localStorage.setItem("a2_armazon", data[0]);
            setArmazon2(data[0]);
            setCodArmazon2(data[0][0]);
            a2_armazon.value = data[0][0];

            if (tipo_de_anteojo.value === "3") {
              if (!inputOnlyReadReserva.value) {
                if (data[0][15] === "") {
                  toast.dismiss(toastLoading);
                  return;
                }

                A2_GRUPO_OD.value = data[0][15];
                A2_GRUPO_OI.value = data[0][16];

                A2_CR_OD.value = data[0][17];
                A2_CR_OI.value = data[0][18];

                if (data[0][17] === "") {
                  validation_Cristal2_od("32");
                  validation_Cristal2_oi("32");
                } else {
                  validation_Cristal2_od(data[0][17]);
                  validation_Cristal2_oi(data[0][18]);
                }

                validation_A2_armazon(data[0][0]);
              }
            }
          }

          if (inputName === "a3_armazon_id") {
            localStorage.setItem("a3_armazon", data[0]);
            setArmazon3(data[0]);
          }
        }
      }
      toast.dismiss(toastLoading);
    } catch (error) {
      toast.dismiss(toastLoading);
      throw error;
    }
  };

  //TODO! =========================== ENVIAR Diametro EN _P5 PARA VALIDAR ARMAZONES =====================================================================

  // const endpoint = validar_parametrizacion.value === '0'
  //                                                ? `${URLBackend}/api/armazones/listado/?query=01`
  //                                                : `${URLBackend}/api/armazones/listado/?query=02&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;

  // const endpoint =`${URLBackend}/api/armazones/listado/?query=02&_p6=${ isEditting ? (data && data[EnumGrid.validar_parametrizacion_id]) : 1 }&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;

  // console.log(punto_venta.value)

  const handleInputChange = (e: any) => {
    const { name, value } = e;

    console.log(name);
    console.log(value);

    onDataChange({ [name]: value.trim() });

    console.log(value);

    if (value.trim() === "") {
      switch (name) {
        case "a1_armazon_id":
          setArmazon1([]);
          validation_A1_armazon("");
          break;
        case "a2_armazon_id":
          setArmazon2([]);
          validation_A2_armazon("");
          break;
        default:
          break;
      }
      return;
    }

    if (name === "a1_armazon_id") {
      a1_armazon.value = value.trim();
      setCodArmazon1(value.trim());
      console.log("render");
    }
    if (name === "a2_armazon_id") {
      a2_armazon.value = value.trim();
      setCodArmazon2(value.trim());
    }
    if (name === "a3_armazon_id") {
      a3_armazon.value = value.trim();
      setCodArmazon3(value.trim());
    }

    // setRender((prev)=>!prev)

    if (
      name === "a1_armazon_id" ||
      name === "a2_armazon_id" ||
      "a3_armazon_id"
    ) {
      fetchArmazones1(name, value);
      switch (name) {
        case "a1_armazon_id":
          if (value.trim() === "") {
            setArmazon1([]);
            validation_A1_armazon("");
            console.log("render");
          }
          break;
        case "a2_armazon_id":
          if (value.trim() === "") {
            setArmazon2([]);
            validation_A2_armazon("");
          }
          break;
        case "a3_armazon_id":
          if (value.trim() === "") {
            setArmazon3([]);
          }
          break;
        default:
          break;
      }
    }

    validationOTlevel2(name, value);

    // onDataChange({ [name]: value.trim() });
  };

  // const handleInputValidationChange = (e:any) => {
  //     const { name, value } = e;

  //     console.log(name)
  //     console.log(value)
  //     validationOTlevel3(name, value)
  //     if(name === 'validar_armazon1'){
  //         console.log('render')
  //         validar_armazon1.value = value.trim()
  //         if(value.trim() !== ''){
  //             const item = validationNivel3.value.find((item: { campo: string; }) => item.campo === 'validar_armazon1');

  //             if(item && item.valor === 0){
  //                 toast.error('Códigos Armazon 1 no Coincide')
  //                 validar_armazon1.value = "";
  //                 onDataChange({['validar_armazon1']: ""})
  //             }
  //         }

  //     }

  //     if(name === 'validar_armazon2'){
  //         validar_armazon2.value = value.trim()
  //         if(value.trim() !== ''){
  //             const item = validationNivel3.value.find((item: { campo: string; }) => item.campo === 'validar_armazon2');

  //             if(item && item.valor === 0){
  //                 toast.error('Códigos Armazon 2 no Coincide')
  //                 validar_armazon2.value = " ";
  //                 // onDataChange({['validar_armazon2']: ""})

  //             }
  //         }

  //     }

  //     onDataChange({ [name]: value.trim() });
  // }

  useEffect(() => {
    if (codArmazon1 && armazon1[0] && armazon1.length > 2) {
      onDataChange({ ["a1_armazon_id"]: armazon1[0] });
    }

    // fetchArmazones1('a1_armazon_id', codArmazon1)
  }, [armazon1, codArmazon1]);

  useEffect(() => {
    if (codArmazon2 && armazon2[0] && armazon2.length > 2) {
      onDataChange({ ["a2_armazon_id"]: armazon2[0] });
    }
    // fetchArmazones1('a2_armazon_id', codArmazon2)
  }, [armazon2, codArmazon2]);
  useEffect(() => {
    if (codArmazon3 && armazon3[0] && armazon3.length > 2) {
      onDataChange({ ["a3_armazon_id"]: armazon3[0] });
    }
    // fetchArmazones1('a3_armazon_id', codArmazon3)
  }, [armazon3, codArmazon3]);

  useEffect(() => {
    if (a1_armazon.value && a1_armazon.value.trim() !== "") {
      localStorage.getItem("a1_armazon")
        ? setArmazon1(localStorage.getItem("a1_armazon")?.split(","))
        : fetchArmazones1("a1_armazon_id", a1_armazon.value);
    }

    if (a2_armazon.value && a2_armazon.value.trim() !== "") {
      localStorage.getItem("a2_armazon")
        ? setArmazon2(localStorage.getItem("a2_armazon")?.split(","))
        : fetchArmazones1("a2_armazon_id", a2_armazon.value);
    }

    if (a3_armazon.value && a3_armazon.value.trim() !== "") {
      localStorage.getItem("a3_armazon")
        ? setArmazon3(localStorage.getItem("a3_armazon")?.split(","))
        : fetchArmazones1("a3_armazon_id", a3_armazon.value);
    }
  }, []);

  //    console.log(a1_armazon.value)
  return (
    <form>
      <div className="frameOTForm h-[84vh]">
        {/* <div className='w-full items-center rowForm !h-[5rem]  grid grid-cols-3'> */}
        <div className="relative !mt-[2rem] !h-[30rem] grid grid-cols-3">
          <div className="flex !h-[29rem] !ml-[1rem]">
            <div className="w-[90%] mx-auto ">
              <div className="w-[90%] ml-4 flex items-center">
                <div className="w-full flex !mt-2 rowForm ">
                  <div className="-mt-[0.40rem]">
                    <OTTextInputComponent
                      type="text"
                      label="Código Armazón 1"
                      name="a1_armazon_id"
                      handleChange={handleInputChange}
                      otData={
                        a1_armazon.value
                          ? a1_armazon.value
                          : formValues && formValues["a1_armazon_id"]
                          ? formValues["a1_armazon_id"]
                          : data && data[EnumGrid.a1_armazon_id]
                      }
                      // data={a1_armazon.value || data && data[EnumGrid.a1_armazon_id]}
                      control={control}
                      onlyRead={
                        !(
                          !isEditting ||
                          (permiso_usuario_armazones && permiso_areas_armazones)
                        ) || inputOnlyReadReserva.value
                      }
                      // isOT={true}
                      textAlign="text-center"
                      customWidth={"labelInputx2 inputStyles !w-[26vw]"}
                    />
                  </div>
                  {/* {OTAreas === 60 && (
                                <div className="-mt-[0.35rem]">
                                    <OTTextInputComponent
                                        type="text"
                                        label="Validar Código"
                                        name="validar_armazon1"
                                        handleChange={handleInputValidationChange}
                                        otData={validar_armazon1.value ? validar_armazon1.value : formValues  && formValues["validar_armazon1"] && formValues["validar_armazon1"] }
                                        control={control}
                                        // isOT={true}
                                        textAlign="text-center"
                                        className='!text-xl custom-input '
                                    />
                                </div>
                            )} */}
                </div>
              </div>

              <div className="w-[90%] !h-auto FOTArmazonesInfo  mx-auto radioComponent">
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Tipo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[2]
                      : armazon1 && armazon1[2]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Marca:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[4]
                      : armazon1 && armazon1[4]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Modelo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[5]
                      : armazon1 && armazon1[5]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Color:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[6]
                      : armazon1 && armazon1[6]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Material:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[8]
                      : armazon1 && armazon1[8]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Aro:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[9]
                      : armazon1 && armazon1[9]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Puente:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[10]
                      : armazon1 && armazon1[10]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Diagonal:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[11]
                      : armazon1 && armazon1[11]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Brazo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[12]
                      : armazon1 && armazon1[12]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Uso:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon1[0] && armazon1[14]
                      : armazon1 && armazon1[14]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex !h-[29rem] !ml-[1rem]">
            <div className="w-[90%] mx-auto ">
              <div className="w-[90%] ml-4 flex items-center">
                <div className="w-full flex mt-6 rowForm ">
                  <div className="-mt-[0.40rem]">
                    <OTTextInputComponent
                      type="text"
                      label="Código Armazón 2"
                      name="a2_armazon_id"
                      handleChange={handleInputChange}
                      otData={
                        a2_armazon.value
                          ? a2_armazon.value
                          : formValues
                          ? formValues["a2_armazon_id"]
                          : data && data[EnumGrid.a2_armazon_id]
                      }
                      control={control}
                      onlyRead={
                        !(
                          !isEditting ||
                          (permiso_usuario_armazones && permiso_areas_armazones)
                        ) || inputOnlyReadReserva.value
                      }
                      // isOT={true}
                      textAlign="text-center"
                      customWidth={"labelInputx2 inputStyles !w-[26vw]"}
                    />
                  </div>
                  {/* 
                                {(OTAreas === 60 && tipo_de_anteojo.value === '3' ) && (
                                    <div className="-mt-[0.35rem]">
                                        <OTTextInputComponent
                                            type="text"
                                            label="Validar Código"
                                            name="validar_armazon2"
                                            handleChange={handleInputValidationChange}
                                            otData={validar_armazon2.value ? validar_armazon2.value : formValues  && formValues["validar_armazon2"] && formValues["validar_armazon2"]}
                                            control={control}
                                            onlyRead={tipo_de_anteojo.value === '3' ? false : true}
                                           //  isOT={true}
                                            textAlign="text-center"
                                            className='!text-xl custom-input '
                                         />
                                    </div>
                                     )}     */}
                </div>
              </div>

              <div className="w-[90%] !h-auto FOTArmazonesInfo mx-auto radioComponent">
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Tipo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[2]
                      : armazon2 && armazon2[2]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Marca:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[4]
                      : armazon2 && armazon2[4]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Modelo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[5]
                      : armazon2 && armazon2[5]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Color:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[6]
                      : armazon2 && armazon2[6]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Material:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[8]
                      : armazon2 && armazon2[8]}{" "}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Aro:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[9]
                      : armazon2 && armazon2[9]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Puente:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[10]
                      : armazon2 && armazon2[10]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Diagonal:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[11]
                      : armazon2 && armazon2[11]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Brazo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[12]
                      : armazon2 && armazon2[12]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Uso:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon2[0] && armazon2[14]
                      : armazon2 && armazon2[14]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex !h-[29rem] !ml-[1rem]">
            <div className="w-[90%] mx-auto ">
              <div className="w-[90%] ml-4 flex items-center">
                <div className="w-full flex mt-6 rowForm ">
                  <OTTextInputComponent
                    type="text"
                    label="Código Armazón 3"
                    name="a3_armazon_id"
                    handleChange={handleInputChange}
                    otData={
                      a3_armazon.value
                        ? a3_armazon.value
                        : formValues
                        ? formValues["a3_armazon_id"]
                        : data && data[EnumGrid.a3_armazon_id]
                    }
                    control={control}
                    onlyRead={
                      !(
                        !isEditting ||
                        (permiso_usuario_armazones && permiso_areas_armazones)
                      ) || inputOnlyReadReserva.value
                    }
                    // isOT={true}
                    isOptional={true}
                    textAlign="text-center"
                    customWidth={"labelInputx2 inputStyles !w-[26vw]"}
                  />
                </div>
              </div>

              <div className="w-[90%] mx-auto !h-auto FOTArmazonesInfo radioComponent">
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Tipo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[2]
                      : armazon3 && armazon3[2]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Marca:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[4]
                      : armazon3 && armazon3[4]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Modelo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[5]
                      : armazon3 && armazon3[5]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Color:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[6]
                      : armazon3 && armazon3[6]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Material:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[8]
                      : armazon3 && armazon3[8]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Aro:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[9]
                      : armazon3 && armazon3[9]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Puente:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[10]
                      : armazon3 && armazon3[10]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between ">
                  <h2 className="textArmazonOT">Diagonal:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[11]
                      : armazon3 && armazon3[11]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Brazo:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[12]
                      : armazon3 && armazon3[12]}
                  </p>
                </div>
                <div className="ml-2 mb-2 flex justify-between">
                  <h2 className="textArmazonOT">Uso:</h2>
                  <p className="textArmazonOTDetalle">
                    {validar_parametrizacion.value === "1"
                      ? armazon3[0] && armazon3[14]
                      : armazon3 && armazon3[14]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FOTArmazones;

{
  /* <SelectInputComponent
label="Opción de Venta"
name="a1_opcion_vta_id"
showRefresh={true}
isOT={true}
handleSelectChange={handleInputChange}
data={formValues ? formValues["a1_opcion_vta_id"] : data && data[EnumGrid.a1_opcion_vta_id]}
control={control}
entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
// error={errors.establecimiento}
readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
customWidth={"345px"}
/>

<SelectInputComponent
label="Opción de Venta"
name="a2_opcion_vta_id"
showRefresh={true}
isOT={true}
handleSelectChange={handleInputChange}
data={formValues ? formValues["a2_opcion_vta_id"] : data && data[EnumGrid.a2_opcion_vta_id]}
control={control}
entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
// error={errors.establecimiento}
customWidth={"345px"}
readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
/>

<SelectInputComponent
    label="Opcion de Venta"
    name="a3_opcion_vta_id"
    showRefresh={true}
    isOT={true}
    handleSelectChange={handleInputChange}
    data={formValues ? formValues["a3_opcion_vta_id"] : data && data[EnumGrid.a3_opcion_vta_id]}
    control={control}
    entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
    // error={errors.establecimiento}
    customWidth={"345px"}
    readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
/>
*/
}

// const [dataArmazon1, setDataArmazon1] = useState();
// useEffect(()=>{
//     setDataArmazon1(armazon1)
// },[codArmazon1])

// const fetchArmazones1 = async (inputName:string, codArmazon:string)=>{

//     console.log(inputName)
//     let dp         = 0
//     let diametro   = 0

//     if(codArmazon.trim() === ''){
//         return;
//     }

//     switch (inputName) {
//         case 'a1_armazon_id':
//              dp        = A1_DP.value as any
//              diametro  = A1_Diametro.value as any
//             break
//         case 'a2_armazon_id':
//             dp         = A2_DP.value as any
//             diametro   = A2_Diametro.value as any
//             break;
//         default:
//             break;
//     }

//     console.log(codArmazon)
//     console.log(dp)
//     console.log(diametro)

//     try {
//         console.log('render')
//         const {data} = await axios((validar_parametrizacion.value === '1' )
//                                                ? (`${endpoint
//                                                                     }&_p1=${codArmazon1 !== ' ' ? codArmazon1.trim() : "aaaa"
//                                                                     }&_p4=${
//                                                                         typeof A1_DP.value === 'number'
//                                                                         ? (typeof A1_DP.value === 'number' ? A1_DP.value : 0)
//                                                                         : (typeof A1_DP.value === 'string' ? A1_DP.value : 0)
//                                                                     }&_p5=${
//                                                                         typeof A1_Diametro.value === 'number'
//                                                                         ? (typeof A1_Diametro.value === 'number' ? A1_Diametro.value : "" )
//                                                                         : (typeof A1_Diametro.value === 'string' ? A1_Diametro.value : "")}`)
//                                                : (`${endpoint}&_p1=${codArmazon1 !== ' ' ? codArmazon1 && codArmazon1.trim() : "aaaa"}`))
//         // console.log(data[0])
//         if(data && data[0] && data[0][0] === 'ERROR'){
//             toast.error(data[0][1])
//             a1_armazon.value = " "
//             onDataChange({['a1_armazon_id']: " "})
//             setArmazon1([])
//         }else{
//             setArmazon1(data[0])
//         }
//     } catch (error) {
//         throw error
//     }
// }
