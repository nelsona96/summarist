import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalVariants = "login" | "register" | "forgotPassword";

export interface ModalState {
  isOpen: boolean;
  isClosing: boolean;
  input: {
    email: string;
    password: string;
  };
  currentVariant: ModalVariants;
  protectedRoute: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  isClosing: false,
  input: {
    email: "",
    password: "",
  },
  currentVariant: "login",
  protectedRoute: false,
};

export const authModalSlice = createSlice({
  name: "authModal",
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
    clearInput: (state) => {
      state.input.email = "";
      state.input.password = "";
    },
    setCurrentVariant: (state, action: PayloadAction<ModalVariants>) => {
      state.currentVariant = action.payload;
    },
    setProtectedRoute: (state, action: PayloadAction<boolean>) => {
      state.protectedRoute = action.payload;
    },
  },
});

export const {
  openModal,
  startClose,
  finalizeClose,
  setInput,
  clearInput,
  setCurrentVariant,
  setProtectedRoute,
} = authModalSlice.actions;

export type { ModalVariants };

export default authModalSlice.reducer;
