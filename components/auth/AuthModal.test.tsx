import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import AuthModal from "./AuthModal";

vi.mock("@/lib/firebase", () => ({
  auth: {},
}));

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

describe("AuthModal", () => {
  it("renders login title by default", () => {
    render(<AuthModal />);
    expect(
      screen.getByRole("heading", { name: "Log in to Summarist" }),
    ).toBeInTheDocument();
  });

  it("renders login button by default", () => {
    render(<AuthModal />);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});
