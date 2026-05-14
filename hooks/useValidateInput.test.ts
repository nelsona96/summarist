import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword } from "./useValidateInput";

describe("validateEmail", () => {
  it("returns true on valid input", () => {
    expect(validateEmail("test@email.com")).toBe(true);
  });

  it("returns error string on invalid input", () => {
    expect(validateEmail("testemail")).toBe(
      "Please enter a valid email address",
    );
  });
});

describe("validatePassword", () => {
  it("returns true on valid input", () => {
    expect(validatePassword("12345678")).toBe(true);
  });

  it("returns error string on invalid input", () => {
    expect(validatePassword("1234")).toBe(
      "Password must be 8 or more characters",
    );
  });
});
