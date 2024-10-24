
import RouletteGame from './RouletteGame';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/roulette" element={<RouletteGame />} />
      </Routes>
    </Router>
  );
}

export default App;
