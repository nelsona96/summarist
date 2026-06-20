import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authModalReducer from "./authModalSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  authModal: authModalReducer,
  auth: authReducer,
});

export function setupStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

const store = setupStore();

export type PreloadedState = Parameters<typeof rootReducer>[0];
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;
