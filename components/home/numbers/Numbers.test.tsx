import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Numbers from "./Numbers";

describe("Numbers section", () => {
  it("renders on home page", () => {
    render(<Numbers />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders section title", () => {
    render(<Numbers />);
    expect(
      screen.getByRole("heading", { name: "Start growing with Summarist now" }),
    ).toBeInTheDocument();
  });

  it("renders all three number cards", () => {
    render(<Numbers />);
    expect(screen.getByText("3 Million")).toBeInTheDocument();
    expect(screen.getByText("4.5 Stars")).toBeInTheDocument();
    expect(screen.getByText("97%")).toBeInTheDocument();
  });
});
