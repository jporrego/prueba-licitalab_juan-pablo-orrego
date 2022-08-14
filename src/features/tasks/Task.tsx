import React from "react";
import { Task as TaskType } from "../../types";
import { BsFillCheckCircleFill } from "react-icons/bs";
import styles from "./Tasks.module.css";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className={styles.task}>
      <input type="checkbox" />
      <div className={styles.description}>{task.description}</div>
      <input type="Date"></input>
      <BsFillCheckCircleFill></BsFillCheckCircleFill>
    </div>
  );
};

export default Task;
