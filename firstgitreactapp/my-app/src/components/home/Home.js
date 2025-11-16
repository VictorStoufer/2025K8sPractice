import React from "react";
import './Home.css';

const Home = ({ setGame }) => {
  return (
    <div class="home-container" >
      <h1>React Games Hub</h1>
      <div class="button-zone">
        <button onClick={() => setGame("snake")}>Play Snake</button>
        <button onClick={() => setGame("pong")}>Play Pong</button>
      </div>
    </div>
  );
};

export default Home;
