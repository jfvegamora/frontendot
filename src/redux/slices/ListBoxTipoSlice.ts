import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export interface ITiposListbox {
    CristalesDiseño: [] | null;
    CristalesMaterial: [] | null;
    CristalesIndice: [] | null;
    CristalesColor: [] | null;
    CristalesTratamiento: [] | null;
    AlmacenesTipos:[] | null;
    TipoInsumos: [] | null;
    ArmazonesUsos: [] | null;
    ArmazonesMaterial:[] | null;
    ArmazonesTipos:[] | null;
    OTOpcionVentaArmazon: [] | null;
    OTOpcionVentaCristales: [] | null;
    OTTipoAnteojo: [] | null;
    OTAreas: [] | null;
    PuntosVentaTipos: [] | null;
    [key: string]: any | undefined;
}

const initialState: ITiposListbox | null = {
    CristalesDiseño:           localStorage.getItem("ListBoxTipos.CristalDiseño") ? JSON.parse(localStorage.getItem("ListBoxTipos.CristalDiseño") as string): [],
    CristalesMaterial:         localStorage.getItem('ListBoxTipos.CristalMaterial') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalMaterial') as string) : null,
    CristalesIndice:           localStorage.getItem('ListBoxTipos.CristalIndice') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalIndice') as string) :null,
    CristalesColor:            localStorage.getItem('ListBoxTipos.CristalColores') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalColores') as string) :null,
    CristalesTratamiento:      localStorage.getItem('ListBoxTipos.CristalTratamiento') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalTratamiento') as string) :null,
    
    AlmacenesTipos:          localStorage.getItem('ListBoxTipos.AlmacenesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.AlmaceensTipos') as string) :null,
    TipoInsumos:             localStorage.getItem('ListBoxTipos.TipoInsumos') ? JSON.parse(localStorage.getItem('ListBoxTipos.TipoInsumos') as string) :null,
    
    ArmazonesUsos:           localStorage.getItem('ListBoxTipos.ArmazonesUsos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesUsos') as string) :null,
    ArmazonesMaterial:       localStorage.getItem('ListBoxTipos.ArmazonesMaterial') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesMaterial') as string) :null,
    ArmazonesTipos:           localStorage.getItem('ListBoxTipos.ArmazonesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesTipos') as string) :null,
    
    OTOpcionVentaArmazon:    localStorage.getItem('ListBoxTipos.OTOpcionVentaArmazon') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTOpcionVentaArmazon') as string) :null,
    OTOpcionVentaCristales:  localStorage.getItem('ListBoxTipos.OTOpcionVentaCristales') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTOpcionVentaCristales') as string) :null,
    OTTipoAnteojo:           localStorage.getItem('ListBoxTipos.OTTipoAnteojo') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTTipoAnteojo') as string) :null,
    OTAreas:                localStorage.getItem('ListBoxTipos.OTAreas') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTAreas') as string) :null,
    
    PuntosVentaTipos:        localStorage.getItem('ListBoxTipos.PuntosVentaTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.PuntosVentaTipos') as string) :null,
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
            CristalesDiseño: cristalesDiseño.data,
            CristalesMaterial: cristalesMaterial.data,
            CristalesColores: cristalesColores.data,
            CristalesTratamiento: cristalesTratamiento.data,
            CristalesIndice: cristalesIndice.data,
            AlmacenesTipos: almaceensTipos.data,
            TipoInsumos: tipoInsumos.data,
            ArmazonesUsos: armazonesUsos.data,
            ArmazonesMaterial: armazonesMaterial.data,
            ArmazonesTipos: armazonesTipos.data,
            OTOpcionVentaArmazon: otOpcionVentaArmazon.data,
            OTOpcionVentaCristales: otOpcionVentaCristales.data,
            OTTipoAnteojo: otTipoAnteojo.data,
            PuntoVentaTipos: puntosVentaTipos.data
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
                localStorage.setItem('ListBoxTipos.CristalesDiseño', JSON.stringify(action.payload.CristalesDiseño));
                localStorage.setItem('ListBoxTipos.CristalesMaterial', JSON.stringify(action.payload.CristalesMaterial));
                localStorage.setItem('ListBoxTipos.CristalesColores', JSON.stringify(action.payload.CristalesColores));
                localStorage.setItem('ListBoxTipos.CristalesTratamiento', JSON.stringify(action.payload.CristalesTratamiento));
                localStorage.setItem('ListBoxTipos.CristalesIndice', JSON.stringify(action.payload.CristalesIndice));
                localStorage.setItem('ListBoxTipos.AlmacenesTipos', JSON.stringify(action.payload.AlmacenesTipos));
                localStorage.setItem('ListBoxTipos.TipoInsumos', JSON.stringify(action.payload.TipoInsumos));
                localStorage.setItem('ListBoxTipos.ArmazonesUsos', JSON.stringify(action.payload.ArmazonesUsos));
                localStorage.setItem('ListBoxTipos.ArmazonesMaterial', JSON.stringify(action.payload.ArmazonesMaterial));
                localStorage.setItem('ListBoxTipos.ArmazonesTipos', JSON.stringify(action.payload.ArmazonesTipos));
                localStorage.setItem('ListBoxTipos.OTOpcionVentaArmazon', JSON.stringify(action.payload.OTOpcionVentaArmazon));
                localStorage.setItem('ListBoxTipos.OTOpcionVentaCristales', JSON.stringify(action.payload.OTOpcionVentaCristales));
                localStorage.setItem('ListBoxTipos.OTTipoAnteojo', JSON.stringify(action.payload.OTTipoAnteojo));
                localStorage.setItem('ListBoxTipos.PuntosVentaTipos', JSON.stringify(action.payload.PuntoVentaTipos));
                
                return {
                    ...state,
                    CristalesDiseño:action.payload.CristalesDiseño,
                    CristalesMaterial: action.payload.CristalesMaterial,
                    CristalesIndice: action.payload.CristalesIndice,
                    CristalesColor: action.payload.CristalesColores,
                    CristalesTratamiento: action.payload.CristalesTratamiento,
                    AlmacenesTipos: action.payload.AlmacenesTipos,
                    TipoInsumos: action.payload.TipoInsumos,
                    ArmazonesUsos: action.payload.ArmazonesUsos,
                    ArmazonesMaterial: action.payload.ArmazonesMaterial,
                    ArmazonesTipos: action.payload.ArmazonesTipos,
                    OTOpcionVentaArmazon: action.payload.OTOpcionVentaArmazon,
                    OTOpcionVentaCristales: action.payload.OTOpcionVentaCristales,
                    OTTipoAnteojo: action.payload.OTTipoAnteojo,
                    PuntoVentaTipos: action.payload.PuntoVentaTipos,


                }
            })
    }
});


export default listBoxTiposSlice.reducer;