import { createSlice } from "@reduxjs/toolkit";
import { IUser, Permisos } from "../../interfaces";

const initialState: IUser = {
  id: 1,
  nombre: "Usuario 1",
  permisos: Permisos.ESCRITURA,
};

export const UserKey = "user";

export const userSlice = createSlice({
  name: "UserReducer",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : initialState,
  reducers: {},
});

export default userSlice.reducer;
