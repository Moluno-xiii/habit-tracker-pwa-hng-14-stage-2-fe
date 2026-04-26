import DashboardPageUI from "@/components/dashboard/DashboardPageUI";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import HabitsProvider from "@/providers/HabitsProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Habit Tracker",
  description: "Habit tracker dashboard.",
};

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <HabitsProvider>
        <DashboardPageUI />
      </HabitsProvider>
    </ProtectedRoute>
  );
};

export default DashboardPage;
