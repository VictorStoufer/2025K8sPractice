import React from "react";

const Home = ({ setGame }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <h1>React Games Hub</h1>
      <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
        <button onClick={() => setGame("snake")}>Play Snake</button>
        <button onClick={() => setGame("pong")}>Play Pong</button>
      </div>
    </div>
  );
};

export default Home;
