import { createSlice } from "@reduxjs/toolkit";

const initialState = {};



export const listBoxSlice = createSlice({
  initialState,
  name: "ListBoxSlice",
  reducers: {
      setDataListbox: (state:any, action:any):void => {
        // console.log(action.payload)
        Object.keys(action.payload).forEach((key)=>{
          state[key] = action.payload[key]
        })
        
      },
  }
});

export const { setDataListbox } = listBoxSlice.actions;
export default listBoxSlice.reducer;

