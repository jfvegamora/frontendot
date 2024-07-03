import axios from "axios"
import { URLBackend } from "../hooks/useCrud"
import { toast } from "react-toastify"

export const handleActionOTButtons = async(
    folios:any,
    estado:number,
    situacion:any,
    origen:any,
    destino:any,
    observaciones:any,
    usuarioID: string
) => {
    try {
        const query = {
            query: "16",
            _p1: folios,
            _estado: `${estado}`,
            _origen: `${origen}`,
            _situacion: `${situacion}`,
            _destino: `${destino}`,
            _usuario: `${usuarioID}`,
            _obs    : `${observaciones}`
        }


        const response = await axios.post(`${URLBackend}/api/ot/editar/`, query)

        toast.success('Pendientes Correctamente.')
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}