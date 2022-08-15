import React, { useState, useEffect } from "react";
import { format, formatDistanceToNow, compareAsc, compareDesc } from "date-fns";
import { Task as TaskType } from "../../types";
import { BsFillCheckCircleFill } from "react-icons/bs";
import styles from "./Tasks.module.css";
import { es as esLocale } from "date-fns/locale";

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
    if (compareAsc(task.dueDate, new Date()) === -1) {
      setDateState("expired");
    } else {
      setDateState("onTime");
    }

    if (format(task.dueDate, "dd") == format(new Date(), "dd")) {
      setDateState("almostExpired");
    }
    /*
    if (
      format(task.dueDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
    ) {
      setDateState("almostExpired");
    } else if (compareAsc(task.dueDate, new Date())) {
      setDateState("onTime");
    } else {
      setDateState("expired");
    }*/

    console.log(format(task.dueDate, "dd"), format(new Date(), "dd"));
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
          {dateState}
        </div>
      </div>

      <BsFillCheckCircleFill></BsFillCheckCircleFill>
    </div>
  );
};

export default Task;
