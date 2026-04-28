"use client";

import useHabits from "@/hooks/useHabits";
import { getCompletedToday } from "@/lib/streaks";
import Stat from "./Stat";

const DashboardStats: React.FC = () => {
  const { habits, today } = useHabits();
  return (
    <section className="border-ink/15 border-b">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 px-6 sm:px-10">
        <Stat label="Entries" value={habits.length} />
        <Stat
          label="Kept today"
          value={`${getCompletedToday(today, habits)}/${habits.length}`}
          accent
          align="right"
        />
      </div>
    </section>
  );
};

export default DashboardStats;
