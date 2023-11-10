import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export interface ITiposListbox {
    cristalesDiseño: [] | null;
    cristalesMaterial: [] | null;
    cristalesIndice: [] | null;
    cristalesColor: [] | null;
    cristalesTratamiento: [] | null;
    almacenesTipos:[] | null;
    tipoInsumos: [] | null;
    armazonesUsos: [] | null;
    armazonesMaterial:[] | null;
    armazonesTipos:[] | null;
    otOpcionVentaArmazon: [] | null;
    otOpcionVentaCristales: [] | null;
    otTipoAnteojo: [] | null;
    otAreas: [] | null;
    puntosVentaTipos: [] | null;
}

const initialState: ITiposListbox | null = {
    cristalesDiseño:           localStorage.getItem("ListBoxTipos.cristalDiseño") ? JSON.parse(localStorage.getItem("ListBoxTipos.cristalDiseño") as string): [],
    cristalesMaterial:         localStorage.getItem('ListBoxTipos.cristalMaterial') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalMaterial') as string) : null,
    cristalesIndice:           localStorage.getItem('ListBoxTipos.cristalIndice') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalIndice') as string) :null,
    cristalesColor:            localStorage.getItem('ListBoxTipos.cristalColores') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalColores') as string) :null,
    cristalesTratamiento:      localStorage.getItem('ListBoxTipos.cristalTratamiento') ? JSON.parse(localStorage.getItem('ListBoxTipos.cristalTratamiento') as string) :null,
    
    almacenesTipos:          localStorage.getItem('ListBoxTipos.almacenesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.almaceensTipos') as string) :null,
    tipoInsumos:             localStorage.getItem('ListBoxTipos.tipoInsumos') ? JSON.parse(localStorage.getItem('ListBoxTipos.tipoInsumos') as string) :null,
    
    armazonesUsos:           localStorage.getItem('ListBoxTipos.armazonesUsos') ? JSON.parse(localStorage.getItem('ListBoxTipos.armazonesUsos') as string) :null,
    armazonesMaterial:       localStorage.getItem('ListBoxTipos.armazonesMaterial') ? JSON.parse(localStorage.getItem('ListBoxTipos.armazonesMaterial') as string) :null,
    armazonesTipos:           localStorage.getItem('ListBoxTipos.armazonesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.armazonesTipos') as string) :null,
    
    otOpcionVentaArmazon:    localStorage.getItem('ListBoxTipos.otOpcionVentaArmazon') ? JSON.parse(localStorage.getItem('ListBoxTipos.otOpcionVentaArmazon') as string) :null,
    otOpcionVentaCristales:  localStorage.getItem('ListBoxTipos.otOpcionVentaCristales') ? JSON.parse(localStorage.getItem('ListBoxTipos.otOpcionVentaCristales') as string) :null,
    otTipoAnteojo:           localStorage.getItem('ListBoxTipos.otTipoAnteojo') ? JSON.parse(localStorage.getItem('ListBoxTipos.otTipoAnteojo') as string) :null,
    otAreas:                localStorage.getItem('ListBoxTipos.otAreas') ? JSON.parse(localStorage.getItem('ListBoxTipos.otAreas') as string) :null,
    
    puntosVentaTipos:        localStorage.getItem('ListBoxTipos.puntosVentaTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.puntosVentaTipos') as string) :null,

};
  

  export const fetchListBoxTipos = createAsyncThunk('listBox/fetchListBoxTipos', async () => {
    try {
        const [
            cristalesDiseño, 
            cristalesMaterial, 
            cristalesColores, 
            cristalesTratamiento, 
            cristalesIndice,
            almaceensTipos,
            tipoInsumos,
            armazonesUsos,
            armazonesMaterial,
            armazonesTipos,
            otOpcionVentaArmazon,
            otOpcionVentaCristales,
            otTipoAnteojo,
            puntosVentaTipos
        ] = await Promise.all([
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesDisenos'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesMateriales'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesColores'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesTratamientos'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=CristalesIndices'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=AlmacenesTipos'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=TipoInsumos'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=ArmazonesUsos'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=ArmazonesMaterial'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=ArmazonesTipos'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=OTOpcionVentaArmazon'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=OTOpcionVentaCristales'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=OTTipoAnteojo'),
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=PuntosVentaTipos'),
        ]);

        return {
            cristalesDiseño: cristalesDiseño.data,
            cristalesMaterial: cristalesMaterial.data,
            cristalesColores: cristalesColores.data,
            cristalesTratamiento: cristalesTratamiento.data,
            cristalesIndice: cristalesIndice.data,
            almacenesTipos: almaceensTipos.data,
            tipoInsumos: tipoInsumos.data,
            armazonesUsos: armazonesUsos.data,
            armazonesMaterial: armazonesMaterial.data,
            armazonesTipos: armazonesTipos.data,
            otOpcionVentaArmazon: otOpcionVentaArmazon.data,
            otOpcionVentaCristales: otOpcionVentaCristales.data,
            otTipoAnteojo: otTipoAnteojo.data,
            puntoVentaTipos: puntosVentaTipos.data
        }

    } catch (error) {
        throw error;
    }
});


