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

  it("openModal(pendingRedirect) additionally updates pendingRedirect in state", () => {
    const result = reducer(
      undefined,
      openModal({ pendingRedirect: "/for-you" }),
    );

    expect(result.pendingRedirect).toBe("/for-you");
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

  it("finalizeClose updates isOpen, isClosing, pendingRedirect, currentVariant in state", () => {
    const openState = reducer(
      undefined,
      openModal({ pendingRedirect: "/library" }),
    );
    const result = reducer(openState, finalizeClose());

    expect(result.isOpen).toBe(false);
    expect(result.isClosing).toBe(false);
    expect(result.pendingRedirect).toBe("");
    expect(result.currentVariant).toBe("login");
  });

  it("setCurrentVariant updates currentVariant in state", () => {
    const result = reducer(undefined, setCurrentVariant("register"));

    expect(result.currentVariant).toBe("register");
  });
});
