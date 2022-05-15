import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage";
import Store from "./pages/Store/Store";
import Achievements from "./pages/Achievements/Achievements";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="store" element={<Store />} />
        <Route path="achievements" element={<Achievements />} />
      </Routes>
    </Router>
  );
}

export default App;
