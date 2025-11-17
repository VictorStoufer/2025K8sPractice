import React, { useState, useEffect, useRef } from "react";
import "./Snake.css";

const CELL_SIZE = 20;
const WIDTH = 600;
const HEIGHT = 400;

export default function Snake({ goHome }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("start");
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const keysPressed = useRef({});

  // ⭐ NEW — clean key→direction mapping
  const keyToDir = {
    ArrowUp:    { x: 0, y: -1 },
    ArrowDown:  { x: 0, y: 1 },
    ArrowLeft:  { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w:          { x: 0, y: -1 },
    s:          { x: 0, y: 1 },
    a:          { x: -1, y: 0 },
    d:          { x: 1, y: 0 },
    W:          { x: 0, y: -1 },
    S:          { x: 0, y: 1 },
    A:          { x: -1, y: 0 },
    D:          { x: 1, y: 0 },
  };

  function startGame() {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setFood({ x: 15, y: 15 });
    setScore(0);
    setGameState("playing");
  }

  function gameOver() {
    setGameState("gameover");
  }

  // Handle keyboard input
  useEffect(() => {
    function handleKeyDown(e) {
      keysPressed.current[e.key] = true;

      // Start game from arrow key or WASD
      if (
        gameState !== "playing" &&
        keyToDir[e.key] !== undefined
      ) {
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
      let newDir = direction;

      // ⭐ NEW — unified clean input handling
      for (const key in keysPressed.current) {
        if (keysPressed.current[key] && keyToDir[key]) {
          const proposed = keyToDir[key];

          // Prevent reversing direction
          if (
            !(proposed.x === -direction.x && proposed.y === -direction.y)
          ) {
            newDir = proposed;
          }
        }
      }

      setDirection(newDir);

      const newHead = {
        x: snake[0].x + newDir.x,
        y: snake[0].y + newDir.y,
      };

      // Wall collision or self collision
      if (
        newHead.x < 0 ||
        newHead.x >= WIDTH / CELL_SIZE ||
        newHead.y < 0 ||
        newHead.y >= HEIGHT / CELL_SIZE ||
        snake.some((s) => s.x === newHead.x && s.y === newHead.y)
      ) {
        gameOver();
        return;
      }

      let newSnake = [newHead, ...snake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(score + 1);
        setFood({
          x: Math.floor(Math.random() * (WIDTH / CELL_SIZE)),
          y: Math.floor(Math.random() * (HEIGHT / CELL_SIZE)),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, 100);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameState, score, keyToDir]);

  // Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (gameState === "start") {
      ctx.fillStyle = "#fff";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("🐍 Snake Game", WIDTH / 2, HEIGHT / 2 - 40);
      ctx.fillText("Press Arrow Key or WASD to Start", WIDTH / 2, HEIGHT / 2);
      return;
    }

    if (gameState === "gameover") {
      ctx.fillStyle = "#fff";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", WIDTH / 2, HEIGHT / 2 - 40);
      ctx.fillText(`Score: ${score}`, WIDTH / 2, HEIGHT / 2);
      ctx.fillText("Press Arrow Key or WASD to Restart", WIDTH / 2, HEIGHT / 2 + 40);
      return;
    }

    // Draw snake
    ctx.fillStyle = "#0f0";
    snake.forEach((s) =>
      ctx.fillRect(s.x * CELL_SIZE, s.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    );

    // Draw food
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // Score
    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.fillText(`Score: ${score}`, 50, 30);
  }, [snake, food, gameState, score]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        className="SnakeGameCanvas"
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
      />
      <div className="SnakeButtonArea">
        <button className="SnakeButtons" onClick={goHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
