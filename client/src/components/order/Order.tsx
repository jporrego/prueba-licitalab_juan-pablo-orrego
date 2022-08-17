import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  sortByCreationDate,
  sortByDueDate,
  sortByState,
  selectTasksOrder,
  selectTasks,
} from "../../features/tasks/tasksSlice";
import Popup from "reactjs-popup";
import styles from "./Order.module.css";

const Order = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectTasksOrder);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    // Pienso que usar setTimeout para ordenar las tarjetas despues de que cargan no es buena idea.
    // Podria poner las tareas en el dependecy array de useEffect, pero por como programe las funciones para ordenar
    // estaria llamando el orden por defecto 'sortByCreationDate' cada vez que cambio el orden, por lo que siempre seria el mismo.
    // Con mas tiempo trataria de encontrar otra forma de hacerlo.
    setTimeout(() => dispatch(sortByCreationDate()), 150);
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
          defaultValue={order}
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
