import React from "react";
import styles from "./Inventory.module.css";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import InventoryBox from "../../components/InventoryBox/InventoryBox";

function Inventory() {
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>Inventory</span>
        <div className={styles.box}>
          <InventoryBox />
          <InventoryBox />
          <InventoryBox />
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}

export default Inventory;
