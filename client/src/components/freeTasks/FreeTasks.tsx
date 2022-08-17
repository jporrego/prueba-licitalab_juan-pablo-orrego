import React from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectSelectedTasks,
  fetchTasks,
  sortByState,
} from "../../features/tasks/tasksSlice";

const FreeTasks = () => {
  const dispatch = useAppDispatch();
  const selectedTasks = useAppSelector(selectSelectedTasks);

  const handleFreeTasks = async () => {
    if (selectedTasks.length > 0) {
      try {
        const response = await axios.put("http://localhost:4050/:id/done", {
          tasks: selectedTasks,
        });
        if (response.status === 200) {
          await dispatch(fetchTasks());
          dispatch(sortByState());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return <button onClick={handleFreeTasks}>Liberar Seleccionadas</button>;
};

export default FreeTasks;
