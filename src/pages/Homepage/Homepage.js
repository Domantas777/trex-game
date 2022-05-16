import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.image}
          src="https://play-lh.googleusercontent.com/i-0HlK6I-K5ZVI28HFa4iXz0T22Mg2WjQ4gMsEYvqmSNdifp2NE41ZiaUCavmbIimQ"
          alt="t-rex"
        ></img>
        <span className={styles.title}>T-Rex Game</span>
      </div>

      <div className={styles.links}>
        <Link className={styles.button} to="/play">
          Play
        </Link>
        <Link className={styles.button} to="/store">
          Store
        </Link>
        <Link className={styles.button} to="/achievements">
          Achievements
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
