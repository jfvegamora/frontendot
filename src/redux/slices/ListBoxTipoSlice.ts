import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export interface ITiposListbox {
    CristalesDisenos: [] | null;
    CristalesMateriales: [] | null;
    CristalesIndices: [] | null;
    CristalesColores: [] | null;
    CristalesTratamientos: [] | null;
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
    ClientesTipos: [] | null;
    [key: string]: any | undefined;
}

const initialState: ITiposListbox | null = {
    CristalesDisenos:        localStorage.getItem("ListBoxTipos.CristalDisenos") ? JSON.parse(localStorage.getItem("ListBoxTipos.CristalDisenos") as string): [],
    CristalesMateriales:     localStorage.getItem('ListBoxTipos.CristalMateriales') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalMateriales') as string) : null,
    CristalesIndices:        localStorage.getItem('ListBoxTipos.CristalIndices') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalIndices') as string) :null,
    CristalesColores:        localStorage.getItem('ListBoxTipos.CristalColores') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalColores') as string) :null,
    CristalesTratamientos:   localStorage.getItem('ListBoxTipos.CristalTratamientos') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalTratamientos') as string) :null,
    
    AlmacenesTipos:          localStorage.getItem('ListBoxTipos.AlmacenesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.AlmaceensTipos') as string) :null,
    TipoInsumos:             localStorage.getItem('ListBoxTipos.TipoInsumos') ? JSON.parse(localStorage.getItem('ListBoxTipos.TipoInsumos') as string) :null,
    
    ArmazonesUsos:           localStorage.getItem('ListBoxTipos.ArmazonesUsos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesUsos') as string) :null,
    ArmazonesMaterial:       localStorage.getItem('ListBoxTipos.ArmazonesMaterial') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesMaterial') as string) :null,
    ArmazonesTipos:          localStorage.getItem('ListBoxTipos.ArmazonesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesTipos') as string) :null,
    
    OTOpcionVentaArmazon:    localStorage.getItem('ListBoxTipos.OTOpcionVentaArmazon') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTOpcionVentaArmazon') as string) :null,
    OTOpcionVentaCristales:  localStorage.getItem('ListBoxTipos.OTOpcionVentaCristales') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTOpcionVentaCristales') as string) :null,
    OTTipoAnteojo:           localStorage.getItem('ListBoxTipos.OTTipoAnteojo') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTTipoAnteojo') as string) :null,
    OTAreas:                 localStorage.getItem('ListBoxTipos.OTAreas') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTAreas') as string) :null,
    
    PuntosVentaTipos:        localStorage.getItem('ListBoxTipos.PuntosVentaTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.PuntosVentaTipos') as string) :null,
    ClientesTipos:            localStorage.getItem('ListBoxTipos.ClientesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ClientesTipos') as string) :null
};
  

  export const fetchListBoxTipos = createAsyncThunk('listBox/fetchListBoxTipos', async () => {
    try {
        const [
            cristalesDiseno, 
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
            puntosVentaTipos,
            clientestipos
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
            axios.get('https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=ClientesTipos'),
        ]);

        return {
            CristalesDisenos: cristalesDiseno.data,
            CristalesMateriales: cristalesMaterial.data,
            CristalesColores: cristalesColores.data,
            CristalesTratamientos: cristalesTratamiento.data,
            CristalesIndices: cristalesIndice.data,
            AlmacenesTipos: almaceensTipos.data,
            TipoInsumos: tipoInsumos.data,
            ArmazonesUsos: armazonesUsos.data,
            ArmazonesMaterial: armazonesMaterial.data,
            ArmazonesTipos: armazonesTipos.data,
            OTOpcionVentaArmazon: otOpcionVentaArmazon.data,
            OTOpcionVentaCristales: otOpcionVentaCristales.data,
            OTTipoAnteojo: otTipoAnteojo.data,
            PuntoVentaTipos: puntosVentaTipos.data,
            ClientesTipos: clientestipos.data
        }

    } catch (error) {
        console.log(error)
        throw error;
    }
});


const listBoxTiposSlice = createSlice({
    name: 'ListBoxTipos',
    initialState,
    reducers: {
        updateDataForKey: (state, action) => {
            const { entidad, data } = action.payload;
            if (state.hasOwnProperty(entidad)) {
                state[entidad] = data.data;
            }
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchListBoxTipos.fulfilled, (state,action)=>{
                localStorage.setItem('ListBoxTipos.CristalesDisenos', JSON.stringify(action.payload.CristalesDisenos));
                localStorage.setItem('ListBoxTipos.CristalesMateriales', JSON.stringify(action.payload.CristalesMateriales));
                localStorage.setItem('ListBoxTipos.CristalesColores', JSON.stringify(action.payload.CristalesColores));
                localStorage.setItem('ListBoxTipos.CristalesTratamientos', JSON.stringify(action.payload.CristalesTratamientos));
                localStorage.setItem('ListBoxTipos.CristalesIndices', JSON.stringify(action.payload.CristalesIndices));
                localStorage.setItem('ListBoxTipos.AlmacenesTipos', JSON.stringify(action.payload.AlmacenesTipos));
                localStorage.setItem('ListBoxTipos.TipoInsumos', JSON.stringify(action.payload.TipoInsumos));
                localStorage.setItem('ListBoxTipos.ArmazonesUsos', JSON.stringify(action.payload.ArmazonesUsos));
                localStorage.setItem('ListBoxTipos.ArmazonesMaterial', JSON.stringify(action.payload.ArmazonesMaterial));
                localStorage.setItem('ListBoxTipos.ArmazonesTipos', JSON.stringify(action.payload.ArmazonesTipos));
                localStorage.setItem('ListBoxTipos.OTOpcionVentaArmazon', JSON.stringify(action.payload.OTOpcionVentaArmazon));
                localStorage.setItem('ListBoxTipos.OTOpcionVentaCristales', JSON.stringify(action.payload.OTOpcionVentaCristales));
                localStorage.setItem('ListBoxTipos.OTTipoAnteojo', JSON.stringify(action.payload.OTTipoAnteojo));
                localStorage.setItem('ListBoxTipos.PuntosVentaTipos', JSON.stringify(action.payload.PuntoVentaTipos));
                localStorage.setItem('ListBoxTipos.ClientesTipos', JSON.stringify(action.payload.ClientesTipos));
                
                return {
                    ...state,
                    CristalesDiseños:action.payload.CristalesDisenos,
                    CristalesMateriales: action.payload.CristalesMateriales,
                    CristalesIndices: action.payload.CristalesIndices,
                    CristalesColores: action.payload.CristalesColores,
                    CristalesTratamientos: action.payload.CristalesTratamientos,
                    AlmacenesTipos: action.payload.AlmacenesTipos,
                    TipoInsumos: action.payload.TipoInsumos,
                    ArmazonesUsos: action.payload.ArmazonesUsos,
                    ArmazonesMaterial: action.payload.ArmazonesMaterial,
                    ArmazonesTipos: action.payload.ArmazonesTipos,
                    OTOpcionVentaArmazon: action.payload.OTOpcionVentaArmazon,
                    OTOpcionVentaCristales: action.payload.OTOpcionVentaCristales,
                    OTTipoAnteojo: action.payload.OTTipoAnteojo,
                    PuntoVentaTipos: action.payload.PuntoVentaTipos,
                    ClientesTipos: action.payload.ClientesTipos


                }
            })
    }
});


export const { updateDataForKey } = listBoxTiposSlice.actions;
export default listBoxTiposSlice.reducer;