import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skeleton from "./Skeleton";

describe("Skeleton", () => {
  it("renders a status element with accessible label", () => {
    render(<Skeleton />);
    const element = screen.getByRole("status");
    expect(element).toHaveAttribute("aria-label", "Loading content");
  });

  it("renders without error when no className is passed", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies a passed className to the element", () => {
    render(<Skeleton className="customClass" />);
    expect(screen.getByRole("status")).toHaveClass("customClass");
  });
});
