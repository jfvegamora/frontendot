
//Guardar datos en local Storage
export const persistLocalStorage = <T,>(key:string, value:T) => {
    localStorage.setItem(key, JSON.stringify({...value}))
};

//limpiar datos en Local Storage
export const clearLocalStorage = (key:string) =>{
    localStorage.removeItem(key);
};

export const getImageURL = (name:string) => {
    console.log(new URL(`../../assets/${name}`, import.meta.url).href)
    return new URL(`../../assets/${name}`, import.meta.url).href
}


export function compararFechas(fechaString:string) {
    const fechaObjeto:any = new Date(fechaString);
  
    const fechaActual:any = new Date();
  
    const diferenciaEnMilisegundos = fechaActual - fechaObjeto;
  
    const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);
    

    return diferenciaEnHoras <= 11;
  }
  