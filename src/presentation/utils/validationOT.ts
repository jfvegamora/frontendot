import { a1_od_ad, a1_od_cil, a1_od_eje, a1_od_esf, a1_oi_ad, a1_oi_cil, a1_oi_eje, a1_oi_esf, dioptrias, dioptrias_receta } from ".";
import { validationNivel1, validationNivel2 } from "../views/forms/FOT";
import { transponer } from "./FOTReceta_utils";

export const validationProyectos = (value:string) => {
    if(value !== ''){
        const item = validationNivel1.value.find((item: { campo: string; }) => item.campo === 'proyecto');
        if (item) {
            item.valor = 1;
        }
    }
  
};

export const validationEstablecimientos = (value:number) => {
    
    if(!isNaN(value)){
        const item = validationNivel1.value.find((item: { campo: string; }) => item.campo === 'establecimiento_id')
        if(item){
            item.valor = 1
        }
    }
 
}

export const validationCliente = (value:string) => {
    if(value !== ''){
        const item= validationNivel1.value.find((item:any)=> item.campo === 'cliente_rut');
        if (item) {
            item.valor = 1;
        }
    }
    
    if(value == ''){
        const item = validationNivel1.value.find((item: { campo: string; })=> item.campo === 'cliente_rut');
        if (item) {
            item.valor = 0;
        }
        
    }
}

