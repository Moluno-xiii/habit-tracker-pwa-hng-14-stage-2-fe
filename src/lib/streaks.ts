import { Habit } from "@/types/habit";

// i noticed this implementation is a bit flawed in that the current streak should show '1' if it was marked yesterday but hadn't been marked today (and today is still ongoing), instead, it shows '0' even if it was marked yesterday but hasn't been marked today, and today is still ongoing. I think it should wait to check if the current day is over before it marks the streak as nullified. POINTED OUT IN THE FIRST POINT OF TRADE-OFS AND LIMITATIONS ON THE README.

const calculateCurrentStreak = (
  completions: string[],
  today: string = new Date().toISOString().slice(0, 10),
): number => {
  const sortedDates = Array.from(new Set(completions)).sort();
  const completionSet = new Set(sortedDates);

  if (!completionSet.has(today)) return 0;

  const cursor = new Date(today);
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
