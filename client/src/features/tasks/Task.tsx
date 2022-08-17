import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setSelectedTasks,
  selectTasks,
  fetchTasks,
  sortByState,
} from "../../features/tasks/tasksSlice";
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
  const tasks = useAppSelector(selectTasks);

  //const [dateState, setDateState] = useState<"freed" | "pending" | "expired">();
  const [timeToDueDate, setTimeToDueDate] = useState<
    "onTime" | "almostExpired" | "expired"
  >();
  // Add a new state to keep track of pendiente, atrasada, liberada

  useEffect(() => {
    calculateTimeToDueDate();
  }, [tasks]);
  /*
  const calculateDateState = () => {
    if (compareAsc(new Date(), new Date(task.dueDate)) === 1) {
      setDateState("expired");
    } else {
      setDateState("pending");
    }
  };*/

  const calculateTimeToDueDate = () => {
    if (compareAsc(new Date(task.dueDate), new Date()) === -1) {
      setTimeToDueDate("expired");
    } else {
      setTimeToDueDate("onTime");
    }

    if (format(new Date(task.dueDate), "dd") === format(new Date(), "dd")) {
      setTimeToDueDate("almostExpired");
    }
  };

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axios.put("http://localhost:4050/" + task._id, {
        date: e.target.value,
      });
      if (response.status === 200) {
        await dispatch(fetchTasks());
        dispatch(sortByState());
        calculateTimeToDueDate();
      }
    } catch (error) {
      console.log(error);
    }
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
