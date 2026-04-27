import { describe, expect, it } from "vitest";
import { validateHabitName } from "@/lib/validator";

describe("validateHabitName", () => {
  it("returns an error when habit name is empty", () => {
    const result = validateHabitName("   ");

    expect(result.valid).toBe(false);
    expect(result.error).not.toBeNull();
    expect(result.value).toBe("");
  });

  it("returns an error when habit name exceeds 60 characters", () => {
    const tooLong = "a".repeat(61);
    const result = validateHabitName(tooLong);

    expect(result.valid).toBe(false);
    expect(result.error).not.toBeNull();
    expect(result.value.length).toBe(61);
  });

  it("returns a trimmed value when habit name is valid", () => {
    const result = validateHabitName("   Read Books   ");

    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
    expect(result.value).toBe("Read Books");
  });
});
