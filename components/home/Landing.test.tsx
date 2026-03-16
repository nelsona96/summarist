import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Landing from "./Landing";

describe("Landing section", () => {
  it("renders on home page", () => {
    render(<Landing />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders page title", () => {
    render(<Landing />);
    expect(
      screen.getByRole("heading", { name: "Gain more knowledge in less time" }),
    ).toBeInTheDocument();
  });

  it("renders login button", () => {
    render(<Landing />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
