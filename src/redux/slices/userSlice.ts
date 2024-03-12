import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState:any | null = localStorage.getItem("user")
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
      permisos_campos:'',
      ultimoMovimiento: new Date().getTime()
    };


export const UserKey = "user";

export const userSlice = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    login: (_state, action:PayloadAction<any>) => {
        const userData = action.payload;
        _state = {...userData, ultimoMovimiento: new Date().getTime()};
        localStorage.setItem(UserKey, JSON.stringify({...userData, ultimoMovimiento: new Date().getTime()}))
        return {...userData, ultimoMovimiento: new Date().getTime()};
    },
    logout: (_state) => {
      localStorage.removeItem(UserKey);
      localStorage.removeItem('Funcionalidades');
      return null;
    },
    actualizarUltimoMovimiento: ():any=> {
      console.log('render')
      return {...initialState, ultimoMovimiento2: new Date().getTime()};
    }
  },
});

export const { login, logout, actualizarUltimoMovimiento } = userSlice.actions;
export default userSlice.reducer;


export const sesionExpirada = () => {
  let horaInicioSesion = JSON.parse(localStorage.getItem('user') && localStorage.getItem('user') as any)
  console.log(horaInicioSesion.ultimoMovimiento)
  if (horaInicioSesion.ultimoMovimiento) {
    const tiempoTranscurrido = new Date().getTime() - horaInicioSesion.ultimoMovimiento;
    console.log(tiempoTranscurrido)
    const minutosTranscurridos = tiempoTranscurrido / (10000 * 60);
    console.log(minutosTranscurridos)
    if (minutosTranscurridos < 15) {
      // Actualizar la hora de inicio de sesión en Redux
      console.log('render')
      actualizarUltimoMovimiento()
      return true; 
    } else {
      return false;
    }
  }

  return true;
};
