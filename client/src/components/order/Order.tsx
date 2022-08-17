import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  sortByCreationDate,
  sortByDueDate,
  sortByState,
} from "../../features/tasks/tasksSlice";
import Popup from "reactjs-popup";
import styles from "./Order.module.css";

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
      <Popup
        trigger={(open) => <button className={styles.button}>Ordenar</button>}
        position="bottom right"
        closeOnDocumentClick
      >
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
      </Popup>
    </div>
  );
};

export default Order;
