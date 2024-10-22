
import RouletteGame from './RouletteGame';
import './App.css';

function App() {
 
  console.log("RouletteGame rendered");

  return (
   
    <div className="bg-blue-500 text-white p-4">
     
      <div className="game-header">
        <RouletteGame />
      </div>
    </div>
  );
}

export default App;
