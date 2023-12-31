import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

export interface DataState {
    estadosOT: any;
    cristales: any[];
    armazones: any[];
    derivacionColores:any
    data: any[];
    ot: any[]
}

const initialState: DataState = {
    estadosOT: {},
    cristales: [],
    armazones: [],
    data: [],
    ot: [],
    derivacionColores: {
        Derivada: ["#FFFFFF", "#E05B16"],
        Pendiente: ["#000000", "#E0DD79"]
    }
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

const filterCodigos = (codigos:any) => {
     const codigosFiltrados = codigos.filter((codigo:any)=> codigo.codigo !== null && codigo.codigo !== 'undefined')
    return codigosFiltrados;
}

const OTSlice = createSlice({
    name: 'OTSlice',
    initialState,
    reducers: {
        clearData(state) {
            state.data = [];
        },
        addToCristales(state, action) {
            const codigos = filterCodigos(action.payload)
            state.cristales.push(...codigos); // Agrega elementos al arreglo cristales
        },
        addToArmazones(state, action) {
            const codigos = filterCodigos(action.payload)
            state.armazones.push(...codigos); // Agrega elementos al arreglo armazones
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
