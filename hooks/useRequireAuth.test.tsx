import { describe, it, expect } from "vitest";
import { AppUser } from "@/types/user";
import { setupStore } from "@/store/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { act, renderHook } from "@testing-library/react";
import useRequireAuth from "./useRequireAuth";
import { PendingIntent } from "@/store/authSlice";

describe("useRequireAuth", () => {
  const baseAuthState = {
    user: null,
    subscriptionStatus: null,
    isAuthLoading: false,
    error: null,
    pendingIntent: null,
  };

  const mockUser: AppUser = { uid: "123", email: "guest@email.com" };

  it("sets pendingIntent", () => {
    const store = setupStore({ auth: { ...baseAuthState } });
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    const expectedResult: PendingIntent = {
      intent: "ACCESS_BOOK",
      payload: "abc123",
    };

    const { result } = renderHook(() => useRequireAuth(), { wrapper });

    act(() => {
      result.current(expectedResult);
    });

    expect(store.getState().auth.pendingIntent).toEqual(expectedResult);
  });

  it("does not open modal if user logged in", () => {
    const store = setupStore({ auth: { ...baseAuthState, user: mockUser } });
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useRequireAuth(), { wrapper });

    act(() => {
      result.current({ intent: "ACCESS_BOOK", payload: "abc123" });
    });

    expect(store.getState().authModal.isOpen).toBe(false);
  });

  it("opens modal if user not logged in", () => {
    const store = setupStore({ auth: { ...baseAuthState, user: null } });
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useRequireAuth(), { wrapper });

    act(() => {
      result.current({ intent: "ACCESS_BOOK", payload: "abc123" });
    });

    expect(store.getState().authModal.isOpen).toBe(true);
  });
});
