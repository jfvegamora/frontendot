import axios from 'axios';
import { IComunas, IPerson, IProvincias, IRegiones } from '../../interfaces';


const BASE_URL = 'http://127.0.0.1:8000/api';


const api = axios.create({
    baseURL:BASE_URL
});

//=================PERSONAS==================


export const createPerson = async(data:IPerson):Promise<IPerson> => {
    try {
        const response = await api.post<IPerson>('/personas/crear/', data);
        return response.data
    } catch (error) {
        throw new Error('Error al crear la Persona')
    }
}


export const getPersons = async (pageSize?:number):Promise<IPerson[]> => {
    try {
        const endPoint = pageSize ? `/personas/relacionadas/?page=${pageSize}` : '/personas/relacionadas/' 
        const response = await api.get<IPerson[]>(endPoint);
        // console.log('personas', response)
        return response.data
    } catch (error) {
        throw new Error('Error al Obtener las peronas')
    }
}


export const deletePerson = async(id:string):Promise<{mensaje?:string}> =>{
    try {
        const response = await api.delete<{mensaje?:string}>(`/personas/eliminar/${id}`)
        return response.data
    } catch (error) {
        throw new Error('Error al elimminar a la Persona')
    }
}

export const deleteAllPerson = async(id:number[]):Promise<{mensaje?:string}> => {
    try {
        const data = {
            "idsDelete" : id
        }
        const response = await api.post<{mensaje?:string}>('/personas/eliminar/all/', data)
        return response.data

    } catch (error) {
        throw new Error('Error al eliminar varias personas')
    }
}

export const exportAllPerson = async(limit?:number):Promise<void> =>{
    try {
        // const response = await api.get('/personas/xls/',{
        //     responseType:'blob'
        // })
        const response = await api.post('/personas/xls/',{limit},{
            responseType:'blob'
        })
        
        const fileURL: string = URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.ms-excel' }))
    
        const link:HTMLAnchorElement = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', 'Personas.xls');
        document.body.appendChild(link)
        link.click();

        URL.revokeObjectURL(fileURL);
    } catch (error) {
        throw new Error("Error al desargar Excel de Personas")
    }
}

export const editPerson = async(id:number, data:IPerson):Promise<IPerson> =>{
    try {
        console.log('edit', data)
        const response = await api.patch<IPerson>(`/personas/${id}/`, data)
        return response.data
    } catch (error) {
        throw new Error('Error al editar a la Persona')
    }
}


export const searchPerson = async(rut?:string, nombre?:string):Promise<IPerson>=>{
    try {
        const response = await api.get<IPerson>(`/personas/relacionadas/buscar/?q=V&nombre=${nombre}&rut=${rut}`)
        return response.data
    } catch (error) {
        throw new Error('Error al encontrar a la persona')
    }
}




//==============REGIONES==================
export const getRegiones = async ():Promise<IRegiones[]> => {
    try {
        const response = await api.get<IRegiones[]>('/regiones/');
        return response.data
    } catch (error) {
        throw new Error('Error al obtener las regiones')
    }
}


//==============PROVINCIAS==================
export const getProvincias_by_region_id = async(id:string):Promise<IProvincias[]> =>{
    try {  
        const response = await api.get<IProvincias[]>(`/provincias/${id}/`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener las Provincias')
    }
}


//==============COMUNAS==================
export const getComunas_by_id = async(id:string):Promise<IComunas[]>=>{
    try {
        const response = await api.get<IComunas[]>(`/comunas/${id}/`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener las comunas ')
    }
}


