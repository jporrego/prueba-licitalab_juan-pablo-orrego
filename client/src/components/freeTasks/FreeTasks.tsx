import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectSelectedTasks,
  fetchTasks,
} from "../../features/tasks/tasksSlice";

const FreeTasks = () => {
  const handleFreeTasks = () => {};
  return <button>Liberar Seleccionadas</button>;
};

export default FreeTasks;
