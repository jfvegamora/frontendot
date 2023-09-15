import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IFuncionalidad {
    id:string;
    codigo:string;
    descripcion:string;
}

const initialState:IFuncionalidad | null = localStorage.getItem("user")
   ? JSON.parse(localStorage.getItem("user") as string)
   : []

export const fetchFuncionalidades = createAsyncThunk('funcionalidades/fetchFuncionalidades', async ()=>{
    try {
        const response = await axios.get('https://mtoopticos.cl/api/funcionalidades/listado/?query=01');
        return response.data;        
    } catch (error) {
        throw error
    }
})
export const Funcionalidades = "Funcionalidades";

const funcionalidadesSlice = createSlice({
    name: 'funcionalidades',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchFuncionalidades.fulfilled, (_state, action)=>{
            localStorage.setItem(Funcionalidades, JSON.stringify(action.payload))
                return action.payload;
           })
    }
});


export default funcionalidadesSlice.reducer;