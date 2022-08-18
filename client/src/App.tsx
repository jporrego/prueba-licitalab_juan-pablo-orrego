import React from "react";
import logo from "./logo.svg";
import Header from "./components/header/Header";
import TasksList from "./features/tasks/TasksList";
import styles from "./App.module.css";
import Order from "./components/order/Order";
import Filters from "./features/filters/Filters";
import FreeTasks from "./components/freeTasks/FreeTasks";

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <div className={styles.toolbar}>
        <FreeTasks></FreeTasks>
        <div className={styles.filters_order}>
          <Filters></Filters>
          <Order></Order>
        </div>
      </div>
      <TasksList></TasksList>
    </div>
  );
}

export default App;
