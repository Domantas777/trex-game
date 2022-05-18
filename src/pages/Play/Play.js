import { useContext } from 'react';
import GameContainer from '../../components/GameContainer';
import { GameOverContext } from '../../hooks/gameOverContext';

function Play() {
    const gameOver = useContext(GameOverContext);
    return (
        <GameContainer {...gameOver} />
    )
}

export default Play;