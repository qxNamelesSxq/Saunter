import { createSlice } from "@reduxjs/toolkit";


interface RootState {
  show: boolean;
}

const initialState: RootState = {
  show: false,
};

export const setShowRouteInfoSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {
    setShowRouteInfo: (state, action) => {
      state.show = action.payload;
    }
  }
})

export const { setShowRouteInfo } = setShowRouteInfoSlice.actions
export const setShowRouteInfoReducer = setShowRouteInfoSlice.reducer