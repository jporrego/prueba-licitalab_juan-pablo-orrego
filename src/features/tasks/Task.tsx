import React from "react";
import { Task as TaskType } from "../../types";
import styles from "./Tasks.module.css";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className={styles.task}>
      {task.description}
      <input type="Date"></input>
    </div>
  );
};

export default Task;
