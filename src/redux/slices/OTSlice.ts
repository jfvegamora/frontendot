import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";
import { EnumGrid } from "../../presentation/views/mantenedores/MOTHistorica";
import { validarImpresion } from "../../presentation/utils";
// import { toast } from "react-toastify";

export interface DataState {
    estadosOT: any;
    cristales: any[];
    armazones: any[];
    derivacionColores:any
    data: any[];
    dataHistorica:any[];
    ot: any[],
    impresionOT:any[]
}

const initialState: DataState = {
    estadosOT: {},
    cristales: [],
    armazones: [],
    data: [],
    dataHistorica:[],
    ot: [],
    impresionOT: [],
    derivacionColores: localStorage.getItem('OTColores')
    ? JSON.parse(localStorage.getItem("OTColores") as string)
    :  {
        Ingresada: [ '#000000', '#FFFFFF' ],
        'En proceso': [ '#000000', '#FFFFFF' ],
        Pendiente: [ '#000000', '#FFFF00' ],
        Derivada: [ '#FFFFFF', '#FF0000' ],
        Entregada: [ '#000000', '#FFFFFF' ],
        Cerrada: [ '#000000', '#FFFFFF' ],
        Facturada: [ '#000000', '#FFFFFF' ],
        Anulada: [ '#FFFFFF', '#808080' ]
      }
};


const limit = 0

