import { AppUser, SubscriptionStatus } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PendingIntent = {
  intent: "ACCESS_BOOK"; // this will be expanded as more intents are needed
  payload: string;
};

interface AuthState {
  user: AppUser | null;
  subscriptionStatus: SubscriptionStatus;
  isAuthLoading: boolean;
  error: string | null;
  pendingIntent: PendingIntent | null;
}

const initialState: AuthState = {
  user: null,
  subscriptionStatus: null,
  isAuthLoading: true,
  error: null,
  pendingIntent: null,
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
    setIsAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPendingIntent: (
      state,
      action: PayloadAction<{
        pendingIntent: PendingIntent;
      }>,
    ) => {
      state.pendingIntent = action.payload.pendingIntent;
    },
    clearPendingIntent: (state) => {
      state.pendingIntent = null;
    },
  },
});

export default authSlice.reducer;

export const {
  setUser,
  setSubscriptionStatus,
  setIsAuthLoading,
  setError,
  clearError,
  setPendingIntent,
  clearPendingIntent,
} = authSlice.actions;
