import axios from "axios"
import { signal } from "@preact/signals-react";


import { getArmazones, openDatabase, setArmazones } from "./indexedDB";
import { URLBackend } from "../hooks/useCrud"
import { toast } from "react-toastify";
import { EnumGrid as EnumReserva } from "../views/mantenedores/MReservaArmazones";
import { A1_DP, a1_armazon, a2_armazon, a3_armazon, codigoProyecto, tipo_de_anteojo, validar_parametrizacion } from "./signalStateOT";
import { validationTipoAnteojos, validation_A1_DP, validation_A1_armazon, validation_A2_armazon } from "./validationOT";
import { validation_tipo_anteojo } from "./OTReceta_utils";



//?VARIABLES GLOBLAES
export const isOnline             = signal(false);
export const isShowReservaButton  = signal(false);
export const inputOnlyReadReserva = signal(false);



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
            toast.error('No hay datos en bodega offline', {autoClose:1000});

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






export const fetchReservaBeneficiario = async(rut:string) => {
    try {
        console.log(rut)

        const response = await axios(`${URLBackend}/api/otreservaarmazones/listado/?query=01&_p1=${rut}`);

        // console.log(response)
        
        if(response["data"].length > 0){
            console.log('hay data')
            const proyecto_codigo  = response["data"][0][EnumReserva["proyecto"]];
            const proyecto_titulo  = response["data"][0][EnumReserva["proyecto_titulo"]];
            const rut_beneficiario = response["data"][0][EnumReserva["cliente_rut"]]; 
            
            let mensaje = `Existe una Reserva para el rut: ${rut_beneficiario}.`;
            

            if(proyecto_codigo !== codigoProyecto.value){
                mensaje = `Existe una Reserva para el rut: ${rut_beneficiario} para un Proyecto distinto al seleccionado: ${proyecto_titulo}.`
            }


            alert(mensaje)

            console.log(response["data"][0][EnumReserva["cod_armazon1"]])
            
            codigoProyecto.value = proyecto_codigo;
            A1_DP.value = response["data"][0][EnumReserva["dp"]];
            validation_A1_DP(response["data"][0][EnumReserva["dp"]]);

            //?VALIDACIONES ARMAZONES:
            validar_parametrizacion.value = '2';
            inputOnlyReadReserva.value = true;
            tipo_de_anteojo.value = response["data"][0][EnumReserva["tipo_anteojo_id"]].toString();
            validation_tipo_anteojo();
            validationTipoAnteojos(response["data"][0][EnumReserva["tipo_anteojo_id"]].toString());
            


            //?ARMAZON 1:
            a1_armazon.value = response["data"][0][EnumReserva["cod_armazon1"]];
            validation_A1_armazon(response["data"][0][EnumReserva["cod_armazon1"]]);
            
            //?ARMAZON 2:
            a2_armazon.value = response["data"][0][EnumReserva["cod_armazon2"]];
            validation_A2_armazon(response["data"][0][EnumReserva["cod_armazon2"]]);


            //?ARMAZON 3:
            a3_armazon.value = response["data"][0][EnumReserva["cod_armazon3"]];




            // A1_DP.value = response["data"][0][EnumReserva["dp"]]

            
            console.log(a1_armazon.value)


        }

    } catch (error) {
        console.log(error)
    }
};