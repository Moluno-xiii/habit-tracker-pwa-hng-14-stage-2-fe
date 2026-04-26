"use client";

import { getHabitSlug } from "@/lib/slug";
import { Habit } from "@/types/habit";

type Props = {
  habit: Habit;
};
// remember to add deleteconfirmation action : 'confirm-delete-button'
const HabitCard: React.FC<Props> = ({ habit }) => {
  const habitSlug = getHabitSlug(habit.name);
  return (
    <div data-testid={`habit-card-${habitSlug}`}>
      <p data-testid={`habit-streak-${habitSlug}`}>Streak</p>
      <p data-testid={`habit-complete-${habitSlug}`}>complete</p>
      <button data-testid={`habit-edit-${habitSlug}`}>edit</button>
      <button data-testid={`habit-delete-${habitSlug}`}>delete</button>
    </div>
  );
};

export default HabitCard;
