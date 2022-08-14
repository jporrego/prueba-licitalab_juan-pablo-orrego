import React from "react";
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  formatDistanceToNow,
} from "date-fns";
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
      <div className={styles.dates}>
        <div>Created {formatDistanceToNow(task.creationDate)} ago</div>
        <input type="Date"></input>
      </div>
      <BsFillCheckCircleFill></BsFillCheckCircleFill>
    </div>
  );
};

export default Task;
