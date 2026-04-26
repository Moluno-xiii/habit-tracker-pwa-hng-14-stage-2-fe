import { Habit } from "@/types/habit";
import HabitCard from "./HabitCard";

type Props = {
  habits: Habit[];
  today?: string;
};

const HabitList = ({ habits, today }: Props) => {
  return (
    <ul className="flex flex-col gap-5">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} today={today} />
      ))}
    </ul>
  );
};

export default HabitList;
