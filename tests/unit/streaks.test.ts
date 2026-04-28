import { describe, expect, it } from "vitest";
import { calculateCurrentStreak } from "@/lib/streaks";

const todaysDate = "2026-04-27";

describe("calculateCurrentStreak", () => {
  it("returns 0 when completions is empty", () => {
    expect(calculateCurrentStreak(todaysDate, [])).toBe(0);
  });

  it("counts the streak from yesterday when today is not yet completed", () => {
    expect(
      calculateCurrentStreak(todaysDate, ["2026-04-26", "2026-04-25"]),
    ).toBe(2);
  });

  it("returns 0 when neither today nor yesterday is completed", () => {
    expect(
      calculateCurrentStreak(todaysDate, ["2026-04-25", "2026-04-24"]),
    ).toBe(0);
  });

  it("returns the correct streak for consecutive completed days", () => {
    expect(
      calculateCurrentStreak(todaysDate, [
        "2026-04-25",
        "2026-04-26",
        "2026-04-27",
      ]),
    ).toBe(3);
  });

  it("ignores duplicate completion dates", () => {
    expect(
      calculateCurrentStreak(todaysDate, [
        "2026-04-27",
        "2026-04-27",
        "2026-04-26",
        "2026-04-26",
      ]),
    ).toBe(2);
  });

  it("breaks the streak when a calendar day is missing", () => {
    expect(
      calculateCurrentStreak(todaysDate, [
        "2026-04-27",
        "2026-04-25",
        "2026-04-24",
      ]),
    ).toBe(1);
  });
});
