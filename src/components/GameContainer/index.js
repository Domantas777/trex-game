import Game from '../Game'
import styles from './styles.module.css'

function GameContainer() {
  return (
    <div className={styles.container}>
      <h2 align="center"> Press Space Bar to Start </h2>
      <div>
        <Game />
      </div>
      <div />
    </div>
  )
}

export default GameContainer;