import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setSelectedTasks } from "../../features/tasks/tasksSlice";
import { Task as TaskType } from "../../types";
import { format, formatDistanceToNow, compareAsc, compareDesc } from "date-fns";
import { es as esLocale } from "date-fns/locale";
import DateStateIcon from "../../components/date_state_icon/DateStateIcon";
import styles from "./Tasks.module.css";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [dateState, setDateState] = useState<"freed" | "pending" | "expired">();
  const [timeToDueDate, setTimeToDueDate] = useState<
    "onTime" | "almostExpired" | "expired"
  >();
  // Add a new state to keep track of pendiente, atrasada, liberada

  useEffect(() => {
    calculateDateState();
    calculateTimeToDueDate();
  }, []);

  const calculateDateState = () => {
    // First check if the task is expired or not and set the apropiate state.
    // Then check if the dueDate is for the same day as the current day, and set state to almost expired if so.
    if (compareAsc(new Date(), new Date(task.dueDate)) === 1) {
      setDateState("expired");
    } else {
      setDateState("pending");
    }
  };

  const calculateTimeToDueDate = () => {
    // First check if the task is expired or not and set the apropiate state.
    // Then check if the dueDate is for the same day as the current day, and set state to almost expired if so.

    if (compareAsc(new Date(task.dueDate), new Date()) === -1) {
      setTimeToDueDate("expired");
    } else {
      setTimeToDueDate("onTime");
    }

    if (format(new Date(task.dueDate), "dd") === format(new Date(), "dd")) {
      setTimeToDueDate("almostExpired");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(new Date(e.target.value));
  };

  const taskBgStyle = () => {
    if (task.done) {
      return styles.bg_done;
    } else if (timeToDueDate === "onTime" && !task.done) {
      return styles.bg_onTime;
    } else if (timeToDueDate === "almostExpired" && !task.done) {
      return styles.bg_almostExpired;
    } else if (timeToDueDate === "expired" && !task.done) {
      return styles.bg_expired;
    }
  };

  return (
    <div className={`${taskBgStyle()} ${styles.task}`}>
      {!task.done ? (
        <input
          onChange={(e) =>
            dispatch(setSelectedTasks([task._id, e.target.checked]))
          }
          type="checkbox"
        />
      ) : (
        <span></span>
      )}
      <div className={styles.description}>
        <div className={styles.creation_date}>
          {`Tarea creada hace ${formatDistanceToNow(
            new Date(task.creationDate),
            {
              locale: esLocale,
            }
          )}`}
        </div>
        {task.description}
      </div>

      <div className={styles.dates}>
        <div className={styles.dueDate}>
          <div>Vencimiento: </div>
          <input
            type="date"
            value={format(new Date(task.dueDate), "yyyy-MM-dd")}
            onChange={(e) => handleDateChange(e)}
          ></input>
        </div>
      </div>

      <DateStateIcon task={task} timeToDueDate={timeToDueDate}></DateStateIcon>
    </div>
  );
};

export default Task;
