import styles from "./Store.module.css";
import React from "react";
import StoreBox from "../../components/StoreBox/StoreBox";
import mario from "../../assets/mario.png";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

function Store() {
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>Store</span>
        <div className={styles.box}>
          <StoreBox title="Skin" text="Mario" image={mario} />
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}

export default Store;
