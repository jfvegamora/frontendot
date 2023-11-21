import { signal } from "@preact/signals-react"
import { DioptriasReceta, buscarCampo,  clearDioptriasA2, dioptrias_receta, reiniciarA2DioptriasReceta, tipo_de_anteojo } from "."
import { validationNivel2 } from "../views/forms/FOT"


export const habilitarCampo = signal({
    a1_ad:true,
    a1_alt:true
});


export const setTipoAnteojo = (value:any) => {
        const anteojo_tipos = ["1","2","7"]
        tipo_de_anteojo.value = value
        if(anteojo_tipos.includes(tipo_de_anteojo.value)){
          clearDioptriasA2(1)
          reiniciarA2DioptriasReceta()
        }else{
          clearDioptriasA2(0)
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
    // console.log(tipo_de_anteojo.value)
    const a1_ad  = buscarCampo('a1_od_ad');
    const a1_alt = buscarCampo('a1_alt');

    if(tipo_de_anteojo.value == '1' || tipo_de_anteojo.value == '2' || tipo_de_anteojo.value == '7'){
        
        if(a1_ad){
          a1_ad.valor = 1
        }
        if(a1_alt){
          a1_alt.valor = 1
        }
  
        habilitarCampo.value.a1_ad = true
        habilitarCampo.value.a1_alt = true
        // console.log(dioptriasHabilitadas.value)
    }


    if(tipo_de_anteojo.value == '3' || tipo_de_anteojo.value == '4' || tipo_de_anteojo.value == '5' || tipo_de_anteojo.value == '6'){
        
        if(a1_ad){
            a1_ad.valor = 0
          }
        if(a1_alt){
            a1_alt.valor = 0
          }

      habilitarCampo.value.a1_ad = false
      habilitarCampo.value.a1_alt = false
    }
}


export const combinaciones_validas = () => {
    const item = validationNivel2.value.find(item => item.campo === 'combinaciones_validas');

    let ESF = dioptrias_receta.value.a1_od.esf
    let CIL = dioptrias_receta.value.a1_od.cil
    let EJE = dioptrias_receta.value.a1_od.eje

    let isESF = typeof ESF === 'number';
    let isCIL = typeof CIL === 'number';
    let isEJE = typeof EJE === 'number';
    
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