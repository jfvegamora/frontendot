import { Signal, signal } from "@preact/signals-react";
import { validationNivel2 } from "../views/forms/FOT";
import axios from "axios";
import { URLBackend } from "../hooks/useCrud";

export const a1_od_esf  = signal(null);
export const a1_od_cil  = signal(null);
export const a1_od_eje  = signal(null);
export const a1_od_ad   = signal(null);


export const a1_oi_esf  = signal(null);
export const a1_oi_cil  = signal(null);
export const a1_oi_eje  = signal(null);
export const a1_oi_ad   = signal(null);


export const a2_od_esf  = signal(null);
export const a2_od_cil  = signal(null);
export const a2_od_eje  = signal(null);



export const a2_oi_esf  = signal(null);
export const a2_oi_cil  = signal(null);
export const a2_oi_eje  = signal(null);

export const tipo_de_anteojo = signal('');
export const validar_parametrizacion = signal("");


//SEÑALES FECHA PARA GENERARLAS A PARTIR DE FECHA_ATECION/QUERY 11 SPOT
export const fecha_despacho = signal("");
export const fecha_entrega_taller = signal("");
export const fecha_entrega_cliente = signal("");



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
      esf:  a1_od_esf ,
      cil: a1_od_cil,
      eje: a1_od_eje,
      ad: a1_od_ad  ,
    },
    a1_oi: {
      esf: a1_oi_esf,
      cil: a1_oi_cil,
      eje: a1_oi_eje,
      ad: a1_oi_ad  ,
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
        section[subfieldKey] = 0;
      }
    
    }
  }
  export function reiniciarA2DioptriasReceta() {
    dioptrias_receta.value.a1_od.ad = 0;
    

    dioptrias_receta.value.a2_od.esf.value = 0;
    dioptrias_receta.value.a2_od.cil.value = 0;
    dioptrias_receta.value.a2_od.eje.value = 0;

    dioptrias_receta.value.a2_oi.esf.value = 0;
    dioptrias_receta.value.a2_oi.cil.value = 0;
    dioptrias_receta.value.a2_oi.eje.value = 0;
  }

export const onchangeDioptrias  = () => {
  dioptrias_receta.value.a2_od.esf = 20
}
export const reiniciarValidationNivel2 = () => {
    validationNivel2.value.forEach((item) => {
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


export const buscarCampo = (campo: string) => {
    return validationNivel2.value.find((item) => item.campo === campo);
};



export const clearDioptrias = () => {

    a1_od_esf.value = null,
    a1_od_cil.value = null,
    a1_od_eje.value = null,
    a1_od_ad.value  = null,

    a1_oi_eje.value = null,
    a1_oi_cil.value = null,
    a1_oi_eje.value = null,
    a1_oi_ad.value  = null,

    a2_od_esf.value = null,
    a2_od_cil.value = null,
    a2_od_eje.value = null,

    a2_oi_esf.value = null,
    a2_oi_cil.value = null,
    a2_oi_eje.value = null

    tipo_de_anteojo.value = ""
    validar_parametrizacion.value = "",

    dioptriasHabilitadas.value.a1_ad = true
    dioptriasHabilitadas.value.a1_alt = true
};



export const clearDioptriasA2 = (valor:number) => {
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

    console.log(validationNivel2.value)

};



export const fetchFechas = async(fecha_atencion:string, codgioProyecto:string) => {
  console.log('ejecutando')
  try {
       const {data} = await axios(`${URLBackend}/api/ot/listado/?query=11&_proyecto=${codgioProyecto}&_fecha_desde=${fecha_atencion}`)
       console.log(data[0])
       console.log(data[0][0])
       console.log(data[0][1])
       console.log(data[0][2])
       
       fecha_entrega_taller.value = data[0][0]
       fecha_despacho.value = data[0][1]
       fecha_entrega_cliente.value =data[0][2]
      
      return data         
  } catch (error) {
    console.log('fetchFechasError:', error);
    throw error
  }
}



// export const validar_por_tipo_anteojo = (estado:string) => {
//     // const adicional1 = buscarCampo('a1_od_ad')
//     // const adicional2 = buscarCampo('a1_oi_ad')
    
//     // const esferico1   = buscarCampo('a2_od_esf')
//     // const cilindrico1 = buscarCampo('a2_od_cil')
//     // const eje1        = buscarCampo('a2_od_eje')
//     // const esferico2   = buscarCampo('a2_oi_esf')
//     // const cilindrico2 = buscarCampo('a2_oi_cil')
//     // const eje2        = buscarCampo('a2_oi_eje')
    
//     const campos = [
//         'a1_od_ad',
//         'a1_oi_ad',
//         'a2_od_esf',
//         'a2_od_cil',
//         'a2_od_eje',
//         'a2_oi_esf',
//         'a2_oi_cil',
//         'a2_oi_eje',
//     ];

//     const anteojo_tipos = ["1","2","7"]


//     console.log(estado)

//     // console.log('true o false', anteojo_tipos.includes(estado))
//     const campoPrueba = validationNivel2.value.find((item) => item.campo === 'a2_od_esf');
    
//     if(campoPrueba){
//         return campoPrueba["valor"] = 10
//     }
//     // console.log(campoPrueba?.valor)
//     // console.log(validationNivel2.value)
//     // console.log('campo prueba', campoPrueba)
//     // console.log(validationNivel2.value)


//     // if (anteojo_tipos.includes(estado)) {
//     //     campos.forEach((campo) => {
//     //       const elemento = buscarCampo(campo);
//     //       if (elemento) {
//     //         elemento.valor = 1;
//     //       }
//     //       console.log(elemento)
//     //     });
//     //   }
//     // if(anteojo_tipos.includes(estado)){
//     //     if(adicional1){
//     //         adicional1.valor = 1
//     //     }

//     //     if(adicional2){
//     //         adicional2.valor = 1
//     //     }
//     //     if(esferico1){
//     //         esferico1.valor = 1
//     //     }
//     //     if(cilindrico1){
//     //         cilindrico1.valor = 1
//     //     }
//     //     if(eje1){
//     //         eje1.valor = 1
//     //     }
//     //     if(esferico2){
//     //         esferico2.valor = 1
//     //     }
//     //     if(cilindrico2){
//     //         cilindrico2.valor = 1
//     //     }
//     //     if(eje2){
//     //         eje2.valor = 1
//     //     }
//     // }

// };


//RE NOMBRAR EL ARCHIVO A UTILS OT Y DEJAR ADEMAS DE LAS SEÑALES DEJAR LAS FUNCONES DE LA OT, TANTO EL ISNERT, UPDATE, E IGUAL LOS SWITHCCASE 
//TANTO LAS DERIVACIONES-PAUSA-PROCESAR
//TAMBIEN AGREGAR ALGUNA FUNCION QUE ESTE DENTRO DEL ONCHANGE DEL FORMULARIO