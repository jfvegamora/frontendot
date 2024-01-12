import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const fetchData = async (endpoint:string) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

// Defin

const initialState = {
  Regiones:   localStorage.getItem("regiones") ? JSON.parse(localStorage.getItem("regiones") as string): [],
  Provincias: localStorage.getItem("provincias") ? JSON.parse(localStorage.getItem("provincias") as string): [],
  Comunas:    localStorage.getItem("comunas") ? JSON.parse(localStorage.getItem("comunas") as string): [],

};

export const fetchRegProCom = createAsyncThunk('regiones/provincias/counas', async() => {
  try {
    const endpoint1 = "https://gestiondev.mtoopticos.cl/api/tipos/listado/?query=02&_p1=Regiones";
    const endpoint2 = "https://gestiondev.mtoopticos.cl/api/tipos/listado/?query=02&_p1=Provincias";
    const endpoint3 = "https://gestiondev.mtoopticos.cl/api/tipos/listado/?query=02&_p1=Comunas";

    const [regiones, provincias, comunas] = await Promise.all([
      fetchData(endpoint1),
      fetchData(endpoint2),
      fetchData(endpoint3),
    ]);

    return {regiones, provincias, comunas}
  } catch (error) {
    
  }
})

export const utilsSlice = createSlice({
  initialState,
  name: "utilsReducer",
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegProCom.fulfilled, (state, action)=>{
      // const {regiones, provincias, comunas } = action.payload
      if(action.payload){
        state.Regiones   = action.payload["regiones"]
        state.Provincias = action.payload["provincias"]
        state.Comunas    = action.payload["comunas"]

        localStorage.setItem('regiones', JSON.stringify(action.payload["regiones"]));
        localStorage.setItem('provincias', JSON.stringify(action.payload["provincias"]));
        localStorage.setItem('comunas', JSON.stringify(action.payload["comunas"]));

      }

      return state
    })
  }
});


export default utilsSlice.reducer;
