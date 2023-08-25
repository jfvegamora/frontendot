import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { userReducer } from "./slices";
import { IUser } from "../interfaces";

export interface AppStore {
  user: IUser;
  //AÑADIR TIPADO DE OTROS ESTADOS
}

export const store = configureStore<AppStore>({
  reducer: {
    // user: usersReducer
    // listBox: listBoxSlice,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//HOOKS
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
