import { signal } from "@preact/signals-react"
import { A2_CR_OD, A2_CR_OI, DioptriasReceta, buscarCampo,  clearDioptriasA2, clearSelectInput, dioptrias_receta, reiniciarA2DioptriasReceta, tipo_de_anteojo } from "."
import { validationNivel2 } from "../views/forms/FOT"


export const deshabilitarCampo = signal({
    a1_ad:true,
    a1_alt:true,
    a2_dp:true
});


export const setTipoAnteojo = (value:any) => {
        const anteojo_tipos = ["1","2","7"]
        tipo_de_anteojo.value = value
        if(anteojo_tipos.includes(tipo_de_anteojo.value)){
          clearDioptriasA2(1)
          reiniciarA2DioptriasReceta()
        }else{
          // clearDioptriasA2(0)
        }
};


export const setDioptriasReceta = (name:string, value:any) =>{
    const [prefix, section, subfield] = name.split('_') as [string, keyof DioptriasReceta, keyof DioptriasReceta[keyof DioptriasReceta]];
    const completeSection = `${prefix}_${section}` as keyof DioptriasReceta

        if(completeSection in dioptrias_receta.value && subfield in dioptrias_receta.value[completeSection]) {
            dioptrias_receta.value[completeSection][subfield] = parseFloat(value);
        }

};




export const validation_tipo_anteojo = () => {
  const camposAValidar = [
      'a1_od_ad', 'a1_oi_ad', 'a1_alt', 'a1_dp', 'a2_dp',
      'a2_od_esf', 'a2_od_cil', 'a2_od_eje', 'a2_oi_esf', 'a2_oi_cil', 'a2_oi_eje', 
      'cristal2_marca_id','cristal2_diseno_id' , 'cristal2_indice_id', 'cristal2_material_id', 
      'cristal2_color_id', 'cristal2_diametro' ,'cristal2_tratamiento_id', 'cristal2_od', 'cristal2_oi'
  ];

  const tipoDeAnteojo = tipo_de_anteojo.value;
  console.log(tipoDeAnteojo)

  const mapping:any = {
      '1': { a1_od_ad: 1, a1_oi_ad: 1, a1_alt: 1, a1_dp: 0, a2_dp: 1, a2_od_esf: 1, a2_od_cil: 1, a2_od_eje: 1, a2_oi_esf: 1, a2_oi_cil: 1, a2_oi_eje: 1, cristal2_marca_id: 1 , cristal2_diseno_id:1, cristal2_indice_id:1, cristal2_material_id:1, cristal2_color_id:1, cristal2_diametro:1, cristal2_tratamiento_id:1, cristal2_od:1, cristal2_oi:1},
      '2': { a1_od_ad: 1, a1_oi_ad: 1, a1_alt: 1, a1_dp: 0, a2_dp: 1, a2_od_esf: 1, a2_od_cil: 1, a2_od_eje: 1, a2_oi_esf: 1, a2_oi_cil: 1, a2_oi_eje: 1, cristal2_marca_id: 1 , cristal2_diseno_id:1, cristal2_indice_id:1, cristal2_material_id:1, cristal2_color_id:1, cristal2_diametro:1, cristal2_tratamiento_id:1, cristal2_od:1, cristal2_oi:1},
      '3': { a1_od_ad: 0, a1_oi_ad: 0, a1_alt: 1, a1_dp: 0, a2_dp: 0, a2_od_esf: 0, a2_od_cil: 0, a2_od_eje: 0, a2_oi_esf: 0, a2_oi_cil: 0, a2_oi_eje: 0, cristal2_marca_id: 0 , cristal2_diseno_id:0, cristal2_indice_id:0, cristal2_material_id:0, cristal2_color_id:0, cristal2_diametro:0, cristal2_tratamiento_id:0, cristal2_od:0, cristal2_oi:0},
      '4': { a1_od_ad: 0, a1_oi_ad: 0, a1_alt: 0, a1_dp: 0, a2_dp: 1, a2_od_esf: 1, a2_od_cil: 1, a2_od_eje: 1, a2_oi_esf: 1, a2_oi_cil: 1, a2_oi_eje: 1, cristal2_marca_id: 1 , cristal2_diseno_id:1, cristal2_indice_id:1, cristal2_material_id:1, cristal2_color_id:1, cristal2_diametro:1, cristal2_tratamiento_id:1, cristal2_od:1, cristal2_oi:1},
      '5': { a1_od_ad: 0, a1_oi_ad: 0, a1_alt: 0, a1_dp: 0, a2_dp: 1, a2_od_esf: 1, a2_od_cil: 1, a2_od_eje: 1, a2_oi_esf: 1, a2_oi_cil: 1, a2_oi_eje: 1, cristal2_marca_id: 1 , cristal2_diseno_id:1, cristal2_indice_id:1, cristal2_material_id:1, cristal2_color_id:1, cristal2_diametro:1, cristal2_tratamiento_id:1, cristal2_od:1, cristal2_oi:1 },
      '6': { a1_od_ad: 0, a1_oi_ad: 0, a1_alt: 0, a1_dp: 0, a2_dp: 1, a2_od_esf: 1, a2_od_cil: 1, a2_od_eje: 1, a2_oi_esf: 1, a2_oi_cil: 1, a2_oi_eje: 1, cristal2_marca_id: 1 , cristal2_diseno_id:1, cristal2_indice_id:1, cristal2_material_id:1, cristal2_color_id:1, cristal2_diametro:1, cristal2_tratamiento_id:1, cristal2_od:1, cristal2_oi:1 },
      '7': { a1_od_ad: 1, a1_oi_ad: 1, a1_alt: 1, a1_dp: 0, a2_dp: 1, a2_od_esf: 1, a2_od_cil: 1, a2_od_eje: 1, a2_oi_esf: 1, a2_oi_cil: 1, a2_oi_eje: 1, cristal2_marca_id: 1 , cristal2_diseno_id:1, cristal2_indice_id:1, cristal2_material_id:1, cristal2_color_id:1, cristal2_diametro:1, cristal2_tratamiento_id:1, cristal2_od:1, cristal2_oi:1 },
  };

  const mappedValues = mapping[tipoDeAnteojo] || {};

  camposAValidar.forEach(campo => {
      const campoObj = buscarCampo(campo);
      if (campoObj) campoObj.valor = mappedValues[campo] || 0;
  });

  deshabilitarCampo.value.a1_ad = tipoDeAnteojo !== '1' && tipoDeAnteojo !== '2' && tipoDeAnteojo !== '7';
  deshabilitarCampo.value.a1_alt = tipoDeAnteojo !== '1' && tipoDeAnteojo !== '2' && tipoDeAnteojo !== '7';
  deshabilitarCampo.value.a2_dp = tipoDeAnteojo === '3' ? false : true || true;
  
  clearSelectInput.value = tipoDeAnteojo === '1' || tipoDeAnteojo === '2' || tipoDeAnteojo === '7';


  A2_CR_OD.value = tipoDeAnteojo === '3' ? ' ' : A2_CR_OD.value;
  A2_CR_OI.value = tipoDeAnteojo === '3' ? ' ' : A2_CR_OI.value;
};



