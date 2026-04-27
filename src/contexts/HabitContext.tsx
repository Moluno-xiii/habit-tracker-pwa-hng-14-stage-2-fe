"use client";

import useAuth from "@/hooks/useAuth";
import { getSlicedDate } from "@/lib/date";
import habitService, { toggleHabitCompletion } from "@/lib/habits";
import { CreateHabitDTO, Habit } from "@/types/habit";
import { createContext, ReactNode, useState } from "react";

type HabitContextType = {
  habits: Habit[];
  today: string;
  createHabit: (data: CreateHabitDTO) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  toggleHabitCompletionStatus: (habit: Habit) => void;
};
const HabitContext = createContext<HabitContextType | undefined>(undefined);

const HabitContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>(() =>
    habitService.getAllHabitsByUserId(user!.id),
  );

  const today = getSlicedDate();

  const createHabit = (data: CreateHabitDTO): void => {
    const habit: Habit = {
      ...data,
      id: crypto.randomUUID(),
      userId: user!.id,
      completions: [],
      createdAt: today,
    };
    habitService.addHabit(habit);
    setHabits(habitService.getAllHabitsByUserId(user!.id));
  };

  const updateHabit = (habit: Habit): void => {
    habitService.updateHabit(habit.id, habit);
    setHabits(habitService.getAllHabitsByUserId(user!.id));
  };

  const deleteHabit = (habitId: string): void => {
    habitService.deleteHabit(habitId);
    setHabits(habitService.getAllHabitsByUserId(user!.id));
  };

  const toggleHabitCompletionStatus = (habit: Habit): void => {
    const updatedHabit = toggleHabitCompletion(habit, today);
    habitService.updateHabit(updatedHabit.id, updatedHabit);
    setHabits(habitService.getAllHabitsByUserId(user!.id));
  };

  const habitContextValues = {
    habits,
    today,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletionStatus,
  };

  return (
    <HabitContext.Provider value={habitContextValues}>
      {children}
    </HabitContext.Provider>
  );
};

export { HabitContext };
export default HabitContextProvider;
