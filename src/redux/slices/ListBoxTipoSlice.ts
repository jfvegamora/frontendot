import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

export interface ITiposListbox {
    CristalesDisenos: [] | null;
    CristalesMateriales: [] | null;
    CristalesIndices: [] | null;
    CristalesColores: [] | null;
    CristalesTratamientos: [] | null;
    AlmacenesTipos:[] | null;
    // TipoInsumos: [] | null;
    ArmazonesUsos: [] | null;
    ArmazonesMaterial:[] | null;
    ArmazonesTipos:[] | null;
    OTOpcionVentaArmazon: [] | null;
    OTOpcionVentaCristales: [] | null;
    OTTipoAnteojo: [] | null;
    OTAreas: [] | null;
    OTEstados: [] | null;
    OTMotivo: [] | null;
    OTMotivoGarantia: [] | null;
    PuntosVentaTipos: [] | null;
    ClientesTipos: [] | null;

    OTEnumDoc: [] | null;

    [key: string]: any | undefined;
}

const initialState: ITiposListbox | null = {
    CristalesDisenos:        localStorage.getItem("ListBoxTipos.CristalDisenos") ? JSON.parse(localStorage.getItem("ListBoxTipos.CristalDisenos") as string): [],
    CristalesMateriales:     localStorage.getItem('ListBoxTipos.CristalesMateriales') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalesMateriales') as string) : null,
    CristalesIndices:        localStorage.getItem('ListBoxTipos.CristalesIndices') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalesIndices') as string) :null,
    CristalesColores:        localStorage.getItem('ListBoxTipos.CristalesColores') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalesColores') as string) :null,
    CristalesTratamientos:   localStorage.getItem('ListBoxTipos.CristalesTratamientos') ? JSON.parse(localStorage.getItem('ListBoxTipos.CristalesTratamientos') as string) :null,
    
    AlmacenesTipos:          localStorage.getItem('ListBoxTipos.AlmacenesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.AlmacenesTipos') as string) : null,
    // TipoInsumos:             localStorage.getItem('ListBoxTipos.TipoInsumos') ? JSON.parse(localStorage.getItem('ListBoxTipos.TipoInsumos') as string) :null,
    
    ArmazonesUsos:           localStorage.getItem('ListBoxTipos.ArmazonesUsos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesUsos') as string) :null,
    ArmazonesMaterial:       localStorage.getItem('ListBoxTipos.ArmazonesMaterial') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesMaterial') as string) :null,
    ArmazonesTipos:          localStorage.getItem('ListBoxTipos.ArmazonesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ArmazonesTipos') as string) :null,
    
    OTOpcionVentaArmazon:    localStorage.getItem('ListBoxTipos.OTOpcionVentaArmazon') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTOpcionVentaArmazon') as string) :null,
    OTOpcionVentaCristales:  localStorage.getItem('ListBoxTipos.OTOpcionVentaCristales') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTOpcionVentaCristales') as string) :null,
    OTTipoAnteojo:           localStorage.getItem('ListBoxTipos.OTTipoAnteojo') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTTipoAnteojo') as string) :null,
    OTAreas:                 localStorage.getItem('ListBoxTipos.OTAreas') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTAreas') as string) :null,
    OTEstados:               localStorage.getItem('ListBoxTipos.OTEstados') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTEstados') as string) :null,
    OTMotivo:                localStorage.getItem('ListBoxTipos.OTMotivo') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTMotivo') as string) :null,
    OTMotivoGarantia:        localStorage.getItem('ListBoxTipos.OTMotivoGarantia') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTMotivoGarantia') as string) :null,
    
    OTEnumDoc:               localStorage.getItem('ListBoxTipos.OTEnumDoc') ? JSON.parse(localStorage.getItem('ListBoxTipos.OTEnumDoc') as string) :null,     

    PuntosVentaTipos:        localStorage.getItem('ListBoxTipos.PuntosVentaTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.PuntosVentaTipos') as string) :null,
    ClientesTipos:           localStorage.getItem('ListBoxTipos.ClientesTipos') ? JSON.parse(localStorage.getItem('ListBoxTipos.ClientesTipos') as string) :null
};
  

  export const fetchListBoxTipos = createAsyncThunk('listBox/fetchListBoxTipos', async (token:any) => {
    try {
        const {data} = await axios(`${URLBackend}/api/tipos/listado/?query=02`,{
            headers: {
               'Authorization': token, 
             }
       })
       console.log(data)
        return data
    } catch (error) {
        throw error;
    }
});


// export const fetchEnumDoc = createAsyncThunk('enumdoc/fetch', async()=>{
//     try {
//         const {data} = await axios(`${URLBackend}/api/tipos/listado/?query=02&_p1=''`)
//         return data;        
//     } catch (error) {
//         console.log(error)
//         throw error;
//     }
// })



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
        clearLocalStorage: (_state) => {
            Object.keys(localStorage).forEach((key) => {
              if (key.startsWith("ListBoxTipos.")) {
                localStorage.removeItem(key);
              }
              localStorage.removeItem(key)
            });
          },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchListBoxTipos.fulfilled, (state,action)=>{
                const data = action.payload;
                if(data){
                    Object.keys(state).forEach((key) => {
                        state[key] = [];
                      });   
                                   
                    data.forEach(([key, id, value]: [string, number, string]) => {
                        if (state[key] === undefined) {
                          state[key] = [];
                        }
                        state[key] = Array.isArray(state[key]) ? [...state[key], [id, value ]] : [[id, value ]];

                    })

                }

                Object.keys(state).forEach((key) => {
                    localStorage.setItem(`ListBoxTipos.${key}`, JSON.stringify(state[key]));
                });

                return state;
            })
        //   .addCase(fetchEnumDoc.fulfilled, (state,action)=>{
        //     state.OTEnumDoc = action.payload
        //   })
    }
});


export const { updateDataForKey, clearLocalStorage } = listBoxTiposSlice.actions;
export default listBoxTiposSlice.reducer;






