import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SelectedError from "./SelectedError";

describe("Selected Section Error Component", () => {
  it("contains 'error'", () => {
    render(<SelectedError message="error" />);

    expect(screen.getByText(/err/)).toBeInTheDocument();
  });

  it("contains paragraph role", () => {
    render(<SelectedError message="error" />);

    expect(screen.getByRole("paragraph")).toBeInTheDocument();
  });

  it("does not contain 'leedle'", () => {
    render(<SelectedError message="error" />);

    expect(screen.queryByText("leedle")).toBeNull();
  });
});
