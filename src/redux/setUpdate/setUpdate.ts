import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: false,
};

  export const setUpdateSlice = createSlice({
    name:'update',
    initialState,
    reducers:{
        setUpdate: (state) =>{state.update = !state.update}
    }
  })

  export const {setUpdate} = setUpdateSlice.actions;
  export const setUpdateReducer = setUpdateSlice.reducer;