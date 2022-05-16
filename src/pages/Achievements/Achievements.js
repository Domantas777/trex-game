import styles from "./Achievements.module.css";
import AchievementsBox from "../../components/AchievementBox";

function Achievements() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Achievements</span>
      <div className={styles.box}>
        <AchievementsBox title="Newbie" text="Play the game 10 times" />
        <AchievementsBox title="Advanced" text="Play the game 20 times" />
        <AchievementsBox title="Pro" text="Play the game 30 times" />
        <AchievementsBox title="True gamer" text="Get a highscore of 5000" />
        <AchievementsBox title="bruh" text="eat my ass" />
        <AchievementsBox title="bruh" text="eat my ass" />
        <AchievementsBox title="bruh" text="eat my ass" />
      </div>
    </div>
  );
}

export default Achievements;
