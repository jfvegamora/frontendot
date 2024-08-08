import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/utils/config";

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
  Dioptrias: localStorage.getItem("dioptrias")
    ? JSON.parse(localStorage.getItem("dioptrias") as string)
    : [],
};

export const fetchRegProCom = createAsyncThunk(
  "regiones/provincias/counas",
  async (token: any) => {
    try {
      const endpoint1 = `${URLBackend}/api/tipos/listado/?query=02&_p1=Regiones`;
      const endpoint2 = `${URLBackend}/api/tipos/listado/?query=02&_p1=Provincias`;
      const endpoint3 = `${URLBackend}/api/tipos/listado/?query=02&_p1=Comunas`;
      // const endpoint4 = `${URLBackend}/api/parametros/listado/?query=01&_p1=21`;

      const [regiones, provincias, comunas] = await Promise.all([
        fetchData(endpoint1, token),
        fetchData(endpoint2, token),
        fetchData(endpoint3, token),
        // fetchData(endpoint4, token),
      ]);
      console.log(regiones);
      return { regiones, provincias, comunas };
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchDioptriaParametros = createAsyncThunk(
  "ESF/CIL/EJE/AD",
  async (token: string) => {
    try {
      const endpoint1 = `${URLBackend}/api/ot/listado/?query=12&_p3=ESF`;
      const endpoint2 = `${URLBackend}/api/ot/listado/?query=12&_p3=CIL`;
      const endpoint3 = `${URLBackend}/api/ot/listado/?query=12&_p3=EJE`;
      const endpoint4 = `${URLBackend}/api/ot/listado/?query=12&_p3=AD`;

      const [esf, cil, eje, ad] = await Promise.all([
        fetchData(endpoint1, token),
        fetchData(endpoint2, token),
        fetchData(endpoint3, token),
        fetchData(endpoint4, token),
      ]);

      return { esf, cil, eje, ad };
    } catch (error) {}
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
        // state.Diametro_cristal = action.payload["diametro_cristal"];

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
      }
      return state;
    });

    builder.addCase(fetchDioptriaParametros.fulfilled, (state, action) => {
      if (action.payload) {
        const listDioptrias = [
          action.payload["esf"],
          action.payload["cil"],
          action.payload["eje"],
          action.payload["ad"],
        ];
        if (localStorage.getItem("dioptrias")) {
          return;
        }

        state.Dioptrias = [...state.Dioptrias, ...listDioptrias];
        localStorage.setItem("dioptrias", JSON.stringify(listDioptrias));
        return state;
      }
    });
  },
});

export default utilsSlice.reducer;
