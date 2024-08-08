import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/utils/config";

export interface IFuncionalidad {
  id: string;
  codigo: string;
  descripcion: string;
}

const initialState: IFuncionalidad | null = localStorage.getItem(
  "Funcionalidades"
)
  ? JSON.parse(localStorage.getItem("Funcionalidades") as string)
  : [];

export const fetchFuncionalidades = createAsyncThunk(
  "funcionalidades/fetchFuncionalidades",
  async (token: any) => {
    try {
      const response = await axios.get(
        `${URLBackend}/api/funcionalidades/listado/?query=01`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const Funcionalidades = "Funcionalidades";

const funcionalidadesSlice = createSlice({
  name: "funcionalidades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFuncionalidades.fulfilled, (_state, action) => {
      localStorage.setItem(Funcionalidades, JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export default funcionalidadesSlice.reducer;
