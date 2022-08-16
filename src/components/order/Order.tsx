import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  sortByCreationDate,
  sortByDueDate,
  sortByState,
} from "../../features/tasks/tasksSlice";

const Order = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(sortByCreationDate());
  }, []);

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value === "creationDate") {
      dispatch(sortByCreationDate());
    } else if (e.target.value === "dueDate") {
      dispatch(sortByDueDate());
    } else {
      dispatch(sortByState());
    }
  }
  return (
    <div>
      <label htmlFor="order">Ordenar</label>

      <select
        name="order"
        id="order"
        onChange={(e) => handleOrderChange(e)}
        defaultValue="creationDate"
      >
        <option value="creationDate">Fecha de creación</option>
        <option value="dueDate">Fecha de vencimiento</option>
        <option value="state">Estado</option>
      </select>
    </div>
  );
};

export default Order;
