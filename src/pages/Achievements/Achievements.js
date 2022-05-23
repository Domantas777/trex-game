import styles from "./Achievements.module.css";
import AchievementsBox from "../../components/AchievementBox/AchievementBox.js";
import { Runner } from "../../components/Runner";
import AchievementLocked from "../../assets/Achievement-locked.png";
import AchievementUnlocked from "../../assets/Achievement-unlocked.jpg";
import React, { useContext } from "react";
import { GameOverContext } from "../../hooks/gameOverContext";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

function Achievements() {
  const gameOver = useContext(GameOverContext);
  console.log(gameOver.userSkins.availableSkins);

  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>Achievements</span>
        <div className={styles.box}>
          {gameOver.gameOverCounter >= 1 ? (
            <AchievementsBox
              title="Newbie"
              text="Play the game for the first time"
              image={AchievementUnlocked}
            />
          ) : (
            <AchievementsBox
              title="???"
              text="LOCKED"
              image={AchievementLocked}
            />
          )}
          {gameOver.gameOverCounter >= 5 ? (
            <AchievementsBox
              title="Advanced"
              text="Play the game 5 times"
              image={AchievementUnlocked}
            />
          ) : (
            <AchievementsBox
              title="???"
              text="LOCKED"
              image={AchievementLocked}
            />
          )}
          {gameOver.gameOverCounter >= 10 ? (
            <AchievementsBox
              title="Pro"
              text="Play the game 10 times"
              image={AchievementUnlocked}
            />
          ) : (
            <AchievementsBox
              title="???"
              text="LOCKED"
              image={AchievementLocked}
            />
          )}
          {gameOver.highScore >= 1000 ? (
            <AchievementsBox
              title="Keep it up!"
              text="Get a high score of 1000"
              image={AchievementUnlocked}
            />
          ) : (
            <AchievementsBox
              title="???"
              text="LOCKED"
              image={AchievementLocked}
            />
          )}
          {gameOver.highScore >= 2000 ? (
            <AchievementsBox
              title="You're nearly there!"
              text="Get a high score of 2000"
              image={AchievementUnlocked}
            />
          ) : (
            <AchievementsBox
              title="???"
              text="LOCKED"
              image={AchievementLocked}
            />
          )}
          {gameOver.highScore >= 3000 ? (
            <AchievementsBox
              title="Professional runner"
              text="Get a high score of 3000"
              image={AchievementUnlocked}
            />
          ) : (
            <AchievementsBox
              title="???"
              text="LOCKED"
              image={AchievementLocked}
            />
          )}
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}

export default Achievements;
