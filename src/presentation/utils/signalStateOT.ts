import { validationNivel1, validationNivel2, validationNivel3 } from "../views/forms/FOT";
import axios from "axios";
import { URLBackend } from "../hooks/useCrud";

import { Signal, signal } from "@preact/signals-react";
import { validationFechaDespacho, validationFechaEntregaCliente, validationFechaEntregaTaller, validation_Cristal1_od, validation_Cristal1_oi, validation_Cristal2_od, validation_Cristal2_oi } from "./validationOT";
import { EnumGrid } from "../views/mantenedores/MOTHistorica";
import { toast } from "react-toastify";
import { validation_tipo_anteojo } from "./OTReceta_utils";


export const dioptrias:any = signal<any>({
  ESF:[''],
  CIL:[''],
  EJE:[''],
  AD:['']
})


export const codigoProyecto = signal("")

export const a1_od_esf  = signal<any | undefined>(undefined);
export const a1_od_cil  = signal<any | undefined>(undefined);
export const a1_od_eje  = signal<any | undefined>(undefined)
export const a1_od_ad   = signal<any | undefined>(undefined)


export const a1_oi_esf  = signal<any | undefined>(undefined)
export const a1_oi_cil  = signal<any | undefined>(undefined)
export const a1_oi_eje  = signal<any | undefined>(undefined)
export const a1_oi_ad   = signal<any | undefined>(undefined)


export const a2_od_esf  = signal<any>(undefined)
export const a2_od_cil  = signal<any>(undefined)
export const a2_od_eje  = signal<any>(undefined)



export const a2_oi_esf  = signal<any | undefined>(undefined)
export const a2_oi_cil  = signal<any | undefined>(undefined)
export const a2_oi_eje  = signal<any | undefined>(undefined)

export const tipo_de_anteojo          = signal('');
export const validar_parametrizacion  = signal('1');

//SEÑALES FECHA PARA GENERARLAS A PARTIR DE FECHA_ATECION/QUERY 11 SPOT
export const fecha_atencion_signal  = signal("");
export const fecha_despacho         = signal("");
export const fecha_entrega_taller   = signal("");
export const fecha_entrega_cliente  = signal("");

export const cliente_rut            = signal("");





export const a1_armazon = signal("")
export const a2_armazon = signal("")
export const a3_armazon = signal("")

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


export const punto_venta    = signal("");
export const oftalmologo_id = signal("")


export const clearSelectInput = signal(true)
export const motivo_ot = signal(false);


export const cristalesJSONsignal = signal<any>({})
export const armazonesJSONsignal = signal<any>({})

export const isExistClient      = signal(false);
export const isToggleImpression = signal<any>(false);
export const isToggleValidation = signal<any>(false);

//VALIDACIONES

export const validar_armazon1 = signal("");
export const validar_armazon2 = signal("");

export const validar_cristal1_od = signal("");
export const validar_cristal1_oi = signal("");
export const validar_cristal2_od = signal("");
export const validar_cristal2_oi = signal("");



export const excelOTValidationStructure = signal([
  [ 'proyecto', 'varchar(20)', 'NO', 20, 7 ],
  [ 'establecimiento', 'int', 'NO', null, 9 ],
  [ 'cliente', 'varchar(10)', 'NO', 10, 10 ],
  [ 'fecha_atencion', 'date', 'NO', null, 20 ],
  [ 'punto_venta', 'int', 'NO', null, 24 ],
  [ 'cristales1_marca', 'int', 'YES', null, 56 ],
  [ 'cristales1_diseno', 'int', 'YES', null, 58 ],
  [ 'cristales1_indice', 'int', 'YES', null, 60 ],
  [ 'cristales1_material', 'int', 'YES', null,62 ],
  [ 'cristales1_tratamiento', 'int', 'YES', null,64 ],
  [ 'cristales1_color', 'int', 'YES', null,66 ],
  [ 'cristales1_diametro', 'int', 'YES', null,68 ],
])


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