const listBoxTiposSlice = createSlice({
    name: 'ListBoxTipos',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchListBoxTipos.fulfilled, (state,action)=>{
                localStorage.setItem('ListBoxTipos.cristalesDiseño', JSON.stringify(action.payload.cristalesDiseño));
                localStorage.setItem('ListBoxTipos.cristalesMaterial', JSON.stringify(action.payload.cristalesMaterial));
                localStorage.setItem('ListBoxTipos.cristalesColores', JSON.stringify(action.payload.cristalesColores));
                localStorage.setItem('ListBoxTipos.cristalesTratamiento', JSON.stringify(action.payload.cristalesTratamiento));
                localStorage.setItem('ListBoxTipos.cristalesIndice', JSON.stringify(action.payload.cristalesIndice));
                localStorage.setItem('ListBoxTipos.almacenesTipos', JSON.stringify(action.payload.almacenesTipos));
                localStorage.setItem('ListBoxTipos.tipoInsumos', JSON.stringify(action.payload.tipoInsumos));
                localStorage.setItem('ListBoxTipos.armazonesUsos', JSON.stringify(action.payload.armazonesUsos));
                localStorage.setItem('ListBoxTipos.armazonesMaterial', JSON.stringify(action.payload.armazonesMaterial));
                localStorage.setItem('ListBoxTipos.armazonesTipos', JSON.stringify(action.payload.armazonesTipos));
                localStorage.setItem('ListBoxTipos.otOpcionVentaArmazon', JSON.stringify(action.payload.otOpcionVentaArmazon));
                localStorage.setItem('ListBoxTipos.otOpcionVentaCristales', JSON.stringify(action.payload.otOpcionVentaCristales));
                localStorage.setItem('ListBoxTipos.otTipoAnteojo', JSON.stringify(action.payload.otTipoAnteojo));
                localStorage.setItem('ListBoxTipos.puntosVentaTipos', JSON.stringify(action.payload.puntoVentaTipos));
                
                return {
                    ...state,
                    cristalesDiseño:action.payload.cristalesDiseño,
                    cristalesMaterial: action.payload.cristalesMaterial,
                    cristalesIndice: action.payload.cristalesIndice,
                    cristalesColor: action.payload.cristalesColores,
                    cristalesTratamiento: action.payload.cristalesTratamiento,
                    almacenesTipos: action.payload.almacenesTipos,
                    tipoInsumos: action.payload.tipoInsumos,
                    armazonesUsos: action.payload.armazonesUsos,
                    armazonesMaterial: action.payload.armazonesMaterial,
                    armazonesTipos: action.payload.armazonesTipos,
                    otOpcionVentaArmazon: action.payload.otOpcionVentaArmazon,
                    otOpcionVentaCristales: action.payload.otOpcionVentaCristales,
                    otTipoAnteojo: action.payload.otTipoAnteojo,
                    puntoVentaTipos: action.payload.puntoVentaTipos,


                }
            })
    }
});


export default listBoxTiposSlice.reducer;