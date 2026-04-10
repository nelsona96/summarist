import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isOpen: boolean;
}

const initialState: AuthState = {
  isOpen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleModalToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { handleModalToggle } = authSlice.actions;

export default authSlice.reducer;
