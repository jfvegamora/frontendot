import axios from "axios";

import { Signal, signal } from "@preact/signals-react";
import {
  validationFechaDespacho,
  validationFechaEntregaCliente,
  validationFechaEntregaTaller,
} from "./validationOT";
import { EnumGrid } from "../views/mantenedores/MOTHistorica";
import { toast } from "react-toastify";
import { validation_tipo_anteojo } from "./OTReceta_utils";
// import { areaActualOT } from "../components/OTAreasButtons";
import { inputOnlyReadReserva } from "./FReservaArmazones_utils";
import { OTGrillaEnum } from "../Enums";
import {
  CR1_OD_LAB,
  CR1_OI_LAB,
  CR2_OD_LAB,
  CR2_OI_LAB,
} from "./FOTCristales_utils";
import { URLBackend } from "./config";

export const dioptrias: any = signal<any>({
  ESF: [""],
  CIL: [""],
  EJE: [""],
  AD: [""],
});

export const clearAllCheck = signal(false);
export const clearIndividualCheck = signal(false);
export const disabledIndividualCheck = signal(false);
export const inputOnlyReadBodegaProcesado = signal(false);
// export const validacionIncompleta  = signal(false);
const countError = signal(0);

export const validacionIncompleta = signal({
  check: false,
  a1_od: false,
  a1_oi: false,
  a2_oi: false,
  a2_od: false,
});

export const codigoProyecto = signal("");
export const tipo_anteojo_title = signal("");
export const tipo_anteojo_title_cristal2 = signal("");

export const a1_od_esf = signal<any | undefined>(undefined);
export const a1_od_cil = signal<any | undefined>(undefined);
export const a1_od_eje = signal<any | undefined>(undefined);
export const a1_od_ad = signal<any | undefined>(0);

export const a1_oi_esf = signal<any | undefined>(undefined);
export const a1_oi_cil = signal<any | undefined>(undefined);
export const a1_oi_eje = signal<any | undefined>(undefined);
export const a1_oi_ad = signal<any | undefined>(0);

export const a2_od_esf = signal<any>(undefined);
export const a2_od_cil = signal<any>(undefined);
export const a2_od_eje = signal<any>(undefined);

export const a2_oi_esf = signal<any | undefined>(undefined);
export const a2_oi_cil = signal<any | undefined>(undefined);
export const a2_oi_eje = signal<any | undefined>(undefined);

export const tipo_de_anteojo = signal("");
export const validar_parametrizacion = signal("1");
export const estado_validacion = signal("1");

//SEÑALES FECHA PARA GENERARLAS A PARTIR DE FECHA_ATECION/QUERY 11 SPOT
export const fecha_atencion_signal = signal("");
export const fecha_despacho = signal("");
export const fecha_entrega_taller = signal("");
export const fecha_entrega_cliente = signal("");

export const cliente_rut = signal("");

export const a1_armazon = signal("");
export const a2_armazon = signal("");
export const a3_armazon = signal("");

export const A1_Diametro = signal("");
export const A2_Diametro = signal("");
export const A1_CR_OD = signal("");
export const A1_CR_OI = signal("");
export const A2_CR_OD = signal("");
export const A2_CR_OI = signal("");

export const A1_ALT = signal("");

export const A1_DP = signal("");
export const A2_DP = signal("");

export const A1_GRUPO_OD = signal("");
export const A1_GRUPO_OI = signal("");
export const A2_GRUPO_OD = signal("");
export const A2_GRUPO_OI = signal("");

export const punto_venta = signal("");
export const oftalmologo_id = signal("");

export const clearSelectInput = signal(true);
export const motivo_ot = signal(false);

export const cristalesJSONsignal = signal<any>({});
export const armazonesJSONsignal = signal<any>({});

export const isExistClient = signal(false);
export const isToggleImpression = signal<any>(false);
export const isToggleValidation = signal<any>(false);

export const EmpresaAdjudicadaOT_ID = signal(0);

//VALIDACIONES

export const validar_armazon1 = signal("");
export const validar_armazon2 = signal("");

export const validar_cristal1_od = signal("");
export const validar_cristal1_oi = signal("");
export const validar_cristal2_od = signal("");
export const validar_cristal2_oi = signal("");

export const validarImpresion = signal(null);

export const secondProcessBodega = signal(false);
export const procesarRender = signal(40);
export const numero_worktracking = signal("");
export const numero_receta = signal("");

// fechaHoraActual

// export const validationNivel1 = signal([
//   {
//     campo:"proyecto",
//     valor: 0
//   },
//   {
//     campo:"establecimiento_id",
//     valor: 0
//   },
//   {
//     campo:"cliente_rut",
//     valor: 0
//   },
//   {
//     campo: "cliente_nombre",
//     valor: 0
//   },
//   {
//     campo : "cliente_tipo",
//     valor : 0
//   },
//   {
//     campo : "cliente_sexo",
//     valor : 0
//   },
//   {
//     campo : "cliente_telefono",
//     valor : 0
//   },
//   {
//     campo : "cliente_comuna",
//     valor : 0
//   },
//   {
//     campo:"fecha_atencion",
//     valor: 0
//   },
//   {
//     campo:"punto_venta_id",
//     valor: 0
//   },
//   {
//     campo:"tipo_anteojo_id",
//     valor: 0
//   },
// ]);

// export const validationNivel2 = signal([
//   { campo:"establecimiento_id",
//   valor: 0
//   },
//   { campo: "fecha_entrega_taller",
//     valor: 0
//   },
//   { campo: "fecha_despacho",
//     valor: 0
//   },
//   { campo: "fecha_entrega_cliente",
//     valor: 0
//   },
//   { campo: "a1_od_esf",
//     valor: 0
//   },
//   { campo: "a1_od_cil",
//     valor: 0
//   },
//   { campo: "a1_od_eje",
//     valor: 0
//   },
//   { campo: "a1_od_ad",
//     valor: 1
//   },
//   { campo: "a1_oi_ad",
//     valor: 1
//   },
//   { campo: "a1_oi_esf",
//     valor: 0
//   },
//   { campo: "a1_oi_cil",
//     valor: 0
//   },
//   { campo: "a1_oi_eje",
//     valor: 0
//   },
//   { campo: "a1_dp",
//     valor: 0
//   },
//   { campo: "a1_alt",
//     valor: 0
//   },
//   { campo:'combinaciones_validas',
//     valor: 0
//   },
//   { campo: "a2_od_esf",
//     valor: 0
//   },
//   { campo: "a2_od_cil",
//     valor: 0
//   },
//   { campo: "a2_od_eje",
//     valor: 0
//   },
//   { campo: "a2_oi_esf",
//     valor: 0
//   },
//   { campo: "a2_oi_cil",
//     valor: 0
//   },
//   { campo: "a2_oi_eje",
//     valor: 0
//   },
//   { campo: "a2_dp",
//     valor: 0
//   },

//   //A2_GRUPO
//   { campo: "a1_armazon_id",
//     valor: 0
//   },
//   { campo: "a2_armazon_id",
//     valor: 0
//   },

//   { campo: "cristal1_marca_id",
//     valor: 0
//   },
//   { campo: "cristal1_diseno_id",
//     valor: 0
//   },
//   { campo: "cristal1_indice_id",
//     valor: 0
//   },
//   { campo: "cristal1_material_id",
//     valor: 0
//   },
//   { campo: "cristal1_tratamiento_id",
//     valor: 0
//   },
//   { campo: "cristal1_color_id",
//     valor: 0
//   },
//   { campo: "cristal1_diametro",
//     valor: 0
//   },

//   { campo: "cristal1_od",
//     valor: 0
//   },
//   { campo: "cristal1_oi",
//     valor: 0
//   },

//   { campo: "cristal2_marca_id",
//     valor: 0
//   },
//   { campo: "cristal2_diseno_id",
//     valor: 0
//   },
//   { campo: "cristal2_indice_id",
//     valor: 0
//   },
//   { campo: "cristal2_material_id",
//     valor: 0
//   },
//   { campo: "cristal2_tratamiento_id",
//     valor: 0
//   },
//   { campo: "cristal2_color_id",
//     valor: 0
//   },
//   { campo: "cristal2_diametro",
//     valor: 0
//   },
//   { campo: "cristal2_od",
//     valor: 0
//   },
//   { campo: "cristal2_oi",
//     valor: 0
//   }
// ])

