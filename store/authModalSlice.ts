import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalVariants = "login" | "register" | "forgotPassword";

export interface ModalState {
  isOpen: boolean;
  isClosing: boolean;
  currentVariant: ModalVariants;
  pendingRedirect: string;
}

const initialState: ModalState = {
  isOpen: false,
  isClosing: false,
  currentVariant: "login",
  pendingRedirect: "",
};

export const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<
        { pendingRedirect?: string; currentVariant?: ModalVariants } | undefined
      >,
    ) => {
      state.isOpen = true;
      state.isClosing = false;

      if (action.payload?.pendingRedirect) {
        state.pendingRedirect = action.payload?.pendingRedirect;
      }

      if (action.payload?.currentVariant) {
        state.currentVariant = action.payload?.currentVariant;
      }
    },
    startClose: (state) => {
      state.isClosing = true;
    },
    finalizeClose: (state) => {
      state.isOpen = false;
      state.isClosing = false;
      state.pendingRedirect = "";
      state.currentVariant = "login";
    },
    setCurrentVariant: (state, action: PayloadAction<ModalVariants>) => {
      state.currentVariant = action.payload;
    },
  },
});

export const { openModal, startClose, finalizeClose, setCurrentVariant } =
  authModalSlice.actions;

export type { ModalVariants };

export default authModalSlice.reducer;
