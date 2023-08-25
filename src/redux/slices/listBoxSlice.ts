import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "http://127.0.0.1:8000/api";

const initialState = {
  data: [
    {
      entidad: "cargos",
      dataInfo: [],
    },
    {
      entidad: "usuarios",
      dataInfo: [],
    },
  ],
};

export const fetchData = createAsyncThunk(
  "data/fetching",
  async (entidad: string) => {
    const response = await axios.get(`${apiURL}/${entidad}/listado/?query=02`);
    return response.data;
  },
);

export const listBoxSlice = createSlice({
  initialState,
  name: "ListBoxSlice",
  reducers: {
    //   updateDataInfo: (state, action) => {
    //     const { entidad, newDataInfo } = action.payload;
    //     const entidadItem = state.find((item) => item.entidad === entidad);
    //     entidadItem && (entidadItem.dataInfo = newDataInfo);
    //   },
    //   clearDataInfo: (state, action) => {
    //     const entidad = action.payload;
    //     const entidadItem = state.find((item) => item.entidad === entidad);
    //     entidad && (entidadItem.dataInfo = []);
    //   },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const entidadName = action.meta.arg;
      const entidad = state.data.find((item) => item.entidad === entidadName);
      if (entidad) {
        entidad.dataInfo = action.payload;
      }
      // entidadIndex !== -1 && (state[entidadIndex].dataInfo = action.payload);
    });
  },
});

export default listBoxSlice.reducer;

// updateDataFormCreate('/api/cargos/', "02", "cargos")
// updateDataFormCreate('/api/usuarios/', "02", "usuarios")
