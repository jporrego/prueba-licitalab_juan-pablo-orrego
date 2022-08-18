import React from "react";
import CurrentDate from "../current_date/CurrentDate";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <h1 className={styles.title}>Cosas por hacer</h1>
      <CurrentDate></CurrentDate>
    </header>
  );
};

export default Header;