export const validationFechaAtencion = (value:string) => {
    if(value !== ''){
        const item = validationNivel1.value.find((item: { campo: string; }) => item.campo === 'fecha_atencion');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel1.value.find((item: { campo: string; }) => item.campo === 'fecha_atencion');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validationPuntoVenta =(value:number) => {
    if(!isNaN(value)){
        const item = validationNivel1.value.find((item: { campo: string; }) => item.campo === 'punto_venta_id')
        if(item){
            item.valor = 1
        }
    }
}

export const validationTipoAnteojos = (value:number) => {
    if(!isNaN(value)){
        const item = validationNivel1.value.find((item: { campo: string; }) => item.campo === 'tipo_anteojo_id')
        if(item){
            item.valor = 1
        }
    }
}


export const validationOTlevel1 = (name: string, value: any) => {
    console.log(name)
    switch (name) {
      case 'proyecto_codigo':
        validationProyectos(value)
        break;
     case 'establecimiento_id':
        validationEstablecimientos(value)
        break;
     case 'cliente_rut':
        validationCliente(value)
        break;
    case 'cliente_nombre':
            validationClienteNombre(value)
            break;    
    case 'Sexo':
            validationClienteSexo(value)
            break;    
    case 'Tipo':
          validationClienteTipo(value)
            break;    
    case 'cliente_telefono':
            validationClienteTelefono(value)
            break;       
    case 'cliente_comuna':
            validationClienteComuna(value)
            break;    
     case 'fecha_atencion':
        validationFechaAtencion(value)
        break;
     case 'tipo_anteojo_id':
        validationTipoAnteojos(value)
        break;
     case 'punto_venta_id':
        validationPuntoVenta(value)
        break;
    default:
        break;
    }
  
    return true; 
}



export const validationOTlevel2 = (name:string, value:any) => {
    switch (name) {
        case 'fecha_entrega_taller':
            validationFechaEntregaTaller(value)
            break;
        case 'fecha_despacho':
            validationFechaDespacho(value)
            break;
        case 'fecha_entrega_cliente':
            validationFechaEntregaCliente(value)
            break;    
        case 'a1_od_esf':
            validation_A1_OD_ESF(value)
            break;
        case 'a1_od_cil':
            validation_A1_OD_CILL(value)
            break;
        case 'a1_od_eje':
            validation_A1_OD_EJE(value)
            break;
        case 'a1_od_ad':
            validation_A1_OD_AD(value)
            break;
        case 'a1_oi_esf':
            validation_A1_OI_ESF(value)
            break;
        case 'a1_oi_cil':
            validation_A1_OI_CIL(value)
            break;
        case 'a1_oi_ad':
            validation_A1_OI_AD(value)
            break;
        
        case 'a1_oi_eje':
            validation_A1_OI_EJE(value)
            break;
        case 'a1_dp':
            validation_A1_DP(value)
            break;
        case 'a1_alt':
            validation_A1_ALT(value)
            break;
        //AGREGAR VALIDAR CAMPO A1_GRUPO


        case 'a2_od_esf':
            validation_A2_OD_ESF(value)
            break;
        case 'a2_od_cil':
            validation_A2_OD_CIL(value)
            break;
        case 'a2_od_eje':
            validation_A2_OD_EJE(value)
            break;
        case 'a2_oi_esf':
            validation_A2_OI_ESF(value)
            break;
        case 'a2_oi_cil':
            validation_A2_OI_CIL(value)
            break;
        case 'a2_oi_eje':
            validation_A2_OI_EJE(value)
            break;
        case 'a2_dp':
            validation_A2_DP(value)
            break;
        


        case 'a1_opcion_vta_id':
            validation_A1_opcion_venta(value)
            break;
        case 'a1_armazon_id':
            validation_A1_armazon(value)
            break;
        case 'a2_opcion_vta_id':
            validation_A2_opcion_venta(value)
            break;
        case 'a2_armazon_id':
            validation_A2_armazon(value)
            break;
        
        


        case 'cristal1_opcion_vta_id':
            validation_Cristal1_opcion_vta(value)
            break;
        case 'cristal1_diseno_id':
            validation_Cristal1_diseño(value)
            break;
        case 'cristal1_indice_id':
            validation_Cristal1_indice(value)
            break;
        case 'cristal1_material_id':
            validation_Cristal1_material(value)
            break;
        case 'cristal1_tratamiento_id':
            validation_Cristal1_tratamiento(value)
            break;
        case 'cristal1_color_id':
            validation_Cristal1_color(value)
            break;
        case 'cristal1_od':
            validation_Cristal1_od(value)
            break;
        case 'cristal1_oi':
            validation_Cristal1_oi(value)
            break;
        case 'cristal1_tratamiento_adicional_id':
            validation_Cristal1_tratamiento_adicional(value)
            break;
        


        
        case 'cristal2_od_opcion_venta_id':
            validation_Cristal12_opcion_venta(value)
            break;
        case 'cristal2_diseno_id':
            validation_Cristal2_diseño(value)
            break;
        case 'cristal2_indice_id':
            validation_Cristal2_indice(value)
            break;
        case 'cristal2_material_id':
            validation_Cristal2_material(value)
            break;
        case 'cristal2_tratamiento_id':
            validation_Cristal2_tratamiento(value)
            break;
        case 'cristal2_color_id':
            validation_Cristal2_color(value)
            break;
        case 'cristal2_od':
            validation_Cristal2_od(value)
            break;
        case 'cristal2_oi':
            validation_Cristal2_oi(value)
            break;
        case 'cristal2_tratamiento_adicional_id':
            validation_Cristal2_tratamiento_adicionnal(value)
            break;
        
        default:
            break;
    }
}

export const validationClienteNombre = (value:string) =>{
    const item = validationNivel1.value.find((item: { campo: string; }) => item.campo === 'cliente_nombre');
    if(item){
        value !== '' ? (item.valor = 1) : (item.valor = 0)
    }
}

export const validationClienteSexo = (value:any) =>{
    const item = validationNivel1.value.find((item: { campo: string; })=> item.campo === 'cliente_sexo')
    if(item){
        value !== '' ? (item.valor = 1) : (item.valor = 0)
    }
}

export const validationClienteTipo = (value:any) => {
    const item = validationNivel1.value.find((item: { campo: string; })=>item.campo === 'cliente_tipo')
    if(item){
        value !== '' ? (item.valor = 1) : (item.valor = 0)
    }
}
export const validationClienteComuna = (value:any) => {
    const item = validationNivel1.value.find((item: { campo: string; })=>item.campo === 'cliente_comuna')
    if(item){
        console.log(!Number.isNaN(value))
        !Number.isNaN(value) ? (item.valor = 1) : (item.valor = 0)
    }

}

export const validationClienteTelefono = (value:any) => {
    const item = validationNivel1.value.find((item: { campo: string; })=>item.campo === 'cliente_telefono')
    if(item){
        value !== '' ? (item.valor = 1) : (item.valor = 0)
    }
}




export const validation_Cristal2_tratamiento_adicionnal = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_tratamiento_adicional_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_tratamiento_adicional_id');
        if (item) {
            item.valor = 0;
        }
    }    
}

export const validation_Cristal2_oi = (value:string | any ) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_oi');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_oi');
        if (item) {
            item.valor = 0;
        }
    } 
}
 
export const validation_Cristal2_od = (value:string | any ) =>{
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_od');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_od');
        if (item) {
            item.valor = 0;
        }
    } 
}

export const validation_Cristal2_color = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_color_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_color_id');
        if (item) {
            item.valor = 0;
        }
    } 
}

export const validation_Cristal2_tratamiento = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_tratamiento_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_tratamiento_id');
        if (item) {
            item.valor = 0;
        }
    } 
}

export const validation_Cristal2_material = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_material_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_material_id');
        if (item) {
            item.valor = 0;
        }
    } 
}


export const validation_Cristal2_indice = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_indice_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_indice_id');
        if (item) {
            item.valor = 0;
        }
    } 
}

