import { HabitContext } from "@/contexts/HabitContext";
import { useContext } from "react";

const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error("Habit context was used outside its scope");
  return context;
};

export default useHabits;
