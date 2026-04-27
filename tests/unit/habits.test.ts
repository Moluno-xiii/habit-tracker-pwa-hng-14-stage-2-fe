import { describe, expect, it } from "vitest";
import { toggleHabitCompletion } from "@/lib/habits";
import type { Habit } from "@/types/habit";

const buildHabit = (completions: string[]): Habit => ({
  id: "Escanor-lion-sin-of-pride",
  userId: "Escanor",
  name: "Create habit tracker",
  description: "Finish HNG frontend stage 3 PWA habit tracker app.",
  frequency: "daily",
  createdAt: "2026-04-20",
  completions,
});

describe("toggleHabitCompletion", () => {
  it("adds a completion date when the date is not present", () => {
    const habit = buildHabit(["2026-04-25"]);

    const result = toggleHabitCompletion(habit, "2026-04-26");

    expect(result.completions).toContain("2026-04-26");
    expect(result.completions).toHaveLength(2);
  });

  it("removes a completion date when the date already exists", () => {
    const habit = buildHabit(["2026-04-25", "2026-04-26"]);

    const result = toggleHabitCompletion(habit, "2026-04-26");

    expect(result.completions).not.toContain("2026-04-26");
    expect(result.completions).toEqual(["2026-04-25"]);
  });

  it("does not mutate the original habit object", () => {
    const original = buildHabit(["2026-04-25"]);
    const snapshot = {
      ...original,
      completions: [...original.completions],
    };

    const result = toggleHabitCompletion(original, "2026-04-26");

    expect(original).toEqual(snapshot);
    expect(result).not.toBe(original);
    expect(result.completions).not.toBe(original.completions);
  });

  it("does not return duplicate completion dates", () => {
    const habit = buildHabit(["2026-04-25"]);

    const result = toggleHabitCompletion(habit, "2026-04-26");

    const occurrences = result.completions.filter(
      (date) => date === "2026-04-26",
    ).length;
    expect(occurrences).toBe(1);
  });
});
