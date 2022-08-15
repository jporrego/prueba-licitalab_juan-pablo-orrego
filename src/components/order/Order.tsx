import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  sortByCreationDate,
  sortByDueDate,
} from "../../features/tasks/tasksSlice";

const Order = () => {
  const dispatch = useAppDispatch();

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value === "creationDate") {
      dispatch(sortByCreationDate());
    } else if (e.target.value === "dueDate") {
      dispatch(sortByDueDate());
    }
  }
  return (
    <div>
      <label htmlFor="order">Ordenar</label>

      <select name="order" id="order" onChange={(e) => handleOrderChange(e)}>
        <option value="creationDate" selected>
          Fecha de creación
        </option>
        <option value="dueDate">Fecha de vencimiento</option>
        <option value="state">Estado</option>
      </select>
    </div>
  );
};

export default Order;
