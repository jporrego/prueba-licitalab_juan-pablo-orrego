import React from "react";
import {
  BsFillCheckCircleFill,
  BsFillClockFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import styles from "../../features/tasks/Tasks.module.css";
import { Task as TaskType } from "../../types";

interface DateStateIcon {
  task: TaskType;
  timeToDueDate: string | undefined;
}

const DateStateIcon: React.FC<DateStateIcon> = ({ task, timeToDueDate }) => {
  const stateIcon = () => {
    if (task.done) {
      return (
        <div className={styles.stateIcon__done}>
          <BsFillCheckCircleFill></BsFillCheckCircleFill>
        </div>
      );
    } else if (timeToDueDate === "expired") {
      return (
        <div className={styles.stateIcon__expired}>
          <BsFillXCircleFill></BsFillXCircleFill>
        </div>
      );
    } else {
      return (
        <div className={styles.stateIcon__pending}>
          <BsFillClockFill></BsFillClockFill>
        </div>
      );
    }
  };
  return <div>{stateIcon()}</div>;
};

export default DateStateIcon;
