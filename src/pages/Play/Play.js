import { useContext } from "react";
import GameContainer from "../../components/GameContainer";
import { GameOverContext } from "../../hooks/gameOverContext";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

function Play() {
  const gameOver = useContext(GameOverContext);
  return (
    <div>
      <GameContainer {...gameOver} />
      <GoBackButton />
    </div>
  );
}

export default Play;
