import HabitContextProvider from "@/contexts/HabitContext";
import { PropsWithChildren } from "react";

const HabitsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <HabitContextProvider>{children}</HabitContextProvider>;
};

export default HabitsProvider;
