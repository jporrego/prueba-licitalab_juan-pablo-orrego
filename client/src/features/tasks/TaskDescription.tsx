import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchTasks,
  sortByCurrentOrder,
} from "../../features/tasks/tasksSlice";
import { Task as TaskType } from "../../types";
import styles from "./Tasks.module.css";

interface TaskDescriptionProps {
  task: TaskType;
}
const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    // Function to close the form when the user clicks outside of it or the button.
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (
          e.target.id !== "description" &&
          e.target.id !== "btnEditDescription"
        ) {
          setShowForm(false);
        }
      }
    };

    if (showForm) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showForm]);

  const handleEditDescription = async () => {
    if (description.length > 0) {
      setShowForm(false);
      try {
        const response = await axios.put(
          `http://localhost:4050/tasks/${task._id}/description`,
          {
            description: description,
          }
        );
        if (response.status === 200) {
          await dispatch(fetchTasks());
          dispatch(sortByCurrentOrder());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={styles.description}>
      {!showForm ? (
        <div onClick={() => setShowForm(true)}>{task.description}</div>
      ) : (
        <div>
          <textarea
            id="description"
            className={styles.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            className={styles.btnEditDescription}
            id="btnEditDescription"
            onClick={() => handleEditDescription()}
          >
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
