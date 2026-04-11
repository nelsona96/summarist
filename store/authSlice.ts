import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isOpen: boolean;
  isClosing: boolean;
}

const initialState: AuthState = {
  isOpen: false,
  isClosing: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
      state.isClosing = false;
    },
    startClose: (state) => {
      state.isClosing = true;
    },
    finalizeClose: (state) => {
      state.isOpen = false;
      state.isClosing = false;
    },
  },
});

export const { openModal, startClose, finalizeClose } = authSlice.actions;

export default authSlice.reducer;
