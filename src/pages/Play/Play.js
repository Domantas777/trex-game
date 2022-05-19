import { useContext, useState } from "react";
import GameContainer from "../../components/GameContainer";
import { GameOverContext } from "../../hooks/gameOverContext";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import styles from "./Play.module.css";

function Play() {
  const gameOver = useContext(GameOverContext);
  const [status, setStatus] = useState("PAUSED");
  return (
    <div>
      <div className={styles.header}>
        <h2>Coins: {gameOver.coins}</h2>
        <h2>High score: {gameOver.highScore}</h2>
        <h2>Games played: {gameOver.gameOverCounter}</h2>
        {status === "PAUSED" && <h2> Press Space Bar to Start </h2>}
      </div>
      <GameContainer setStatus={setStatus} {...gameOver} />
      <GoBackButton />
    </div>
  );
}

export default Play;
