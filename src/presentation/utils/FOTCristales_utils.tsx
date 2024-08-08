import { toast } from "react-toastify";
import { OTFormsEnum } from "../Enums";
import { A1_CR_OD, A1_CR_OI, A1_Diametro, A1_GRUPO_OD, A1_GRUPO_OI, A2_CR_OD, A2_CR_OI, A2_Diametro, A2_GRUPO_OD, A2_GRUPO_OI, a2_od_cil, a2_od_esf, a2_oi_cil, a2_oi_esf, codigoProyecto, dioptrias_receta, inputOnlyReadBodegaProcesado, punto_venta, tipo_de_anteojo, validacionIncompleta } from "./signalStateOT";
import { validation_Cristal1_od, validation_Cristal1_oi, validation_Cristal2_od, validation_Cristal2_oi } from "./validationOT";
import axios from "axios";
import { signal } from "@preact/signals-react";
import { isNotFetching } from "../views/forms/FOT";
import { URLBackend } from "./config";



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




export const changeCodigoCristal_A1: any = {
    cristal1_marca_id: true,
    cristal1_diseno_id: true,
    cristal1_indice_id: true,
    cristal1_material_id: true,
    cristal1_color_id: true,
    cristal1_tratamiento_id: true,
    cristal1_diametro: true,
    a1_od_esf: true,
    a1_od_cil: true,
    a1_oi_esf: true,
    a1_oi_cil: true,
  };
  
  //TODO:  ESTRUCTURA PARA TRAER CODIGOS DE CRISTALES + GRUPO DE ANTEOJO 2
  export const changeCodigoCristal_A2: any = {
    cristal2_marca_id: true,
    cristal2_diseno_id: true,
    cristal2_indice_id: true,
    cristal2_material_id: true,
    cristal2_color_id: true,
    cristal2_tratamiento_id: true,
    cristal2_diametro: true,
    // a1_od_esf:true,
    // a1_od_cil:true,
    // a1_oi_esf:true,
    // a1_oi_cil:true,
  
    a2_od_esf: true,
    a2_od_cil: true,
    a2_oi_esf: true,
    a2_oi_cil: true,
  };
  
  
  export const getGrupoCristales_A1 = async (
    formValue: any,
    data: any,
    setErrorGrupoDioptriaA1: any,
    setChangeboolean: any,
    isEditting: boolean,
    setErrorGrupoDioptriaA2: any
  ) => {
    
    if(CR1_OD_LAB.value === true && CR1_OI_LAB.value === true ){
      return;
    }



    const {
      cristal1_marca_id,
      cristal1_diseno_id,
      cristal1_indice_id,
      cristal1_color_id,
      cristal1_material_id,
      cristal1_tratamiento_id,
    } = formValue;
  
    if (
      (cristal1_marca_id !== undefined ||
        data?.[OTFormsEnum.cristal1_marca_id] !== undefined) &&
      (cristal1_diseno_id !== undefined ||
        data?.[OTFormsEnum.cristal1_diseno_id] !== undefined) &&
      (cristal1_indice_id !== undefined ||
        data?.[OTFormsEnum.cristal1_indice_id] !== undefined) &&
      (cristal1_color_id !== undefined ||
        data?.[OTFormsEnum.cristal1_color_id] !== undefined) &&
      (cristal1_material_id !== undefined ||
        data?.[OTFormsEnum.cristal1_material_id] !== undefined) &&
      (cristal1_tratamiento_id !== undefined ||
        data?.[OTFormsEnum.cristal1_tratamiento_id] !== undefined) &&
      A1_Diametro.value.toString().trim() !== "" &&
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

      if(!(!isEditting || (isNotFetching.value)) || inputOnlyReadBodegaProcesado.value){
        return;
      }
      
      const _pkToDelete1_od = {
        marca: cristal1_marca_id || data?.[OTFormsEnum.cristal1_marca_id],
        diseno: cristal1_diseno_id || data?.[OTFormsEnum.cristal1_diseno_id],
        indice: cristal1_indice_id || data?.[OTFormsEnum.cristal1_indice_id],
        material: cristal1_material_id || data?.[OTFormsEnum.cristal1_material_id],
        color: cristal1_color_id || data?.[OTFormsEnum.cristal1_color_id],
        tratamiento:
          cristal1_tratamiento_id || data?.[OTFormsEnum.cristal1_tratamiento_id],
        diametro: A1_Diametro.value,
        esferico: dioptrias_receta.value.a1_od.esf ?? 0,
        cilindrico: dioptrias_receta.value.a1_od.cil ?? 0,
        punto_venta: punto_venta.value,
        
        opcion_vta: (CR1_OD_LAB.value === true ? '2' : '1'),
        
        armazon_material: 0,
        cliente_sexo: 0,
        cliente_fecha_nac: new Date(),
      };
  
      //  console.log(_pkToDelete1_od)
  
      const _pkToDelete1_oi = {
        marca: cristal1_marca_id || data?.[OTFormsEnum.cristal1_marca_id],
        diseno: cristal1_diseno_id || data?.[OTFormsEnum.cristal1_diseno_id],
        indice: cristal1_indice_id || data?.[OTFormsEnum.cristal1_indice_id],
        material: cristal1_material_id || data?.[OTFormsEnum.cristal1_material_id],
        color: cristal1_color_id || data?.[OTFormsEnum.cristal1_color_id],
        tratamiento:
          cristal1_tratamiento_id || data?.[OTFormsEnum.cristal1_tratamiento_id],
        diametro: A1_Diametro.value,
        esferico: dioptrias_receta.value.a1_oi.esf ?? 0,
        cilindrico: dioptrias_receta.value.a1_oi.cil ?? 0,
        punto_venta: punto_venta.value,

        opcion_vta: (CR1_OI_LAB.value === true ? '2' : '1'),
        
        armazon_material: 0,
        cliente_sexo: 0,
        cliente_fecha_nac: new Date(),
      };
  
      // console.log(_pkToDelete1_oi)
  
      try {
        const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi]);
        const encodedJSON = encodeURIComponent(pkJSON);
  
        // console.log(encodedJSON)
  
        const { data: cristalesDataOD } = await axios(
          `${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`
        );
  
        const cristalesDATA = JSON.parse(cristalesDataOD[0][0]);
        console.log(cristalesDATA)
        if (tipo_de_anteojo.value === "3" && isEditting) {
          getGrupoCristales_A2(
            formValue,
            data,
            setErrorGrupoDioptriaA2,
            setChangeboolean
          );
        }
  
        console.log(cristalesDATA && cristalesDATA);
        if (cristalesDATA && cristalesDATA["ERROR"] !== "") {
          console.log(cristalesDATA["ERROR"]);

          if(cristalesDATA["ERROR"].includes('CROD')){
            validacionIncompleta.value.a1_od = false;
            validacionIncompleta.value.a1_oi = true;
        }
          if(cristalesDATA["ERROR"].includes('CROI')){
            validacionIncompleta.value.a1_od = true;
            validacionIncompleta.value.a1_oi = false;
        }


          if(cristalesDATA["ERROR"].includes('CROD')){
            validacionIncompleta.value.a1_od = false;
            validacionIncompleta.value.a1_oi = true;
        }
          if(cristalesDATA["ERROR"].includes('CROD')){
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


          setErrorGrupoDioptriaA1(<div dangerouslySetInnerHTML={{ __html: cristalesDATA["MSG"] }} />);
          
          A1_CR_OD.value = " ";
          A1_CR_OI.value = " ";
  
          A1_GRUPO_OD.value = " ";
          A1_GRUPO_OI.value = " ";
          validacionIncompleta.value.check = true;
          // validacionIncompleta2
  
          validation_Cristal1_od("");
          validation_Cristal1_oi("");
          // setErrorGrupoDioptriaA1("")
          // setErrorGrupoDioptriaA1('')
        } else {
          // console.log(cristalesDATA)
          clearValidacionIncompleta();

        
          if(cristalesDATA["CR_OD"] === ''){
            validation_Cristal1_od("32");
          }

          if(cristalesDATA["CR_OI"] === ''){
            validation_Cristal1_oi("32");
          }


        
          A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
          A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   ";
          // A1_GRUPO.value = cristalesDATA["GRUPO"]
  
          A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  ";
          A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  ";
          

              validation_Cristal1_od("32");
              validation_Cristal1_oi("32");

          setChangeboolean((prev: boolean) => !prev);
  
          // console.log(key)
        }
      } catch (error) {
        // console.log(error)
        throw error;
      }
    }
  };
  
  export const getGrupoCristales_A2 = async (
    formValue: any,
    data: any,
    setErrorGrupoDioptriaA2: any,
    setChangeboolean: any
  ) => {
    const {
      cristal2_marca_id,
      cristal2_diseno_id,
      cristal2_indice_id,
      cristal2_color_id,
      cristal2_material_id,
      cristal2_tratamiento_id,
    } = formValue;

    if(CR2_OD_LAB.value === true && CR2_OI_LAB.value === true ){
      return;
    }

  
    if (
      (cristal2_marca_id !== undefined ||
        data?.[OTFormsEnum.cristal2_marca_id] !== undefined) &&
      (cristal2_diseno_id !== undefined ||
        data?.[OTFormsEnum.cristal2_diseno_id] !== undefined) &&
      (cristal2_indice_id !== undefined ||
        data?.[OTFormsEnum.cristal2_indice_id] !== undefined) &&
      (cristal2_color_id !== undefined ||
        data?.[OTFormsEnum.cristal2_color_id] !== undefined) &&
      (cristal2_material_id !== undefined ||
        data?.[OTFormsEnum.cristal2_material_id] !== undefined) &&
      (cristal2_tratamiento_id !== undefined ||
        data?.[OTFormsEnum.cristal2_tratamiento_id] !== undefined) &&
      A2_Diametro.value.toString().trim() !== "" &&
      dioptrias_receta.value.a2_od.esf !== "  " &&
      dioptrias_receta.value.a2_od.cil !== "  "
      // (a2_od_esf.value                          !== '  ')        &&
      // (a2_od_cil.value                          !== '  ')
    ) {
      // console.log('ejecutando llamada.....')
      const _pkToDelete1_od = {
        marca: cristal2_marca_id || data?.[OTFormsEnum.cristal2_marca_id],
        diseno: cristal2_diseno_id || data?.[OTFormsEnum.cristal2_diseno_id],
        indice: cristal2_indice_id || data?.[OTFormsEnum.cristal2_indice_id],
        material: cristal2_material_id || data?.[OTFormsEnum.cristal2_material_id],
        color: cristal2_color_id || data?.[OTFormsEnum.cristal2_color_id],
        tratamiento:
          cristal2_tratamiento_id || data?.[OTFormsEnum.cristal2_tratamiento_id],
        diametro: A2_Diametro.value,
        esferico: a2_od_esf.value ?? 0,
        cilindrico: a2_od_cil.value ?? 0,
        punto_venta: punto_venta.value,
  
        opcion_vta: (CR2_OD_LAB.value === true ? '2' : '1'),

        armazon_material: 0,
        cliente_sexo: 0,
        cliente_fecha_nac: new Date(),
  
        optcion_vta: "",
      };
  
      // console.log(_pkToDelete1_od)
      // console.log(dioptrias_receta.value.a2_od.esf)
      const _pkToDelete1_oi = {
        marca: cristal2_marca_id || data?.[OTFormsEnum.cristal2_marca_id],
        diseno: cristal2_diseno_id || data?.[OTFormsEnum.cristal2_diseno_id],
        indice: cristal2_indice_id || data?.[OTFormsEnum.cristal2_indice_id],
        material: cristal2_material_id || data?.[OTFormsEnum.cristal2_material_id],
        color: cristal2_color_id || data?.[OTFormsEnum.cristal2_color_id],
        tratamiento:
          cristal2_tratamiento_id || data?.[OTFormsEnum.cristal2_tratamiento_id],
        diametro: A2_Diametro.value,
        esferico: a2_oi_esf.value ?? 0,
        cilindrico: a2_oi_cil.value ?? 0,
        punto_venta: punto_venta.value,
  
        opcion_vta: (CR2_OI_LAB.value === true ? '2' : '1'),

        armazon_material: 0,
        cliente_sexo: 0,
        cliente_fecha_nac: new Date(),
  
        optcion_vta: "",
      };
  
      // console.log(_pkToDelete1_oi)
  
      try {
        const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi]);
        const encodedJSON = encodeURIComponent(pkJSON);
  
        const { data: cristalesDataOI } = await axios(
          `${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`
        );
  
        const cristalesDATA = JSON.parse(cristalesDataOI[0][0]);
        console.log(cristalesDATA);
  
        if (cristalesDATA && cristalesDATA["ERROR"] !== "") {
          console.log("render");
  
          if (cristalesDATA["MSG"].includes("STOCK")) {
            A2_CR_OD.value = cristalesDATA["CR_OD"].trim() || " ";
            A2_CR_OI.value = cristalesDATA["CR_OI"].trim() || " ";
  
            A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || " ";
            A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || " ";
  
            validation_Cristal2_od(cristalesDATA["CR_OD"]);
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
          console.log("render");
  
          validacionIncompleta.value.a2_od = false;
          validacionIncompleta.value.a2_oi = false;
  
          A2_CR_OD.value = cristalesDATA["CR_OD"].trim();
          A2_CR_OI.value = cristalesDATA["CR_OI"].trim();
  
          A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"];
          A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"];
  
          if (cristalesDATA["CR_OD"] === "") {
            validation_Cristal2_od("32");
            validation_Cristal2_oi("32");
          } else {
            validation_Cristal2_od(cristalesDATA["CR_OD"]);
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
  