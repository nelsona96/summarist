import { render, type RenderOptions } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { AppStore, PreloadedState, setupStore } from "@/store/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "@/store/authModalSlice";
import authReducer from "@/store/authSlice";

interface ExtendedRenderOptions extends Omit<
  RenderOptions,
  "queries" | "wrapper"
> {
  preloadedState?: PreloadedState;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function makeStore() {
  return configureStore({
    reducer: {
      authModal: authModalReducer,
      auth: authReducer,
    },
  });
}
