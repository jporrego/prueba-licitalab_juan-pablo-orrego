import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchTasks,
  sortByCurrentOrder,
} from "../../features/tasks/tasksSlice";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa";
import styles from "./Tasks.module.css";
import axios from "axios";

const AddTask = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd") + "T00:00:00"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4050/`, {
        description: description,
        date: date,
      });
      if (response.status === 200) {
        await dispatch(fetchTasks());
        dispatch(sortByCurrentOrder());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.add_task}>
      {showForm ? (
        <div className={styles.add_task__form}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
              id="description"
              placeholder="Descripción..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <div>
              <label htmlFor="date">Vencimiento: </label>
              <input
                type="date"
                name="date"
                value={format(new Date(date), "yyyy-MM-dd")}
                onChange={(e) => {
                  setDate(e.target.value + "T00:00:00");
                }}
                required
              />
            </div>
            <button type="submit">Aceptar</button>
          </form>
        </div>
      ) : (
        <FaPlus onClick={() => setShowForm(true)}></FaPlus>
      )}
    </div>
  );
};

export default AddTask;
