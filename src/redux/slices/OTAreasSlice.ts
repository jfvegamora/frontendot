import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

export interface IOTAreas {
    areas: [number, number,string, string, number, string, string] ,
    areaActual: number | null,
    areaSiguiente: number | null
}



const initialState: IOTAreas | null = {
    areas: localStorage.getItem("OTAreas") ? JSON.parse(localStorage.getItem("OTAreas") as string): [],
    areaActual: 40,
    areaSiguiente: localStorage.getItem('areaSiguiente') ? JSON.parse(localStorage.getItem('areaSiguiente') as string) : 50,
  };
  

export const fetchOTAreas = createAsyncThunk('OTAreas/fetchOTAreas',async(token:any)=>{
    try {
        const response = await axios.get(`${URLBackend}/api/otareas/listado/?query=01`,{
            headers: {
               'Authorization': token, 
             }
       });
       console.log(response)
        
        return response.data
    } catch (error) {
        throw error
    }
});

const funcionalidadesSlice = createSlice({
    name: 'OTAreas',
    initialState,
    reducers: {
        updateActualArea: (state, action:any) => {
            if (state) {
                return {
                    ...state,
                    areaActual: action.payload,
                };
            }
        },
        updateNextArea: (state,action) => {
            if(state){
                localStorage.setItem('areaSiguiente', JSON.stringify(action.payload))
                return{
                    ...state,
                    areaSiguiente:action.payload
                }
            }
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchOTAreas.fulfilled, (state,action)=>{
                localStorage.setItem('OTAreas', JSON.stringify(action.payload))
                return {
                    ...state,
                    areas:action.payload
                }
            })
    }
});


export const { updateActualArea, updateNextArea } = funcionalidadesSlice.actions;
export default funcionalidadesSlice.reducer;