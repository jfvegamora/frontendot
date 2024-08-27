import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any | null = localStorage.getItem("user")
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
      permisos_campos: "",
      ultimoMovimiento: new Date().getTime(),
    };

export const UserKey = "user";

export const userSlice = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<any>) => {
      const userData = action.payload;
      _state = { ...userData, ultimoMovimiento: new Date().getTime() };
      localStorage.setItem(
        UserKey,
        JSON.stringify({ ...userData, ultimoMovimiento: new Date().getTime() })
      );
      return { ...userData, ultimoMovimiento: new Date().getTime() };
    },
    logout: (_state) => {
      localStorage.removeItem(UserKey);
      localStorage.removeItem("Funcionalidades");
      return null;
    },
    actualizarUltimoMovimiento: (): any => {
      return { ...initialState, ultimoMovimiento2: new Date().getTime() };
    },
  },
});

export const { login, logout, actualizarUltimoMovimiento } = userSlice.actions;
export default userSlice.reducer;
