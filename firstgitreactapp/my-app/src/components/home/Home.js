import React from "react";
import './Home.css';

const Home = ({ setGame }) => {
  return (
    <div className="home-container" >
      <h1>React Games Hub</h1>
      <div className="button-zone">
        <button onClick={() => setGame("snake")}>Play Snake</button>
        <button onClick={() => setGame("pong")}>Play Pong</button>
        <button onClick={() => setGame("skybound")}>Play Skybound Sprint</button>
      </div>
    </div>
  );
};

export default Home;
