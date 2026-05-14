import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "@/store/authModalSlice";
import authReducer from "@/store/authSlice";

export * from "@testing-library/react";

function makeStore() {
  return configureStore({
    reducer: {
      authModal: authModalReducer,
      auth: authReducer,
    },
  });
}

function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  const store = makeStore();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export { renderWithProviders as render };
