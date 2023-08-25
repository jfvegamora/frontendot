import { createSlice } from "@reduxjs/toolkit";

// interface IUtilsState{
//     regions: IRegiones[]
//     comunas: IComunas[]
// }

const initialState = {
  regions: [{ id: 1, nombre: "nombre", cardinal: "cardnal" }],
  comunas: [],
};

export const utilsSlice = createSlice({
  initialState,
  name: "utilsReducer",
  reducers: {
    addRegions: (state, { payload }) => {
      // initialState.regions = [...initialState.regions, payload ]
      state.regions = [...state.regions, payload];
      // state.regions = [...state.regions, payload]
    },
  },
});

export const { addRegions } = utilsSlice.actions;

export default utilsSlice.reducer;
