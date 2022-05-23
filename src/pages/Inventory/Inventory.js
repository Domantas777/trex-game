import React, { useContext } from "react";
import { GameOverContext } from "../../hooks/gameOverContext";
import mario from "../../assets/mario_standing.png";
import trex from "../../assets/tRex.png";
import styles from "./Inventory.module.css";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import InventoryBox from "../../components/InventoryBox/InventoryBox";
import sonic from "../../assets/sonic_standing.png";

function Inventory() {
  const gameOver = useContext(GameOverContext);
  const images = { trex, mario, sonic };
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>Inventory</span>
        <div className={styles.box}>
          {gameOver.userSkins.availableSkins.map((skin) => (
            <InventoryBox
              key={skin}
              skin={skin}
              image={images[skin]}
              equipped={gameOver.userSkins.equipped === skin}
            />
          ))}
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}

export default Inventory;
