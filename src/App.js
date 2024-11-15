import React from "react";
import DashboardShell from "@features/Dashboard/DashboardShell";
import { DataProvider } from "@context/DataContext";

const App = () => {
  return (
    <DataProvider>
      <DashboardShell />
    </DataProvider>
  );
};

export default App;
