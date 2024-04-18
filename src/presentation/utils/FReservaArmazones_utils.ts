import axios from "axios"
import { signal } from "@preact/signals-react";


import { getArmazones, openDatabase } from "./indexedDB";
import { URLBackend } from "../hooks/useCrud"



//?VARIABLES GLOBLAES
export const isOnline             = signal(false);
export const isShowReservaButton  = signal(false);



//? FETCH DE DATOS A SPRESERVA ARMAZONES
export const fetchReservaArmazones = async(punto_venta:string, cod_proyecto:string, usuarioID:string):Promise<any> => {
    
    console.log(punto_venta)
    console.log(cod_proyecto)
    console.log(usuarioID)
    
    console.log('ejecutando fetch de datos')

    const entidad = "almacenesstock";


    const reservaJSON = {
        "proyecto"     : cod_proyecto,
        "punto_venta"  : punto_venta,
        "usuario"      : usuarioID
    }

    try {
        const response = await axios(`${URLBackend}/api/${entidad}/listado/?query=06&_pkToDelete=${encodeURIComponent(JSON.stringify(reservaJSON))}`)
        
        if(response){
            await getLocalArmazones(response.data)
        }

        console.log(response)
    } catch (error) {
        console.log(error)
    }

};


//? METODO ENCARGADO DE TOMAR RESPUSTA DE ALMACEN Y COMPARAR CON "DB LOCAL ARMAZONES"
const getLocalArmazones = async(response:any) => {
    try {
        await openDatabase();
        const armazones = await getArmazones();

        console.log(response)
        console.log(armazones)

        if(response.length === 0){
            //?APAGAR BOTON RESERVA YA QUE SE ENTIENDE QUE NO ES BODEGA OFFLINE
            console.log('apagar boton')
            isShowReservaButton.value = false;
        }else{
            console.log('hay datos en response')
            console.log('mostrar boton')
            isShowReservaButton.value = true;

            // if(armazones)

        }

    




        return armazones
    } catch (error) {
        console.log('Error al obtener armazones', error)
    }
};



