import React, { useContext, useState } from "react";
import styles from "./StoreBox.module.css";
import { GameOverContext } from "../../hooks/gameOverContext";

function StoreBox({ title, image, text }) {
  const skins = ["trex", "mario", "sonic"];
  const [buttonText, setButtonText] = useState("50 coins");
  const gameOver = useContext(GameOverContext);

  const handleClick = (e) => {
    if (gameOver.coins <= 49) {
      setButtonText("Not enough coins");
      setTimeout(() => {
        setButtonText("50 coins");
      }, 2000);
    } else {
      const setCoins = gameOver.coins - 50;
      localStorage.setItem("coins", setCoins);
      gameOver.userSkins.availableSkins.push(
        title.charAt(0).toLowerCase() + title.slice(1)
      );
      localStorage.setItem(
        "availableSkins",
        JSON.stringify(gameOver.userSkins.availableSkins)
      );
      console.log(localStorage.getItem("availableSkins"));
      const test = JSON.parse(localStorage.getItem("availableSkins"));
      gameOver.userSkins.availableSkins = test;
      console.log(test, gameOver.userSkins.availableSkins);

      window.location.reload(false);
    }
  };
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <img className={styles.image} src={image} />
      <button type="button" className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default StoreBox;
