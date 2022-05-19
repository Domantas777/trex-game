import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage";
import Store from "./pages/Store/Store";
import Achievements from "./pages/Achievements/Achievements";
import Play from "./pages/Play/Play";
import { GameOverContext } from "./hooks/gameOverContext";
import { useEffect, useState } from "react";

function App() {
  const [gameOverCounter, setGameOverCounter] = useState(localStorage.getItem("gameOverCounter") || 0);
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0);
  const [coins, setCoins] = useState(localStorage.getItem("coins") || 0);

  useEffect(() => {
    localStorage.setItem("gameOverCounter", gameOverCounter);
  }, [gameOverCounter]);
  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);
  useEffect(() => {
    localStorage.setItem("coins", coins);
  }, [coins]);

  return (
    <GameOverContext.Provider value={{ gameOverCounter, setGameOverCounter, highScore, setHighScore, coins, setCoins }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="store" element={<Store />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="play" element={<Play />} />
        </Routes>
      </Router>
    </GameOverContext.Provider>
  );
}

export default App;