export const validationNivel1 = signal([
  {
    campo: "proyecto",
    valor: 0,
  },
  {
    campo: "establecimiento_id",
    valor: 0,
  },
  {
    campo: "cliente_rut",
    valor: 0,
  },
  {
    campo: "cliente_nombre",
    valor: 0,
  },
  {
    campo: "cliente_tipo",
    valor: 0,
  },
  {
    campo: "cliente_sexo",
    valor: 0,
  },
  {
    campo: "cliente_telefono",
    valor: 0,
  },
  {
    campo: "cliente_comuna",
    valor: 0,
  },
  {
    campo: "fecha_atencion",
    valor: 0,
  },
  {
    campo: "punto_venta_id",
    valor: 0,
  },
  {
    campo: "tipo_anteojo_id",
    valor: 0,
  },
  { campo: "fecha_entrega_taller", valor: 0 },
  { campo: "fecha_despacho", valor: 0 },
  { campo: "fecha_entrega_cliente", valor: 0 },
  { campo: "a1_od_esf", valor: 0 },
  { campo: "a1_od_cil", valor: 0 },
  { campo: "a1_od_eje", valor: 0 },
  { campo: "a1_od_ad", valor: 1 },
  { campo: "a1_oi_ad", valor: 1 },
  { campo: "a1_oi_esf", valor: 0 },
  { campo: "a1_oi_cil", valor: 0 },
  { campo: "a1_oi_eje", valor: 0 },
  { campo: "a1_dp", valor: 0 },
  { campo: "a1_alt", valor: 0 },
  { campo: "combinaciones_validas", valor: 0 },
  { campo: "a2_od_esf", valor: 0 },
  { campo: "a2_od_cil", valor: 0 },
  { campo: "a2_od_eje", valor: 0 },
  { campo: "a2_oi_esf", valor: 0 },
  { campo: "a2_oi_cil", valor: 0 },
  { campo: "a2_oi_eje", valor: 0 },
  { campo: "a2_dp", valor: 0 },

  //A2_GRUPO
  { campo: "a1_armazon_id", valor: 0 },
  { campo: "a2_armazon_id", valor: 0 },

  { campo: "cristal1_marca_id", valor: 0 },
  { campo: "cristal1_diseno_id", valor: 0 },
  { campo: "cristal1_indice_id", valor: 0 },
  { campo: "cristal1_material_id", valor: 0 },
  { campo: "cristal1_tratamiento_id", valor: 0 },
  { campo: "cristal1_color_id", valor: 0 },
  { campo: "cristal1_diametro", valor: 0 },

  { campo: "cristal1_od", valor: 0 },
  { campo: "cristal1_oi", valor: 0 },

  { campo: "cristal2_marca_id", valor: 0 },
  { campo: "cristal2_diseno_id", valor: 0 },
  { campo: "cristal2_indice_id", valor: 0 },
  { campo: "cristal2_material_id", valor: 0 },
  { campo: "cristal2_tratamiento_id", valor: 0 },
  { campo: "cristal2_color_id", valor: 0 },
  { campo: "cristal2_diametro", valor: 0 },
  { campo: "cristal2_od", valor: 0 },
  { campo: "cristal2_oi", valor: 0 },
]);

export const validationNivel2 = signal([
  { campo: "establecimiento_id", valor: 0 },
  { campo: "fecha_entrega_taller", valor: 0 },
  { campo: "fecha_despacho", valor: 0 },
  { campo: "fecha_entrega_cliente", valor: 0 },
  { campo: "a1_od_esf", valor: 0 },
  { campo: "a1_od_cil", valor: 0 },
  { campo: "a1_od_eje", valor: 0 },
  { campo: "a1_od_ad", valor: 1 },
  { campo: "a1_oi_ad", valor: 1 },
  { campo: "a1_oi_esf", valor: 0 },
  { campo: "a1_oi_cil", valor: 0 },
  { campo: "a1_oi_eje", valor: 0 },
  { campo: "a1_dp", valor: 0 },
  { campo: "a1_alt", valor: 0 },
  { campo: "combinaciones_validas", valor: 0 },
  { campo: "a2_od_esf", valor: 0 },
  { campo: "a2_od_cil", valor: 0 },
  { campo: "a2_od_eje", valor: 0 },
  { campo: "a2_oi_esf", valor: 0 },
  { campo: "a2_oi_cil", valor: 0 },
  { campo: "a2_oi_eje", valor: 0 },
  { campo: "a2_dp", valor: 0 },

  //A2_GRUPO
  { campo: "a1_armazon_id", valor: 0 },
  { campo: "a2_armazon_id", valor: 0 },

  { campo: "cristal1_marca_id", valor: 0 },
  { campo: "cristal1_diseno_id", valor: 0 },
  { campo: "cristal1_indice_id", valor: 0 },
  { campo: "cristal1_material_id", valor: 0 },
  { campo: "cristal1_tratamiento_id", valor: 0 },
  { campo: "cristal1_color_id", valor: 0 },
  { campo: "cristal1_diametro", valor: 0 },

  { campo: "cristal1_od", valor: 0 },
  { campo: "cristal1_oi", valor: 0 },

  { campo: "cristal2_marca_id", valor: 0 },
  { campo: "cristal2_diseno_id", valor: 0 },
  { campo: "cristal2_indice_id", valor: 0 },
  { campo: "cristal2_material_id", valor: 0 },
  { campo: "cristal2_tratamiento_id", valor: 0 },
  { campo: "cristal2_color_id", valor: 0 },
  { campo: "cristal2_diametro", valor: 0 },
  { campo: "cristal2_od", valor: 0 },
  { campo: "cristal2_oi", valor: 0 },
]);

export const validationNivel3 = signal([
  { campo: "validar_cristal1_od", valor: 0 },
  { campo: "validar_cristal1_oi", valor: 0 },
  { campo: "validar_cristal2_od", valor: 0 },
  { campo: "validar_cristal2_oi", valor: 0 },
  { campo: "validar_armazon1", valor: 0 },
  { campo: "validar_armazon2", valor: 0 },
]);

export const validationBodegaCristales = signal([
  { campo: "validar_cristal1_od", valor: 0 },
  { campo: "validar_cristal1_oi", valor: 0 },
  { campo: "validar_cristal2_od", valor: 0 },
  { campo: "validar_cristal2_oi", valor: 0 },
]);
export const validationBodegaArmazones = signal([
  { campo: "validar_armazon1", valor: 0 },
  { campo: "validar_armazon2", valor: 0 },
]);

export const sumatoriaLevel1 = validationNivel1.value.reduce(
  (index, objeto) => index + objeto.valor,
  0
);

// const camposRequeridos = ['proyecto', 'punto_venta', 'fecha_atencion', 'fecha_entrega_taller'];

// export const checkOptica = camposRequeridos.every(campo => {
//   const campoEncontrado = validationNivel1.value.find((item:any) => item.campo === campo);
//   console.log(campo)
//   console.log(campoEncontrado)
//   return campoEncontrado && campoEncontrado.valor === 1;
// });

export const excelOTValidationStructure = signal([
  ["proyecto", "varchar(20)", "NO", 20, 7],
  ["establecimiento", "int", "NO", null, 9],
  ["cliente", "varchar(10)", "NO", 10, 10],
  ["fecha_atencion", "date", "NO", null, 20],
  ["punto_venta", "int", "NO", null, 24],
  ["cristales1_marca", "int", "YES", null, 56],
  ["cristales1_diseno", "int", "YES", null, 58],
  ["cristales1_indice", "int", "YES", null, 60],
  ["cristales1_material", "int", "YES", null, 62],
  ["cristales1_tratamiento", "int", "YES", null, 64],
  ["cristales1_color", "int", "YES", null, 66],
  ["cristales1_diametro", "int", "YES", null, 68],
]);

// export type DioptriasReceta = {
//     a1_od: { esf: number | any; cil: number | any; eje: number | any; ad: number | any };
//     a1_oi: { esf: number | any; cil: number | any; eje: number | any; ad: number | any };
//     a2_od: { esf: number | any; cil: number | any; eje: number | any };
//     a2_oi: { esf: number | any; cil: number | any; eje: number | any };
//   };

export type DioptriasReceta = {
  [key: string]: {
    esf: number | any;
    cil: number | any;
    eje: number | any;
    ad?: number | any;
  };
};

