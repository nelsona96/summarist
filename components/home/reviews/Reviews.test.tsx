import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Reviews from "./Reviews";

describe("Reviews section", () => {
  it("renders on home page", () => {
    render(<Reviews />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders section title", () => {
    render(<Reviews />);
    expect(
      screen.getByRole("heading", { name: "What our members say" }),
    ).toBeInTheDocument();
  });

  it("renders four review cards", () => {
    render(<Reviews />);
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("renders login button", () => {
    render(<Reviews />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
