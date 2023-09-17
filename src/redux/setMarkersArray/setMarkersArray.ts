import { createSlice } from "@reduxjs/toolkit";

interface Position {
  lat: number;
  lng: number;
}

interface RootState {
  arr: { position: Position }[]; // определение массива объектов с свойством position, содержащим координаты
}

const initialState: RootState = {
  arr: [],
};

export const setMarkersArraySlice = createSlice({
  name: 'arr',
  initialState,
  reducers: {
    setMarkersArray: (state, action) => {
      state.arr = action.payload;
    }
  }
})

export const { setMarkersArray } = setMarkersArraySlice.actions
export const setMarkersArrayReducer = setMarkersArraySlice.reducer