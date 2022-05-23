import React, { useContext } from "react";
import { GameOverContext } from "../../hooks/gameOverContext";
import styles from "./InventoryBox.module.css";

function InventoryBox({ equipped, image, skin }) {
  const gameOver = useContext(GameOverContext);
  const equipSkin = () => {
    gameOver.setUserSkins({ ...gameOver.userSkins, equipped: skin });
  };
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} />
      <span className={styles.text}>{skin}</span>
      {!equipped ? (
        <button onClick={equipSkin} className={styles.button}>
          Equip skin
        </button>
      ) : null}
    </div>
  );
}

export default InventoryBox;
