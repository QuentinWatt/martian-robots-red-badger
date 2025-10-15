import { describe, it, expect } from "vitest";
import { handleGridWalk } from "../../app/api/robots/gridwalk/robotGridWalk";

describe("robotGridWalk utils", () => {
  it("should mark robots as LOST immediately on a 0x0 grid", () => {
    const results = handleGridWalk("0 0", [
      { startPosition: "1 1 N", moves: "F" },
      { startPosition: "1 1 W", moves: "F" },
    ]);

    expect(results).toEqual(["1 1 N LOST", "1 1 W LOST"]);
  });

  it("should mark robot as LOST after one move on a 1x1 grid", () => {
    const results = handleGridWalk("1 1", [
      { startPosition: "1 1 N", moves: "F" },
    ]);

    expect(results).toEqual(["1 1 N LOST"]);
  });

  it("should protect subsequent robots with scent markers on a 1x1 grid", () => {
    const results = handleGridWalk("1 1", [
      { startPosition: "1 1 N", moves: "F" },
      { startPosition: "1 1 N", moves: "F" },
      { startPosition: "1 1 N", moves: "F" },
    ]);

    expect(results).toEqual(["1 1 N LOST", "1 1 N", "1 1 N"]);
  });

  it("should protect robots with scent markers in all four directions", () => {
    const results = handleGridWalk("2 2", [
      { startPosition: "1 2 N", moves: "F" },
      { startPosition: "1 0 S", moves: "F" },
      { startPosition: "0 1 W", moves: "F" },
      { startPosition: "2 1 E", moves: "F" },
      { startPosition: "1 2 N", moves: "F" },
      { startPosition: "1 0 S", moves: "F" },
      { startPosition: "0 1 W", moves: "F" },
      { startPosition: "2 1 E", moves: "F" },
    ]);

    expect(results).toEqual([
      "1 2 N LOST",
      "1 0 S LOST",
      "0 1 W LOST",
      "2 1 E LOST",
      "1 2 N",
      "1 0 S",
      "0 1 W",
      "2 1 E",
    ]);
  });
});
