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
    dateRange: null,
    taskState: null,
  });

  useEffect(() => {
    handleFilterChange();
  }, [filters]);

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
            <label htmlFor="estado">Estado</label>
            <select
              name="estado"
              id="estado"
              onChange={(e) => 1}
              defaultValue="Todos"
            >
              <option value="todos">Todos</option>
              <option value="liberada">Liberada</option>
              <option value="pendiente">Pendiente</option>
              <option value="atrasada">Estado</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
