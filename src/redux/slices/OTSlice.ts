import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

export interface DataState {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    data: any[];
}

const initialState: DataState = {
    currentPage: 1,
    pageSize: 50,
    totalPages: 1,
    data: []
};

export const fetchOT = createAsyncThunk(
    'ot/fetchOT',
    async (OTAreas:any) => {
        try {
            console.log(OTAreas)
            const response = await axios.get(`${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}`);
            // console.log(response.data.slice(0,5))
            return response.data.slice(0,500);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const OTSlice = createSlice({
    name: 'OTSlice',
    initialState,
    reducers: {
        clearData(state) {
            state.data = []; // Establece el arreglo data como vacío
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOT.fulfilled, (state, action) => {
            // state.data = action.payload;
            console.log(action.payload)
            // const otIndex = action.payload.reduce((acc:any, el:any)=>{
            //     acc[el[1]] = el
            //     return acc
            // },{})

            // console.log(otIndex)
            state.data = action.payload
            return state
        });
    },
});

export const { clearData } = OTSlice.actions;
export default OTSlice.reducer;
