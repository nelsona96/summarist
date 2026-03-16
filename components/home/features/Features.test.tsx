import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Features from "./Features";

describe("Features section", () => {
  it("renders on home page", () => {
    render(<Features />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders section title", () => {
    render(<Features />);
    expect(
      screen.getByRole("heading", {
        name: "Understand books in a few minutes",
      }),
    ).toBeInTheDocument();
  });

  it("renders three feature cards", () => {
    render(<Features />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("renders both statistics sections", () => {
    render(<Features />);
    expect(screen.getByText("Enhance your knowledge")).toBeInTheDocument();
    expect(screen.getByText("Expand your learning")).toBeInTheDocument();
  });
});
