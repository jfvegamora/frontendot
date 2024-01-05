import { validationNivel1, validationNivel2 } from "../views/forms/FOT";
import axios from "axios";
import { URLBackend } from "../hooks/useCrud";

import { Signal, signal } from "@preact/signals-react";
import { validationFechaDespacho, validationFechaEntregaCliente, validationFechaEntregaTaller } from "./validationOT";


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



export const A1_GRUPO = signal("");


export const a1_armazon = signal("")
export const a2_armazon = signal("")
export const a3_armazon = signal("")

export const A1_Diametro = signal("");
export const A2_Diametro = signal("");
export const A1_CR_OD = signal("");
export const A1_CR_OI = signal("");
export const A2_CR_OD = signal("");
export const A2_CR_OI = signal("");


export const A1_DP = signal("");
export const A2_DP = signal("");

export const A1_GRUPO_OD = signal("");
export const A1_GRUPO_OI = signal("");
export const A2_GRUPO_OD = signal("");
export const A2_GRUPO_OI = signal("");


export const punto_venta = signal("");


export const clearSelectInput = signal(true)
export const motivo_ot = signal(false);



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
};

export const actualizarVariable = (name: string, value: any) => {
    console.log('name', name)
    console.log('value', value)
    switch (name) {
        case 'a1_od_esf':
            a1_od_esf.value = value
            break;    
        default:
            break;
    }
};

export const setCodigosCristales = (_cristal:string) =>{
  console.log('cristal')
}

export const buscarCampo = (campo: string) => {
    return validationNivel2.value.find((item) => item.campo === campo);
};

export const clearGrupos = () => {
  A1_GRUPO_OD.value   = "";
  A1_GRUPO_OI.value   = "";
  A2_GRUPO_OD.value   = "";
  A2_GRUPO_OI.value   = "";

  A1_CR_OD.value      = "";
  A1_CR_OI.value      = "";
  A1_CR_OD.value      = "";
  A1_CR_OI.value      = "";

  a1_armazon.value    = "";
  a2_armazon.value    = "";
  a3_armazon.value    = "";

  A1_Diametro.value   = "";
  A2_Diametro.value   = "";

  motivo_ot.value     = false;
}


export const clearDioptrias = () => {

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

    tipo_de_anteojo.value = ""
    validar_parametrizacion.value = "",

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

    console.log(valor)
    campos.forEach((campo) =>{
        const elemento = buscarCampo(campo)
        if(elemento){
            elemento.valor = valor
        }
    })

    // console.log(validationNivel2.value)

};

export const clearInputDioptrias = () => {
     //? A1-OJO-DERECHO
     dioptrias_receta.value.a1_od.esf = " ";
     dioptrias_receta.value.a1_od.cil = " ";
     dioptrias_receta.value.a1_od.eje = " ";
     dioptrias_receta.value.a1_od.ad  = " ";
     
     dioptrias_receta.value.a1_oi.esf  = " ";
     dioptrias_receta.value.a1_oi.cil  = " ";
     dioptrias_receta.value.a1_oi.eje  = " ";
     dioptrias_receta.value.a1_oi.ad   = " ";
     

     //? A2-OJO-DERECHO
     a2_od_esf.value = "  ";
     a2_od_cil.value = "  ";
     a2_od_eje.value = "  ";

     a2_oi_esf.value = "  ";
     a2_oi_cil.value = "  ";
     a2_oi_eje.value = "  ";

     

}
export function validarValor(str:string) {
  const partes = str.split('=');
  
  if (partes.length === 2) {
    const valor = partes[1].trim();
    return valor !== 'undefined' && valor !== '';
  }
  
  return false;
}


export const fetchFechas = async(fecha_atencion:string, codgioProyecto:string) => {
  console.log('ejecutando')
  try {
       const {data} = await axios(`${URLBackend}/api/ot/listado/?query=11&_proyecto=${codgioProyecto}&_fecha_desde=${fecha_atencion}`)
      //  console.log(data[0])
       const parsedData = JSON.parse(data[0]); // Parsear la cadena JSON a objeto

        console.log(parsedData);
        // console.log(parsedData.fecha_entrega_taller);
        // console.log(parsedData.fecha_despacho);
        // console.log(parsedData.fecha_entrega_cliente)
       fecha_atencion_signal.value         = fecha_atencion;
       fecha_entrega_taller.value    = parsedData.fecha_entrega_taller
       fecha_despacho.value          = parsedData.fecha_despacho
       fecha_entrega_cliente.value   = parsedData.fecha_entrega_cliente

       validationFechaEntregaCliente(fecha_entrega_cliente.value)
       validationFechaDespacho(fecha_despacho.value)
       validationFechaEntregaTaller(fecha_entrega_taller.value)
      
      return data         
  } catch (error) {
    console.log('fetchFechasError:', error);
    throw error
  }
}



const fetchDioptrias = async(proyecto:string) => {
  try {

    const requests = [
      axios(`${URLBackend}/api/ot/listado/?query=12&_p3=ESF&_proyecto=${proyecto}`),
      axios(`${URLBackend}/api/ot/listado/?query=12&_p3=CIL&_proyecto=${proyecto}`),
      axios(`${URLBackend}/api/ot/listado/?query=12&_p3=EJE&_proyecto=${proyecto}`),
      axios(`${URLBackend}/api/ot/listado/?query=12&_p3=AD&_proyecto=${proyecto}`)

    ]
    
    const [responseESF, responseCIL, responseEJE, responseAD] = await Promise.all(requests);

    dioptrias.value.ESF = responseESF.data;
    dioptrias.value.CIL = responseCIL.data;
    dioptrias.value.EJE = responseEJE.data;
    dioptrias.value.AD  = responseAD.data;

    console.log(dioptrias.value)
  } catch (error) {
    console.log(error)
    throw error
  }
}


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
  a1_dp: (data:any) => {
    A1_DP.value = Object.values(data)[0] as string;
  },
  a2_dp: (data:any) => {
    A2_DP.value = Object.values(data)[0] as string;
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
    clearInputDioptrias()
  },
  proyecto_codigo: (data:any) => {
    console.log('codigo')
    codigoProyecto.value = (Object.values(data)[0] as string);
    fetchDioptrias(Object.values(data)[0] as string)    
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
  a2_od_esf:true,
  a2_od_cil:true,
  a2_oi_esf:true,
  a2_oi_cil:true
}



//TODO: 

export const existeCliente = async(rut:string) => {
  try {
      const {data} = await axios('')     
      console.log(data)
  } catch (error) {
    console.log(error)
    throw error;
  }
}