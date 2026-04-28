import { describe, expect, it } from "vitest";
import { calculateCurrentStreak } from "@/lib/streaks";

const todaysDate = "2026-04-27";

describe("calculateCurrentStreak", () => {
  it("returns 0 when completions is empty", () => {
    expect(calculateCurrentStreak([], todaysDate)).toBe(0);
  });

  it("returns 0 when today is not completed", () => {
    expect(
      calculateCurrentStreak(["2026-04-26", "2026-04-25"], todaysDate),
    ).toBe(0);
  });

  it("returns the correct streak for consecutive completed days", () => {
    expect(
      calculateCurrentStreak(
        ["2026-04-25", "2026-04-26", "2026-04-27"],
        todaysDate,
      ),
    ).toBe(3);
  });

  it("ignores duplicate completion dates", () => {
    expect(
      calculateCurrentStreak(
        ["2026-04-27", "2026-04-27", "2026-04-26", "2026-04-26"],
        todaysDate,
      ),
    ).toBe(2);
  });

  it("breaks the streak when a calendar day is missing", () => {
    expect(
      calculateCurrentStreak(
        ["2026-04-27", "2026-04-25", "2026-04-24"],
        todaysDate,
      ),
    ).toBe(1);
  });
});
