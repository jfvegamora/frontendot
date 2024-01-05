import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

export interface DataState {
    estadosOT: any;
    cristales: any[];
    armazones: any[];
    data: any[];
    ot: any[]
}

const initialState: DataState = {
    estadosOT: {},
    cristales: [],
    armazones: [],
    data: [],
    ot: []
};

export const fetchOT = createAsyncThunk(
    'ot/fetchOT',
    async (params:any) => {
        const {OTAreas, searchParams} = params;
        // console.log(searchParams)
        const OTUrl = searchParams
                                 ? `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}&${searchParams}` 
                                 : `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}`

        // console.log(OTUrl)
        try {
            const response = await axios.get(OTUrl);
            
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
            const response = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas}&_folio=${folio}`);
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
            state.data = [];
        },
        addToCristales(state, action) {
            state.cristales.push(...action.payload); // Agrega elementos al arreglo cristales
        },
        addToArmazones(state, action) {
            state.armazones.push(...action.payload); // Agrega elementos al arreglo armazones
        },
        clearCodigos(state){
            state.armazones = [];
            state.cristales = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOT.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.estadosOT = {};

            action.payload.forEach((ot:any)=>{
                // console.log(ot)
                const estado = ot[3];

                // Resto del código es igual...
                // console.log(estado)
                // console.log(state.estadosOT[estado])
                if (state.estadosOT[estado]) {
                    state.estadosOT[estado]++;
                } else {
                    state.estadosOT[estado] = 1;
                }
                return;
            })
            state.data = action.payload
            return state
        });
        builder.addCase(fetchOTByID.fulfilled, (state,action)=>{
            state.ot = action.payload
            return state
        });
    },
});

export const { clearData, addToCristales, addToArmazones, clearCodigos } = OTSlice.actions;
export default OTSlice.reducer;
