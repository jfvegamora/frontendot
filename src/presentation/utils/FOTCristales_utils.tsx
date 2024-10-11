import { toast } from "react-toastify";
import { OTFormsEnum } from "../Enums";
import {
  A1_CR_OD,
  A1_CR_OI,
  A1_Diametro,
  A1_GRUPO_OD,
  A1_GRUPO_OI,
  A2_CR_OD,
  A2_CR_OI,
  A2_Diametro,
  A2_GRUPO_OD,
  A2_GRUPO_OI,
  a2_od_cil,
  a2_od_esf,
  a2_oi_cil,
  a2_oi_esf,
  codigoProyecto,
  dioptrias_receta,
  inputOnlyReadBodegaProcesado,
  punto_venta,
  tipo_de_anteojo,
  validacionIncompleta,
} from "./signalStateOT";
import {
  validation_Cristal1_od,
  validation_Cristal1_oi,
  validation_Cristal2_od,
  validation_Cristal2_oi,
} from "./validationOT";
import axios from "axios";
import { signal } from "@preact/signals-react";
import {
  dataErrorModal,
  isLoadingOT,
  isNotFetching,
  isShowErrorModal,
} from "../views/forms/FOT";
import { URLBackend } from "./config";
import { EnumGrid } from "../views/mantenedores/MOTHistorica";

export const isToggleMontajeValidation = signal<any>(true);

export const CR1_OD_LAB = signal<any>(false);
export const CR1_OI_LAB = signal<any>(false);
export const CR2_OD_LAB = signal<any>(false);
export const CR2_OI_LAB = signal<any>(false);

export const resetOptiLabSwitchs = () => {
  isToggleMontajeValidation.value = true;
  CR1_OD_LAB.value = false;
  CR1_OI_LAB.value = false;
  CR2_OD_LAB.value = false;
  CR2_OI_LAB.value = false;

  console.log("render");
};

const clearValidacionIncompleta = () => {
  validacionIncompleta.value.check = false;
  validacionIncompleta.value.a1_od = false;
  validacionIncompleta.value.a1_oi = false;
  validacionIncompleta.value.a2_od = false;
  validacionIncompleta.value.a2_oi = false;
};

export const changeCodigoCristal_od_A1: any = {
  cristal1_marca_od_id: true,
  cristal1_diseno_od_id: true,
  cristal1_indice_od_id: true,
  cristal1_material_od_id: true,
  cristal1_color_od_id: true,
  cristal1_tratamiento_od_id: true,
  cristal1_od_diametro: true,
  a1_od_esf: true,
  a1_od_cil: true,
  a1_oi_esf: true,
  a1_oi_cil: true,
};
export const changeCodigoCristal_oi_A1: any = {
  cristal1_marca_oi_id: true,
  cristal1_diseno_oi_id: true,
  cristal1_indice_oi_id: true,
  cristal1_material_oi_id: true,
  cristal1_color_oi_id: true,
  cristal1_tratamiento_oi_id: true,
  cristal1_oi_diametro: true,
  a1_od_esf: true,
  a1_od_cil: true,
  a1_oi_esf: true,
  a1_oi_cil: true,
};

//TODO:  ESTRUCTURA PARA TRAER CODIGOS DE CRISTALES + GRUPO DE ANTEOJO 2
export const changeCodigoCristal_od_A2: any = {
  cristal2_marca_od_id: true,
  cristal2_diseno_od_id: true,
  cristal2_indice_od_id: true,
  cristal2_material_od_id: true,
  cristal2_color_od_id: true,
  cristal2_tratamiento_od_id: true,
  cristal2_od_diametro: true,
  // a1_od_esf:true,
  // a1_od_cil:true,
  // a1_oi_esf:true,
  // a1_oi_cil:true,

  a2_od_esf: true,
  a2_od_cil: true,
  a2_oi_esf: true,
  a2_oi_cil: true,
  a2_dp: true,

  a1_od_esf: true,
  a1_od_cil: true,
  a1_oi_esf: true,
  a1_oi_cil: true,
};
export const changeCodigoCristal_oi_A2: any = {
  cristal2_marca_oi_id: true,
  cristal2_diseno_oi_id: true,
  cristal2_indice_oi_id: true,
  cristal2_material_oi_id: true,
  cristal2_color_oi_id: true,
  cristal2_tratamiento_oi_id: true,
  cristal2_oi_diametro: true,
  // a1_od_esf:true,
  // a1_od_cil:true,
  // a1_oi_esf:true,
  // a1_oi_cil:true,

  a2_od_esf: true,
  a2_od_cil: true,
  a2_oi_esf: true,
  a2_oi_cil: true,
  a2_dp: true,

  a1_od_esf: true,
  a1_od_cil: true,
  a1_oi_esf: true,
  a1_oi_cil: true,
};

