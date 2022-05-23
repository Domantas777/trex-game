import React from "react";
import styles from "./GoBackButton.module.css";
import { useNavigate } from "react-router-dom";

function GoBackButton() {
  const history = useNavigate();
  const handleClick = () => {
    history("/");
    window.location.reload(false);
  };
  return (
    <div>
      <button className={styles.button} onClick={handleClick}>
        Go back to homepage
      </button>
    </div>
  );
}

export default GoBackButton;