export const validation_Cristal2_diseño = (value:string | any ) =>{
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_diseno_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_diseno_id');
        if (item) {
            item.valor = 0;
        }
    } 
}

export const validation_Cristal12_opcion_venta = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_od_opcion_venta_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal2_od_opcion_venta_id');
        if (item) {
            item.valor = 0;
        }
    } 
}

export const validation_Cristal1_tratamiento_adicional = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_tratamiento_adicional_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_tratamiento_adicional_id');
        if (item) {
            item.valor = 0;
        }
    }  
}


export const validation_Cristal1_oi = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_oi');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_oi');
        if (item) {
            item.valor = 0;
        }
    }   
}


export const validation_Cristal1_od = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_od');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_od');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_Cristal1_color = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_color_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_color_id');
        if (item) {
            item.valor = 0;
        }
    }
}


export const validation_Cristal1_material = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_material_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_material_id');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_Cristal1_tratamiento = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_tratamiento_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_tratamiento_id');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_Cristal1_indice = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_indice_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_indice_id');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_Cristal1_diseño = (value:string | any) =>{
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_diseno_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_diseno_id');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_Cristal1_opcion_vta = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'cristal1_opcion_vta_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'fecha_entrega_cliente');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_A1_opcion_venta = (value: string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'a1_opcion_vta_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'a1_opcion_vta_id');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_A1_armazon = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'a1_armazon_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'a1_armazon_id');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_A2_opcion_venta = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'a2_opcion_vta_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'a2_opcion_vta_id');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validation_A2_armazon = (value:string | any) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'a2_armazon_id');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'a2_armazon_id');
        if (item) {
            item.valor = 0;
        }
    }
}


export const validation_A2_DP =(value:string | any) => {
    if (value !== '') {
        const item = validationNivel2.value.find((item) => item.campo === 'a2_dp');
        if (item) {
          item.valor = 0;
        };
      } else {
        const item = validationNivel2.value.find((item) => item.campo === 'a2_dp');
        if (item) {
          item.valor = 1;
        };
    }
}

export const validation_A2_OI_EJE = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a2_oi_eje');
    // console.log(value)
    if (value !== '') {
        const numericValue = Number(value);
        // console.log(numericValue)
        // console.log(dioptrias.value.EJE)
        const validate = dioptrias.value.EJE.some((dioptria: any) => dioptria[0] === numericValue);
        item && (item.valor = validate ? 1 : 0);
      } else if (item) {
        item.valor = 0;
    }
    console.log(item)
}

export const validation_A2_OI_CIL = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a2_oi_cil');
    if (value !== '') {
        const formattedValue = Number(value).toFixed(2);
        const validate = dioptrias.value.CIL.some((dioptria: string) => dioptria.includes(formattedValue));
        item && (item.valor = validate ? 1 : 0);
      } else if (item) {
        item.valor = 0;
     }
}

export const validation_A2_OI_ESF =(value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a2_oi_esf');
    if (value !== '') {
        const formattedValue = Number(value).toFixed(2);
        const validate = dioptrias.value.ESF.some((dioptria: string) => dioptria.includes(formattedValue));
        item && (item.valor = validate ? 1 : 0);
    } else if (item) {
        item.valor = 0;
    }
}

export const validation_A2_OD_EJE = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a2_od_eje');
    
    if (value !== '') {
        const numericValue = Number(value);
        const validate = dioptrias.value.EJE.some((dioptria: any) =>numericValue === dioptria[0]);
        item && (item.valor = validate ? 1 : 0);
    } else if (item) {
        item.valor = 0;
    }
}

export const validation_A2_OD_CIL = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a2_od_cil');
    if (value !== '') {
        const formattedValue = Number(value).toFixed(2);
        const validate = dioptrias.value.CIL.some((dioptria: string) => dioptria.includes(formattedValue));
        item && (item.valor = validate ? 1 : 0);
      } else if (item) {
        item.valor = 0;
     }
}

export const validation_A2_OD_ESF =( value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a2_od_esf');

    //TODO: SUMAR 1 SI EXISTE A1_OD_AD
    
    // console.log(value)
    
    if(value !== '') {
        const formattedValue = Number(value).toFixed(2);
        const validate = dioptrias.value.ESF.some((dioptria: string) => dioptria.includes(formattedValue));
        item && (item.valor = validate ? 1 : 0);
    } else if (item) {
        item.valor = 0;
    }
    // console.log(item)
}

export const validation_A1_ALT = (value:string | any) => {
    if (value !== '') {
        const item = validationNivel2.value.find((item) => item.campo === 'a1_alt');
        if (item) {
          item.valor = 1;
        };
      } else {
        const item = validationNivel2.value.find((item) => item.campo === 'a1_alt');
        if (item) {
          item.valor = 0;
        };
    }
};

