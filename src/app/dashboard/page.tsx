import React from "react";
import ProtectedRoute from "../components/shared/ProtectedRoute";

const DashboardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <DashboardPageUI />
    </ProtectedRoute>
  );
};

const DashboardPageUI: React.FC = () => {
  return <div> Dashbord page</div>;
};

export default DashboardPage;
