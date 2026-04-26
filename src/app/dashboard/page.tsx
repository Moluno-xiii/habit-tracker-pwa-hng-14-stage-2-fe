import React from "react";
import ProtectedRoute from "../components/shared/ProtectedRoute";

const habits = [];

const DashboardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <DashboardPageUI />
    </ProtectedRoute>
  );
};

const DashboardPageUI: React.FC = () => {
  if (!habits.length) return <EmptyState />;
  return (
    <div
      data-testid="dashboard-page"
      className="flex flex-1 flex-col items-center justify-center"
    >
      Dashbord page
    </div>
  );
};

export default DashboardPage;

const EmptyState = () => {
  return (
    <div
      data-testid="empty-state"
      className="flex flex-1 items-center justify-center bg-amber-300"
    >
      <p>No Habits yet</p>
    </div>
  );
};
