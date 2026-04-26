import { Habit } from "@/types/habit";

const calculateCurrentStreak = (
  today: string = new Date().toISOString().slice(0, 10),
  completions: string[],
): number => {
  const sortedDates = Array.from(new Set(completions)).sort();
  const sortedSet = new Set(sortedDates);

  if (!sortedSet.has(today)) return 0;

  let streak = 0;
  const currentDate = new Date(today);

  while (true) {
    const dateString = currentDate.toISOString().slice(0, 10);
    if (!sortedSet.has(dateString)) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};

const getCompletedToday = (today: string, habits: Habit[]): number => {
  return habits.filter((h) => h.completions.includes(today)).length;
};

export { calculateCurrentStreak, getCompletedToday };
