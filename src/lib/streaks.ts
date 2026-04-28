import { Habit } from "@/types/habit";

const calculateCurrentStreak = (
  today: string = new Date().toISOString().slice(0, 10),
  completions: string[],
): number => {
  const sortedDates = Array.from(new Set(completions)).sort();
  const completionSet = new Set(sortedDates);
  const cursor = new Date(today);

  if (!completionSet.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
    if (!completionSet.has(cursor.toISOString().slice(0, 10))) return 0;
  }

  let streak = 0;
  while (completionSet.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const getCompletedToday = (today: string, habits: Habit[]): number => {
  return habits.filter((h) => h.completions.includes(today)).length;
};

export { calculateCurrentStreak, getCompletedToday };
