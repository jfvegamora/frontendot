import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

export interface DataState {
    estadosOT: any;
    cristales: any[];
    armazones: any[];
    derivacionColores:any
    data: any[];
    dataHistorica:any[];
    ot: any[]
}

const initialState: DataState = {
    estadosOT: {},
    cristales: [],
    armazones: [],
    data: [],
    dataHistorica:[],
    ot: [],
    derivacionColores: localStorage.getItem("OTColores")
    ? JSON.parse(localStorage.getItem("OTColores") as string)
    : {}
 
};

export const fetchOT = createAsyncThunk(
    'ot/fetchOT',
    async (params:any) => {
        const {OTAreas, searchParams, historica} = params;

        // console.log(params)
        const OTUrl = searchParams
                                 ? historica ? `${URLBackend}/api/othistorica/listado/?query=14&${searchParams}` :  `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}&${searchParams}` 
                                 : historica ? `${URLBackend}/api/othistorica/listado/?query=14`                 :   OTAreas ? `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}` : `${URLBackend}/api/ot/listado/?query=14&_proyecto=${searchParams}`

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


export const fetchColores = createAsyncThunk(
    'fetch/colores',
    async()=>{
        try {
            const response = await axios.get(`${URLBackend}/api/tipos/listado/?query=02&_p1=OTEstados`)    
            if(response.data){
                const colores = response.data.reduce((acc:any, obj:any)=>{
                    acc[obj[1]] = [obj[2], obj[3]]
                    return acc      
                },{})

                return colores;

            }
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
        },
        clearOTColores(state){
            state.derivacionColores = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOT.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.estadosOT = {};
            state.estadosOT[99] = 0;

            action.payload.forEach((ot:any)=>{
                // console.log(ot)
                const estado = ot[3];
                const esAtrasado = ot[ot.length - 1] === 'S';

                // Resto del código es igual...
                // console.log(estado)
                // console.log(state.estadosOT[estado])
                if (state.estadosOT[estado]) {
                    state.estadosOT[estado]++;
                } else {
                    state.estadosOT[estado] = 1;
                }

                
                if (esAtrasado) {
                    state.estadosOT[99]++;
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
        builder.addCase(fetchColores.fulfilled, (state,action )=>{
            state.derivacionColores = action.payload
            localStorage.setItem('OTColores', JSON.stringify(action.payload))
            return state
        })
    },
});

export const { clearData, addToCristales, addToArmazones, clearCodigos,clearOTColores } = OTSlice.actions;
export default OTSlice.reducer;
