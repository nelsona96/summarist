import { describe, it, expect } from "vitest";
import { formatTime } from "./utils";

describe("formatTime", () => {
  it("formats 0 seconds correctly", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("formats 65 seconds correctly", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("formats 125 seconds correctly", () => {
    expect(formatTime(125)).toBe("02:05");
  });

  it("formats 344 seconds correctly", () => {
    expect(formatTime(344)).toBe("05:44")
  })
});
