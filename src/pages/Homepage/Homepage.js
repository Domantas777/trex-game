import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import trex from '../../assets/tRex.png';

function HomePage() {
  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.image}
          src={trex}
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
