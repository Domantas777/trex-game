import React from "react";
import styles from "./InventoryBox.module.css";

function InventoryBox({ equipped, image, skin, equipSkin }) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} />
      <span className={styles.text}>{skin}</span>
      {!equipped &&
        <button onClick={() => equipSkin(skin)} className={styles.button}>
          Equip skin
        </button>}
    </div>
  );
}

export default InventoryBox;
