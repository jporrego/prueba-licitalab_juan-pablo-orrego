import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateFilters, selectFilters } from "./filtersSlice";

import { Filters as FiltersType } from "../../types";
import { FaFilter } from "react-icons/fa";
import styles from "./Filters.module.css";
import Popup from "reactjs-popup";
import format from "date-fns/format";

const Filters = () => {
  const dispatch = useAppDispatch();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const initialState = useAppSelector(selectFilters);
  const [filters, setFilters] = useState<FiltersType>({
    content: initialState.content,
    dateRange: initialState.dateRange,
    taskState: initialState.taskState,
  });

  useEffect(() => {
    handleFilterChange();
  }, [filters]);

  useEffect(() => {
    checkCheckedInputs();
  }, [isPopupVisible]);

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

  const checkCheckedInputs = () => {
    if (filters.taskState.includes("freed")) {
    }
  };

  const renderCheckboxes = () => {
    const options = ["Liberada", "Pendiente", "Atrasada"];
    return options.map((option) =>
      filters.taskState.includes(option) ? (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            name={option}
            value={option}
            onChange={(e) => handleCheckboxChange(e)}
            checked
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ) : (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            name={option}
            value={option}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label htmlFor="freed">{option} </label>
        </div>
      )
    );
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = JSON.parse(JSON.stringify(filters));
    if (e.target.id === "startDate") {
      updatedFilters.dateRange.startDate = e.target.value;
    } else if (e.target.id === "endDate") {
      updatedFilters.dateRange.endDate = e.target.value;
    }
    setFilters(updatedFilters);
  };

  return (
    <div className={styles.filter}>
      <Popup
        trigger={() => (
          <button className={styles.button}>
            <FaFilter
              className={styles.filterBtnOpen}
              onClick={() => setIsPopupVisible(!isPopupVisible)}
            ></FaFilter>
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

        <div className={styles.filters_state}>{renderCheckboxes()}</div>

        <div>
          <div>
            <label>Fecha inicio: </label>
            <input
              type="date"
              id="startDate"
              onChange={(e) => handleDateRangeChange(e)}
            />
          </div>
          <div>
            <label>Fecha termino: </label>
            <input
              type="date"
              id="endDate"
              onChange={(e) => handleDateRangeChange(e)}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Filters;
