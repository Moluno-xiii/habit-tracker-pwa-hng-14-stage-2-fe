"use client";

import { Habit } from "@/types/habit";
import { createContext, ReactNode, useState } from "react";

type HabitContextType = {
  habits: Habit[];
  today: string;
};
const HabitContext = createContext<HabitContextType | undefined>(undefined);

const HabitContextProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>(SAMPLE_HABITS);

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
const TODAY = new Date().toISOString().slice(0, 10);

const daysAgo = (offset: number) => {
  const d = new Date(TODAY);
  d.setUTCDate(d.getUTCDate() - offset);
  return d.toISOString().slice(0, 10);
};

const SAMPLE_HABITS: Habit[] = [
  {
    id: "h-001-water",
    userId: "demo",
    name: "Drink Water",
    description:
      "Eight glasses, sipped slowly between thoughts. The body asks quietly; listen.",
    frequency: "daily",
    createdAt: daysAgo(60),
    completions: [
      TODAY,
      daysAgo(1),
      daysAgo(2),
      daysAgo(3),
      daysAgo(4),
      daysAgo(5),
      daysAgo(6),
      daysAgo(7),
      daysAgo(9),
    ],
  },
  {
    id: "h-002-write",
    userId: "demo",
    name: "Morning Pages",
    description:
      "Three pages, longhand, before any other ink touches paper. No edits.",
    frequency: "daily",
    createdAt: daysAgo(40),
    completions: [
      TODAY,
      daysAgo(1),
      daysAgo(2),
      daysAgo(4),
      daysAgo(5),
      daysAgo(7),
    ],
  },
  {
    id: "h-003-walk",
    userId: "demo",
    name: "Long Walk",
    description:
      "Thirty unhurried minutes. The world looks different at the speed of feet.",
    frequency: "daily",
    createdAt: daysAgo(20),
    completions: [daysAgo(1), daysAgo(2), daysAgo(3), daysAgo(4)],
  },
  {
    id: "h-004-read",
    userId: "demo",
    name: "Read Forty Pages",
    description: "Anything on paper. Phone in another room.",
    frequency: "daily",
    createdAt: daysAgo(8),
    completions: [],
  },
];
