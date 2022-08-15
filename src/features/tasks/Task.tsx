import React, { useState, useEffect } from "react";
import { format, formatDistanceToNow, compareAsc, compareDesc } from "date-fns";
import { Task as TaskType } from "../../types";
import styles from "./Tasks.module.css";
import { es as esLocale } from "date-fns/locale";
import DateStateIcon from "../../components/date_state_icon/DateStateIcon";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [dateState, setDateState] = useState<
    "onTime" | "almostExpired" | "expired"
  >();
  useEffect(() => {
    calculateDateState();
  }, []);

  const calculateDateState = () => {
    // First check if the task is expired or not and set the apropiate state.
    // Then check if the dueDate is for the same day as the current day, and set state to almost expired if so.

    if (compareAsc(task.dueDate, new Date()) === -1) {
      setDateState("expired");
    } else {
      setDateState("onTime");
    }

    if (format(task.dueDate, "dd") === format(new Date(), "dd")) {
      setDateState("almostExpired");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(new Date(e.target.value));
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

        <div className={styles.dueDate}>
          <div>Vencimiento: </div>
          <input
            type="date"
            value={format(task.dueDate, "yyyy-MM-dd")}
            onChange={(e) => handleDateChange(e)}
          ></input>
        </div>
      </div>

      <DateStateIcon
        dateState={dateState}
        setDateState={setDateState}
      ></DateStateIcon>
    </div>
  );
};

export default Task;
