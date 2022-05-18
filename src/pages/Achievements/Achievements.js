import styles from "./Achievements.module.css";
import AchievementsBox from "../../components/AchievementBox/AchievementBox.js";
import { Runner } from "../../components/Runner";
import AchievementLocked from "../../assets/Achievement-locked.png";
import AchievementUnlocked from "../../assets/Achievement-unlocked.jpg";
import * as React from "react";

function Achievements() {
  console.log(Runner.gameOverCounter);
  return (
    <div className={styles.container}>
      <span className={styles.title}>Achievements</span>
      <div className={styles.box}>
        <AchievementsBox
          title="Newbie"
          text="Play the game 1 times"
          img={
            Runner.gameOverCounter >= 1
              ? { AchievementUnlocked }
              : { AchievementLocked }
          }
        />
        <AchievementsBox title="Advanced" text="Play the game 5 times" />
        <AchievementsBox title="Pro" text="Play the game 10 times" />
        <AchievementsBox title="True gamer" text="Get a highscore of 1000" />
        <AchievementsBox title="bruh" text="eat my ass" />
        <AchievementsBox title="bruh" text="eat my ass" />
        <AchievementsBox title="bruh" text="eat my ass" />
      </div>
    </div>
  );
}

export default Achievements;