export const dioptrias_receta:Signal<DioptriasReceta> = signal<DioptriasReceta>({
    a1_od: {
      esf:  a1_od_esf,
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
})

export function reiniciarDioptriasReceta() {
    for (const sectionKey in dioptrias_receta.value) {
      const section:any = dioptrias_receta.value[sectionKey] ;

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


export const reiniciarValidationNivel2 = () => {
    validationNivel2.value.forEach((item) => {
      item.valor = 0;
    });
};
export const reiniciarValidationNivel1 = () => {
    validationNivel1.value.forEach((item) => {
      item.valor = 0;
    });



    // console.log(validationNivel1)
};
export const reiniciarValidationNivel3 = () => {
    validationNivel3.value.forEach((item) => {
      item.valor = 0;
    });
};

export const actualizarVariable = (name: string, value: any) => {
    // console.log('name', name)
    // console.log('value', value)
    switch (name) {
        case 'a1_od_esf':
            a1_od_esf.value = value
            break;    
        default:
            break;
    }
};



export const buscarCampo = (campo: string) => {
    return validationNivel2.value.find((item) => item.campo === campo);
};

export const buscarCampoNivel3 = (campo:string) => {
  return validationNivel3.value.find((item)=>item.campo === campo);
}

export const clearGrupos = () => {
  A1_GRUPO_OD.value   = "";
  A1_GRUPO_OI.value   = "";
  A2_GRUPO_OD.value   = "";
  A2_GRUPO_OI.value   = "";

  A1_CR_OD.value      = "";
  A1_CR_OI.value      = "";
  A2_CR_OD.value      = "";
  A2_CR_OI.value      = "";

  A1_DP.value         = "";
  A2_DP.value         = "";
  A1_ALT.value        = "";

  validar_armazon1.value    = "";
  validar_armazon2.value    = "";
  validar_cristal1_od.value = "";
  validar_cristal1_oi.value = "";
  validar_cristal2_od.value = "";
  validar_cristal2_oi.value = "";

  a1_armazon.value    = "";
  a2_armazon.value    = "";
  a3_armazon.value    = "";

  A1_Diametro.value   = "";
  A2_Diametro.value   = "";
  
  oftalmologo_id.value        = "";

  motivo_ot.value          = false;
  isExistClient.value      = false;
  isToggleImpression.value = false;
  isToggleValidation.value = false;
}


export const clearDioptrias = (closeForm?:boolean) => {

    a1_od_esf.value = undefined,
    a1_od_cil.value = undefined,
    a1_od_eje.value = undefined,
    a1_od_ad.value  = undefined,

    a1_oi_eje.value = undefined,
    a1_oi_cil.value = undefined,
    a1_oi_eje.value = undefined,
    a1_oi_ad.value  = undefined,

    a2_od_esf.value = undefined,
    a2_od_cil.value = undefined,
    a2_od_eje.value = undefined,

    a2_oi_esf.value = undefined,
    a2_oi_cil.value = undefined,
    a2_oi_eje.value = undefined

    tipo_de_anteojo.value          = ""
    validar_parametrizacion.value  = "1"
    
    
    if(closeForm){
      codigoProyecto.value           = ""
      fecha_atencion_signal.value    = "";
      fecha_despacho.value           = "";
      fecha_entrega_cliente.value    = "";
      fecha_entrega_taller.value     = "";
    }


    dioptriasHabilitadas.value.a1_ad = true
    dioptriasHabilitadas.value.a1_alt = true
};



export const clearDioptriasA2 = (valor:any) => {
    const campos = [
        'a2_od_esf',
        'a2_od_cil',
        'a2_od_eje',
        'a2_oi_esf',
        'a2_oi_cil',
        'a2_oi_eje',
    ]

    // console.log(valor)
    campos.forEach((campo) =>{
        const elemento = buscarCampo(campo)
        if(elemento){
            elemento.valor = valor
        }
    })

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


export function validarValor(str:string) {
  const partes = str.split('=');
  
  if (partes.length === 2) {
    const valor = partes[1].trim();
    return valor !== 'undefined' && valor !== '';
  }
  
  return false;
}


export const fetchFechas = async(fecha_atencion:string, codgioProyecto:string) => {
  // console.log('ejecutando')
  try {
       const {data} = await axios(`${URLBackend}/api/ot/listado/?query=11&_proyecto=${codgioProyecto}&_fecha_desde=${fecha_atencion}`)
       console.log(data)
       if(data && data[0] === undefined){
        console.log(data)
        return ;
       }


       const parsedData = JSON.parse(data[0]); // Parsear la cadena JSON a objeto

       fecha_atencion_signal.value   = fecha_atencion;
       fecha_entrega_taller.value    = parsedData.fecha_entrega_taller
       fecha_despacho.value          = parsedData.fecha_despacho
       fecha_entrega_cliente.value   = parsedData.fecha_entrega_cliente

  
       validationFechaEntregaCliente(fecha_entrega_cliente.value)
       validationFechaDespacho(fecha_despacho.value)
       validationFechaEntregaTaller(fecha_entrega_taller.value)
      
      return data         
  } catch (error) {
    // console.log('fetchFechasError:', error);
    throw error
  }
}



// const fetchDioptrias = async(_proyecto:string) => {
//   try {

//     // const requests = [
//     //   axios(`${URLBackend}/api/ot/listado/?query=12&_p3=ESF&_proyecto=${proyecto}`),
//     //   axios(`${URLBackend}/api/ot/listado/?query=12&_p3=CIL&_proyecto=${proyecto}`),
//     //   axios(`${URLBackend}/api/ot/listado/?query=12&_p3=EJE&_proyecto=${proyecto}`),
//     //   axios(`${URLBackend}/api/ot/listado/?query=12&_p3=AD&_proyecto=${proyecto}`)
//     // ]
    
//     // const [responseESF, responseCIL, responseEJE, responseAD] = await Promise.all(requests);

//     // dioptrias.value.ESF = responseESF.data;
//     // dioptrias.value.CIL = responseCIL.data;
//     // dioptrias.value.EJE = responseEJE.data;
//     // dioptrias.value.AD  = responseAD.data;
//     // dioptrias.value.ESF = ''
//     // dioptrias.value.CIL = ''
//     // dioptrias.value.EJE = ''
//     // dioptrias.value.AD  = ''

    
//     // console.log(dioptrias.value)
//   } catch (error) {
//     // console.log(error)
//     throw error
//   }
// }


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
export const inputChangeActions:InputChangeActions = {
  cristal1_od: (data:any) => {
    A1_CR_OD.value = Object.values(data)[0] as string;
  },
  cristal1_oi: (data:any) => {
    A1_CR_OI.value = Object.values(data)[0] as string;
  },
  cristal2_od: (data:any) => {
    A2_CR_OD.value = Object.values(data)[0] as string;
  },
  cristal2_oi: (data:any) => {
    A2_CR_OI.value = Object.values(data)[0] as string;
  },
  a1_alt: (data:any) => {
    A1_ALT.value = Object.values(data)[0] as any;
  },
  a1_dp: (data:any) => {
    A1_DP.value = Object.values(data)[0] as string;
  },
  a2_dp: (data:any) => {
    A2_DP.value = Object.values(data)[0] as string;
  },
  oftalmologo_id: (data:any) => {
    oftalmologo_id.value = Object.values(data)[0] as string;
  },
  cristal1_diametro: (data:any) =>{
    A1_Diametro.value = Object.values(data)[0] as string;
  },
  cristal2_diametro: (data:any) =>{
    A2_Diametro.value = Object.values(data)[0] as string;
  },
  a1_armazon_id: (data:any) => {
    a1_armazon.value = Object.values(data)[0] as string;
  },
  a2_armazon_id: (data:any) => {
    a2_armazon.value = Object.values(data)[0] as string;
  },
  a3_armazon_id: (data:any) => {
    a3_armazon.value = Object.values(data)[0] as string;
  },
  tipo_anteojo_id: (data:any) => {
    tipo_de_anteojo.value = Object.values(data)[0] as string
    // clearInputDioptrias()
    validation_tipo_anteojo()
  },
  proyecto_codigo: (data:any) => {
    codigoProyecto.value = (Object.values(data)[0] as string);
    
  },
  punto_venta_id: (data:any) => {
    punto_venta.value = (Object.values(data)[0] as string);
  }

}


//TODO:  ESTRUCTURA PARA TRAER CODIGOS DE CRISTALES + GRUPO DE ANTEOJO 1
export const changeCodigoCristal_A1:any = {
  cristal1_marca_id: true,
  cristal1_diseno_id:true,
  cristal1_indice_id:true,
  cristal1_material_id:true,
  cristal1_color_id:true,
  cristal1_tratamiento_id:true,
  cristal1_diametro:true,
  a1_od_esf:true,
  a1_od_cil:true,
  a1_oi_esf:true,
  a1_oi_cil:true
}

//TODO:  ESTRUCTURA PARA TRAER CODIGOS DE CRISTALES + GRUPO DE ANTEOJO 2
export const changeCodigoCristal_A2:any = {
  cristal2_marca_id: true,
  cristal2_diseno_id:true,
  cristal2_indice_id:true,
  cristal2_material_id:true,
  cristal2_color_id:true,
  cristal2_tratamiento_id:true,
  cristal2_diametro:true,
  // a1_od_esf:true,
  // a1_od_cil:true,
  // a1_oi_esf:true,
  // a1_oi_cil:true,

  a2_od_esf:true,
  a2_od_cil:true,
  a2_oi_esf:true,
  a2_oi_cil:true
}

export const getGrupoCristales_A1 = async(formValue:any, data:any, setErrorGrupoDioptriaA1:any, setChangeboolean:any, isEditting:boolean, setErrorGrupoDioptriaA2:any) => {
  
  const {cristal1_marca_id, cristal1_diseno_id, cristal1_indice_id, cristal1_color_id , cristal1_material_id,cristal1_tratamiento_id } = formValue;

  
  if((cristal1_marca_id                       !== undefined  || data?.[EnumGrid.cristal1_marca_id]    !== undefined) &&
         (cristal1_diseno_id                      !== undefined  || data?.[EnumGrid.cristal1_diseno_id]   !== undefined) &&
         (cristal1_indice_id                      !== undefined  || data?.[EnumGrid.cristal1_indice_id]   !== undefined) && 
         (cristal1_color_id                       !== undefined  || data?.[EnumGrid.cristal1_color_id]    !== undefined) &&
         (cristal1_material_id                    !== undefined  || data?.[EnumGrid.cristal1_material_id] !== undefined) &&
         (cristal1_tratamiento_id                 !== undefined  || data?.[EnumGrid.cristal1_tratamiento_id] !== undefined)&&
        A1_Diametro.value.toString().trim()       !== ''        &&
        dioptrias_receta.value.a1_od.esf          !== ' '       &&
        dioptrias_receta.value.a1_od.cil          !== ' '       &&
        dioptrias_receta.value.a1_oi.esf          !== ' '       &&
        dioptrias_receta.value.a1_oi.cil          !== ' '
      ){

        // console.log('ejecutando llamada...')
        // console.log('ejecutando llamada...')

        if(dioptrias_receta.value.a1_od.cil > 0 || dioptrias_receta.value.a1_oi.cil > 0){
          return;
        }

        const _pkToDelete1_od ={
          "marca":      cristal1_marca_id       || data?.[EnumGrid.cristal1_marca_id],
          "diseno":     cristal1_diseno_id      || data?.[EnumGrid.cristal1_diseno_id],
          "indice":     cristal1_indice_id      || data?.[EnumGrid.cristal1_indice_id],
          "material":   cristal1_material_id    || data?.[EnumGrid.cristal1_material_id],
          "color":      cristal1_color_id       || data?.[EnumGrid.cristal1_color_id],
          "tratamiento":cristal1_tratamiento_id || data?.[EnumGrid.cristal1_tratamiento_id],
          "diametro":   A1_Diametro.value,
          "esferico":   dioptrias_receta.value.a1_od.esf ?? 0, 
          "cilindrico": dioptrias_receta.value.a1_od.cil ?? 0,
          // "punto_venta": punto_venta || data?.[EnumGrid.punto_venta] ,
          "punto_venta": punto_venta.value,
        }


         console.log(_pkToDelete1_od)
        
        const _pkToDelete1_oi ={
          "marca":      cristal1_marca_id       || data?.[EnumGrid.cristal1_marca_id],
          "diseno":     cristal1_diseno_id      || data?.[EnumGrid.cristal1_diseno_id],
          "indice":     cristal1_indice_id      || data?.[EnumGrid.cristal1_indice_id],
          "material":   cristal1_material_id    || data?.[EnumGrid.cristal1_material_id],
          "color":      cristal1_color_id       || data?.[EnumGrid.cristal1_color_id],
          "tratamiento":cristal1_tratamiento_id || data?.[EnumGrid.cristal1_tratamiento_id],
          "diametro":   A1_Diametro.value,
          "esferico":   dioptrias_receta.value.a1_oi.esf ?? 0,
          "cilindrico": dioptrias_receta.value.a1_oi.cil ?? 0, 
          "punto_venta": punto_venta.value,
        }

        console.log(_pkToDelete1_oi)



        try {
          const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
          const encodedJSON = encodeURIComponent(pkJSON)

          // console.log(encodedJSON)
          
          const {data:cristalesDataOD} = await axios(`${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`)
          
          const cristalesDATA = JSON.parse(cristalesDataOD[0][0])
          // console.log(cristalesDATA)

          if(cristalesDATA && cristalesDATA["ERROR"] !== ''){
            setErrorGrupoDioptriaA1(cristalesDATA["ERROR"]);
            // console.log('hay error')
            // console.log(cristalesDATA)
            //   console.log('render')
            //   toast.error(cristalesDATA["ERROR"])

            // // toast.error(cristalesDATA["ERROR"])


            A1_CR_OD.value = " ";
            A1_CR_OI.value = " ";

            A1_GRUPO_OD.value    = " ";
            A1_GRUPO_OI.value    = " ";

            

            validation_Cristal1_od("")
            validation_Cristal1_oi("")
            // setErrorGrupoDioptriaA1("")
            // setErrorGrupoDioptriaA1('')
          }else{
            // console.log(cristalesDATA)
            A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
            A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   "
            // A1_GRUPO.value = cristalesDATA["GRUPO"]
  
            A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  "
            A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  "
            
            validation_Cristal1_od(cristalesDATA["CR_OD"])
            validation_Cristal1_oi(cristalesDATA["CR_OI"])
            setChangeboolean((prev:boolean)=>!prev)

            // console.log(key)
            if(tipo_de_anteojo.value === '3' && isEditting){
              getGrupoCristales_A2(formValue, data, setErrorGrupoDioptriaA2, setChangeboolean)
            }



          }

        } catch (error) {
          // console.log(error)
          throw error
        }  
      }
}


export const getGrupoCristales_A2 = async(formValue:any, data:any, setErrorGrupoDioptriaA2:any, setChangeboolean:any) => {

  const {cristal2_marca_id, cristal2_diseno_id, cristal2_indice_id, cristal2_color_id , cristal2_material_id,cristal2_tratamiento_id } = formValue;


  if((cristal2_marca_id                    !== undefined   || data?.[EnumGrid.cristal2_marca_id]          !== undefined) &&
  (cristal2_diseno_id                      !== undefined   || data?.[EnumGrid.cristal2_diseno_id]         !== undefined) &&
  (cristal2_indice_id                      !== undefined   || data?.[EnumGrid.cristal2_indice_id]         !== undefined) && 
  (cristal2_color_id                       !== undefined   || data?.[EnumGrid.cristal2_color_id]          !== undefined) &&
  (cristal2_material_id                    !== undefined   || data?.[EnumGrid.cristal2_material_id]       !== undefined) &&
  (cristal2_tratamiento_id                 !== undefined   || data?.[EnumGrid.cristal2_tratamiento_id]    !== undefined) &&
  (A2_Diametro.value.toString().trim()     !== ''           ) &&
  dioptrias_receta.value.a2_od.esf         !== '  '          &&
  dioptrias_receta.value.a2_od.cil         !== '  '        
  // (a2_od_esf.value                          !== '  ')        &&
  // (a2_od_cil.value                          !== '  ')        
  ){
  console.log('ejecutando llamada.....')
  const _pkToDelete1_od ={
    "marca":      cristal2_marca_id        || data?.[EnumGrid.cristal2_marca_id],
    "diseno":     cristal2_diseno_id       || data?.[EnumGrid.cristal2_diseno_id],
    "indice":     cristal2_indice_id       || data?.[EnumGrid.cristal2_indice_id],
    "material":   cristal2_material_id     || data?.[EnumGrid.cristal2_material_id],
    "color":      cristal2_color_id        || data?.[EnumGrid.cristal2_color_id],
    "tratamiento":cristal2_tratamiento_id  || data?.[EnumGrid.cristal2_tratamiento_id],
    "diametro":   A2_Diametro.value,
    "esferico":   a2_od_esf.value ?? 0, 
    "cilindrico": a2_od_cil.value ?? 0,
    "punto_venta": punto_venta.value,
  }


  console.log(_pkToDelete1_od)
  
  const _pkToDelete1_oi ={
    "marca":      cristal2_marca_id          || data?.[EnumGrid.cristal2_marca_id],
    "diseno":     cristal2_diseno_id         || data?.[EnumGrid.cristal2_diseno_id],
    "indice":     cristal2_indice_id         || data?.[EnumGrid.cristal2_indice_id],
    "material":   cristal2_material_id       || data?.[EnumGrid.cristal2_material_id],
    "color":      cristal2_color_id          || data?.[EnumGrid.cristal2_color_id],
    "tratamiento":cristal2_tratamiento_id    || data?.[EnumGrid.cristal2_tratamiento_id],
    "diametro":   A2_Diametro.value,
    "esferico":   a2_oi_esf.value ?? 0,
    "cilindrico": a2_oi_cil.value ?? 0, 
    "punto_venta": punto_venta.value,
  }

  console.log(_pkToDelete1_oi)



  try {
    const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
    const encodedJSON = encodeURIComponent(pkJSON)

  

    const {data:cristalesDataOI} = await axios(`${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`)
    
    const cristalesDATA = JSON.parse(cristalesDataOI[0][0])
    console.log(cristalesDATA)

    if(cristalesDATA && cristalesDATA["ERROR"] !== ''){
      console.log('render')
      return setErrorGrupoDioptriaA2(cristalesDATA["ERROR"])
    }else{
      console.log('render')
      A2_CR_OD.value = cristalesDATA["CR_OD"].trim();
      A2_CR_OI.value = cristalesDATA["CR_OI"].trim();

      A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"];
      A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"];

      validation_Cristal2_od(cristalesDATA["CR_OD"]);
      validation_Cristal2_oi(cristalesDATA["CR_OI"]);             

      setChangeboolean((prev:boolean)=>!prev)
    }  
  } catch (error) {
    // console.log(error)
    throw error
  }

}

}




export const updateOT =async (
  jsonData:any,
  _origen:any,
  _destino:any,
  _estado:number,
  _formValues:any,
  data:any,
  cristalOri:any,
  armazonOri:any,
  user:any,
  _obs?:string,
  isMasivo?:boolean,
  situacion?:any,
)  => {

  // console.log(jsonData)
  // console.log(_formValues)
  // console.log(data)

  let folio = data?.[EnumGrid.folio]

  console.log(folio)
  console.log(_estado)


  

  let motivo = data && data[EnumGrid.motivo] === 'Garantía' ? 2 : 1;
  //TODO: INICIO PROCESAR MASIVO
  if(isMasivo){
    
    const query = {
      query: "04",
      _p1:`area=${_destino}` ,
      _p2: tipo_de_anteojo.value,
      _p3: "",
      _proyecto: data && data.proyecto,
      _folio: `${data && data.folio}` ,
      _origen: _origen.toString(),
      _rut: ``,
      _destino: _destino.toString(),
      _estado:_estado.toString(), 
      _usuario:`${user}`,
      _situacion: situacion || "0",
      _obs: "",
      _cristalesJSON: JSON.stringify(data.cristales),
      _armazonesJSON: JSON.stringify(data.armazones),
      _punto_venta: `${data.punto_venta}`,
      _cristalJSONOri: JSON.stringify(data.cristales),
      _armazonJSONOri: JSON.stringify(data.armazones),
      _motivo:  `${motivo}`
    }

    // console.log(query)
    try {
      const response = await axios.post(`${URLBackend}/api/ot/editar/`, query)
  
      if(response.status === 200){
        return toast.success(`OT ${_estado === 20 ? 'Procesada' : 'Pausada'} Correctamente, Folio: ${folio}`)
      }else{
        return toast.error('Error al Editar OT')
      }
    } catch (error) {
      // console.log(error)
  
    }
    return;
  }
//TODO: FIN PROCESAR MASIVO

  let estado_impresion = data && data[EnumGrid.estado_impresion_id];
  let estado_validacion = data && data[EnumGrid.validar_parametrizacion_id];
  console.log(A2_CR_OI.value)
  console.log(typeof A2_CR_OI.value)
  console.log(data?.[EnumGrid.cristal2_oi])
  console.log(typeof A2_CR_OI.value   !== 'object'    ? A2_CR_OI.value  : _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal2_oi"]))

  console.log()
  // let _rut = ""
  let _p3 = ""



  const fields = [
    `motivo=${motivo}`,
    `area=${_destino}`,
    `estado=${_estado}`,
    `validar_parametrizacion="${_estado                                                                                                                  === 40        ? (isToggleValidation.value ? 1 : 0 )  : estado_validacion}"`,
    `estado_impresion="${_estado                                                                                                                         === 40        ? (isToggleImpression.value ? 1 : 0 ) : estado_impresion}"`,
    `proyecto="${jsonData.proyecto_codigo                                                                                                                !== undefined ? jsonData.proyecto_codigo : codigoProyecto.value}"`,
    (`establecimiento=${data && data[EnumGrid.establecimiento_id]                                                                                        !== undefined ? data[EnumGrid.establecimiento_id] : 0 }`),
    (`cliente="${!cliente_rut.value.trim()                                                                                                               === false     ? cliente_rut.value : "" }"`),
    (`fecha_atencion="${!fecha_atencion_signal.value.trim()                                                                                              === false     ? fecha_atencion_signal.value : "" }"`),
    (`fecha_entrega_taller="${!fecha_entrega_taller.value.trim()                                                                                         === false     ? fecha_entrega_taller.value : "" }"`),
    (`fecha_despacho="${!fecha_despacho.value.trim()                                                                                                     === false     ? fecha_despacho.value : "" }"`),
    (`fecha_entrega_cliente="${!fecha_entrega_cliente.value.trim()                                                                                       === false     ? fecha_entrega_cliente.value : ""}"`),
    (`punto_venta=${jsonData.punto_venta_id                                                                                                              !== undefined ? jsonData.punto_venta_id : data[EnumGrid.punto_venta_id] }`),
    (`numero_receta=${data && data[EnumGrid.numero_receta]                                                                                               !== undefined ? data[EnumGrid.numero_receta] : 0 }`),
    (`fecha_receta="${jsonData.fecha_receta                                                                                                              !== undefined ? jsonData.fecha_receta : "" }"`),
    (`tipo_anteojo=${!tipo_de_anteojo.value.trim()                                                                                                       === false     ? tipo_de_anteojo.value : 0 }`),


    (`a1_od_esf=${typeof dioptrias_receta.value.a1_od.esf                                                                                                !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_od.esf) ? dioptrias_receta.value.a1_od.esf : null }`),
    (`a1_od_cil=${typeof dioptrias_receta.value.a1_od.cil                                                                                                !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_od.cil) ? dioptrias_receta.value.a1_od.cil : null }`),
    (`a1_od_eje=${typeof dioptrias_receta.value.a1_od.eje                                                                                                !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_od.eje) ? dioptrias_receta.value.a1_od.eje : null }`),
    (`a1_od_ad =${tipo_de_anteojo.value === '3'                                                                                                          ? ((typeof dioptrias_receta.value.a1_od.ad !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_od.ad)) ? dioptrias_receta.value.a1_od.ad  : 0 ) : ((typeof dioptrias_receta.value.a1_od.ad !== 'string' && !Number.isNaN(dioptrias_receta.value.a1_od.ad)) ) ? dioptrias_receta.value.a1_od.ad  : 0}`),
    (`a1_oi_esf=${typeof dioptrias_receta.value.a1_oi.esf                                                                                                !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? dioptrias_receta.value.a1_oi.esf : null }`),
    (`a1_oi_cil=${typeof dioptrias_receta.value.a1_oi.cil                                                                                                !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_oi.cil) ? dioptrias_receta.value.a1_oi.cil : null }`),
    (`a1_oi_eje=${typeof dioptrias_receta.value.a1_oi.eje                                                                                                !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_oi.eje) ? dioptrias_receta.value.a1_oi.eje : null }`),
    (`a1_oi_ad =${typeof dioptrias_receta.value.a1_oi.ad                                                                                                 !== 'object' && !Number.isNaN(dioptrias_receta.value.a1_oi.ad)  ? dioptrias_receta.value.a1_oi.ad  : null }`),
    (`a1_dp=${_formValues && _formValues["receta"]  && _formValues["receta"]["a1_dp"]                                                                    !== undefined ? _formValues["receta"] && parseInt(_formValues["receta"]["a1_dp"])  : data && data[EnumGrid.a1_dp]}`),
    (`a1_alt=${_formValues && _formValues["receta"] && _formValues["receta"]["a1_alt"]                                                                   !== undefined ? _formValues["receta"] && parseInt(_formValues["receta"]["a1_alt"]) : data && data[EnumGrid.a1_alt]}`),


    `a1_grupo_od="${typeof A1_GRUPO_OD.value                                                                                                             !== 'object' ? A1_GRUPO_OD.value : ""}"`,
    `a1_grupo_oI="${typeof A1_GRUPO_OI.value                                                                                                             !== 'object' ? A1_GRUPO_OI.value : ""}"`,
    
    (`a2_od_esf=${typeof a2_od_esf.value                                                                                                                 !== 'object' ? a2_od_esf.value : null }`),
    (`a2_od_cil=${typeof a2_od_cil.value                                                                                                                 !== 'object' ? a2_od_cil.value : null }`),
    (`a2_od_eje=${typeof a2_od_eje.value                                                                                                                 !== 'object' ? a2_od_eje.value : null }`),
    (`a2_oi_esf=${typeof a2_oi_esf.value                                                                                                                 !== 'object' ? a2_oi_esf.value : null }`),
    (`a2_oi_cil=${typeof a2_oi_cil.value                                                                                                                 !== 'object' ? a2_oi_cil.value : null }`),
    (`a2_oi_eje=${typeof a2_oi_eje.value                                                                                                                 !== 'object' ? a2_oi_eje.value : null }`),
    (`a2_dp=${_formValues && _formValues["receta"] && _formValues["receta"]["a2_dp"]                                                                     !== undefined ? _formValues["receta"] && parseInt(_formValues["receta"]["a2_dp"]) : data && data[EnumGrid.a2_dp]}`),

    
    `a2_grupo_od="${typeof A2_GRUPO_OD.value                                                                                                             !== 'object' ? A2_GRUPO_OD.value : ""}"`,
    `a2_grupo_oI="${typeof A2_GRUPO_OI.value                                                                                                             !== 'object' ? A2_GRUPO_OI.value : ""}"`,
    
    
    (`anteojo1_opcion_vta=${0}`),                                                         
    (`anteojo1_armazon="${typeof a1_armazon.value                                                                                                        !== 'object' ? a1_armazon.value : "" }"`),
    (`anteojo2_opcion_vta=${0}`),
    (`anteojo2_armazon="${typeof a2_armazon.value                                                                                                        !== 'object' ? a2_armazon.value : "" }"`),
    (`anteojo3_opcion_vta=${0}`),
    (`anteojo3_armazon="${typeof a3_armazon.value                                                                                                        !== 'object' ? a3_armazon.value : "" }"`),

    (`cristales1_opcion_vta=${0}`),
    (`cristales1_marca=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_marca_id"]                                        !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_marca_id"])                 : data && data[EnumGrid.cristal1_marca_id]}`),
    (`cristales1_diseno=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_diseno_id"]                                      !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_diseno_id"])                : data && data[EnumGrid.cristal1_diseno_id]}`),
    (`cristales1_indice=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_indice_id"]                                      !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_indice_id"])                : data && data[EnumGrid.cristal1_indice_id]}`),
    (`cristales1_material=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_material_id"]                                  !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_material_id"])              : data && data[EnumGrid.cristal1_material_id]}`),
    (`cristales1_tratamiento=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_tratamiento_id"]                            !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_tratamiento_id"])           : data && data[EnumGrid.cristal1_tratamiento_id]}`),
    (`cristales1_color=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_color_id"]                                        !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_color_id"])                 : data && data[EnumGrid.cristal1_color_id]  }`),
    (`cristales1_diametro=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_diametro"]                                     !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_diametro"])                 : data && data[EnumGrid.cristal1_diametro] }`),
    (`cristales1_od="${typeof A1_CR_OD.value                                                                                                             !== 'object'  ? A1_CR_OD.value                                                                                      : jsonData.cristal1_od}"`),
    (`cristales1_oi="${typeof A1_CR_OI.value                                                                                                             !== 'object'  ? A1_CR_OI.value                                                                                      : jsonData.cristal1_oi }"`),
    (`cristales1_tratamiento_adicional=${_formValues && _formValues["cristales"] && _formValues["cristales"]["cristal1_tratamiento_adicional_id"]        !== undefined ? _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal1_tratamiento_adicional_id"]) : data && data[EnumGrid.cristal1_tratamiento_adicional_id]}`),

    
    (`cristales2_opcion_vta=${0}`),
    (`cristales2_marca=${typeof jsonData.cristal2_marca_id                                                                                               === 'undefined' ? data && data[EnumGrid.cristal2_marca_id]                 : parseInt(jsonData.cristal2_marca_id)}`),
    (`cristales2_diseno=${typeof jsonData.cristal2_diseno_id                                                                                             === 'undefined' ? data && data[EnumGrid.cristal2_diseno_id]                : parseInt(jsonData.cristal2_diseno_id) }`),
    (`cristales2_indice=${typeof jsonData.cristal2_indice_id                                                                                             === 'undefined' ? data && data[EnumGrid.cristal2_indice_id]                : parseInt(jsonData.cristal2_indice_id) }`),
    (`cristales2_material=${typeof jsonData.cristal2_material_id                                                                                         === 'undefined' ? data && data[EnumGrid.cristal2_material_id]              : parseInt(jsonData.cristal2_material_id)}`),
    (`cristales2_tratamiento=${typeof jsonData.cristal2_tratamiento_id                                                                                   === 'undefined' ? data && data[EnumGrid.cristal2_tratamiento_id]           : parseInt(jsonData.cristal2_tratamiento_id) }`),
    (`cristales2_color=${typeof jsonData.cristal2_color_id                                                                                               === 'undefined' ? data && data[EnumGrid.cristal2_color_id]                 : parseInt(jsonData.cristal2_color_id)}`),
    (`cristales2_od="${A2_CR_OD.value.trim()                                                                                                             === ''          ? data?.[EnumGrid.cristal2_od]                             : (A2_CR_OD.value.trim() || _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal2_od"]))}"`),
    (`cristales2_oi="${A2_CR_OI.value.trim()                                                                                                             === ''          ? data?.[EnumGrid.cristal2_oi]                             : (A2_CR_OI.value.trim() || _formValues["cristales"] && parseInt(_formValues["cristales"]["cristal2_oi"]))}"`),
    (`cristales2_tratamiento_adicional=${typeof jsonData.cristal2_tratamiento_adicional_id                                                               === 'undefined' ? data && data[EnumGrid.cristal2_tratamiento_adicional_id] : parseInt(jsonData.cristal2_tratamiento_adicional_id)}`),
    
    
    (`motivo_garantia=${data && data[EnumGrid.motivo_garantia_id]                                                                                        ? data && data[EnumGrid.motivo_garantia_id]       : 0 }`),
    (`folio_asociado="${data && data[EnumGrid.folio_asociado]                                                                                            ? data && data[EnumGrid.folio_asociado]           : "" }"`),
    // (`resolucion_garantia=${data && data[EnumGrid.resolucion_garantia_id]                                                                                !== undefined ? (jsonData.resolucion_garantia_id === 'Rechazada' ? 2 :1) : 0 }`),
    (`resolucion_garantia=${data && data[EnumGrid.resolucion_garantia_id]                                                                                ? data && data[EnumGrid.resolucion_garantia_id]   : 0 }`),
    (`worktracking="${data && data[EnumGrid.worktracking]                                                                                                ? data && data[EnumGrid.worktracking]             : "" }"`),
    (`nota_venta="${data && data[EnumGrid.nota_venta]                                                                                                    ? data && data[EnumGrid.nota_venta]               : "" }"`),
    (`numero_reporte_firma=${data && data[EnumGrid.numero_reporte_firma]                                                                                 ? data && data[EnumGrid.numero_reporte_firma]     : 0 }`),
    (`numero_reporte_atencion=${data && data[EnumGrid.numero_reporte_atencion]                                                                           ? data && data[EnumGrid.numero_reporte_atencion]  : 0 }`),
    (`numero_oc="${data && data[EnumGrid.numero_oc]                                                                                                      ? data && data[EnumGrid.numero_oc]                : "" }"`),
    (`numero_guia=${data && data[EnumGrid.numero_guia]                                                                                                   ? data && data[EnumGrid.numero_guia]              : 0 }`),
    (`numero_factura=${data && data[EnumGrid.numero_factura]                                                                                             ? data && data[EnumGrid.numero_factura]           : 0 }`),
    (`folio_interno_mandante="${data && data[EnumGrid.folio_interno_mandante]                                                                            ? data && data[EnumGrid.folio_interno_mandante]   : "" }"`),
    (`reporte_interno_mandante="${data && data[EnumGrid.reporte_interno_mandante]                                                                        ? data && data[EnumGrid.reporte_interno_mandante] : "" }"`),
    (`observaciones="${_formValues["receta"] && _formValues["receta"]["observaciones"]                                                                   ? _formValues["receta"]["observaciones"]          : data && data[EnumGrid.observaciones]}"`),
    
  
  ];
  
  const cristales = [
    { codigo: `${A1_CR_OD.value}` },
    { codigo: `${A1_CR_OI.value}` },
    { codigo: `${A2_CR_OD.value}` },
    { codigo: `${A2_CR_OI.value}` }
  ]
    .map(item => {
      const numero = parseFloat(item.codigo);
      if (!isNaN(numero) && numero !== 0 &&numero !== null) {
        return { 'codigo': `${numero}` };
      }
      return null; 
    })
    .filter(item => item !== null);

  const _cristalesJSON = JSON.stringify(cristales)
  const armazones = [
    { codigo: `${a1_armazon.value}` },
    { codigo: `${a2_armazon.value}` },
  ]
    .map(item => {
      const numero = parseFloat(item.codigo);
      if (!isNaN(numero) && numero !== 0 && numero !== null ) {
        return { codigo: `${numero}` };
      }
      return null; 
    })
    .filter(item => item !== null);
const _armazonesJSON = JSON.stringify(armazones)

  const filteredFields = fields
                          .map((a)=>a.split('='))
                          .filter((prev)=>prev[1] !== 'undefined')
                          .map((parts) => parts.join('='));
  
    // console.log(_estado)

  let _p1 = filteredFields.join(',');    
  _p1 = _p1.replace(/'/g, '!');


    // console.log(_estado)
    // console.log(_origen)
    // console.log(_destino)

  const query = {
    query: "04",
    _p1,
    _p2:tipo_de_anteojo.value,
    _p3: _p3 || "",
    _proyecto: `${codigoProyecto.value}`,
    _folio: `${data && data[EnumGrid.folio]}` ,
    // _origen : _origen.toString(),
    _origen : _origen.toString(),
    _rut: `${cliente_rut.value}`,
    _destino: _destino.toString(),
    _estado:_estado.toString(), 
    // _usuario:User["id"].toString(),
    _usuario:user,
    _situacion:situacion || "0",
    _obs: _obs ? _obs : "",
    _cristalesJSON,
    _armazonesJSON,
    _punto_venta: `${jsonData.punto_venta_id || data[EnumGrid.punto_venta_id]}`,
    _motivo: `${motivo}`,
    // _cristalJSONOri: JSON.stringify(OTSlice.cristales),
    // _armazonJSONOri: JSON.stringify(OTSlice.armazones)
    _cristalJSONOri: JSON.stringify(cristalOri),
    _armazonJSONOri: JSON.stringify(armazonOri)
    

  };
  // console.log(_p1)
  // console.log(query)
  try {
    const response = await axios.post(`${URLBackend}/api/ot/editar/`, query)

    // console.log(response)
    if(response.status === 200){
      return toast.success('OT Editada Correctamente')
    }else{
      return toast.error('Error al Editar OT')
    }
  } catch (error) {
    // console.log(error)

  }


}




export function formatNumberWithZeros(inputNumber: number): string {
  // Convierte el número a cadena y obtén su longitud
  const numberString = String(inputNumber);
  const length = numberString.length;

  // Calcula la cantidad de ceros necesarios
  const zerosToAdd = Math.max(0, 10 - length);

  // Concatena los ceros a la izquierda y el número original
  const formattedNumber = '0'.repeat(zerosToAdd) + numberString;

  return formattedNumber;
}





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