//! CREAR COMBINACIONES_VALIDAS PARA OJO DERECHO Y OJO IZQUIERDO:
export const combinaciones_validas = () => {
    const item = validationNivel2.value.find(item => item.campo === 'combinaciones_validas');

    let ESF = dioptrias_receta.value.a1_od.esf
    let CIL = dioptrias_receta.value.a1_od.cil
    let EJE = dioptrias_receta.value.a1_od.eje

    let isESF = typeof ESF === 'number' && !Number.isNaN(ESF);
    let isCIL = typeof CIL === 'number' && !Number.isNaN(CIL);
    let isEJE = typeof EJE === 'number' && !Number.isNaN(EJE);
    
    console.log(ESF)
    //VALIDACION 1
    if (typeof ESF === 'object' && typeof CIL === 'object' && typeof EJE === 'object') {
        console.log('Ninguno de los valores es un número, agregando estado 0');
        if(item){
            item.valor = 0
        }
        return 0;
    }

    //VALIDACION 2
    if ((isESF && !isCIL && !isEJE) || (!isESF && (isCIL && isEJE)) || (isESF && isCIL && isEJE)) {
        console.log('Combinación válida, agregando estado 1');
        if(item){
            item.valor = 1
        }
        return 1;
    } else {
        if(item){
            item.valor = 0
        }
        console.log('Combinaciones no válidas, agregando estado 0');
        return 0;
    }

}




export const combinaciones_validas_od = (ESF:any, CIL:any, EJE:any) => {
    const item = validationNivel2.value.find(item => item.campo === 'combinaciones_validas');



    let isESF = typeof parseInt(ESF) === 'string' && !Number.isNaN(ESF);
    let isCIL = typeof parseInt(CIL) === 'number' && !Number.isNaN(CIL);
    let isEJE = typeof parseInt(EJE) === 'number' && !Number.isNaN(EJE);
    //VALIDACION 1
    if (typeof ESF === 'object' && typeof CIL === 'object' && typeof EJE === 'object') {
        console.log('Ninguno de los valores es un número, agregando estado 0');
        if(item){
            item.valor = 0
        }
        return 0;
    }

    //VALIDACION 2
    if ((isESF && !isCIL && !isEJE) || (!isESF && (isCIL && isEJE)) || (isESF && isCIL && isEJE)) {
        console.log('Combinación válida, agregando estado 1');
        if(item){
            item.valor = 1
        }
        return 1;
    } else {
        if(item){
            item.valor = 0
        }
        console.log('Combinaciones no válidas, agregando estado 0');
        return 0;
    }

}



//METODO PARA VALIDAR CAMPOS EN ESTRUCTURA Y ASI PODER VALIDAR LA LLAMADA A SPPROYECTOCRISTALES QUERY 06
export const verificaCampos = (estructura: any): boolean => {
    const camposAValidar = [
      'optica.proyecto',
      'cristales.cristal1_marca_id',
      'cristales.cristal1_diseno_id',
      'cristales.cristal1_indice_id',
      'cristales.cristal1_material_id',
      'cristales.cristal1_color_id',
      'cristales.cristal1_tratamiento_id',
      'receta.a1_od_esf',
      'receta.a1_od_cil',
    ];

    for (const campo of camposAValidar) {
      const partes = campo.split('.');
      let valorActual = estructura;

      for (const parte of partes) {
        if (valorActual && valorActual.hasOwnProperty(parte)) {
          valorActual = valorActual[parte];
        } else {
          return false; 
        }
      }
    }
  
    return true;
  };


  