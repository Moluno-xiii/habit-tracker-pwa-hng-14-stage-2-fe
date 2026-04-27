type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: "daily";
  createdAt: string;
  completions: string[];
};

type CreateHabitDTO = Pick<Habit, "name" | "description" | "frequency">;

export type { Habit, CreateHabitDTO };
