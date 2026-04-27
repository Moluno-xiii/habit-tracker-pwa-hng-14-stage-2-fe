const validateHabitName = (
  name: string,
): { valid: boolean; value: string; error: string | null } => {
  const transformedName = name.trim();
  if (!transformedName.length)
    return {
      valid: false,
      value: transformedName,
      error: "Habit name is requird",
    };
  if (transformedName.length > 60)
    return {
      valid: false,
      value: transformedName,
      error: "Habit name must be 60 characters or fewer",
    };
  return { valid: true, value: transformedName, error: null };
};

export { validateHabitName };
