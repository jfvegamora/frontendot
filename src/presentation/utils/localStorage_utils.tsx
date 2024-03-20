import axios from "axios";
import { URLBackend } from "../hooks/useCrud";

//Guardar datos en local Storage
export const persistLocalStorage = <T,>(key:string, value:T) => {
    localStorage.setItem(key, JSON.stringify({...value}))
};

//limpiar datos en Local Storage
export const clearLocalStorage = (key:string) =>{
    localStorage.removeItem(key);
};

export const getImageURL = (name:string) => {
    return new URL(`../../assets/${name}`, import.meta.url).href
}

export const validateRut = (rut:string) => {
    console.log(rut)
    const regex = new RegExp(/^[0-9]{1,8}[-]{1}[0-9kK]{1}$/);

    return regex.test(rut);
};
  

export async function compararFechas(fechaString:string, _token?:string) {
    const fechaObjeto:any = new Date(fechaString);
  
    const fechaActual:any = new Date();
  
    const diferenciaEnMilisegundos = fechaActual - fechaObjeto;
    
    const {data:tiempoExpiracion} = await axios(`${URLBackend}/api/parametros/listado/?query=01&_p1=p20`)

    if(tiempoExpiracion){
        const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);
        return diferenciaEnHoras <= parseInt(tiempoExpiracion[0][3]);
    }    
    return false;

  }
  


export const handleAxiosError = (error:any) => {
    console.log(error)
}