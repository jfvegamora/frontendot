import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const fetchData = async (endpoint:string,token:string) => {
  try {
    console.log(endpoint)
    console.log(token)
    const response = await axios(endpoint,{
      headers: {
         'Authorization': token, 
       }
  });
  console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

// Defin

const initialState = {
  Regiones:   localStorage.getItem("regiones") ? JSON.parse(localStorage.getItem("regiones") as string) : [],
  Provincias: localStorage.getItem("provincias") ? JSON.parse(localStorage.getItem("provincias") as string) : [],
  Comunas:    localStorage.getItem("comunas") ? JSON.parse(localStorage.getItem("comunas") as string) : [],

};

export const fetchRegProCom = createAsyncThunk('regiones/provincias/counas', async(token:any) => {
  try {
    const endpoint1 = "https://gestiondev.mtoopticos.cl/api/tipos/listado/?query=02&_p1=Regiones";
    const endpoint2 = "https://gestiondev.mtoopticos.cl/api/tipos/listado/?query=02&_p1=Provincias";
    const endpoint3 = "https://gestiondev.mtoopticos.cl/api/tipos/listado/?query=02&_p1=Comunas";

    const [regiones, provincias, comunas] = await Promise.all([
      fetchData(endpoint1,token),
      fetchData(endpoint2,token),
      fetchData(endpoint3,token),
    ]);
    console.log(regiones)
    return {regiones, provincias, comunas}
  } catch (error) {
    console.log(error)
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
