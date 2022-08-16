import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateFilters } from "./filtersSlice";

import { Filters as FiltersType } from "../../types";
import { FaFilter } from "react-icons/fa";
import styles from "./Filter.module.css";

const Filters = () => {
  const dispatch = useAppDispatch();

  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    content: "",
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
      <FaFilter onClick={() => setShowFilters(!showFilters)}></FaFilter>
      {showFilters && (
        <div className={styles.filters_popup}>
          <div>
            <label htmlFor="content">Contenido </label>
            <input
              type="text"
              name="content"
              id="content"
              onChange={(e) =>
                setFilters({ ...filters, content: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="freed">Liberada </label>
            <input
              type="checkbox"
              id="freed"
              name="freed"
              value="freed"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label htmlFor="expired">Atrasada </label>
            <input
              type="checkbox"
              id="expired"
              name="expired"
              value="expired"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label htmlFor="pending">Pendiente </label>
            <input
              type="checkbox"
              id="pending"
              name="pending"
              value="pending"
              onChange={(e) => handleCheckboxChange(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
