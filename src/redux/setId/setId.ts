import { createSlice } from "@reduxjs/toolkit";


interface RootState {
  id: string;
}

const initialState: RootState = {
  id: '',
};

export const setIdSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    }
  }
})

export const { setId } = setIdSlice.actions
export const setIdReducer = setIdSlice.reducer