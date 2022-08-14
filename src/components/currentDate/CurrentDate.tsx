import React from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

const CurrentDate = () => {
  const today = format(new Date(), "dd/MM/yyyy");
  return (
    <div>
      <div>Hoy: {today}</div>
    </div>
  );
};

export default CurrentDate;