export const dioptrias_receta: Signal<DioptriasReceta> =
  signal<DioptriasReceta>({
    a1_od: {
      esf: a1_od_esf,
      cil: a1_od_cil,
      eje: a1_od_eje,
      ad: a1_od_ad,
    },
    a1_oi: {
      esf: a1_oi_esf,
      cil: a1_oi_cil,
      eje: a1_oi_eje,
      ad: a1_oi_ad,
    },
    a2_od: {
      esf: a2_od_esf,
      cil: a2_od_cil,
      eje: a2_od_eje,
    },
    a2_oi: {
      esf: a2_oi_esf,
      cil: a2_oi_cil,
      eje: a2_oi_eje,
    },
  });

export const dioptriasHabilitadas = signal({
  a1_ad: false,
  a1_alt: false,
});

export function reiniciarDioptriasReceta() {
  for (const sectionKey in dioptrias_receta.value) {
    const section: any = dioptrias_receta.value[sectionKey];

    for (const subfieldKey in section) {
      section[subfieldKey] = "";
    }
  }
}
export function reiniciarA2DioptriasReceta() {
  dioptrias_receta.value.a1_od.ad = "";

  dioptrias_receta.value.a2_od.esf.value = "";
  dioptrias_receta.value.a2_od.cil.value = "";
  dioptrias_receta.value.a2_od.eje.value = "";

  dioptrias_receta.value.a2_oi.esf.value = undefined;
  dioptrias_receta.value.a2_oi.cil.value = undefined;
  dioptrias_receta.value.a2_oi.eje.value = undefined;
}

export const getDatosOT = (data: any) => {
  CR1_OD_LAB.value =
    data[EnumGrid.cristal1_od_opcion_vta] === "2" ? true : false;
  CR1_OI_LAB.value =
    data[EnumGrid.cristal1_oi_opcion_vta] === "2" ? true : false;
  CR2_OD_LAB.value =
    data[EnumGrid.cristal2_od_opcion_vta] === "2" ? true : false;
  CR2_OI_LAB.value =
    data[EnumGrid.crsital2_oi_opcion_vta] === "2" ? true : false;

  codigoProyecto.value = data[EnumGrid.proyecto_codigo];
  punto_venta.value = data[EnumGrid.punto_venta_id];

  isToggleImpression.value =
    data[EnumGrid.estado_impresion_id] === "1" ? true : false;
  isToggleValidation.value =
    data[EnumGrid.validar_parametrizacion_id] === "1" ? true : false;
  tipo_de_anteojo.value =
    data[EnumGrid.tipo_anteojo_id] && data[EnumGrid.tipo_anteojo_id].toString();

  fecha_atencion_signal.value = data[EnumGrid.fecha_atencion];
  fecha_entrega_taller.value = data[EnumGrid.fecha_entrega_taller];
  fecha_despacho.value = data[EnumGrid.fecha_despacho];
  fecha_entrega_cliente.value = data[EnumGrid.fecha_entrega_cliente];

  cliente_rut.value = data[EnumGrid.cliente_rut];
  oftalmologo_id.value = data[EnumGrid.oftalmologo_id];

  // if(isEditting){
  //   validation_tipo_anteojo()
  // }

  dioptrias_receta.value.a1_od.esf = data[EnumGrid.a1_od_esf];
  dioptrias_receta.value.a1_od.cil = data[EnumGrid.a1_od_cil];
  dioptrias_receta.value.a1_od.eje = data[EnumGrid.a1_od_eje];
  dioptrias_receta.value.a1_od.ad = data[EnumGrid.a1_od_ad];

  dioptrias_receta.value.a1_oi.esf = data[EnumGrid.a1_oi_esf];
  dioptrias_receta.value.a1_oi.cil = data[EnumGrid.a1_oi_cil];
  dioptrias_receta.value.a1_oi.eje = data[EnumGrid.a1_oi_eje];
  dioptrias_receta.value.a1_oi.ad = data[EnumGrid.a1_oi_ad];

  A1_CR_OD.value = data[EnumGrid.cristal1_od];
  A1_CR_OI.value = data[EnumGrid.cristal1_oi];

  // a1_od_esf.value = data[EnumGrid.a1_od_esf]

  // a1_oi_esf.value = data[EnumGrid.a1_oi_esf];

  a2_od_esf.value = data[EnumGrid.a2_od_esf];
  a2_od_cil.value = data[EnumGrid.a2_od_cil];
  a2_od_eje.value = data[EnumGrid.a2_od_eje];

  a2_oi_esf.value = data[EnumGrid.a2_oi_esf];
  a2_oi_cil.value = data[EnumGrid.a2_oi_cil];
  a2_oi_eje.value = data[EnumGrid.a2_oi_eje];

  A1_GRUPO_OD.value = data[EnumGrid.a1_grupo_od];
  A1_GRUPO_OI.value = data[EnumGrid.a1_grupo_oI];
  A2_GRUPO_OD.value = data[EnumGrid.a2_grupo_od];
  A2_GRUPO_OI.value = data[EnumGrid.a2_grupo_oi];

  A1_ALT.value = data[EnumGrid.a1_alt];

  A1_Diametro.value = data[EnumGrid.cristal1_diametro];
  A2_Diametro.value = data[EnumGrid.cristal2_diametro];

  A1_DP.value = data[EnumGrid.a1_dp];
  A2_DP.value = data[EnumGrid.a2_dp];

  a1_armazon.value = data[EnumGrid.a1_armazon_id];
  a2_armazon.value = data[EnumGrid.a2_armazon_id];
  a3_armazon.value = data[EnumGrid.a3_armazon_id];

  A1_CR_OD.value = data[EnumGrid.cristal1_od];
  A1_CR_OI.value = data[EnumGrid.cristal1_oi];
  A2_CR_OD.value = data[EnumGrid.cristal2_od];
  A2_CR_OI.value = data[EnumGrid.cristal2_oi];

  EmpresaAdjudicadaOT_ID.value = data[EnumGrid.empresa_adjudicada_id];
};

export const reiniciarValidationNivel2 = (keepForm?: boolean) => {
  validationNivel2.value.forEach((item) => {
    item.valor = 0;
  });

  if (keepForm) {
    const notClearCampos = new Set([
      "fecha_entrega_taller",
      "fecha_despacho",
      "fecha_entrega_cliente",
    ]);

    validationNivel2.value.forEach((item) => {
      if (notClearCampos.has(item.campo)) {
        item.valor = 1;
      }
    });
    return;
  }
};

export const reiniciarValidationNivel1 = (
  keepForm?: boolean,
  keepArmazon?: boolean
) => {
  validationNivel1.value.forEach((item) => {
    item.valor = 0;
  });

  if (keepForm) {
    if (keepArmazon) {
      const notClearCampos = new Set([
        "proyecto",
        "fecha_atencion",
        "punto_venta_id",
        "fecha_entrega_taller",
        "fecha_despacho",
        "fecha_entrega_cliente",
        "a1_armazon_id",
        "a2_armazon_id",
      ]);

      validationNivel1.value.forEach((item) => {
        if (notClearCampos.has(item.campo)) {
          item.valor = 1;
        }
      });
      return;
    } else {
      const notClearCampos = new Set([
        "proyecto",
        "fecha_atencion",
        "punto_venta_id",
        "fecha_entrega_taller",
        "fecha_despacho",
        "fecha_entrega_cliente",
      ]);

      validationNivel1.value.forEach((item) => {
        if (notClearCampos.has(item.campo)) {
          item.valor = 1;
        }
      });
      return;
    }
  }

  // console.log(validationNivel1)
};
export const reiniciarValidationNivel3 = () => {
  validationNivel3.value.forEach((item) => {
    item.valor = 0;
  });
};

export const clearArmazonesData = () => {
  localStorage.removeItem("a1_armazon");
  localStorage.removeItem("a2_armazon");
  localStorage.removeItem("a3_armazon");
  return;
};

export const actualizarVariable = (name: string, value: any) => {
  // console.log('name', name)
  // console.log('value', value)
  switch (name) {
    case "a1_od_esf":
      a1_od_esf.value = value;
      break;
    default:
      break;
  }
};

export const buscarCampo = (campo: string) => {
  return validationNivel1.value.find((item) => item.campo === campo);
};

export const buscarCampoNivel3 = (campo: string) => {
  return validationNivel3.value.find((item) => item.campo === campo);
};

