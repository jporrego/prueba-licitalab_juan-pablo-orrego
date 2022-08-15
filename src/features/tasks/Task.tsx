import React, { useState, useEffect } from "react";
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
  const [dueDate, setDueDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  useEffect(() => {
    setDueDate(format(task.dueDate, "yyyy-MM-dd"));
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

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
          Due date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => handleDateChange(e)}
          ></input>
        </div>
        <div>{format(task.dueDate, "dd/MM/yyyy")}</div>
      </div>
      <BsFillCheckCircleFill></BsFillCheckCircleFill>
    </div>
  );
};

export default Task;
