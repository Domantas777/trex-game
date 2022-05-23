import styles from "./Store.module.css";
import React, { useContext } from "react";
import { GameOverContext } from "../../hooks/gameOverContext";
import StoreBox from "../../components/StoreBox/StoreBox";
import mario from "../../assets/mario_standing.png";
import trex from "../../assets/tRex.png";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import sonic from "../../assets/sonic_standing.png";

function Store() {
  const gameOver = useContext(GameOverContext);
  const skins = ["trex", "mario", "sonic"];
  const images = { trex, mario, sonic };
  // console.log(gameOver.userSkins.availableSkins[0].indexOf());
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>Store</span>
        <div className={styles.box}>
          {skins.map(
            (skin) =>
              gameOver.userSkins.availableSkins.indexOf(skin) === -1 && (
                <StoreBox
                  key={skin}
                  title={skin.charAt(0).toUpperCase() + skin.slice(1)}
                  text="50 coins"
                  image={images[skin]}
                />
              )
          )}
          {gameOver.userSkins.availableSkins.length === skins.length &&
            "You have all the skins"}
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}

export default Store;
