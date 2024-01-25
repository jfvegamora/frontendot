
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

