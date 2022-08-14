import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Header from "./components/header/Header";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
    </div>
  );
}

export default App;
