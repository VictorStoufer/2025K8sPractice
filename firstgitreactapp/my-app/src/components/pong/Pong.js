// src/components/Pong.js
import React, { useState, useEffect, useRef } from "react";
import './Pong.css';

const WIDTH = 600;
const HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const PADDLE_SPEED = 5;
const BALL_SPEED = 4;

export default function Pong({ goHome }) {
  const canvasRef = useRef(null);

  const [gameState, setGameState] = useState("start"); // start, playing, gameover
  const [score, setScore] = useState({ player: 0, ai: 0 });

  const [ball, setBall] = useState({ x: WIDTH / 2, y: HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED });
  const [playerPaddle, setPlayerPaddle] = useState(HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [aiPaddle, setAiPaddle] = useState(HEIGHT / 2 - PADDLE_HEIGHT / 2);

  const keysPressed = useRef({});

  function startGame() {
    setGameState("playing");
    setScore({ player: 0, ai: 0 });
    setBall({ x: WIDTH / 2, y: HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED });
    setPlayerPaddle(HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setAiPaddle(HEIGHT / 2 - PADDLE_HEIGHT / 2);
  }

  function gameOver() {
    setGameState("gameover");
  }

  // Keyboard input
  useEffect(() => {
    function handleKeyDown(e) {
      keysPressed.current[e.key] = true;
      if (gameState !== "playing" && ["ArrowUp", "ArrowDown"].includes(e.key)) {
        startGame();
      }
    }
    function handleKeyUp(e) {
      keysPressed.current[e.key] = false;
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      let newPlayer = playerPaddle;
      if (keysPressed.current["ArrowUp"]) newPlayer -= PADDLE_SPEED;
      if (keysPressed.current["ArrowDown"]) newPlayer += PADDLE_SPEED;
      newPlayer = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, newPlayer));
      setPlayerPaddle(newPlayer);

      // AI paddle
      let newAi = aiPaddle;
      if (ball.y < newAi + PADDLE_HEIGHT / 2) newAi -= PADDLE_SPEED * 0.8;
      else newAi += PADDLE_SPEED * 0.8;
      newAi = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, newAi));
      setAiPaddle(newAi);

      // Move ball
      let newBall = { ...ball };
      newBall.x += newBall.dx;
      newBall.y += newBall.dy;

      // Collisions
      if (newBall.y <= 0 || newBall.y + BALL_SIZE >= HEIGHT) newBall.dy *= -1;

      // Player paddle
      if (
        newBall.x <= PADDLE_WIDTH &&
        newBall.y + BALL_SIZE >= newPlayer &&
        newBall.y <= newPlayer + PADDLE_HEIGHT
      ) {
        newBall.dx *= -1;
      }

      // AI paddle
      if (
        newBall.x + BALL_SIZE >= WIDTH - PADDLE_WIDTH &&
        newBall.y + BALL_SIZE >= newAi &&
        newBall.y <= newAi + PADDLE_HEIGHT
      ) {
        newBall.dx *= -1;
      }

      // Score
      if (newBall.x < 0) {
        setScore({ ...score, ai: score.ai + 1 });
        newBall = { x: WIDTH / 2, y: HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED };
      } else if (newBall.x + BALL_SIZE > WIDTH) {
        setScore({ ...score, player: score.player + 1 });
        newBall = { x: WIDTH / 2, y: HEIGHT / 2, dx: -BALL_SPEED, dy: BALL_SPEED };
      }

      setBall(newBall);
    }, 16);

    return () => clearInterval(interval);
  }, [ball, playerPaddle, aiPaddle, gameState, score]);

  // Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (gameState === "start") {
      ctx.fillStyle = "#fff";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("🏓 Pong Game", WIDTH / 2, HEIGHT / 2 - 40);
      ctx.fillText("Press Arrow Key to Start", WIDTH / 2, HEIGHT / 2);
      return;
    }

    if (gameState === "gameover") {
      ctx.fillStyle = "#fff";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", WIDTH / 2, HEIGHT / 2 - 40);
      ctx.fillText(`Score Player: ${score.player} AI: ${score.ai}`, WIDTH / 2, HEIGHT / 2);
      ctx.fillText("Press Arrow Key to Restart", WIDTH / 2, HEIGHT / 2 + 40);
      return;
    }

    // Draw paddles
    ctx.fillStyle = "#0f0";
    ctx.fillRect(0, playerPaddle, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = "#f00";
    ctx.fillRect(WIDTH - PADDLE_WIDTH, aiPaddle, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = "#fff";
    ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);

    // Draw score
    ctx.font = "18px Arial";
    ctx.fillText(`Player: ${score.player}`, 50, 30);
    ctx.fillText(`AI: ${score.ai}`, WIDTH - 50, 30);
  }, [playerPaddle, aiPaddle, ball, gameState, score]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ background: "#222", display: "block", margin: "20px auto" }}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={goHome}
          style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "6px", cursor: "pointer" }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
