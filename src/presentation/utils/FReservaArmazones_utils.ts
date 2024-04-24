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
        let armazonesLocal:any = []
        await openDatabase().then(async(db)=>{
            armazonesLocal = await getArmazones(db)
        })

        console.log(response)
        console.log(armazonesLocal)

        if(response.length === 0){
            console.log('apagar boton')
            isOnline.value = true;
            isShowReservaButton.value = false;
            toast.error('No hay datos en bodega offline', {autoClose:500});

            // if(armazonesLocal.length === 0){
            //     //?APAGAR BOTON RESERVA YA QUE SE ENTIENDE QUE NO ES BODEGA OFFLINE
            //     isShowReservaButton.value = false;
            //     toast.error('No hay datos en bodega offline');
            //     return;
            // }

            
            return;
        }else{
            console.log('hay datos en response')
            isShowReservaButton.value = true;
            
            isOnline.value = false;

            if(armazonesLocal.length === 0){
                let firstTime = true;
                response.forEach(async(armazonData:any) => {
                    console.log(armazonData)
                    let codArmazon = armazonData[0]
                    let cantidad   = armazonData[1]

                    await openDatabase().then(async(db:IDBDatabase)=>{
                        await setArmazones(db,codArmazon,parseInt(cantidad),firstTime)
                        db.close()
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



export const setLocalArmazones = async(response:any) => {
    console.log(response)

};

