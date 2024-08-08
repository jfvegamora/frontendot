import axios from "axios"
import { toast } from "react-toastify"
import { URLBackend } from "./config";

export const handleActionOTButtons = async(
    folios:any,
    estado:any,
    situacion:any,
    origen:any,
    destino:any,
    observaciones:any,
    usuarioID: string,
    tipo_evento:string
) => {
    let _p3 = tipo_evento === "Pausada"
    ? `area="${destino}", estado="${estado}"`
    : `area="${destino}", estado="${estado}",ubicacion=""`;
    try {
        const query = {
            query: "16",
            _p1: folios,
            _p3,
            _estado: `${estado}`,
            _origen: `${origen}`,
            _situacion: `${situacion}`,
            _destino: `${destino}`,
            _usuario: `${usuarioID}`,
            _obs    : `${observaciones}`
        }

        console.log(query)


        const response = await axios.post(`${URLBackend}/api/ot/editar/`, query)

        toast.success('Proceso Ejecutado.',{
            autoClose: 500
        })
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}