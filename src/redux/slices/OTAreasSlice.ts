import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export interface IOTAreas {
    areas: [number, number,string, string, number, string, string] ,
    areaActual: number | null
}



const initialState: IOTAreas | null = {
    areas: localStorage.getItem("OTAreas")
    ? JSON.parse(localStorage.getItem("OTAreas") as string)
    : [],
    areaActual: null,
  };
  

export const fetchOTAreas = createAsyncThunk('OTAreas/fetchOTAreas',async()=>{
    try {
        const response = await axios.get('https://mtoopticos.cl/api/otareas/listado/?query=01');
        
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error
    }
});

const funcionalidadesSlice = createSlice({
    name: 'OTAreas',
    initialState,
    reducers: {
        updateActualArea: (state, action) => {
            // Actualiza el área actual en el estado
            if (state) {
                return {
                    ...state,
                    areaActual: action.payload,
                };
            }
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchOTAreas.fulfilled, (_state,action)=>{
                localStorage.setItem('OTAreas', JSON.stringify(action.payload))
                return action.payload;
            })
    }
});


export const { updateActualArea } = funcionalidadesSlice.actions;
export default funcionalidadesSlice.reducer;