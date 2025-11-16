import React, { useState } from "react";
import Home from './components/home/Home';
import Snake from './components/snake/Snake';
import Pong from './components/pong/Pong';


function App() {
  const [game, setGame] = useState(null);

  const renderGame = () => {
    switch (game) {
      case "snake":
        return <Snake goHome={() => setGame(null)} />;
      case "pong":
        return <Pong goHome={() => setGame(null)} />;
      default:
        return <Home setGame={setGame} />;
    }
  };

  return (
    <div>
      {renderGame()}
    </div>
  );
}

export default App;

