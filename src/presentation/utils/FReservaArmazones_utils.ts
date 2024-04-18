import axios from "axios"
import { signal } from "@preact/signals-react";


import { getArmazones, openDatabase, setArmazones } from "./indexedDB";
import { URLBackend } from "../hooks/useCrud"
import { toast } from "react-toastify";



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
        const armazonesLocal = await getArmazones();

        console.log(response)
        console.log(armazonesLocal)

        if(response.length === 0){
            console.log('apagar boton')
            if(armazonesLocal.length === 0){
                //?APAGAR BOTON RESERVA YA QUE SE ENTIENDE QUE NO ES BODEGA OFFLINE
                isShowReservaButton.value = false;
                toast.error('No hay datos en bodega offline');
                return;
            }
            return;
        }else{
            console.log('hay datos en response')
            isShowReservaButton.value = true;
            if(armazonesLocal.length === 0){
                response.forEach((armazonData:any) => {
                    console.log(armazonData)
                    let codArmazon = armazonData[0]
                    let cantidad   = armazonData[1]

                    setArmazones(codArmazon, cantidad).then((data) =>{
                        console.log(data)
                        toast.success(data as string)
                    })
                });
            }else{
                console.log('ya hay datos previos, retornando')
                return;
            }
        }
    } catch (error) {
        console.log('Error al obtener armazones', error)
    }
};



