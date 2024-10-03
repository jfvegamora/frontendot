import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const initialState: any | null = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user") as string)
//   : {
//       id: 0,
//       nombre: "",
//       nickName: "",
//       cargo: 0,
//       telefono: "",
//       correo: "",
//       estado: 0,
//       permisos: 0,
//       permisos_campos: "",
//       ultimoMovimiento: new Date().getTime(),
//     };

export const UserKey = "user";

const getUserFromSessionStorage = () => {
  const storedUser = sessionStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: any = getUserFromSessionStorage();
export const userSlice = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<any>) => {
      const userData = action.payload;
      _state = { ...userData, ultimoMovimiento: new Date().getTime() };

      const updatedUserData = {
        ...userData,
        ultimoMovimiento: new Date().getTime(),
      };

      // const prevUsers =
      //   JSON.parse(localStorage.getItem("usersSistem") as any) || {};
      // const localStorageUserKey = UserKey.concat(userData.id);

      // localStorage.setItem(
      //   localStorageUserKey,
      //   JSON.stringify((prevUsers[localStorageUserKey] = userData))
      // );

      // localStorage.setItem(
      //   UserKey,
      //   JSON.stringify({ ...userData, ultimoMovimiento: new Date().getTime() })
      // );

      sessionStorage.setItem("user", JSON.stringify(updatedUserData));

      return updatedUserData;
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
