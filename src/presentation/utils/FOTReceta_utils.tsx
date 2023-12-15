import { a1_od_esf, a1_od_cil, a1_od_eje, a1_oi_esf, a1_oi_cil, a1_oi_eje, dioptrias_receta, a2_od_esf, a2_oi_esf, a2_od_cil, a2_oi_cil, a2_od_eje, a2_oi_eje, tipo_de_anteojo } from ".";


export const transponer = (ESF:any, CIL:any, EJE:any, AD:any, anteojo:any)  => {
    
    // let cilindrico = formValues?.a1_od_cil;
    let ESF2 = null;
    let CIL2 = null;
    let EJE2 = null;

    // let {cil,eje} = dioptrias_receta.value[anteojo]

    switch (ESF) {  
        case 'a1_od_esf':  
            ESF  =  dioptrias_receta.value[anteojo].esf
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
    console.log(dioptrias_receta.value[anteojo])

    if(typeof dioptrias_receta.value[anteojo].cil == 'number' && typeof dioptrias_receta.value[anteojo].eje == 'number'){
        if(dioptrias_receta.value[anteojo].cil > 0 && (dioptrias_receta.value[anteojo].eje >= 0 && dioptrias_receta.value[anteojo].eje <= 180)){
            const confirmacion = window.confirm("Es necesario Transponer. ¿Desea continuar con la operación?");
            console.log('1')
            if (confirmacion) {
                const esfValue = isNaN(dioptrias_receta.value[anteojo].esf)
                ? 0
                : dioptrias_receta.value[anteojo].esf;
                
                dioptrias_receta.value[anteojo].esf = esfValue + dioptrias_receta.value[anteojo].cil;
                
                // dioptrias_receta.value[anteojo].cil = (dioptrias_receta.value[anteojo].cil * -1);
                dioptrias_receta.value[anteojo].cil = 0;
                console.log(dioptrias_receta.value[anteojo].cil)

                dioptrias_receta.value[anteojo].cil = (CIL * -1);
                console.log('2')

                console.log(dioptrias_receta.value[anteojo].cil)
                console.log(CIL)
                
                if (dioptrias_receta.value[anteojo].eje >= 0 && dioptrias_receta.value[anteojo].eje <= 90) {
                    console.log('render')
                    dioptrias_receta.value[anteojo].eje= EJE + 90;
                } else {
                    console.log('render')
                    dioptrias_receta.value[anteojo].eje= EJE - 90;
                }
                
                // dioptrias_receta.value[anteojo].esf = ESF.value
                // // dioptrias_receta.value[anteojo].cil = CIL.value
                // dioptrias_receta.value[anteojo].cil = CIL.value
                // dioptrias_receta.value[anteojo].eje = EJE.value
                // console.log(dioptrias_receta.value[anteojo].cil)


            } else {
                CIL.value = ""
                dioptrias_receta.value[anteojo].cil = ""
            }
        }
    }

    console.log(dioptrias_receta.value[anteojo])


    if(typeof dioptrias_receta.value[anteojo].ad === 'number'){
        if(tipo_de_anteojo.value === '3' && ESF2 && CIL2 && EJE2){
            console.log('render')
            
            ESF2.value = dioptrias_receta.value[anteojo].esf + dioptrias_receta.value[anteojo].ad;
            CIL2.value = dioptrias_receta.value[anteojo].cil   
            EJE2.value = dioptrias_receta.value[anteojo].eje  
        }
    }
    

};


export const transponer_a2 = (ESF:any, CIL:any , EJE:any, AD:any) => {
   
   
    switch (ESF) {  
        case 'a2_od_esf':  
            ESF =  a2_od_esf
            break;
        case 'a2_oi_esf':  
            ESF =  a2_oi_esf
            break;
        default:
            break;
    }

    switch (CIL) {
        case 'a2_od_cil':  
            CIL =  a2_od_cil
            break;
        case 'a2_oi_cil':  
            CIL =  a2_oi_cil 
            break;
        default:
            break;
    }

    switch (EJE) {
        case 'a2_od_eje':  
            EJE =  a2_od_eje
            break;
        case 'a2_oi_eje':  
            EJE =  a2_oi_eje
            break;
        default:
            break;
    }



    // switch (ESF) {  
    //     case 'a1_od_esf':  
    //         ESF  =  dioptrias_receta.value[anteojo].esf
    //         ESF2 =  a2_od_esf
    //         break;
    //     case 'a1_oi_esf':  
    //         ESF  =  a1_oi_esf
    //         ESF2 =  a2_oi_esf
    //         break;
    //     default:
    //         break;
    // }

    // switch (CIL) {
    //     case 'a1_od_cil':  
    //         CIL  =  a1_od_cil
    //         CIL2 =  a2_od_cil
    //         break;
    //     case 'a1_oi_cil':  
    //         CIL  =  a1_oi_cil
    //         CIL2 =  a2_oi_cil 
    //         break;
    //     default:
    //         break;
    // }

    // switch (EJE) {
    //     case 'a1_od_eje':  
    //         EJE  =  a1_od_eje
    //         EJE2 =  a2_od_eje
    //         break;
    //     case 'a1_oi_eje':  
    //         EJE =   a1_oi_eje
    //         EJE =   a2_oi_eje
    //         break;
    //     default:
    //         break;
    // }



}






export const transposicionDioptrias_A1 = (formValues:any,dioptrias_receta:any)  => {
    // console.log(data)

    // console.log(dioptrias_receta)
    

    if(formValues.hasOwnProperty('a1_od_eje') && formValues.hasOwnProperty('a1_od_cil')){

        if(dioptrias_receta.a1_od.cil > 0){
            
            a1_od_esf.value = ((dioptrias_receta.a1_od.esf || 0 ) + dioptrias_receta.a1_od.cil)
            a1_od_cil.value = (dioptrias_receta.a1_od.cil * -1)
            
            if(dioptrias_receta.a1_od.eje >= 0 && dioptrias_receta.a1_od.eje <= 90){
                a1_od_eje.value = dioptrias_receta.a1_od.eje + 90
            }else{
                a1_od_eje.value = dioptrias_receta.a1_od.eje - 90
            }
        }

    }


};


