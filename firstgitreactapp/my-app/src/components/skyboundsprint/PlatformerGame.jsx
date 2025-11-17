// PlatformerGame.jsx
import React, { useRef, useEffect } from 'react';
import Player from './Player';
import Level from './Level';
import { updatePhysics } from './Physics';
import './styles/Platformer.css';
import levelData from './levels/Level1.json';

export default function PlatformerGame({ goHome }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const level = new Level(levelData);
    const player = new Player(50, 200);
    player.color = '#ff0'; // bright yellow player

    const keys = { left: false, right: false, jump: false };

    // Map all game keys
    const gameKeys = {
      ArrowLeft: 'left',
      a: 'left',
      ArrowRight: 'right',
      d: 'right',
      ArrowUp: 'jump',
      w: 'jump',
      ' ': 'jump',
    };

    // Handle key press for game input
    const handleKeyDown = (e) => {
      const key = gameKeys[e.key];
      if (key) {
        keys[key] = true;
      }
    };

    const handleKeyUp = (e) => {
      const key = gameKeys[e.key];
      if (key) {
        keys[key] = false;
      }
    };

    // Prevent default scrolling for Space and arrow keys globally
    const preventScroll = (e) => {
      if (Object.keys(gameKeys).includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', preventScroll);

    let lastTime = performance.now();

    const loop = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Horizontal movement
      const speed = 220;
      let tx = 0;
      if (keys.left) tx -= speed;
      if (keys.right) tx += speed;
      player.vx += (tx - player.vx) * 0.2;

      // Jump
      const jumpStrength = 500;
      if (keys.jump && player.onGround) {
        player.vy = -jumpStrength;
        player.onGround = false;
      }

      // Physics update
      updatePhysics(level, player, dt, { gravity: 900 });

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw platforms
      ctx.fillStyle = '#0bff0b';
      level.platforms.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h));

      // Draw player
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.w, player.h);

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', preventScroll);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={480}
        style={{ background: '#222', display: 'block', margin: '20px auto' }}
      />
      <button
        onClick={goHome}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Back to Home
      </button>
    </div>
  );
}