export const fetchOT = createAsyncThunk(
    'ot/fetchOT',
    async (params:any) => {
        const {OTAreas, searchParams, historica} = params;

        // console.log(params)
        const OTUrl = searchParams
                                 ? historica ? `${URLBackend}/api/othistorica/listado/?query=14&${searchParams}&_limit=${limit}` :  `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}&${searchParams}&_limit=${limit}` 
                                 : historica ? `${URLBackend}/api/othistorica/listado/?query=14&_limit=${limit}`                 :   OTAreas ? `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}&_limit=${limit}` : `${URLBackend}/api/ot/listado/?query=14&${searchParams}&_limit=${limit}`

        // console.log(OTUrl)

        const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTgsIm5vbWJyZSI6IkJhc3RpYW4gR2FyY2VzIiwiY29ycmVvIjoiYmFzdGlhbmdhcmNlc2dhQGdtYWlsLmNvbSIsImNhcmdvIjoxLCJ0ZWxlZm9ubyI6IiAiLCJlc3RhZG8iOiIxIiwiZXhwaXJhY2lvbiI6IjIwMjQtMDMtMDZUMTE6MDA6MjcuODI3NTcxIiwicGVybWlzb3MiOnsiMSI6W3siaWRfb3BjaW9uIjoxLCJvcGNpb25fbm9tYnJlIjoiT1QgSGlzdFx1MDBmM3JpY2EiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIyIjpbeyJpZF9vcGNpb24iOjIsIm9wY2lvbl9ub21icmUiOiJDbGllbnRlcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjMiOlt7ImlkX29wY2lvbiI6Mywib3BjaW9uX25vbWJyZSI6IkVzdGFibGVjaW1pZW50b3MiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCI0IjpbeyJpZF9vcGNpb24iOjQsIm9wY2lvbl9ub21icmUiOiJQdW50b3MgZGUgVmVudGEiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCI1IjpbeyJpZF9vcGNpb24iOjUsIm9wY2lvbl9ub21icmUiOiJBcm1hem9uZXMiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCI2IjpbeyJpZF9vcGNpb24iOjYsIm9wY2lvbl9ub21icmUiOiJLYXJkZXggZGUgQXJtYXpvbmVzIiwicGVybWlzb190aXBvIjoiMiJ9XSwiNyI6W3siaWRfb3BjaW9uIjo3LCJvcGNpb25fbm9tYnJlIjoiQ3Jpc3RhbGVzIiwicGVybWlzb190aXBvIjoiMiJ9XSwiOCI6W3siaWRfb3BjaW9uIjo4LCJvcGNpb25fbm9tYnJlIjoiS2FyZGV4IGRlIENyaXN0YWxlcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjkiOlt7ImlkX29wY2lvbiI6OSwib3BjaW9uX25vbWJyZSI6IkFjY2Vzb3Jpb3MiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIxMCI6W3siaWRfb3BjaW9uIjoxMCwib3BjaW9uX25vbWJyZSI6IkthcmRleCBkZSBBY2Nlc29yaW9zIiwicGVybWlzb190aXBvIjoiMiJ9XSwiMTEiOlt7ImlkX29wY2lvbiI6MTEsIm9wY2lvbl9ub21icmUiOiJBbG1hY2VuZXMiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIxMiI6W3siaWRfb3BjaW9uIjoxMiwib3BjaW9uX25vbWJyZSI6Ik1hcmNhcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjEzIjpbeyJpZF9vcGNpb24iOjEzLCJvcGNpb25fbm9tYnJlIjoiUHJvdmVlZG9yZXMiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIxNCI6W3siaWRfb3BjaW9uIjoxNCwib3BjaW9uX25vbWJyZSI6Ik1hbmRhbnRlcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjE1IjpbeyJpZF9vcGNpb24iOjE1LCJvcGNpb25fbm9tYnJlIjoiUHJveWVjdG9zIiwicGVybWlzb190aXBvIjoiMiJ9XSwiMTYiOlt7ImlkX29wY2lvbiI6MTYsIm9wY2lvbl9ub21icmUiOiJQYXJhbWV0cml6YWNpXHUwMGYzbiBkZSBNdWVzdHJhcmlvcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjE3IjpbeyJpZF9vcGNpb24iOjE3LCJvcGNpb25fbm9tYnJlIjoiUGFyYW1ldHJpemFjaVx1MDBmM24gZGUgR3J1cG9zIiwicGVybWlzb190aXBvIjoiMiJ9XSwiMTgiOlt7ImlkX29wY2lvbiI6MTgsIm9wY2lvbl9ub21icmUiOiJQYXJhbWV0cml6YWNpXHUwMGYzbiBkZSBEaXJlY2Npb25lcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjE5IjpbeyJpZF9vcGNpb24iOjE5LCJvcGNpb25fbm9tYnJlIjoiUmVwb3J0ZSBkZSBBdGVuY2lcdTAwZjNuICIsInBlcm1pc29fdGlwbyI6IjIifV0sIjIwIjpbeyJpZF9vcGNpb24iOjIwLCJvcGNpb25fbm9tYnJlIjoiUmVwb3J0ZSBkZSBGaXJtYXMiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIyMSI6W3siaWRfb3BjaW9uIjoyMSwib3BjaW9uX25vbWJyZSI6Ik9mdGFsbVx1MDBmM2xvZ29zIiwicGVybWlzb190aXBvIjoiMiJ9XSwiMjIiOlt7ImlkX29wY2lvbiI6MjIsIm9wY2lvbl9ub21icmUiOiJDYXJnb3MiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIyMyI6W3siaWRfb3BjaW9uIjoyMywib3BjaW9uX25vbWJyZSI6IkZ1bmNpb25hbGlkYWRlcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjI0IjpbeyJpZF9vcGNpb24iOjI0LCJvcGNpb25fbm9tYnJlIjoiVXN1YXJpb3MiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIyNSI6W3siaWRfb3BjaW9uIjoyNSwib3BjaW9uX25vbWJyZSI6IlBlcmZpbCBkZSBDYXJnbyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjI2IjpbeyJpZF9vcGNpb24iOjI2LCJvcGNpb25fbm9tYnJlIjoiUGVybWlzb3MgZGUgVXN1YXJpbyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjI3IjpbeyJpZF9vcGNpb24iOjI3LCJvcGNpb25fbm9tYnJlIjoiRW1wcmVzYXMiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIyOCI6W3siaWRfb3BjaW9uIjoyOCwib3BjaW9uX25vbWJyZSI6Ik9UIERpYXJpYSIsInBlcm1pc29fdGlwbyI6IjIifV0sIjI5IjpbeyJpZF9vcGNpb24iOjI5LCJvcGNpb25fbm9tYnJlIjoiTW90aXZvcyBkZSBPVCBEZXJpdmFkYSIsInBlcm1pc29fdGlwbyI6IjIifV0sIjMwIjpbeyJpZF9vcGNpb24iOjMwLCJvcGNpb25fbm9tYnJlIjoiUGFyYW1ldHJpemFjaVx1MDBmM24gZGUgQWNjZXNvcmlvcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjMzIjpbeyJpZF9vcGNpb24iOjMzLCJvcGNpb25fbm9tYnJlIjoiUGFyYW1ldHJpemFjaVx1MDBmM24gZGUgUHVudG9zIGRlIFZlbnRhIiwicGVybWlzb190aXBvIjoiMiJ9XSwiMzQiOlt7ImlkX29wY2lvbiI6MzQsIm9wY2lvbl9ub21icmUiOiJQYXJhbWV0cml6YWNpXHUwMGYzbiBkZSBVc3VhcmlvcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjM1IjpbeyJpZF9vcGNpb24iOjM1LCJvcGNpb25fbm9tYnJlIjoiUGFyYW1ldHJpemFjaVx1MDBmM24gZGUgVml0cmluYXMiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIzNiI6W3siaWRfb3BjaW9uIjozNiwib3BjaW9uX25vbWJyZSI6Ik11ZXN0cmFyaW9zIiwicGVybWlzb190aXBvIjoiMiJ9XSwiMzciOlt7ImlkX29wY2lvbiI6MzcsIm9wY2lvbl9ub21icmUiOiJWaXRyaW5hcyIsInBlcm1pc29fdGlwbyI6IjIifV0sIjM4IjpbeyJpZF9vcGNpb24iOjM4LCJvcGNpb25fbm9tYnJlIjoiRG9jdW1lbnRvcyBkZWwgUHJveWVjdG8iLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCIzOSI6W3siaWRfb3BjaW9uIjozOSwib3BjaW9uX25vbWJyZSI6Ik1vdGl2b3MgZGUgT1QgUGVuZGllbnRlIiwicGVybWlzb190aXBvIjoiMiJ9XSwiNDAiOlt7ImlkX29wY2lvbiI6NDAsIm9wY2lvbl9ub21icmUiOiJNb3Rpdm9zIGRlIE9UIFBvc3QtVmVudGEiLCJwZXJtaXNvX3RpcG8iOiIyIn1dLCI0MSI6W3siaWRfb3BjaW9uIjo0MSwib3BjaW9uX25vbWJyZSI6Ik1vdGl2b3MgZGUgT1QgQW51bGFkYSIsInBlcm1pc29fdGlwbyI6IjIifV19LCJwZXJtaXNvc19jYW1wb3MiOiIxMTExMTExMTEifQ.a0RY_Bze1T_EVS3XikDMkNomaJYwcjlFekzQAIKMycO9ExCPhO7ev3HAYCpK_aljZ7Ws6eNY0pZU5XEX8mpNPw"
        
        try {

            let retryCount = 0;
            const maxRetries = 3;
          
            while (retryCount < maxRetries) {
              try {
                const { data } = await axios(OTUrl,{
                    headers: {
                        'Authorization' : `${token}`
                    }
                });
                return data; 
              } catch (error) {
                if (retryCount >= maxRetries - 1) {
                  throw error;
                }
                retryCount += 1;
                await new Promise((resolve) => setTimeout(resolve, 4000));
              }
            }
            
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
);



export const fetchOTByID = createAsyncThunk(
    'ot/fetchOTbyID',
    async(params:any) => {
        try {
            const {folio, OTAreas} = params;
            // console.log(historica)
            const response = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas}&_folio=${folio}`);
            return response.data[0]
        } catch (error) {
            // console.log(error)
            throw error;
        }
    }
)

export const fetchOTImpresionByID = createAsyncThunk(
    'ot/fetchOTImpresionbyID',
    async(params:any) => {
        try {
            const {folio, OTAreas} = params;
            const response = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas}&_folio=${folio}`);
            validarImpresion.value = response.data[0][EnumGrid.estado_impresion_id]
            return response.data[0]
        } catch (error) {
            // console.log(error)
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
    async(token:any)=>{
        try {
            const response = await axios.get(`${URLBackend}/api/tipos/listado/?query=02&_p1=OTEstados`,{
                headers: {
                   'Authorization': token, 
                 }
           })    
            if(response.data){
                const colores = response.data.reduce((acc:any, obj:any)=>{
                    acc[obj[1]] = [obj[2], obj[3]]
                    return acc      
                },{})

                return colores;

            }
        } catch (error) {
            // console.log(error)
            throw error;
        }
    }
)



const OTSlice = createSlice({
    name: 'OTSlice',
    initialState,
    reducers: {
        clearData(state) {
            state.data        = [];
            state.ot          = [];
            state.impresionOT = [];
            state.estadosOT   = [];
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
        },
        clearImpression(state){
            state.impresionOT = []
            state.ot          = []
            
            //lamar a la query para cambiar campo de la OT

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOT.fulfilled, (state, action) => {
            console.log(action.payload)
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
        builder.addCase(fetchOTImpresionByID.fulfilled, (state,action)=>{
            state.impresionOT = [...state.impresionOT, action.payload]
            state.ot          = [...state.ot, action.payload]
            return state
        });
        builder.addCase(fetchColores.fulfilled, (state,action )=>{
            state.derivacionColores = action.payload
            console.log(action.payload)
            localStorage.setItem('OTColores', JSON.stringify(action.payload))
            return state
        });
    },
});

export const { clearData, addToCristales, addToArmazones, clearCodigos,clearOTColores,clearImpression } = OTSlice.actions;
export default OTSlice.reducer;
