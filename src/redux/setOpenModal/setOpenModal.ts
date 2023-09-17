import { createSlice } from "@reduxjs/toolkit";


interface RootState {
  modal: boolean;
}

const initialState: RootState = {
  modal: false,
};

export const setOpenModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.modal = action.payload;
    }
  }
})

export const { setOpenModal } = setOpenModalSlice.actions
export const setOpenModalReducer = setOpenModalSlice.reducer