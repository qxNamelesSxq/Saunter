import { createSlice } from "@reduxjs/toolkit";


interface RootState {
  distance: number;
}

const initialState: RootState = {
  distance: 0,
};

export const setDistanceSlice = createSlice({
  name: 'distance',
  initialState,
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload;
    }
  }
})

export const { setDistance } = setDistanceSlice.actions
export const setDistanceReducer = setDistanceSlice.reducer