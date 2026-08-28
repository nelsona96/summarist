import { describe, it, expect } from "vitest";
import reducer, {
  openModal,
  startClose,
  finalizeClose,
  setCurrentVariant,
} from "./authModalSlice";

describe("authModalSlice", () => {
  it("openModal() updates isOpen, isClosing in state", () => {
    const result = reducer(undefined, openModal());

    expect(result.isOpen).toBe(true);
    expect(result.isClosing).toBe(false);
  });

  it("openModal(currentVariant) additionally updates currentVariant in state", () => {
    const result = reducer(
      undefined,
      openModal({ currentVariant: "forgotPassword" }),
    );

    expect(result.currentVariant).toBe("forgotPassword");
  });

  it("startClose updates isClosing in state", () => {
    const result = reducer(undefined, startClose());

    expect(result.isClosing).toBe(true);
  });

  it("finalizeClose updates isOpen, isClosing, currentVariant in state", () => {
    const openState = reducer(
      undefined,
      openModal(),
    );
    const result = reducer(openState, finalizeClose());

    expect(result.isOpen).toBe(false);
    expect(result.isClosing).toBe(false);
    expect(result.currentVariant).toBe("login");
  });

  it("setCurrentVariant updates currentVariant in state", () => {
    const result = reducer(undefined, setCurrentVariant("register"));

    expect(result.currentVariant).toBe("register");
  });
});