export const clearGrupos = (keepForm?: boolean) => {
  A1_GRUPO_OD.value = "";
  A1_GRUPO_OI.value = "";
  A2_GRUPO_OD.value = "";
  A2_GRUPO_OI.value = "";

  A1_CR_OD.value = "";
  A1_CR_OI.value = "";
  A2_CR_OD.value = "";
  A2_CR_OI.value = "";

  A1_DP.value = "";
  A2_DP.value = "";
  A1_ALT.value = "";

  CR1_OD_LAB.value = false;
  CR1_OI_LAB.value = false;
  CR2_OD_LAB.value = false;
  CR2_OI_LAB.value = false;

  validar_armazon1.value = "";
  validar_armazon2.value = "";
  validar_cristal1_od.value = "";
  validar_cristal1_oi.value = "";
  validar_cristal2_od.value = "";
  validar_cristal2_oi.value = "";

  a1_armazon.value = "";
  a2_armazon.value = "";
  a3_armazon.value = "";

  A1_Diametro.value = "";
  A2_Diametro.value = "";

  oftalmologo_id.value = "";
  secondProcessBodega.value = false;

  motivo_ot.value = false;
  isExistClient.value = false;
  isToggleImpression.value = false;
  isToggleValidation.value = false;
  validacionIncompleta.value = {
    check: false,
    a1_od: false,
    a1_oi: false,
    a2_od: false,
    a2_oi: false,
  };
  countError.value = 0;
  numero_worktracking.value = "";
  inputOnlyReadReserva.value = false;
  validar_parametrizacion.value = "1";
  numero_receta.value = "";
  EmpresaAdjudicadaOT_ID.value = 0;
  tipo_anteojo_title.value = "";
  tipo_anteojo_title_cristal2.value = "";

  if (keepForm === true) {
    codigoProyecto.value = codigoProyecto.value;
  } else {
    codigoProyecto.value = "";
  }
};

export const validarNumeroDocumento = (data: any) => {
  if (!data) {
    return toast.error("No hay información de OT");
  }

  const reporte_firma = data[EnumGrid.numero_reporte_firma];
  const numero_envio = data[EnumGrid.numero_envio];

  const numero_guia = data[EnumGrid.numero_guia];

  const reporteFirma = parseInt(reporte_firma) > 0;
  const numeroEnvio = parseInt(numero_envio) > 0;
  const numeroGuia = numero_guia !== null && parseInt(numero_guia) > 0;

  const confirmarContinuar = (mensaje: string, type: number) => {
    const response = confirm(mensaje);
    if (!response) {
      return;
    }
    if (!numeroGuia && type === 1) {
      const responseGuia = confirm(
        `Folio:${
          data?.[EnumGrid.folio]
        } debe tener asignado un número de Guía, ¿está seguro de continuar igualmente?`
      );
      return responseGuia;
    }
    return response;
  };
  if ((numeroEnvio && !reporteFirma) || (!numeroEnvio && reporteFirma)) {
    if (!numeroGuia) {
      return confirmarContinuar(
        `Folio:${
          data?.[EnumGrid.folio]
        } debe tener asignado un número de Guía, ¿está seguro de continuar igualmente?`,
        2
      );
    }
  } else {
    return confirmarContinuar(
      `Folio:${
        data?.[EnumGrid.folio]
      } debe tener Numero de envío o Reporte de Fírmas, ¿está seguro de continuar igualmente?`,
      1
    );
  }
};

// export const  validarNumeroDocumento = (data:any) => {
//     if(!data){
//       return toast.error('No hay informacion de OT')
//     }

//     const reporte_firma = data[EnumGrid.numero_reporte_firma]
//     const numero_envio  = data[EnumGrid.numero_envio]
//     const numero_guia   = data[EnumGrid.numero_guia]

//     let reporteFirma = parseInt(reporte_firma) > 0;
//     let numeroEnvio  = parseInt(numero_envio)  > 0;

//     let numeroGuia = (numero_guia !== null && parseInt(numero_guia) > 0 ) ? true : false

//     if ((numeroEnvio && !reporteFirma) || (!numeroEnvio && reporteFirma)) {
//       if(!numeroGuia){
//         const response = confirm(`Folio:${data?.[EnumGrid.folio]} debe tener asignado un número de Guía, ¿está segúro de continuar igualmente?`)
//         if(!response){
//           return false
//         }
//       }
//       return true
//     }else{
//       const response = confirm(`Folio: ${data?.[EnumGrid.folio]} debe tener Numero de envío o Reporte de Fírmas, ¿está segúro de continuar igualmente?`)
//       if(response){
//           if(!numeroGuia){
//             const response = confirm(`Folio:${data?.[EnumGrid.folio]} debe tener asignado un número de Guía, ¿está segúro de continuar igualmente?`)
//             if(!response){
//               return false
//             }
//           return true
//         }
//       }
//       return false
//     }
// }

export const clearDioptrias = (closeForm?: boolean) => {
  (a1_od_esf.value = undefined),
    (a1_od_cil.value = undefined),
    (a1_od_eje.value = undefined),
    (a1_od_ad.value = undefined),
    (a1_oi_eje.value = undefined),
    (a1_oi_cil.value = undefined),
    (a1_oi_eje.value = undefined),
    (a1_oi_ad.value = undefined),
    (a2_od_esf.value = undefined),
    (a2_od_cil.value = undefined),
    (a2_od_eje.value = undefined),
    (a2_oi_esf.value = undefined),
    (a2_oi_cil.value = undefined),
    (a2_oi_eje.value = undefined);

  tipo_de_anteojo.value = "";
  validar_parametrizacion.value = "1";

  if (!closeForm) {
    console.log("render");
    codigoProyecto.value = "";
    fecha_atencion_signal.value = "";
    fecha_despacho.value = "";
    fecha_entrega_cliente.value = "";
    fecha_entrega_taller.value = "";
  }

  dioptriasHabilitadas.value.a1_ad = true;
  dioptriasHabilitadas.value.a1_alt = true;
};

export const clearDioptriasA2 = (valor: any) => {
  const campos = [
    "a2_od_esf",
    "a2_od_cil",
    "a2_od_eje",
    "a2_oi_esf",
    "a2_oi_cil",
    "a2_oi_eje",
  ];

  // console.log(valor)
  campos.forEach((campo) => {
    const elemento = buscarCampo(campo);
    if (elemento) {
      elemento.valor = valor;
    }
  });

  // console.log(validationNivel2.value)
};

// export const clearInputDioptrias = () => {
//      //? A1-OJO-DERECHO
//      dioptrias_receta.value.a1_od.esf = " ";
//      dioptrias_receta.value.a1_od.cil = " ";
//      dioptrias_receta.value.a1_od.eje = " ";
//      dioptrias_receta.value.a1_od.ad  = " ";

//      dioptrias_receta.value.a1_oi.esf  = " ";
//      dioptrias_receta.value.a1_oi.cil  = " ";
//      dioptrias_receta.value.a1_oi.eje  = " ";
//      dioptrias_receta.value.a1_oi.ad   = " ";

//      //? A2-OJO-DERECHO
//      a2_od_esf.value = "  ";
//      a2_od_cil.value = "  ";
//      a2_od_eje.value = "  ";

//      a2_oi_esf.value = "  ";
//      a2_oi_cil.value = "  ";
//      a2_oi_eje.value = "  ";

//      //TODO: VALIDACION DE CAMPOS
//      validation_A1_OD_ESF(undefined);
//      validation_A1_OD_CILL(undefined);
//      validation_A1_OD_EJE(undefined);
//      validation_A1_OD_AD(undefined);

//      validation_A1_OI_ESF(undefined);
//      validation_A1_OI_CIL(undefined);
//      validation_A1_OI_EJE(undefined);

//      validation_A1_ALT(undefined);
//      validation_A1_DP(undefined);

//      validation_A2_OD_ESF(undefined);
//      validation_A2_OD_CIL(undefined);
//      validation_A2_OD_EJE(undefined);

//      validation_A2_OI_ESF(undefined);
//      validation_A2_OI_CIL(undefined);
//      validation_A2_OI_EJE(undefined);

//      validation_A2_DP(undefined);
// }

export function validarValor(str: string) {
  const partes = str.split("=");

  if (partes.length === 2) {
    const valor = partes[1].trim();
    return valor !== "undefined" && valor !== "";
  }

  return false;
}

