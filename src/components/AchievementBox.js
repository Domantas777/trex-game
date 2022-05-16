import styles from "./AchievementBox.module.css";
import AchievementLocked from "../assets/Achievement-locked.png";
import AchievementUnlocked from "../assets/Achievement-unlocked.jpg";

function AchievementBox({ title, text }) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <img className={styles.image} src={AchievementUnlocked}></img>
      <span className={styles.text}>{text}</span>
    </div>
  );
}

export default AchievementBox;
