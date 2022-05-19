import React, { useState } from "react";
import styles from "./InventoryBox.module.css";

function InventoryBox() {
  const InitialText = "Equip";
  const [text, setText] = useState(InitialText);

  const handleClick = () => {
    setText("Equipped");
    setTimeout(() => {
      setText(InitialText);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>
        {text}
      </button>
    </div>
  );
}

export default InventoryBox;
