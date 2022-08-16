import React from "react";
import {
  BsFillCheckCircleFill,
  BsFillClockFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import styles from "../../features/tasks/Tasks.module.css";

interface DateStateIcon {
  timeToDueDate: string | undefined;
}

const DateStateIcon: React.FC<DateStateIcon> = ({ timeToDueDate }) => {
  const stateIcon = () => {
    if (timeToDueDate === "onTime") {
      return (
        <div className={styles.stateIcon__onTime}>
          <BsFillCheckCircleFill></BsFillCheckCircleFill>
        </div>
      );
    } else if (timeToDueDate === "almostExpired") {
      return (
        <div className={styles.stateIcon__almostExpired}>
          <BsFillClockFill></BsFillClockFill>
        </div>
      );
    } else {
      return (
        <div className={styles.stateIcon__expired}>
          <BsFillXCircleFill></BsFillXCircleFill>
        </div>
      );
    }
  };
  return <div>{stateIcon()}</div>;
};

export default DateStateIcon;
