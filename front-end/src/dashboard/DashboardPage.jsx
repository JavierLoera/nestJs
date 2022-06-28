import React from "react";
import TaskListComponent from "../components/task_list";
import { useHistory } from "react-router-dom";

function DashboardPage() {
  const history = useHistory();

  const logout = () => {
    history.push("/login");
  };
  return (
    <div>
      <TaskListComponent />
    </div>
  );
}

export default DashboardPage;
