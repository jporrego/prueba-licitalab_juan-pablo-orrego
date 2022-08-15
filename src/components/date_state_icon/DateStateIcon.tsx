import React from "react";
import {
  BsFillCheckCircleFill,
  BsFillClockFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import styles from "../../features/tasks/Tasks.module.css";

interface DateStateIcon {
  dateState: string | undefined;
  setDateState: React.Dispatch<
    React.SetStateAction<"onTime" | "almostExpired" | "expired" | undefined>
  >;
}

const DateStateIcon: React.FC<DateStateIcon> = ({
  dateState,
  setDateState,
}) => {
  const stateIcon = () => {
    if (dateState === "onTime") {
      return (
        <div className={styles.stateIcon__onTime}>
          <BsFillCheckCircleFill></BsFillCheckCircleFill>
        </div>
      );
    } else if (dateState === "almostExpired") {
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
