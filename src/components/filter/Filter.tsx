import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Filter = () => {
  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <FaFilter></FaFilter>
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
  );
};

export default Filter;
