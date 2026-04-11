import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isOpen: boolean;
  isClosing: boolean;
  input: {
    email: string;
    password: string;
  };
}

const initialState: AuthState = {
  isOpen: false,
  isClosing: false,
  input: {
    email: "",
    password: "",
  },
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
    setInput: (
      state,
      action: PayloadAction<{ field: "email" | "password"; value: string }>,
    ) => {
      state.input[action.payload.field] = action.payload.value;
    },
  },
});

export const { openModal, startClose, finalizeClose, setInput } =
  authSlice.actions;

export default authSlice.reducer;
