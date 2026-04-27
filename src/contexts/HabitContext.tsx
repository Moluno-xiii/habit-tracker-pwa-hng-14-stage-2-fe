"use client";

import habitService from "@/lib/habits";
import { Habit } from "@/types/habit";
import { createContext, ReactNode, useState } from "react";

type HabitContextType = {
  habits: Habit[];
  today: string;
};
const HabitContext = createContext<HabitContextType | undefined>(undefined);

const HabitContextProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>(() =>
    habitService.getAllHabits(),
  );

  const today = new Date().toISOString().slice(0, 10);

  const habitContextValues = { habits, today };
  return (
    <HabitContext.Provider value={habitContextValues}>
      {children}
    </HabitContext.Provider>
  );
};

export { HabitContext };
export default HabitContextProvider;
