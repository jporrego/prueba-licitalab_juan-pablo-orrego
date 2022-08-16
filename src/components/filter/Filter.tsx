import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import styles from "./Filter.module.css";

const Filter = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [textFilter, setTextFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState([]);
  const [stateFilter, setStateFilter] = useState([]);

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    throw new Error("Function not implemented.");
  }

  const handleFilterByText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
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
              onChange={(e) => handleFilterByText(e)}
            />
          </div>
          <div>
            <label htmlFor="estado">Estado</label>
            <select
              name="estado"
              id="estado"
              onChange={(e) => handleOrderChange(e)}
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

export default Filter;