export const getGrupoCristales_od_A1 = async (
  formValue: any,
  data: any,
  setErrorGrupoDioptriaA1: any,
  setChangeboolean: any,
  isEditting: boolean,
  setErrorGrupoDioptriaA2: any,
  setValue: any
) => {
  if (CR1_OD_LAB.value === true && CR1_OI_LAB.value === true) {
    return;
  }

  const {
    cristal1_marca_od_id,
    cristal1_diseno_od_id,
    cristal1_indice_od_id,
    cristal1_color_od_id,
    cristal1_material_od_id,
    cristal1_tratamiento_od_id,
    cristal1_od_diametro,
  } = formValue;

  // console.log(cristal1_marca_id);
  // console.log(cristal1_diseno_id);
  // console.log(cristal1_indice_id);
  // console.log(cristal1_color_id);
  // console.log(cristal1_material_id);
  // console.log(cristal1_tratamiento_id);
  // console.log(cristal1_diametro);

  // console.log(A1_Diametro.value);

  // console.log(dioptrias_receta.value.a1_od.esf);
  // console.log(dioptrias_receta.value.a1_od.cil);
  // console.log(dioptrias_receta.value.a1_oi.esf);
  // console.log(dioptrias_receta.value.a1_oi.cil);

  if (
    (cristal1_marca_od_id !== undefined ||
      data?.[OTFormsEnum.cristal1_marca_id] !== undefined) &&
    (cristal1_diseno_od_id !== undefined ||
      data?.[OTFormsEnum.cristal1_diseno_id] !== undefined) &&
    (cristal1_indice_od_id !== undefined ||
      data?.[OTFormsEnum.cristal1_indice_id] !== undefined) &&
    (cristal1_color_od_id !== undefined ||
      data?.[OTFormsEnum.cristal1_color_id] !== undefined) &&
    (cristal1_material_od_id !== undefined ||
      data?.[OTFormsEnum.cristal1_material_id] !== undefined) &&
    (cristal1_tratamiento_od_id !== undefined ||
      data?.[OTFormsEnum.cristal1_tratamiento_id] !== undefined) &&
    (cristal1_od_diametro !== undefined ||
      A1_Diametro.value.toString().trim() !== "") &&
    dioptrias_receta.value.a1_od.esf !== " " &&
    dioptrias_receta.value.a1_od.cil !== " " &&
    dioptrias_receta.value.a1_oi.esf !== " " &&
    dioptrias_receta.value.a1_oi.cil !== " "
  ) {
    // console.log('ejecutando llamada...')
    // console.log('ejecutando llamada...')

    if (
      dioptrias_receta.value.a1_od.cil > 0 ||
      dioptrias_receta.value.a1_oi.cil > 0
    ) {
      return;
    }

    if (
      !(!isEditting || isNotFetching.value) ||
      inputOnlyReadBodegaProcesado.value
    ) {
      return;
    }
    isLoadingOT.value = true;
    const _pkToDelete1_od = {
      marca: cristal1_marca_od_id || data?.[OTFormsEnum.cristal1_marca_id],
      diseno: cristal1_diseno_od_id || data?.[OTFormsEnum.cristal1_diseno_id],
      indice: cristal1_indice_od_id || data?.[OTFormsEnum.cristal1_indice_id],
      material:
        cristal1_material_od_id || data?.[OTFormsEnum.cristal1_material_id],
      color: cristal1_color_od_id || data?.[OTFormsEnum.cristal1_color_id],
      tratamiento:
        cristal1_tratamiento_od_id ||
        data?.[OTFormsEnum.cristal1_tratamiento_id],
      diametro: cristal1_od_diametro || A1_Diametro.value,
      esferico: dioptrias_receta.value.a1_od.esf ?? 0,
      cilindrico: dioptrias_receta.value.a1_od.cil ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR1_OD_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };

    //  console.log(_pkToDelete1_od)

    const _pkToDelete1_oi = {
      marca: cristal1_marca_od_id || data?.[OTFormsEnum.cristal1_marca_id],
      diseno: cristal1_diseno_od_id || data?.[OTFormsEnum.cristal1_diseno_id],
      indice: cristal1_indice_od_id || data?.[OTFormsEnum.cristal1_indice_id],
      material:
        cristal1_material_od_id || data?.[OTFormsEnum.cristal1_material_id],
      color: cristal1_color_od_id || data?.[OTFormsEnum.cristal1_color_id],
      tratamiento:
        cristal1_tratamiento_od_id ||
        data?.[OTFormsEnum.cristal1_tratamiento_id],
      diametro: cristal1_od_diametro || A1_Diametro.value,
      esferico: dioptrias_receta.value.a1_oi.esf ?? 0,
      cilindrico: dioptrias_receta.value.a1_oi.cil ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR1_OI_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };
    // const toastLoading = toast.loading("Cargando....");
    try {
      const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi]);
      const encodedJSON = encodeURIComponent(pkJSON);

      // console.log(encodedJSON)

      const { data: cristalesDataOD } = await axios(
        `${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`
      );

      const cristalesDATA = JSON.parse(cristalesDataOD[0][0]);
      if (tipo_de_anteojo.value === "3" && isEditting) {
        getGrupoCristales_od_A2(
          formValue,
          data,
          setErrorGrupoDioptriaA2,
          setChangeboolean,
          setValue
        );
      }

      if (
        (cristalesDATA && cristalesDATA["STOCK_OD"] < 1) ||
        (cristalesDATA && cristalesDATA["STOCK_OI"] < 1)
      ) {
        console.log("render");
        isShowErrorModal.value = true;
        dataErrorModal.value = cristalesDATA;
      }

      if (cristalesDATA && cristalesDATA["ERROR"] !== "") {
        if (cristalesDATA["ERROR"].includes("CROD")) {
          validacionIncompleta.value.a1_od = false;
          validacionIncompleta.value.a1_oi = true;
        }
        if (cristalesDATA["ERROR"].includes("CROI")) {
          validacionIncompleta.value.a1_od = true;
          validacionIncompleta.value.a1_oi = false;
        }

        if (cristalesDATA["ERROR"].includes("CROD")) {
          validacionIncompleta.value.a1_od = false;
          validacionIncompleta.value.a1_oi = true;
        }
        if (cristalesDATA["ERROR"].includes("CROD")) {
          validacionIncompleta.value.a1_od = true;
          validacionIncompleta.value.a1_oi = false;
        }

        //   if (cristalesDATA["MSG"].includes("STOCK")) {
        //     A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
        //     A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   ";
        //     // A1_GRUPO.value = cristalesDATA["GRUPO"]

        //     A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  ";
        //     A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  ";

        //     validation_Cristal1_od(cristalesDATA["CR_OD"]);
        //     validation_Cristal1_oi(cristalesDATA["CR_OI"]);
        //     setChangeboolean((prev: any) => ({
        //       ...prev,
        //       setChangeboolean: prev.setChangeboolean,
        //     }));
        //     toast.error(cristalesDATA["MSG"]);
        //     // validacionIncompleta.value = true;
        //     validacionIncompleta.value.check = true;

        //     switch (cristalesDATA["ERROR"]) {
        //       case "ODOI":
        //         validacionIncompleta.value.a1_od = true;
        //         validacionIncompleta.value.a1_oi = true;
        //         break;
        //       case "OI":
        //         validacionIncompleta.value.a1_od = false;
        //         validacionIncompleta.value.a1_oi = true;
        //         break;
        //       case "OD":
        //         validacionIncompleta.value.a1_od = true;
        //         validacionIncompleta.value.a1_oi = false;
        //         break;
        //       default:
        //         break;
        //     }
        //     return;
        //   }

        setErrorGrupoDioptriaA1(
          <div dangerouslySetInnerHTML={{ __html: cristalesDATA["MSG"] }} />
        );

        A1_CR_OD.value = " ";
        // A1_CR_OI.value = " ";

        A1_GRUPO_OD.value = " ";
        // A1_GRUPO_OI.value = " ";
        validacionIncompleta.value.check = true;
        // validacionIncompleta2
        validation_Cristal1_od("");
        // validation_Cristal1_oi("");
        // setErrorGrupoDioptriaA1("")
        // setErrorGrupoDioptriaA1('')
      } else {
        // console.log(cristalesDATA)
        clearValidacionIncompleta();

        if (cristalesDATA["CR_OD"] === "") {
          validation_Cristal1_od("32");
        }

        // if (cristalesDATA["CR_OI"] === "") {
        //   validation_Cristal1_oi("32");
        // }

        A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
        // A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   ";
        // A1_GRUPO.value = cristalesDATA["GRUPO"]

        A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  ";
        // A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  ";

        // setValue("cristal1_od_diametro", cristalesDATA["CR_OD_DIAMETRO"]);
        validation_Cristal1_od("32");
        // validation_Cristal1_oi("32");

        setChangeboolean((prev: boolean) => !prev);
        // toast.dismiss(toastLoading);

        // console.log(key)
        isLoadingOT.value = false;
        return cristalesDATA;
      }
    } catch (error) {
      // console.log(error)
      // toast.dismiss(toastLoading);
      isLoadingOT.value = false;
      throw error;
    }
  }
};
export const getGrupoCristales_oi_A1 = async (
  formValue: any,
  data: any,
  setErrorGrupoDioptriaA1: any,
  setChangeboolean: any,
  isEditting: boolean,
  setErrorGrupoDioptriaA2: any,
  setValue: any
) => {
  if (CR1_OD_LAB.value === true && CR1_OI_LAB.value === true) {
    return;
  }

  const {
    cristal1_marca_oi_id,
    cristal1_diseno_oi_id,
    cristal1_indice_oi_id,
    cristal1_color_oi_id,
    cristal1_material_oi_id,
    cristal1_tratamiento_oi_id,
    cristal1_oi_diametro,
  } = formValue;

  // console.log(cristal1_marca_id);
  // console.log(cristal1_diseno_id);
  // console.log(cristal1_indice_id);
  // console.log(cristal1_color_id);
  // console.log(cristal1_material_id);
  // console.log(cristal1_tratamiento_id);
  // console.log(cristal1_diametro);

  // console.log(A1_Diametro.value);

  // console.log(dioptrias_receta.value.a1_od.esf);
  // console.log(dioptrias_receta.value.a1_od.cil);
  // console.log(dioptrias_receta.value.a1_oi.esf);
  // console.log(dioptrias_receta.value.a1_oi.cil);

  if (
    (cristal1_marca_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal1_marca_id] !== undefined) &&
    (cristal1_diseno_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal1_diseno_id] !== undefined) &&
    (cristal1_indice_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal1_indice_id] !== undefined) &&
    (cristal1_color_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal1_color_id] !== undefined) &&
    (cristal1_material_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal1_material_id] !== undefined) &&
    (cristal1_tratamiento_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal1_tratamiento_id] !== undefined) &&
    (cristal1_oi_diametro !== undefined ||
      A1_Diametro.value.toString().trim() !== "") &&
    dioptrias_receta.value.a1_od.esf !== " " &&
    dioptrias_receta.value.a1_od.cil !== " " &&
    dioptrias_receta.value.a1_oi.esf !== " " &&
    dioptrias_receta.value.a1_oi.cil !== " "
  ) {
    // console.log('ejecutando llamada...')
    // console.log('ejecutando llamada...')

    if (
      dioptrias_receta.value.a1_od.cil > 0 ||
      dioptrias_receta.value.a1_oi.cil > 0
    ) {
      return;
    }

    if (
      !(!isEditting || isNotFetching.value) ||
      inputOnlyReadBodegaProcesado.value
    ) {
      return;
    }
    isLoadingOT.value = true;
    const _pkToDelete1_od = {
      marca: cristal1_marca_oi_id || data?.[OTFormsEnum.cristal1_marca_id],
      diseno: cristal1_diseno_oi_id || data?.[OTFormsEnum.cristal1_diseno_id],
      indice: cristal1_indice_oi_id || data?.[OTFormsEnum.cristal1_indice_id],
      material:
        cristal1_material_oi_id || data?.[OTFormsEnum.cristal1_material_id],
      color: cristal1_color_oi_id || data?.[OTFormsEnum.cristal1_color_id],
      tratamiento:
        cristal1_tratamiento_oi_id ||
        data?.[OTFormsEnum.cristal1_tratamiento_id],
      diametro: cristal1_oi_diametro || A1_Diametro.value,
      esferico: dioptrias_receta.value.a1_od.esf ?? 0,
      cilindrico: dioptrias_receta.value.a1_od.cil ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR1_OD_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };

    //  console.log(_pkToDelete1_od)

    const _pkToDelete1_oi = {
      marca: cristal1_marca_oi_id || data?.[OTFormsEnum.cristal1_marca_id],
      diseno: cristal1_diseno_oi_id || data?.[OTFormsEnum.cristal1_diseno_id],
      indice: cristal1_indice_oi_id || data?.[OTFormsEnum.cristal1_indice_id],
      material:
        cristal1_material_oi_id || data?.[OTFormsEnum.cristal1_material_id],
      color: cristal1_color_oi_id || data?.[OTFormsEnum.cristal1_color_id],
      tratamiento:
        cristal1_tratamiento_oi_id ||
        data?.[OTFormsEnum.cristal1_tratamiento_id],
      diametro: cristal1_oi_diametro || A1_Diametro.value,
      esferico: dioptrias_receta.value.a1_oi.esf ?? 0,
      cilindrico: dioptrias_receta.value.a1_oi.cil ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR1_OI_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };
    // const toastLoading = toast.loading("Cargando....");
    try {
      const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi]);
      const encodedJSON = encodeURIComponent(pkJSON);

      // console.log(encodedJSON)

      const { data: cristalesDataOD } = await axios(
        `${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`
      );

      const cristalesDATA = JSON.parse(cristalesDataOD[0][0]);
      if (tipo_de_anteojo.value === "3" && isEditting) {
        getGrupoCristales_oi_A2(
          formValue,
          data,
          setErrorGrupoDioptriaA2,
          setChangeboolean,
          setValue
        );
      }

      if (
        (cristalesDATA && cristalesDATA["STOCK_OD"] < 1) ||
        (cristalesDATA && cristalesDATA["STOCK_OI"] < 1)
      ) {
        console.log("render");
        isShowErrorModal.value = true;
        dataErrorModal.value = cristalesDATA;
      }

      if (cristalesDATA && cristalesDATA["ERROR"] !== "") {
        if (cristalesDATA["ERROR"].includes("CROD")) {
          validacionIncompleta.value.a1_od = false;
          validacionIncompleta.value.a1_oi = true;
        }
        if (cristalesDATA["ERROR"].includes("CROI")) {
          validacionIncompleta.value.a1_od = true;
          validacionIncompleta.value.a1_oi = false;
        }

        if (cristalesDATA["ERROR"].includes("CROD")) {
          validacionIncompleta.value.a1_od = false;
          validacionIncompleta.value.a1_oi = true;
        }
        if (cristalesDATA["ERROR"].includes("CROD")) {
          validacionIncompleta.value.a1_od = true;
          validacionIncompleta.value.a1_oi = false;
        }

        setErrorGrupoDioptriaA1(
          <div dangerouslySetInnerHTML={{ __html: cristalesDATA["MSG"] }} />
        );

        // A1_CR_OD.value = " ";
        A1_CR_OI.value = " ";

        // A1_GRUPO_OD.value = " ";
        A1_GRUPO_OI.value = " ";
        validacionIncompleta.value.check = true;
        // validacionIncompleta2
        // validation_Cristal1_od("");
        validation_Cristal1_oi("");
        // setErrorGrupoDioptriaA1("")
        // setErrorGrupoDioptriaA1('')
      } else {
        // console.log(cristalesDATA)
        clearValidacionIncompleta();

        // if (cristalesDATA["CR_OD"] === "") {
        //   validation_Cristal1_od("32");
        // }

        if (cristalesDATA["CR_OI"] === "") {
          validation_Cristal1_oi("32");
        }

        // A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
        A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   ";
        // A1_GRUPO.value = cristalesDATA["GRUPO"]

        // A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  ";
        A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  ";
        // setValue("cristal1_oi_diametro", cristalesDATA["CR_OI_DIAMETRO"]);
        // validation_Cristal1_od("32");
        validation_Cristal1_oi("32");

        setChangeboolean((prev: boolean) => !prev);
        // toast.dismiss(toastLoading);

        // console.log(key)
        isLoadingOT.value = false;
      }
    } catch (error) {
      // console.log(error)
      // toast.dismiss(toastLoading);
      isLoadingOT.value = false;
      throw error;
    }
  }
};