export const fetchFechas = async (
  fecha_atencion: string,
  codgioProyecto: string
) => {
  // console.log('ejecutando')
  try {
    console.log(fecha_atencion);
    console.log(codgioProyecto);
    if (!codigoProyecto.value) {
      return;
    }
    const { data } = await axios(
      `${URLBackend}/api/ot/listado/?query=11&_proyecto=${codgioProyecto}&_fecha_desde=${fecha_atencion}`
    );

    if (data && data[0] === undefined) {
      return;
    }

    const parsedData = JSON.parse(data[0]); // Parsear la cadena JSON a objeto

    fecha_atencion_signal.value = fecha_atencion;
    fecha_entrega_taller.value = parsedData.fecha_entrega_taller;
    fecha_despacho.value = parsedData.fecha_despacho;
    fecha_entrega_cliente.value = parsedData.fecha_entrega_cliente;

    validationFechaEntregaCliente(fecha_entrega_cliente.value);
    validationFechaDespacho(fecha_despacho.value);
    validationFechaEntregaTaller(fecha_entrega_taller.value);

    return data;
  } catch (error) {
    // console.log('fetchFechasError:', error);
    throw error;
  }
};

type InputChangeActions = {
  [key: string]: (data: any) => void;

  // Especifica las claves permitidas y sus tipos de función si conoces la estructura exacta
  a1_armazon_id: (data: any) => void;
  a2_armazon_id: (data: any) => void;
  a3_armazon_id: (data: any) => void;
  tipo_anteojo_id: (data: any) => void;
  proyecto_codigo: (data: any) => void;
  punto_venta_id: (data: any) => void;
};

//TODO: ESTRUCTURA QUE SE EJECUTA EN CADA CHANGE DE LOS INPUT
export const inputChangeActions: InputChangeActions = {
  worktracking: (data: any) => {
    numero_worktracking.value = Object.values(data)[0] as string;
  },
  numero_receta: (data: any): void => {
    numero_receta.value = Object.values(data)[0] as string;
  },
  cristal1_od: (data: any) => {
    A1_CR_OD.value = Object.values(data)[0] as string;
  },
  cristal1_oi: (data: any) => {
    A1_CR_OI.value = Object.values(data)[0] as string;
  },
  cristal2_od: (data: any) => {
    A2_CR_OD.value = Object.values(data)[0] as string;
  },
  cristal2_oi: (data: any) => {
    A2_CR_OI.value = Object.values(data)[0] as string;
  },
  a1_alt: (data: any) => {
    A1_ALT.value = Object.values(data)[0] as any;
  },
  a1_dp: (data: any) => {
    A1_DP.value = Object.values(data)[0] as string;
  },
  a2_dp: (data: any) => {
    A2_DP.value = Object.values(data)[0] as string;
  },
  oftalmologo_id: (data: any) => {
    oftalmologo_id.value = Object.values(data)[0] as string;
  },
  cristal1_diametro: (data: any) => {
    A1_Diametro.value = Object.values(data)[0] as string;
  },
  cristal2_diametro: (data: any) => {
    A2_Diametro.value = Object.values(data)[0] as string;
  },
  a1_armazon_id: (data: any) => {
    a1_armazon.value = Object.values(data)[0] as string;
  },
  a2_armazon_id: (data: any) => {
    a2_armazon.value = Object.values(data)[0] as string;
  },
  a3_armazon_id: (data: any) => {
    a3_armazon.value = Object.values(data)[0] as string;
  },
  tipo_anteojo_id: (data: any) => {
    tipo_de_anteojo.value = Object.values(data)[0] as string;
    // tipo_anteojo_title.value = Object.values(data)[1] as string;
    // clearInputDioptrias()
    validation_tipo_anteojo();
  },
  proyecto_codigo: (data: any) => {
    codigoProyecto.value = Object.values(data)[0] as string;
  },
  punto_venta_id: (data: any) => {
    punto_venta.value = Object.values(data)[0] as string;
  },
};

//TODO:  ESTRUCTURA PARA TRAER CODIGOS DE CRISTALES + GRUPO DE ANTEOJO 1

