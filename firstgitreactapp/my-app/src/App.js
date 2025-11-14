import React, { useState } from "react";
import Home from "./components/Home";
import Snake from "./components/Snake";
import Pong from "./components/Pong";

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

