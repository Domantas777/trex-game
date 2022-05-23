import React, { useContext, useState } from "react";
import styles from "./StoreBox.module.css";
import { GameOverContext } from "../../hooks/gameOverContext";

function StoreBox({ title, image, text }) {
  const gameOver = useContext(GameOverContext);

  const handleClick = (e) => {
    const newCoins = gameOver.coins - 50;
    gameOver.setCoins(newCoins);
    gameOver.setUserSkins({
      ...gameOver.userSkins,
      availableSkins: [
        ...gameOver.userSkins.availableSkins,
        title.toLowerCase(),
      ],
    });
  };
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <img className={styles.image} src={image} />
      <button type="button" className={styles.button} onClick={handleClick}>
        {gameOver.coins <= 49 ? "Not enough coins" : "50 coins"}
      </button>
    </div>
  );
}

export default StoreBox;
