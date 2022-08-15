import React from "react";

const Order = () => {
  return (
    <div>
      <label htmlFor="order">Ordenar</label>

      <select name="order" id="order">
        <option value="creationDate" selected>
          Fecha de creación
        </option>
        <option value="dueDate">Fecha de vencimiento</option>
        <option value="state">Estado</option>
      </select>
    </div>
  );
};

export default Order;
