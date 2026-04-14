import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalVariants = "login" | "register" | "forgotPassword";

export interface AuthState {
  isOpen: boolean;
  isClosing: boolean;
  input: {
    email: string;
    password: string;
  };
  currentVariant: ModalVariants;
}

const initialState: AuthState = {
  isOpen: false,
  isClosing: false,
  input: {
    email: "",
    password: "",
  },
  currentVariant: "login",
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
    setCurrentVariant: (state, action: PayloadAction<ModalVariants>) => {
      state.currentVariant = action.payload;
    },
  },
});

export const {
  openModal,
  startClose,
  finalizeClose,
  setInput,
  setCurrentVariant,
} = authSlice.actions;

export type { ModalVariants };

export default authSlice.reducer;
