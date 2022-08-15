import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Header from "./components/header/Header";
import TasksList from "./features/tasks/TasksList";
import styles from "./App.module.css";
import Order from "./components/order/Order";

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <Order></Order>
      <TasksList></TasksList>
    </div>
  );
}

export default App;
