import styles from "./Store.module.css";
import React, { useContext } from "react";
import { GameOverContext } from "../../hooks/gameOverContext";
import StoreBox from "../../components/StoreBox/StoreBox";
import mario from "../../assets/mario.png";
import trex from "../../assets/tRex.png";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

function Store() {
  const gameOver = useContext(GameOverContext);
  const skins = ["trex", "mario", "sonic"];
  const images = { trex, mario };
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>Store</span>
        <div className={styles.box}>
          {skins.map((skin) => gameOver.userSkins.availableSkins.indexOf(skin) === -1 && (
            <StoreBox key={skin} title="Skin" text={skin} image={images[skin]} />
          ))}
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}

export default Store;
