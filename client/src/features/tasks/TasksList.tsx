import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchTasks,
  selectFilteredTasks,
  selectTasksStatus,
} from "./tasksSlice";
import Task from "./Task";
import AddTask from "./AddTask";
import styles from "./Tasks.module.css";

const TasksList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);
  const tasksStatus = useAppSelector(selectTasksStatus);

  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [tasksStatus]);

  const renderedTasks = tasks.map((task) => (
    <Task task={task} key={task._id}></Task>
  ));
  return (
    <div className={styles.task_list}>
      {renderedTasks} <AddTask></AddTask>{" "}
    </div>
  );
};

export default TasksList;
