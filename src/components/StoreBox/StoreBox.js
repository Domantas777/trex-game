import React from "react";
import styles from "./StoreBox.module.css";

function StoreBox({ title, image, text }) {
  const handleClick = (e) => {
    console.log("pog");
  };
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <img className={styles.image} src={image} />

      <span className={styles.text}>{text}</span>
      <button type="button" className={styles.button} onClick={handleClick}>
        Purchase
      </button>
    </div>
  );
}

export default StoreBox;
