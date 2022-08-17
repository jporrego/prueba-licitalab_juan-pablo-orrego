import React from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import styles from "./CurrentDate.module.css";

const CurrentDate = () => {
  const today = format(new Date(), "dd/MM/yyyy");
  return (
    <div>
      <div className={styles.current_date}>Hoy: {today}</div>
    </div>
  );
};

export default CurrentDate;
