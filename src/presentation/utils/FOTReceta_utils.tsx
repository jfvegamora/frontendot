import { 
    // a1_oi_esf, a1_oi_cil, a1_oi_eje, 
    dioptrias_receta, a2_od_esf, a2_oi_esf, a2_od_cil, a2_oi_cil, a2_od_eje, a2_oi_eje, tipo_de_anteojo } from ".";
import { validation_A2_OD_CIL, validation_A2_OD_EJE, validation_A2_OD_ESF } from "./validationOT";


export const transponer = (ESF:any, CIL:any, EJE:any, 
    // AD:any, 
    anteojo:any)  => {
    

        // console.log(anteojo)
    // let cilindrico = formValues?.a1_od_cil;
    let ESF2 = null;
    let CIL2 = null;
    let EJE2 = null;

    // let {cil,eje} = dioptrias_receta.value[anteojo]

    switch (ESF) {  
        case 'a1_od_esf':  
            ESF  =  dioptrias_receta.value[anteojo]['esf']
            ESF2 =  a2_od_esf
            break;
        case 'a1_oi_esf':  
            ESF  =  dioptrias_receta.value[anteojo].esf
            ESF2 =  a2_oi_esf
            break;
        default:
            break;
    }

    switch (CIL) {
        case 'a1_od_cil':  
            CIL  =  dioptrias_receta.value[anteojo].cil
            CIL2 =  a2_od_cil
            break;
        case 'a1_oi_cil':  
            CIL  =  dioptrias_receta.value[anteojo].cil
            CIL2 =  a2_oi_cil 
            break;
        default:
            break;
    }

    switch (EJE) {
        case 'a1_od_eje':  
            EJE  =  dioptrias_receta.value[anteojo].eje
            EJE2 =  a2_od_eje
            break;
        case 'a1_oi_eje':  
            EJE =   dioptrias_receta.value[anteojo].eje
            EJE =   a2_oi_eje
            break;
        default:
            break;
    }
    console.log(dioptrias_receta.value[anteojo].cil)

    if(typeof dioptrias_receta.value[anteojo].cil == 'number' && typeof dioptrias_receta.value[anteojo].eje == 'number'){
        if(dioptrias_receta.value[anteojo].cil > 0 && (dioptrias_receta.value[anteojo].eje >= 0 && dioptrias_receta.value[anteojo].eje <= 180)){
            const confirmacion = window.confirm("Es necesario Transponer. ¿Desea continuar con la operación?");
            // console.log('1')
            if (confirmacion) {
                const esfValue = isNaN(dioptrias_receta.value[anteojo].esf)
                ? 0
                : dioptrias_receta.value[anteojo].esf;

                // console.log(parseInt(esfValue))
                // console.log(dioptrias_receta.value[anteojo].cil)
                
                dioptrias_receta.value[anteojo].esf = parseInt(esfValue) + dioptrias_receta.value[anteojo].cil;
                
                // dioptrias_receta.value[anteojo].cil = 0;

                dioptrias_receta.value[anteojo].cil = (CIL * -1);


                
                if (dioptrias_receta.value[anteojo].eje >= 0 && dioptrias_receta.value[anteojo].eje <= 90) {
                    // console.log('render')
                    dioptrias_receta.value[anteojo].eje= EJE + 90;
                } else {
                    // console.log('render')
                    dioptrias_receta.value[anteojo].eje= EJE - 90;
                }
                
            } else {
                CIL.value = " "
                dioptrias_receta.value[anteojo].cil = " "
            }
        }
    }

    
    
    if(Number.isNaN(dioptrias_receta.value[anteojo].ad)){
        if(tipo_de_anteojo.value === '3' && ESF2 && CIL2 && EJE2){
            ESF2.value = dioptrias_receta.value[anteojo].esf + dioptrias_receta.value[anteojo].ad;
            CIL2.value = dioptrias_receta.value[anteojo].cil   
            EJE2.value = dioptrias_receta.value[anteojo].eje  
            

            validation_A2_OD_ESF(dioptrias_receta.value[anteojo].esf + dioptrias_receta.value[anteojo].ad)
            validation_A2_OD_CIL(dioptrias_receta.value[anteojo].cil)
            validation_A2_OD_EJE(dioptrias_receta.value[anteojo].eje)
        }
    }
    
    return dioptrias_receta.value[anteojo]

};


