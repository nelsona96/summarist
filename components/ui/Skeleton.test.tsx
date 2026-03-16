import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skeleton from "./Skeleton";

describe("Skeleton placeholder", () => {
  it("renders with given dimensions", () => {
    render(<Skeleton width="300px" height="16px" />);
    const element = screen.getByRole("status");
    expect(element).toHaveStyle("width: 300px");
    expect(element).toHaveStyle("height: 16px");
  });
});
