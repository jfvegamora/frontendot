import { createSlice } from "@reduxjs/toolkit";
import { IUser, Permisos } from "../../interfaces";

const initialState: IUser = {
  id: 0,
  nombre: "",
  nickName: "",
  cargo: 0,
  telefono: "",
  correo: "",
  estado: 0,
  permisos: Permisos.ESCRITURA,
};

export const UserKey = "user";

export const userSlice = createSlice({
  name: "UserReducer",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload[0];
      console.log(userData);
      console.log(userData[1]);
      console.log(state);

      state.id = userData[0];
      state.nombre = userData[1];
      state.nickName = userData[2];
      state.cargo = userData[4];
      state.telefono = userData[5];
      state.correo = userData[6];
      state.estado = userData[7];
      state.permisos = Permisos.ESCRITURA;

      localStorage.setItem(UserKey, JSON.stringify(state));
    },
    logout: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem(UserKey);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
