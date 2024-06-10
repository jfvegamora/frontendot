import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";

const fetchData = async (endpoint: string, token: string) => {
  try {
    const response = await axios(endpoint, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Defin

const initialState = {
  Regiones: localStorage.getItem("regiones")
    ? JSON.parse(localStorage.getItem("regiones") as string)
    : [],
  Provincias: localStorage.getItem("provincias")
    ? JSON.parse(localStorage.getItem("provincias") as string)
    : [],
  Comunas: localStorage.getItem("comunas")
    ? JSON.parse(localStorage.getItem("comunas") as string)
    : [],
  Diametro_cristal: localStorage.getItem("diametroCristal")
    ? JSON.parse(localStorage.getItem("diametroCristal") as string)
    : 0,
};

export const fetchRegProCom = createAsyncThunk(
  "regiones/provincias/counas",
  async (token: any) => {
    try {
      const endpoint1 = `${URLBackend}/api/tipos/listado/?query=02&_p1=Regiones`;
      const endpoint2 = `${URLBackend}/api/tipos/listado/?query=02&_p1=Provincias`;
      const endpoint3 = `${URLBackend}/api/tipos/listado/?query=02&_p1=Comunas`;
      const endpoint4 = `${URLBackend}/api/parametros/listado/?query=01&_p1=21`;

      const [regiones, provincias, comunas, diametro_cristal] =
        await Promise.all([
          fetchData(endpoint1, token),
          fetchData(endpoint2, token),
          fetchData(endpoint3, token),
          fetchData(endpoint4, token),
        ]);
      console.log(regiones);
      return { regiones, provincias, comunas, diametro_cristal };
    } catch (error) {
      console.log(error);
    }
  }
);

export const utilsSlice = createSlice({
  initialState,
  name: "utilsReducer",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegProCom.fulfilled, (state, action) => {
      // const {regiones, provincias, comunas } = action.payload
      if (action.payload) {
        state.Regiones = action.payload["regiones"];
        state.Provincias = action.payload["provincias"];
        state.Comunas = action.payload["comunas"];
        state.Diametro_cristal = action.payload["diametro_cristal"];

        localStorage.setItem(
          "regiones",
          JSON.stringify(action.payload["regiones"])
        );
        localStorage.setItem(
          "provincias",
          JSON.stringify(action.payload["provincias"])
        );
        localStorage.setItem(
          "comunas",
          JSON.stringify(action.payload["comunas"])
        );
        localStorage.setItem(
          "diametroCristal",
          JSON.stringify(action.payload["diametro_cristal"])
        );
      }

      return state;
    });
  },
});

export default utilsSlice.reducer;