export const getGrupoCristales_od_A2 = async (
  formValue: any,
  data: any,
  setErrorGrupoDioptriaA2: any,
  setChangeboolean: any,
  _setValue: any
) => {
  const {
    cristal2_marca_od_id,
    cristal2_diseno_od_id,
    cristal2_indice_od_id,
    cristal2_color_od_id,
    cristal2_material_od_id,
    cristal2_tratamiento_od_id,
    cristal2_od_diametro,
  } = formValue;

  if (CR2_OD_LAB.value === true && CR2_OI_LAB.value === true) {
    return;
  }

  if (
    (cristal2_marca_od_id !== undefined ||
      data?.[OTFormsEnum.cristal2_marca_id] !== undefined) &&
    (cristal2_diseno_od_id !== undefined ||
      data?.[OTFormsEnum.cristal2_diseno_id] !== undefined) &&
    (cristal2_indice_od_id !== undefined ||
      data?.[OTFormsEnum.cristal2_indice_id] !== undefined) &&
    (cristal2_color_od_id !== undefined ||
      data?.[OTFormsEnum.cristal2_color_id] !== undefined) &&
    (cristal2_material_od_id !== undefined ||
      data?.[OTFormsEnum.cristal2_material_id] !== undefined) &&
    (cristal2_tratamiento_od_id !== undefined ||
      data?.[OTFormsEnum.cristal2_tratamiento_id] !== undefined) &&
    (cristal2_od_diametro !== undefined ||
      A2_Diametro.value.toString().trim() !== "") &&
    dioptrias_receta.value.a2_od.esf.value !== "  " &&
    dioptrias_receta.value.a2_od.cil.value !== "  "
    // (a2_od_esf.value                          !== '  ')        &&
    // (a2_od_cil.value                          !== '  ')
  ) {
    // console.log('ejecutando llamada.....')
    const _pkToDelete1_od = {
      marca: cristal2_marca_od_id || data?.[OTFormsEnum.cristal2_marca_id],
      diseno: cristal2_diseno_od_id || data?.[OTFormsEnum.cristal2_diseno_id],
      indice: cristal2_indice_od_id || data?.[OTFormsEnum.cristal2_indice_id],
      material:
        cristal2_material_od_id || data?.[OTFormsEnum.cristal2_material_id],
      color: cristal2_color_od_id || data?.[OTFormsEnum.cristal2_color_id],
      tratamiento:
        cristal2_tratamiento_od_id ||
        data?.[OTFormsEnum.cristal2_tratamiento_id],
      diametro: cristal2_od_diametro || A2_Diametro.value,
      esferico: a2_od_esf.value ?? 0,
      cilindrico: a2_od_cil.value ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR2_OD_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };

    // console.log(_pkToDelete1_od)
    // console.log(dioptrias_receta.value.a2_od.esf)
    const _pkToDelete1_oi = {
      marca: cristal2_marca_od_id || data?.[OTFormsEnum.cristal2_marca_id],
      diseno: cristal2_diseno_od_id || data?.[OTFormsEnum.cristal2_diseno_id],
      indice: cristal2_indice_od_id || data?.[OTFormsEnum.cristal2_indice_id],
      material:
        cristal2_material_od_id || data?.[OTFormsEnum.cristal2_material_id],
      color: cristal2_color_od_id || data?.[OTFormsEnum.cristal2_color_id],
      tratamiento:
        cristal2_tratamiento_od_id ||
        data?.[OTFormsEnum.cristal2_tratamiento_id],
      diametro: cristal2_od_diametro || A2_Diametro.value,
      esferico: a2_oi_esf.value ?? 0,
      cilindrico: a2_oi_cil.value ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR2_OI_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };

    try {
      const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi]);
      const encodedJSON = encodeURIComponent(pkJSON);

      const { data: cristalesDataOI } = await axios(
        `${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`
      );

      const cristalesDATA = JSON.parse(cristalesDataOI[0][0]);

      if (
        (cristalesDATA && cristalesDATA["STOCK_OD"] < 1) ||
        (cristalesDATA && cristalesDATA["STOCK_OI"] < 1)
      ) {
        console.log("render");
        isShowErrorModal.value = true;
        dataErrorModal.value = cristalesDATA;
      }

      if (cristalesDATA && cristalesDATA["ERROR"] !== "") {
        if (cristalesDATA["MSG"].includes("STOCK")) {
          A2_CR_OD.value = cristalesDATA["CR_OD"].trim() || " ";
          // A2_CR_OI.value = cristalesDATA["CR_OI"].trim() || " ";

          A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || " ";
          // A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || " ";

          validation_Cristal2_od(cristalesDATA["CR_OD"]);
          // validation_Cristal2_oi(cristalesDATA["CR_OI"]);
          toast.error(cristalesDATA["MSG"]);
          validacionIncompleta.value.check = true;

          switch (cristalesDATA["ERROR"]) {
            case "ODOI":
              validacionIncompleta.value.a2_od = true;
              validacionIncompleta.value.a2_oi = true;
              break;
            case "OD":
              validacionIncompleta.value.a2_od = true;
              validacionIncompleta.value.a2_oi = false;
              break;
            case "OI":
              validacionIncompleta.value.a2_od = false;
              validacionIncompleta.value.a2_oi = true;
              break;
            default:
              break;
          }
          return;
        }
        setErrorGrupoDioptriaA2(cristalesDATA["ERROR"]);
      } else {
        validacionIncompleta.value.a2_od = false;
        validacionIncompleta.value.a2_oi = false;

        A2_CR_OD.value = cristalesDATA["CR_OD"].trim();
        // A2_CR_OI.value = cristalesDATA["CR_OI"].trim();

        A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"];
        // A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"];

        // setValue("cristal2_od_diametro", cristalesDATA["CR_OD_DIAMETRO"]);

        if (cristalesDATA["CR_OD"] === "") {
          validation_Cristal2_od("32");
          // validation_Cristal2_oi("32");
        } else {
          validation_Cristal2_od(cristalesDATA["CR_OD"]);
          // validation_Cristal2_oi(cristalesDATA["CR_OI"]);
        }

        setChangeboolean((prev: boolean) => !prev);
      }
    } catch (error) {
      // console.log(error)
      throw error;
    }
  }
};
export const getGrupoCristales_oi_A2 = async (
  formValue: any,
  data: any,
  setErrorGrupoDioptriaA2: any,
  setChangeboolean: any,
  _setValue: any
) => {
  const {
    cristal2_marca_oi_id,
    cristal2_diseno_oi_id,
    cristal2_indice_oi_id,
    cristal2_color_oi_id,
    cristal2_material_oi_id,
    cristal2_tratamiento_oi_id,
    cristal2_oi_diametro,
  } = formValue;

  if (CR2_OD_LAB.value === true && CR2_OI_LAB.value === true) {
    return;
  }

  if (
    (cristal2_marca_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal2_marca_id] !== undefined) &&
    (cristal2_diseno_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal2_diseno_id] !== undefined) &&
    (cristal2_indice_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal2_indice_id] !== undefined) &&
    (cristal2_color_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal2_color_id] !== undefined) &&
    (cristal2_material_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal2_material_id] !== undefined) &&
    (cristal2_tratamiento_oi_id !== undefined ||
      data?.[OTFormsEnum.cristal2_tratamiento_id] !== undefined) &&
    (cristal2_oi_diametro !== undefined ||
      A2_Diametro.value.toString().trim() !== "") &&
    dioptrias_receta.value.a2_od.esf.value !== "  " &&
    dioptrias_receta.value.a2_od.cil.value !== "  "
    // (a2_od_esf.value                          !== '  ')        &&
    // (a2_od_cil.value                          !== '  ')
  ) {
    // console.log('ejecutando llamada.....')
    const _pkToDelete1_od = {
      marca: cristal2_marca_oi_id || data?.[OTFormsEnum.cristal2_marca_id],
      diseno: cristal2_diseno_oi_id || data?.[OTFormsEnum.cristal2_diseno_id],
      indice: cristal2_indice_oi_id || data?.[OTFormsEnum.cristal2_indice_id],
      material:
        cristal2_material_oi_id || data?.[OTFormsEnum.cristal2_material_id],
      color: cristal2_color_oi_id || data?.[OTFormsEnum.cristal2_color_id],
      tratamiento:
        cristal2_tratamiento_oi_id ||
        data?.[OTFormsEnum.cristal2_tratamiento_id],
      diametro: cristal2_oi_diametro || A2_Diametro.value,
      esferico: a2_od_esf.value ?? 0,
      cilindrico: a2_od_cil.value ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR2_OD_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };

    // console.log(_pkToDelete1_od)
    // console.log(dioptrias_receta.value.a2_od.esf)
    const _pkToDelete1_oi = {
      marca: cristal2_marca_oi_id || data?.[OTFormsEnum.cristal2_marca_id],
      diseno: cristal2_diseno_oi_id || data?.[OTFormsEnum.cristal2_diseno_id],
      indice: cristal2_indice_oi_id || data?.[OTFormsEnum.cristal2_indice_id],
      material:
        cristal2_material_oi_id || data?.[OTFormsEnum.cristal2_material_id],
      color: cristal2_color_oi_id || data?.[OTFormsEnum.cristal2_color_id],
      tratamiento:
        cristal2_tratamiento_oi_id ||
        data?.[OTFormsEnum.cristal2_tratamiento_id],
      diametro: cristal2_oi_diametro || A2_Diametro.value,
      esferico: a2_oi_esf.value ?? 0,
      cilindrico: a2_oi_cil.value ?? 0,
      punto_venta: punto_venta.value,

      opcion_vta: CR2_OI_LAB.value === true ? "2" : "1",

      // armazon_material: 0,
      cliente_sexo: 0,
      cliente_fecha_nac: new Date(),
    };

    try {
      const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi]);
      const encodedJSON = encodeURIComponent(pkJSON);

      const { data: cristalesDataOI } = await axios(
        `${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`
      );

      const cristalesDATA = JSON.parse(cristalesDataOI[0][0]);

      if (
        (cristalesDATA && cristalesDATA["STOCK_OD"] < 1) ||
        (cristalesDATA && cristalesDATA["STOCK_OI"] < 1)
      ) {
        console.log("render");
        isShowErrorModal.value = true;
        dataErrorModal.value = cristalesDATA;
      }

      if (cristalesDATA && cristalesDATA["ERROR"] !== "") {
        if (cristalesDATA["MSG"].includes("STOCK")) {
          // A2_CR_OD.value = cristalesDATA["CR_OD"].trim() || " ";
          A2_CR_OI.value = cristalesDATA["CR_OI"].trim() || " ";

          // A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || " ";
          A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || " ";

          // validation_Cristal2_od(cristalesDATA["CR_OD"]);
          validation_Cristal2_oi(cristalesDATA["CR_OI"]);
          toast.error(cristalesDATA["MSG"]);
          validacionIncompleta.value.check = true;

          switch (cristalesDATA["ERROR"]) {
            case "ODOI":
              validacionIncompleta.value.a2_od = true;
              validacionIncompleta.value.a2_oi = true;
              break;
            case "OD":
              validacionIncompleta.value.a2_od = true;
              validacionIncompleta.value.a2_oi = false;
              break;
            case "OI":
              validacionIncompleta.value.a2_od = false;
              validacionIncompleta.value.a2_oi = true;
              break;
            default:
              break;
          }
          return;
        }
        setErrorGrupoDioptriaA2(cristalesDATA["ERROR"]);
      } else {
        validacionIncompleta.value.a2_od = false;
        validacionIncompleta.value.a2_oi = false;

        // A2_CR_OD.value = cristalesDATA["CR_OD"].trim();
        A2_CR_OI.value = cristalesDATA["CR_OI"].trim();

        // A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"];
        A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"];
        // setValue("cristal1_oi_diametro", cristalesDATA["CR_OI_DIAMETRO"]);

        if (cristalesDATA["CR_OD"] === "") {
          // validation_Cristal2_od("32");
          validation_Cristal2_oi("32");
        } else {
          // validation_Cristal2_od(cristalesDATA["CR_OD"]);
          validation_Cristal2_oi(cristalesDATA["CR_OI"]);
        }

        setChangeboolean((prev: boolean) => !prev);
      }
    } catch (error) {
      // console.log(error)
      throw error;
    }
  }
};

export const handleValidationCheckLab = (data: any) => {
  if (data) {
    if (
      data[EnumGrid.cristal1_od] === "" &&
      data[EnumGrid.a1_grupo_od] !== ""
    ) {
      CR1_OD_LAB.value = true;
    }

    if (
      data[EnumGrid.cristal1_oi] === "" &&
      data[EnumGrid.a1_grupo_oI] !== ""
    ) {
      CR1_OI_LAB.value = true;
    }

    if (
      data[EnumGrid.cristal2_od] === "" &&
      data[EnumGrid.a2_grupo_od] !== ""
    ) {
      CR2_OD_LAB.value = true;
    }

    if (
      data[EnumGrid.cristal2_oi] === "" &&
      data[EnumGrid.a2_grupo_oi] !== ""
    ) {
      CR2_OI_LAB.value = true;
    }
  }
};
