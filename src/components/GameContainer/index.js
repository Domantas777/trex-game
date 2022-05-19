import Game from '../Game'
import styles from './styles.module.css'

function GameContainer(props) {
  return (
    <div className={styles.container}>
      <div>
        <Game {...props} />
      </div>
      <div />
    </div>
  )
}

export default GameContainer;