export const validation_A1_DP = (value:string | any) => {

    
    if (value !== '') {
        const item = validationNivel2.value.find((item) => item.campo === 'a1_dp');
        if (item) {
          item.valor = 1;
        };
      } else {
        const item = validationNivel2.value.find((item) => item.campo === 'a1_dp');
        if (item) {
          item.valor = 0;
        };
    }
}

export const validation_A1_OI_AD = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_oi_ad');
    
    if (value !== '') {
        const formattedValue = Number(value).toFixed(2);        
        // const validate = dioptrias.value.AD.some((dioptria: string) => dioptria.includes(formattedValue));
        const validate = (formattedValue as any % 0.25) === 0 ? true : false
        item && (item.valor = validate ? 1 : 0);
        if(!validate){
            dioptrias_receta.value.a1_oi.ad = "  ";
            a1_oi_ad.value = "  "
          }
      } else if (item) {
        item.valor = 0;
     }
}

export const validation_A1_OI_EJE = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_oi_eje');
    
    if (value !== '') {
        const numericValue = Number(value);
        // const validate = dioptrias.value.EJE.some((dioptria: any) => dioptria[0] === numericValue);
        const validate = (parseInt(value) >= 0 && parseInt(value) <= 180)
        item && (item.valor = validate ? 1 : 0);
        if(!validate){
            dioptrias_receta.value.a1_oi.eje = "  ";
            a1_oi_eje.value = "  "
          }
      } else if (item) {
        item.valor = 0;
     }
}

export const validation_A1_OI_CIL = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_oi_cil');
    
    if (value !== '') {
        const validate = (parseFloat(value) > 0 ) 

        item && (item.valor = validate ? 1 : 0);
  
      } else if (item) {
        item.valor = 0;
     }
    
}

export const validation_A1_OI_ESF = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_oi_esf');

    if (value !== '') {
        const formattedValue = Number(value).toFixed(2);
        const validate = (formattedValue as any % 0.25) === 0 ? true : false

        item && (item.valor = validate ? 1 : 0);
        if(!validate){
            dioptrias_receta.value.a1_oi.esf = "  ";
            a1_oi_esf.value = "  "
          }
      } else if (item) {
        item.valor = 0;
      }
}

export const validation_A1_OD_AD = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_od_ad');

    if (value !== '') {
        const formattedValue = Number(value).toFixed(2);
        const validate = (formattedValue as any % 0.25) === 0 ? true : false

        item && (item.valor = validate ? 1 : 0);
        if(!validate){
            dioptrias_receta.value.a1_oi.esf = "  ";
            a1_oi_esf.value = "  "
          }
      } else if (item) {
        item.valor = 0;
     }

     console.log(item)

}


export const validation_A1_OD_EJE = (value: string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_od_eje');
  
    if (value !== '') {
    const validate = (parseInt(value) >= 0 && parseInt(value) <= 180)

      item && (item.valor = validate ? 1 : 0);
      
      if(!validate){
        dioptrias_receta.value.a1_od.eje = "  ";
        a1_od_eje.value = "  "
      }
    } else if (item) {
      item.valor = 0;
    }
  };

export const validation_A1_OD_CILL = (value:string | any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_od_cil');
    
    if (value !== '') {
        item && (item.valor = parseFloat(value) > 0 ? 1 : 0);
        // }
      } else if (item) {
        item.valor = 0;
     }
}

export const validation_A1_OD_ESF = (value: any) => {
    const item = validationNivel2.value.find((item) => item.campo === 'a1_od_esf');

    if (value !== '') {
      const formattedValue = Number(value).toFixed(2);
      const validate = (formattedValue as any % 0.25) === 0 ? true : false
      
      item && (item.valor = validate ? 1 : 0);
      
      if(!validate){
        dioptrias_receta.value.a1_od.esf = "  ";
        a1_od_esf.value = "  "
      }
    } else if (item) {
      item.valor = 0;
    }
    console.log(item)
}

export const validationFechaEntregaCliente =(value:string) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'fecha_entrega_cliente');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'fecha_entrega_cliente');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validationFechaDespacho = (value:string) => {
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'fecha_despacho');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'fecha_despacho');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validationFechaEntregaTaller =(value:string) => {
    console.log(value)
    if(value !== ''){
        const item = validationNivel2.value.find(item => item.campo === 'fecha_entrega_taller');
        console.log(item)
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel2.value.find(item => item.campo === 'fecha_entrega_taller');
        if (item) {
            item.valor = 0;
        }
    }
}

