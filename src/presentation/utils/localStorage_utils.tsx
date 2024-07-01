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



export const validateRut = (rut:any) => {
    const parsedRut = rut.replace(/[."]/g, '').replace(/-/g, '')
    const digito_verificador  = rut[rut.length-2]
  
    if(digito_verificador !== '-'){
      return false
    }
  
   
    let suma             = 0;
    let resto            = 0;
    let factor           = 2;
    let digitoValidar:any;
    let ultimoDigitoRut  = 0;
    let resultResto      = 0;
    
    for (let i = parsedRut.length-1; i>0;  i--) {
      suma = suma + (parseInt(parsedRut[i-1]) * factor)
      factor++
      if(factor > 7){
        factor = 2
      }  
    }
  
    resto = suma % 11
    resultResto = 11 - resto
   
    if(resultResto === 11){
      digitoValidar = 0;
      ultimoDigitoRut = parseInt(parsedRut[parsedRut.length - 1])
    }else if(resultResto === 10){
      digitoValidar = 'k';
      ultimoDigitoRut = parsedRut[parsedRut.length - 1].toLowerCase()
    }else{
      digitoValidar = resultResto
      ultimoDigitoRut = parseInt(parsedRut[parsedRut.length - 1])
    }

    return digitoValidar === ultimoDigitoRut ? true : false
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


export const formatCurrencyNumber = (number:string) => {
    if(number === undefined){
        return;
    }
    return parseInt(number.replace(/\$|\.+/g, ''),10);
}