import styles from "./Store.module.css";
import React from "react";
import StoreBox from "../../components/StoreBox/StoreBox";
import mario from "../../assets/mario.png";

function Store() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Store</span>
      <div className={styles.box}>
        <StoreBox title="Skin" text="Mario" image={mario} />
      </div>
    </div>
  );
}

export default Store;
