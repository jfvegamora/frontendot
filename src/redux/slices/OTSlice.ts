import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

export interface DataState {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    data: any[];
    ot: any[]
}

const initialState: DataState = {
    currentPage: 1,
    pageSize: 50,
    totalPages: 1,
    data: [],
    ot: []
};

export const fetchOT = createAsyncThunk(
    'ot/fetchOT',
    async (OTAreas:any) => {
        try {
            // console.log(OTAreas)
            const response = await axios.get(`${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}`);
            // console.log(response.data.slice(0,5))
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


export const fetchOTByID = createAsyncThunk(
    'ot/fetchOTbyID',
    async(params:any) => {
        try {
            const {folio, OTAreas} = params;

            console.log(folio)
            console.log(OTAreas)
            const response = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas}&_folio=${folio}`);
            console.log(response)
            console.log(response.data[0])
            return response.data[0]
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
)

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
            state.data = action.payload
            return state
        });
        builder.addCase(fetchOTByID.fulfilled, (state,action)=>{
            state.ot = action.payload
            return state
        })
    },
});

export const { clearData } = OTSlice.actions;
export default OTSlice.reducer;
