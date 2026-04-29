import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./authModalSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    auth: authReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
