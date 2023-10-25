import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";

const initialState:IUser | null = localStorage.getItem("user")
   ? JSON.parse(localStorage.getItem("user") as string)
   : {
      id: 0,
      nombre: "",
      nickName: "",
      cargo: 0,
      telefono: "",
      correo: "",
      estado: 0,
      permisos: 0,
      permisos_campos:''
    };


export const UserKey = "user";

export const userSlice = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    login: (_state, action:PayloadAction<IUser>) => {
        const userData = action.payload;
        _state = userData;
        console.log(userData)
        localStorage.setItem(UserKey, JSON.stringify(userData))
        return userData;
    },
    logout: (_state) => {
      localStorage.removeItem(UserKey);
      localStorage.removeItem('Funcionalidades');
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
