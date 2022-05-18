import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage";
import Store from "./pages/Store/Store";
import Achievements from "./pages/Achievements/Achievements";
import Play from "./pages/Play/Play";
import { GameOverContext } from "./hooks/gameOverContext";
import { useState } from "react";

function App() {
  const [gameOverCounter, setGameOverCounter] = useState(0);
  return (
    <GameOverContext.Provider value={{ gameOverCounter, setGameOverCounter }}>
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
