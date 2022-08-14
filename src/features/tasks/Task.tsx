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
import { es as esLocale } from "date-fns/locale";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className={styles.task}>
      <input type="checkbox" />
      <div className={styles.description}>{task.description}</div>
      <div className={styles.dates}>
        <div>
          {`Tarea creada hace ${formatDistanceToNow(task.creationDate, {
            locale: esLocale,
          })}`}
        </div>
        <div>
          Due date: <input type="Date"></input>
        </div>
      </div>
      <BsFillCheckCircleFill></BsFillCheckCircleFill>
    </div>
  );
};

export default Task;
