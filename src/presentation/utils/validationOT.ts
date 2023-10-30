import { validationNivel1, validacionNivel1 } from "../views/forms/FOT";

export const validationProyectos = (value:string) => {
    if(value !== ''){
        const item = validationNivel1.value.find(item => item.campo === 'proyecto');
        if (item) {
            item.valor = 1;
        }
    }
  
};

export const validationEstablecimientos = (value:number) => {
    
    if(!isNaN(value)){
        const item = validationNivel1.value.find(item => item.campo === 'establecimiento_id')
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
        const item = validationNivel1.value.find((item)=> item.campo === 'cliente_rut');
        if (item) {
            item.valor = 0;
        }
        
    }
}

export const validationFechaAtencion = (value:string) => {
    if(value !== ''){
        const item = validationNivel1.value.find(item => item.campo === 'fecha_atencion');
        if (item) {
            item.valor = 1;
        }
    }
    if(value == ''){
        const item = validationNivel1.value.find(item => item.campo === 'fecha_atencion');
        if (item) {
            item.valor = 0;
        }
    }
}

export const validationPuntoVenta =(value:number) => {
    if(!isNaN(value)){
        const item = validationNivel1.value.find(item => item.campo === 'punto_venta_id')
        if(item){
            item.valor = 1
        }
    }
}

export const validationTipoAnteojos = (value:number) => {
    if(!isNaN(value)){
        const item = validationNivel1.value.find(item => item.campo === 'tipo_anteojo_id')
        console.log(item)
        if(item){
            item.valor = 1
        }
    }
}


export const validationOTlevel1 = (name: string, value: any) => {
    console.log(name)
    switch (name) {
      case 'proyecto':
        validationProyectos(value)
        break;
     case 'establecimiento_id':
        validationEstablecimientos(value)
        break;
     case 'cliente_rut':
        validationCliente(value)
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
            
            break;
        case 'fecha_':

            break;
        default:
            break;
    }
}