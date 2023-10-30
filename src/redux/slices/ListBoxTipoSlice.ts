import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export interface ITiposListbox {
    cristalDiseño: [] | null ,
    cristalMaterial: [] | null,
    cristalIndice: [] | null
    cristalColor: [] | null
    cristalTratamiento: [] | null


    //OTMotivo garantia
    //https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=OTMotivoGarantia

    //OT Opcion venta cristales
    //https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=OTOpcionVentaCristales

    //Cristales Indices
    //https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesIndices


    //Opcion venta armazon
    //https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=OTOpcionVentaArmazon



}



const initialState: ITiposListbox | null = {
    cristalDiseño: localStorage.getItem("ListBoxTipos.cristalDiseño") ? JSON.parse(localStorage.getItem("ListBoxTipos.cristalDiseño") as string): [],
    cristalMaterial: localStorage.getItem('ListBoxTipos.cristalMaterial') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalMaterial') as string) : null,
    cristalIndice: localStorage.getItem('ListBoxTipos.cristalIndice') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalIndice') as string) :null,
    cristalColor: localStorage.getItem('ListBoxTipos.cristalColores') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalColores') as string) :null,
    cristalTratamiento: localStorage.getItem('ListBoxTipos.cristalTratamiento') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalTratamiento') as string) :null,
  };
  

export const fetchListBoxTipos = createAsyncThunk('listBox/fetchListBoxTipos',async()=>{
    try {
        const {data:cristalDiseño} = await axios('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesDisenos');
        const {data:cristalMaterial} = await axios('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesMateriales');
        const {data:cristalColores} = await axios('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesColores');
        const {data:cristalTratamiento} = await axios('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesTratamientos');
        const {data:cristalIndice} = await axios('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesIndices');
        
        // console.log(cristalDiseño)
        return {
            cristalDiseño,
            cristalMaterial,
            cristalColores,
            cristalTratamiento,
            cristalIndice
        }
    } catch (error) {
        throw error
    }
});

const listBoxTiposSlice = createSlice({
    name: 'ListBoxTipos',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchListBoxTipos.fulfilled, (state,action)=>{
                localStorage.setItem('ListBoxTipos.cristalDiseño', JSON.stringify(action.payload.cristalDiseño));
                localStorage.setItem('ListBoxTipos.cristalMaterial', JSON.stringify(action.payload.cristalMaterial));
                localStorage.setItem('ListBoxTipos.cristalColores', JSON.stringify(action.payload.cristalColores));
                localStorage.setItem('ListBoxTipos.cristalTratamiento', JSON.stringify(action.payload.cristalTratamiento));
                localStorage.setItem('ListBoxTipos.cristalIndice', JSON.stringify(action.payload.cristalIndice));
                
                return {
                    ...state,
                    cristalDiseño:action.payload.cristalDiseño,
                    cristalMaterial: action.payload.cristalMaterial,
                    cristalColor: action.payload.cristalColores,
                    cristalTratamiento: action.payload.cristalTratamiento,
                    cristalIndice: action.payload.cristalIndice


                }
            })
    }
});


export default listBoxTiposSlice.reducer;