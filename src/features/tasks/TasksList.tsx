import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTasks, selectFilteredTasks } from "./tasksSlice";
import Task from "./Task";
import styles from "./Tasks.module.css";

const TasksList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);

  const renderedTasks = tasks.map((task) => (
    <Task task={task} key={task._id}></Task>
  ));
  return <div className={styles.task_list}>{renderedTasks}</div>;
};

export default TasksList;
