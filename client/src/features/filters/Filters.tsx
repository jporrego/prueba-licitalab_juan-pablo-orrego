import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateFilters, selectFilters } from "./filtersSlice";

import { Filters as FiltersType } from "../../types";
import { FaFilter } from "react-icons/fa";
import styles from "./Filters.module.css";
import Popup from "reactjs-popup";

const Filters = () => {
  const dispatch = useAppDispatch();
  const initialState = useAppSelector(selectFilters);
  const [filters, setFilters] = useState<FiltersType>({
    content: initialState.content,
    dateRange: [],
    taskState: [],
  });

  useEffect(() => {
    handleFilterChange();
  }, [filters]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let taskStateFilters = [...filters.taskState];
    if (e.target.checked) {
      taskStateFilters.push(e.target.value);
    } else if (taskStateFilters.includes(e.target.value)) {
      taskStateFilters = taskStateFilters.filter(
        (state) => state !== e.target.value
      );
    }

    setFilters({ ...filters, taskState: taskStateFilters });
  };

  const handleFilterChange = (): void => {
    dispatch(updateFilters(filters));
  };

  return (
    <div className={styles.filter}>
      <Popup
        trigger={(open) => (
          <button className={styles.button}>
            <FaFilter className={styles.filterBtnOpen}></FaFilter>
          </button>
        )}
        position="bottom right"
        closeOnDocumentClick
      >
        <div>
          <input
            type="text"
            name="content"
            id="content"
            placeholder="Contenido"
            value={filters.content}
            onChange={(e) =>
              setFilters({ ...filters, content: e.target.value })
            }
          />
        </div>

        <div className={styles.filters_state}>
          <div>
            <input
              type="checkbox"
              id="freed"
              name="freed"
              value="freed"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label htmlFor="freed">Liberada </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="expired"
              name="expired"
              value="expired"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label htmlFor="expired">Atrasada </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pending"
              name="pending"
              value="pending"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label htmlFor="pending">Pendiente </label>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Filters;
