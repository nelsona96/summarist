import { AppUser, SubscriptionStatus } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: AppUser | null;
  subscriptionStatus: SubscriptionStatus;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  subscriptionStatus: null,
  isLoading: true,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      state.user = action.payload;
    },
    setSubscriptionStatus: (
      state,
      action: PayloadAction<SubscriptionStatus>,
    ) => {
      state.subscriptionStatus = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export default authSlice.reducer;

export const {
  setUser,
  setSubscriptionStatus,
  setIsLoading,
  setError,
  clearError,
} = authSlice.actions;
