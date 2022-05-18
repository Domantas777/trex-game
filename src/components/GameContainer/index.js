import Game from '../Game'
import styles from './styles.module.css'

function GameContainer(props) {
  return (
    <div className={styles.container}>
      <h2 align="center"> Press Space Bar to Start </h2>
      <div>
        <Game {...props} />
      </div>
      <div />
    </div>
  )
}

export default GameContainer;