export const updateOT = async (
  jsonData: any,
  _origen: any,
  _destino: any,
  _estado: any,
  _formValues: any,
  data: any,
  cristalOri: any,
  armazonOri: any,
  user: any,
  _obs?: string,
  isMasivo?: boolean,
  situacion?: any,
  isValidateBodega?: boolean,
  tipo_evento?: string,
  validation_Complete?: boolean,
  p1?: any
) => {
  // let usuarioData =
  //   tipo_evento === "Procesada"
  //     ? data["usuario_id"]
  //     : parseInt(data[EnumGrid.usuario_id]);

  // if ((areaActualOT.value as any) === 50) {
  //   if (usuarioData !== parseInt(user)) {
  //     return toast.error(
  //       `Folio ${data[EnumGrid.folio]} no pertenece al Usuario`
  //     );
  //   }
  // }

  // const toastLoading = toast.loading('Cargando...');
  // let folio = data?.[EnumGrid.folio]
  let motivo = data && data[EnumGrid.motivo] === "Garantía" ? 2 : 1;

  //TODO: INICIO PROCESAR MASIVO
  if (isMasivo) {
    const amrazones =
      data.tipo_anteojo === 3 ? data.armazones : data.armazones.shift();

    console.log(_origen);
    const strP1 =
      tipo_evento === "Derivar"
        ? `area="${_destino}", estado="${_estado}",ubicacion=""`
        : `area="${_destino}", estado="${_estado}"`;

    const query = {
      query: "04",
      _p1: `${p1 === "" || p1 === undefined ? strP1 : `${strP1}, ${p1}`}`,
      // _p1: `${
      //   p1 === "" || p1 === undefined
      //     ? `area="${_destino}", estado="${_estado}",ubicacion=""`
      //     : `area="${_destino}", estado="${_estado}",ubicacion="", ${p1}`
      // }`,
      _p2: isValidateBodega
        ? `${data[OTGrillaEnum.tipo_anteojo_id]}`
        : data && data.tipo_anteojo.toString(),
      _p3: "",
      _proyecto: isValidateBodega
        ? `${data[OTGrillaEnum.proyecto_titulo]}`
        : data && data.proyecto_codigo,
      _folio: isValidateBodega
        ? `${data[OTGrillaEnum.folio]}`
        : `${data && data.folio}`,
      _origen: _origen.toString(),
      _rut: ``,
      _destino: _destino.toString(),
      _estado: _estado || "20",
      _usuario: `${user}`,
      _situacion: situacion || "0",
      _obs: _obs || "",
      _punto_venta: isValidateBodega
        ? `${data[OTGrillaEnum.punto_venta]}`
        : `${data.punto_venta}`,
      _cristalJSONOri: isValidateBodega
        ? JSON.stringify(cristalOri)
        : JSON.stringify(data.cristales.filter((ot: any) => ot.codigo !== " ")),
      _armazonJSONOri: isValidateBodega
        ? JSON.stringify(armazonOri)
        : JSON.stringify(amrazones),
      // _cristalJSONNew: [],
      // _cristalJSONNew: isValidateBodega
      //   ? JSON.stringify(cristalOri)
      //   : JSON.stringify(data.cristales.filter((ot: any) => ot.codigo !== " ")),
      // _armazonJSONNew: [],
      _motivo: `${motivo}`,
    };

    console.log(query);

    try {
      const response = await axios.post(`${URLBackend}/api/ot/editar/`, query);

      if (response.status === 200) {
        // toast.dismiss(toastLoading)
        // return toast.success(`OT ${tipo_evento} Correctamente, Folio:  ${ isValidateBodega ? data[EnumGrid.folio] : data.folio}`,{
        //   autoClose: 1000
        // })
      } else {
        // toast.dismiss(toastLoading)
        return toast.error("Error al Editar OT");
      }
    } catch (error) {
      // toast.dismiss(toastLoading)
      return toast.error(error as any);
    }
    return;
  }
  //TODO: FIN PROCESAR MASIVO

  // let estado_impresion = data && data[EnumGrid.estado_impresion_id];
  // let validar_parametrizacion =
  //   data && data[EnumGrid.validar_parametrizacion_id];

  let estado_validacion = validation_Complete === true ? 2 : 1;

  console.log(estado_validacion);

  let _p3 = "";

  console.log(jsonData);

  console.log(jsonData.cristal2_tratamiento_adicional_id);
  console.log(_formValues);
  console.log(_formValues["optica"] && _formValues["optica"]["Resolución"]);

  console.log(
    `resolucion_garantia=${
      _formValues["optica"] && _formValues["optica"]["resolucion"] !== undefined
        ? _formValues["optica"]["resolucion"] === "Aceptada"
          ? 1
          : _formValues["optica"]["resolucion"] === "Rechazada"
          ? 2
          : 0
        : data && data[EnumGrid.resolucion_garantia_id]
        ? data && data[EnumGrid.resolucion_garantia_id]
        : 0
    }`
  );
  const toastLoading = toast.loading("Cargando...");

  const fields = [
    `motivo=${motivo}`,
    `area=${_destino}`,
    `estado=${_estado}`,
    `validar_parametrizacion="${
      isToggleValidation.value === true ? "1" : "0"
    }"`,
    `estado_impresion="${isToggleImpression.value === true ? "1" : "0"}"`,
    `proyecto="${
      jsonData.proyecto_codigo !== undefined
        ? jsonData.proyecto_codigo
        : codigoProyecto.value
    }"`,
    `establecimiento=${
      data && data[EnumGrid.establecimiento_id] !== undefined
        ? data[EnumGrid.establecimiento_id]
        : 0
    }`,
    `cliente="${!cliente_rut.value.trim() === false ? cliente_rut.value : ""}"`,
    `fecha_atencion="${
      !fecha_atencion_signal.value.trim() === false
        ? fecha_atencion_signal.value
        : ""
    }"`,
    `fecha_entrega_taller="${
      !fecha_entrega_taller.value.trim() === false
        ? fecha_entrega_taller.value
        : ""
    }"`,
    `fecha_despacho="${
      !fecha_despacho.value.trim() === false ? fecha_despacho.value : ""
    }"`,
    `fecha_entrega_cliente="${
      !fecha_entrega_cliente.value.trim() === false
        ? fecha_entrega_cliente.value
        : ""
    }"`,
    `punto_venta=${
      jsonData.punto_venta_id !== undefined
        ? jsonData.punto_venta_id
        : data[EnumGrid.punto_venta_id]
    }`,
    `numero_receta=${
      data && data[EnumGrid.numero_receta] !== undefined
        ? data[EnumGrid.numero_receta]
        : 0
    }`,
    `fecha_receta="${
      jsonData.fecha_receta !== undefined ? jsonData.fecha_receta : ""
    }"`,
    `tipo_anteojo=${
      !tipo_de_anteojo.value === false ? tipo_de_anteojo.value : 0
    }`,
    `a1_od_esf=${
      typeof dioptrias_receta.value.a1_od.esf !== "object" &&
      !Number.isNaN(dioptrias_receta.value.a1_od.esf)
        ? dioptrias_receta.value.a1_od.esf
        : null
    }`,
    `a1_od_cil=${
      typeof dioptrias_receta.value.a1_od.cil !== "object" &&
      !Number.isNaN(dioptrias_receta.value.a1_od.cil)
        ? dioptrias_receta.value.a1_od.cil
        : null
    }`,
    `a1_od_eje=${
      typeof dioptrias_receta.value.a1_od.eje !== "object" &&
      !Number.isNaN(dioptrias_receta.value.a1_od.eje)
        ? dioptrias_receta.value.a1_od.eje
        : null
    }`,
    `a1_od_ad =${
      tipo_de_anteojo.value === "3"
        ? typeof dioptrias_receta.value.a1_od.ad !== "object" &&
          !Number.isNaN(dioptrias_receta.value.a1_od.ad)
          ? dioptrias_receta.value.a1_od.ad
          : 0
        : typeof dioptrias_receta.value.a1_od.ad !== "object" &&
          !Number.isNaN(dioptrias_receta.value.a1_od.ad)
        ? dioptrias_receta.value.a1_od.ad
        : 0
    }`,
    `a1_oi_esf=${
      typeof dioptrias_receta.value.a1_oi.esf !== "object" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.esf)
        ? dioptrias_receta.value.a1_oi.esf
        : null
    }`,
    `a1_oi_cil=${
      typeof dioptrias_receta.value.a1_oi.cil !== "object" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.cil)
        ? dioptrias_receta.value.a1_oi.cil
        : null
    }`,
    `a1_oi_eje=${
      typeof dioptrias_receta.value.a1_oi.eje !== "object" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.eje)
        ? dioptrias_receta.value.a1_oi.eje
        : null
    }`,
    `a1_oi_ad =${
      typeof dioptrias_receta.value.a1_oi.ad !== "object" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.ad)
        ? dioptrias_receta.value.a1_oi.ad
        : null
    }`,
    `a1_dp=${
      _formValues &&
      _formValues["receta"] &&
      _formValues["receta"]["a1_dp"] !== undefined
        ? _formValues["receta"] && parseInt(_formValues["receta"]["a1_dp"])
        : data && data[EnumGrid.a1_dp]
    }`,
    `a1_alt=${
      _formValues &&
      _formValues["receta"] &&
      _formValues["receta"]["a1_alt"] !== undefined
        ? _formValues["receta"] && parseInt(_formValues["receta"]["a1_alt"])
        : data && data[EnumGrid.a1_alt]
    }`,
    `a1_grupo_od="${
      typeof A1_GRUPO_OD.value !== "object" ? A1_GRUPO_OD.value : ""
    }"`,
    `a1_grupo_oI="${
      typeof A1_GRUPO_OI.value !== "object" ? A1_GRUPO_OI.value : ""
    }"`,

    `a2_od_esf=${typeof a2_od_esf.value !== "object" ? a2_od_esf.value : null}`,
    `a2_od_cil=${typeof a2_od_cil.value !== "object" ? a2_od_cil.value : null}`,
    `a2_od_eje=${typeof a2_od_eje.value !== "object" ? a2_od_eje.value : null}`,
    `a2_oi_esf=${typeof a2_oi_esf.value !== "object" ? a2_oi_esf.value : null}`,
    `a2_oi_cil=${typeof a2_oi_cil.value !== "object" ? a2_oi_cil.value : null}`,
    `a2_oi_eje=${typeof a2_oi_eje.value !== "object" ? a2_oi_eje.value : null}`,
    `a2_dp=${
      _formValues &&
      _formValues["receta"] &&
      _formValues["receta"]["a2_dp"] !== undefined
        ? _formValues["receta"] && parseInt(_formValues["receta"]["a2_dp"])
        : data && data[EnumGrid.a2_dp]
    }`,
    `a2_grupo_od="${
      typeof A2_GRUPO_OD.value !== "object" ? A2_GRUPO_OD.value : ""
    }"`,
    `a2_grupo_oI="${
      typeof A2_GRUPO_OI.value !== "object" ? A2_GRUPO_OI.value : ""
    }"`,
    `anteojo1_armazon="${
      typeof a1_armazon.value !== "object" ? a1_armazon.value : ""
    }"`,
    `anteojo2_armazon="${
      typeof a2_armazon.value !== "object" ? a2_armazon.value : ""
    }"`,
    `anteojo3_armazon="${
      typeof a3_armazon.value !== "object" ? a3_armazon.value : ""
    }"`,
    `cristales1_marca=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_marca_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal1_marca_id"])
        : data && data[EnumGrid.cristal1_marca_id]
    }`,
    `cristales1_diseno=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_diseno_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal1_diseno_id"])
        : data && data[EnumGrid.cristal1_diseno_id]
    }`,
    `cristales1_indice=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_indice_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal1_indice_id"])
        : data && data[EnumGrid.cristal1_indice_id]
    }`,
    `cristales1_material=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_material_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal1_material_id"])
        : data && data[EnumGrid.cristal1_material_id]
    }`,
    `cristales1_tratamiento=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_tratamiento_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal1_tratamiento_id"])
        : data && data[EnumGrid.cristal1_tratamiento_id]
    }`,
    `cristales1_color=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_color_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal1_color_id"])
        : data && data[EnumGrid.cristal1_color_id]
    }`,
    `cristales1_diametro=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_diametro"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal1_diametro"])
        : data && data[EnumGrid.cristal1_diametro]
    }`,
    `cristales1_od="${
      typeof A1_CR_OD.value !== "object" ? A1_CR_OD.value : jsonData.cristal1_od
    }"`,
    `cristales1_oi="${
      typeof A1_CR_OI.value !== "object" ? A1_CR_OI.value : jsonData.cristal1_oi
    }"`,
    `cristales1_tratamiento_adicional="${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal1_tratamiento_adicional_id"] !==
        undefined
        ? _formValues["cristales"] &&
          _formValues["cristales"]["cristal1_tratamiento_adicional_id"] === ""
          ? _formValues["cristales"]["cristal1_tratamiento_adicional_id"]
          : parseInt(
              _formValues["cristales"]["cristal1_tratamiento_adicional_id"]
            )
        : data && data[EnumGrid.cristal1_tratamiento_adicional_id]
    }"`,
    `cristales2_marca=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_marca_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal2_marca_id"])
        : data && data[EnumGrid.cristal2_marca_id]
    }`,
    `cristales2_diseno=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_diseno_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal2_diseno_id"])
        : data && data[EnumGrid.cristal2_diseno_id]
    }`,
    `cristales2_indice=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_indice_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal2_indice_id"])
        : data && data[EnumGrid.cristal2_indice_id]
    }`,
    `cristales2_material=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_material_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal2_material_id"])
        : data && data[EnumGrid.cristal2_material_id]
    }`,
    `cristales2_tratamiento=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_tratamiento_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal2_tratamiento_id"])
        : data && data[EnumGrid.cristal2_tratamiento_id]
    }`,
    `cristales2_color=${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_color_id"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal2_color_id"])
        : data && data[EnumGrid.cristal2_color_id]
    }`,
    `cristales2_diametro="${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_diametro"] !== undefined
        ? _formValues["cristales"] &&
          parseInt(_formValues["cristales"]["cristal2_diametro"])
        : data && data[EnumGrid.cristal2_diametro]
    }"`,
    `cristales2_od="${
      A2_CR_OD.value.trim() === ""
        ? ""
        : A2_CR_OD.value.trim() ||
          (_formValues["cristales"] &&
            parseInt(_formValues["cristales"]["cristal2_od"]))
    }"`,
    `cristales2_oi="${
      A2_CR_OI.value.trim() === ""
        ? ""
        : A2_CR_OI.value.trim() ||
          (_formValues["cristales"] &&
            parseInt(_formValues["cristales"]["cristal2_oi"]))
    }"`,
    `cristales2_tratamiento_adicional="${
      _formValues &&
      _formValues["cristales"] &&
      _formValues["cristales"]["cristal2_tratamiento_adicional_id"] !==
        undefined
        ? _formValues["cristales"] &&
          _formValues["cristales"]["cristal2_tratamiento_adicional_id"] === ""
          ? _formValues["cristales"]["cristal2_tratamiento_adicional_id"]
          : parseInt(
              _formValues["cristales"]["cristal2_tratamiento_adicional_id"]
            )
        : data && data[EnumGrid.cristal2_tratamiento_adicional_id]
    }"`,
    `motivo_garantia=${
      data && data[EnumGrid.motivo_garantia_id]
        ? data && data[EnumGrid.motivo_garantia_id]
        : 0
    }`,
    `folio_asociado="${
      data && data[EnumGrid.folio_asociado]
        ? data && data[EnumGrid.folio_asociado]
        : ""
    }"`,
    // (`resolucion_garantia=${data && data[EnumGrid.resolucion_garantia_id]                                                                                !== undefined ? (jsonData.resolucion_garantia_id === 'Rechazada' ? 2 :1) : 0 }`),
    `resolucion_garantia=${
      data && data[EnumGrid.motivo] === "Venta" ? 0 : 1
      // : _formValues["optica"] &&
      //   _formValues["optica"]["Resolución"] !== undefined
      // ? _formValues["optica"]["Resolución"] === "Aceptada"
      //   ? 1
      //   : _formValues["optica"]["Resolución"] === "Rechazada"
      //   ? 2
      //   : 0
      // : data && data[EnumGrid.resolucion_garantia_id]
      // ? data && data[EnumGrid.resolucion_garantia_id]
      // : 0
    }`,
    `worktracking="${
      numero_worktracking.value.trim() === ""
        ? data && data[EnumGrid.worktracking]
        : numero_worktracking.value
    }"`,
    `nota_venta="${
      data && data[EnumGrid.nota_venta] ? data && data[EnumGrid.nota_venta] : ""
    }"`,
    `numero_reporte_firma=${
      data && data[EnumGrid.numero_reporte_firma]
        ? data && data[EnumGrid.numero_reporte_firma]
        : 0
    }`,
    `numero_reporte_atencion=${
      data && data[EnumGrid.numero_reporte_atencion]
        ? data && data[EnumGrid.numero_reporte_atencion]
        : 0
    }`,
    `numero_oc="${
      data && data[EnumGrid.numero_oc] ? data && data[EnumGrid.numero_oc] : ""
    }"`,
    `numero_guia=${
      data && data[EnumGrid.numero_guia]
        ? data && data[EnumGrid.numero_guia]
        : 0
    }`,
    `numero_factura=${
      data && data[EnumGrid.numero_factura]
        ? data && data[EnumGrid.numero_factura]
        : 0
    }`,
    `folio_interno_mandante="${
      data && data[EnumGrid.folio_interno_mandante]
        ? data && data[EnumGrid.folio_interno_mandante]
        : ""
    }"`,
    `reporte_interno_mandante="${
      data && data[EnumGrid.reporte_interno_mandante]
        ? data && data[EnumGrid.reporte_interno_mandante]
        : ""
    }"`,
    `observaciones="${
      _formValues["receta"] && _formValues["receta"]["observaciones"]
        ? _formValues["receta"]["observaciones"]
        : data && data[EnumGrid.observaciones]
    }"`,
    `estado_validacion="${estado_validacion}"`,
    `cristales1_od_opcion_vta="${CR1_OD_LAB.value === true ? "2" : "1"}"`,
    `cristales1_oi_opcion_vta="${CR1_OI_LAB.value === true ? "2" : "1"}"`,
    `cristales2_od_opcion_vta="${CR2_OD_LAB.value === true ? "2" : "1"}"`,
    `cristales2_oi_opcion_vta="${CR2_OI_LAB.value === true ? "2" : "1"}"`,
    `ubicacion="${
      tipo_evento === "Derivar" ? "" : data && data[EnumGrid.ot_ubicacion]
    }"`,
  ];

  const cristales = [
    { codigo: `${A1_CR_OD.value}` },
    { codigo: `${A1_CR_OI.value}` },
    { codigo: `${A2_CR_OD.value}` },
    { codigo: `${A2_CR_OI.value}` },
  ]
    .map((item) => {
      const numero = parseFloat(item.codigo);
      if (!isNaN(numero) && numero !== 0 && numero !== null) {
        return { codigo: `${numero}` };
      }
      return null;
    })
    .filter((item) => item !== null);

  const _cristalJSONNew = JSON.stringify(cristales);
  const armazones = [
    { codigo: `${a1_armazon.value}` },
    { codigo: `${a2_armazon.value}` },
  ]
    .map((item) => {
      const numero = parseFloat(item.codigo);
      if (!isNaN(numero) && numero !== 0 && numero !== null) {
        return { codigo: `${numero}` };
      }
      return null;
    })
    .filter((item) => item !== null);

  const _armazonJSONNew = JSON.stringify(armazones);

  console.log(data && data[EnumGrid.motivo]);

  console.log(tipo_evento);
  console.log(
    fields
      .map((a) => a.split("="))
      .filter((prev) => prev[0] !== "resolucion_garantia")
  );

  let filteredFields = fields
    .map((a) => a.split("="))
    .filter((prev) => prev[1] !== "undefined")
    .map((parts) => parts.join("="));

  // let filteredFieldsSinResolucion: any = [];

  // if (data && data[EnumGrid.motivo] === "Garantía") {
  //   if (tipo_evento === "Pausada") {
  //     filteredFieldsSinResolucion = filteredFields
  //       .map((a) => a.split("="))
  //       .filter((a) => a[0] !== "resolucion_garantia")
  //       .map((parts) => parts.join("="));
  //   }
  // }

  // let _p1 =
  //   tipo_evento === "Pausada"
  //     ? filteredFieldsSinResolucion.join(",")
  //     : filteredFields.join(",");

  let _p1 = filteredFields.join(",");

  _p1 = _p1.replace(/'/g, "!");

  console.log(_p1);

  console.log(armazonOri);
  console.log(cristalOri);
  const query = {
    query: "04",
    _p1,
    _p2: tipo_de_anteojo.value.toString(),
    _p3: _p3 || "",
    _proyecto: `${codigoProyecto.value}`,
    _folio: `${data && data[EnumGrid.folio]}`,
    _origen: _origen.toString(),
    _rut: `${cliente_rut.value}`,
    _destino: _destino.toString(),
    _estado: _estado.toString(),
    _usuario: user,
    _situacion: situacion || "0",
    _obs: _obs ? _obs : "",
    _cristalJSONNew,
    _armazonJSONNew,
    _punto_venta: `${jsonData.punto_venta_id || data[EnumGrid.punto_venta_id]}`,
    _motivo: `${motivo}`,
    _cristalJSONOri: JSON.stringify(cristalOri),
    _armazonJSONOri: JSON.stringify(armazonOri),
  };

  try {
    const response = await axios.post(`${URLBackend}/api/ot/editar/`, query);
    console.log(response);
    if (response.status === 200) {
      toast.dismiss(toastLoading);
      return toast.success(`OT ${tipo_evento} Correctamente`, {
        autoClose: 1000,
      });
    } else {
      toast.dismiss(toastLoading);

      return toast.error("Error al Editar OT");
    }
  } catch (error) {
    toast.dismiss(toastLoading);
  }
};

// {
//   query: '04',
//   _p1:
//     'motivo=1,area=70,estado=20,validar_parametrizacion="0",estado_impresion="",proyecto="",establecimiento=109,cliente="",fecha_atencion="",fecha_entrega_taller="",fecha_despacho="",fecha_entrega_cliente="",punto_venta=10,numero_receta=1301,fecha_receta="",tipo_anteojo=0,a1_od_esf=null,a1_od_cil=null,a1_od_eje=null,a1_oi_esf=null,a1_oi_cil=null,a1_oi_eje=null,a1_oi_ad =null,a1_dp=60,a1_alt=0,a1_grupo_od="",a1_grupo_oI="",a2_dp=52,a2_grupo_od="",a2_grupo_oI="",anteojo1_opcion_vta=0,anteojo1_armazon="",anteojo2_opcion_vta=0,anteojo2_armazon="",anteojo3_opcion_vta=0,anteojo3_armazon="",cristales1_opcion_vta=0,cristales1_marca=1,cristales1_diseno=1,cristales1_indice=2,cristales1_material=1,cristales1_tratamiento=1,cristales1_color=1,cristales1_diametro=65,cristales1_od="",cristales1_oi="",cristales1_tratamiento_adicional=0,cristales2_opcion_vta=0,cristales2_marca=0,cristales2_diseno=0,cristales2_indice=0,cristales2_material=0,cristales2_tratamiento=0,cristales2_color=0,cristales2_od="",cristales2_oi="0",cristales2_tratamiento_adicional=0,motivo_garantia=0,folio_asociado="",resolucion_garantia=0,worktracking="0",nota_venta="0",numero_reporte_firma=0,numero_reporte_atencion=0,numero_oc="0",numero_guia=1800,numero_factura=1301,folio_interno_mandante="8769",reporte_interno_mandante="0",observaciones="0"',
//   _p2: '',
//   _p3: '',
//   _proyecto: '',
//   _folio: '3188',
//   _origen: '60',
//   _rut: '',
//   _destino: '70',
//   _estado: '20',
//   _usuario: '98',
//   _situacion: '0',
//   _obs: '',
//   _cristalJSONNew: '[]',
//   _armazonJSONNew: '[]',
//   _punto_venta: '10',
//   _motivo: '1',
//   _cristalJSONOri:
//     '"[{\"codigo\":\"100010001680\"},{\"codigo\":\"100010003240\"}]"',
//   _armazonJSONOri: '"[{\"codigo\":\"20000001001\"}]"'
// }

export function formatNumberWithZeros(inputNumber: number): string {
  // Convierte el número a cadena y obtén su longitud
  console.log(inputNumber);
  const numberString = String(inputNumber);
  const length = numberString.length;

  // Calcula la cantidad de ceros necesarios
  const zerosToAdd = Math.max(0, 10 - length);

  // Concatena los ceros a la izquierda y el número original
  const formattedNumber = "0".repeat(zerosToAdd) + numberString;

  console.log(formattedNumber);

  return formattedNumber;
}

export const validateSameUserImpresionOT = async (user: any, folio: any) => {
  try {
    const { data } = await axios(
      `${URLBackend}/api/ot/imprimir/?query=02&_origen=50&_p1=${folio}`
    );
    console.log(user);
    console.log(data);

    if (user === data[0][EnumGrid.usuario_id]) {
      console.log("render");
      return true;
    } else {
      console.log("render");
      return false;
    }
  } catch (error) {
    return false;
  }
};

// export const getGrupoDiopptria_a1 = async(getValues:any) => {
//   const formValue = getValues()
//     const {cristal1_marca_id, cristal1_diseno_id, cristal1_indice_id, cristal1_color_id , cristal1_material_id,cristal1_tratamiento_id } = formValue;

//     // console.log(A1_Diametro.value)

//     if(cristal1_marca_id                      !== undefined &&
//       cristal1_diseno_id                      !== undefined &&
//       cristal1_indice_id                      !== undefined &&
//       cristal1_color_id                       !== undefined &&
//       cristal1_material_id                    !== undefined &&
//       cristal1_tratamiento_id                 !== undefined &&
//       A1_Diametro.value                       !== ''        &&
//       dioptrias_receta.value.a1_od.esf        !== ' '       &&
//       dioptrias_receta.value.a1_od.cil        !== ' '       &&
//       dioptrias_receta.value.a1_oi.esf        !== ' '       &&
//       dioptrias_receta.value.a1_oi.cil        !== ' '
//     ){

//       // console.log('ejecutando llamada...')
//       // console.log('ejecutando llamada...')

//       const _pkToDelete1_od ={
//         "marca":      cristal1_marca_id,
//         "diseno":     cristal1_diseno_id,
//         "indice":     cristal1_indice_id,
//         "material":   cristal1_material_id,
//         "color":      cristal1_color_id,
//         "tratamiento":cristal1_tratamiento_id,
//         "diametro":   A1_Diametro.value,
//         "esferico":   dioptrias_receta.value.a1_od.esf ?? 0,
//         "cilindrico": dioptrias_receta.value.a1_od.cil ?? 0
//       }

//       // console.log(_pkToDelete1_od)

//       const _pkToDelete1_oi ={
//         "marca":      cristal1_marca_id,
//         "diseno":     cristal1_diseno_id,
//         "indice":     cristal1_indice_id,
//         "material":   cristal1_material_id,
//         "color":      cristal1_color_id,
//         "tratamiento":cristal1_tratamiento_id,
//         "diametro":   A1_Diametro.value,
//         "esferico":   dioptrias_receta.value.a1_oi.esf ?? 0,
//         "cilindrico": dioptrias_receta.value.a1_oi.cil ?? 0,
//       }

//       console.log(_pkToDelete1_oi)

//       try {
//         const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
//         const encodedJSON = encodeURIComponent(pkJSON)

//         // console.log(encodedJSON)

//         const {data:cristalesDataOD} = await axios(`${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`)

//         const cristalesDATA = JSON.parse(cristalesDataOD[0][0])
//         // console.log(cristalesDATA)

//         if(cristalesDATA && cristalesDATA["ERROR"] !== ''){

//           // console.log('hay error')
//           // console.log(cristalesDATA)
//             console.log('render')
//             toast.error(cristalesDATA["ERROR"])

//           // toast.error(cristalesDATA["ERROR"])

//           A1_CR_OD.value = " ";
//           A1_CR_OI.value = " ";

//           A1_GRUPO_OD.value    = " ";
//           A1_GRUPO_OI.value    = " ";

//           validation_Cristal1_od("")
//           validation_Cristal1_oi("")
//         }else{
//           // console.log(cristalesDATA)
//           A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
//           A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   "
//           // A1_GRUPO.value = cristalesDATA["GRUPO"]

//           A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  "
//           A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  "

//           validation_Cristal1_od(cristalesDATA["CR_OD"])
//           validation_Cristal1_oi(cristalesDATA["CR_OI"])
//         }

//       } catch (error) {
//         // console.log(error)
//         throw error
//       }
//     }
// }
