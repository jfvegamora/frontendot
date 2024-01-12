import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { userReducer, funcionaliddadesReducer,ORReuder, OTAreasReducer, listBoxTiposReducer, listboxReuder, Utils } from "./slices";
import { IUser } from "../interfaces";
import { IFuncionalidad } from "./slices/funcionalidadesSlice";
import { IOTAreas } from "./slices/OTAreasSlice";
import { ITiposListbox } from "./slices/ListBoxTipoSlice";

export interface AppStore {
  user: IUser | null;
  funcionalidades: IFuncionalidad  | null ;
  OTAreas: IOTAreas;
  OTS: any;
  listBoxTipos: ITiposListbox;
  listBox: any;
  utils: any
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userReducer,
    funcionalidades: funcionaliddadesReducer,
    OTAreas: OTAreasReducer,
    listBoxTipos: listBoxTiposReducer,
    listBox: listboxReuder,
    OTS: ORReuder,
    utils: Utils
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


//HOOKS
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

