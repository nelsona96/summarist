import { describe, it, expect } from "vitest";
import reducer, {
  setUser,
  setError,
  clearError,
  setSubscriptionStatus,
  setIsAuthLoading,
} from "./authSlice";

describe("authSlice", () => {
  it("setUser updates user in state", () => {
    const expectedResult = { uid: "123", email: "test@email.com" };
    const result = reducer(undefined, setUser(expectedResult));

    expect(result.user).toEqual(expectedResult);
  });

  it("setSubscriptionStatus updates subscriptionStatus in state", () => {
    const expectedResult = "premium-plus";
    const result = reducer(undefined, setSubscriptionStatus(expectedResult));

    expect(result.subscriptionStatus).toEqual(expectedResult);
  });

  it("setIsAuthLoading updates isAuthLoading in state", () => {
    const expectedResult = false;
    const result = reducer(undefined, setIsAuthLoading(expectedResult));

    expect(result.isAuthLoading).toEqual(expectedResult);
  });

  it("setError updates error in state", () => {
    const expectedResult = "test error";
    const result = reducer(undefined, setError(expectedResult));

    expect(result.error).toEqual(expectedResult);
  });

  it("clearError clears error in state", () => {
    const expectedResult = null;
    const stateWithError = reducer(undefined, setError("test error"));
    const result = reducer(stateWithError, clearError());

    expect(result.error).toEqual(expectedResult);
  });
});
