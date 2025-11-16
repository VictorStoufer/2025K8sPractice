import React, { useRef, useEffect } from 'react';
import Player from './Player';
import Level from './Level';
import { updatePhysics } from './Physics';
import Enemy from './Enemy';
import Coin from './Coin';
import './styles/Platformer.css';
import levelData from './levels/Level1.json';

export default function PlatformerGame({ goHome }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const player = new Player(50, 400); // start above first platform
    const level = new Level(levelData);

    const keys = { left: false, right: false, jump: false };

    // --- Keyboard input ---
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft': case 'a': case 'A':
          keys.left = true; break;
        case 'ArrowRight': case 'd': case 'D':
          keys.right = true; break;
        case 'ArrowUp': case 'w': case 'W': case ' ':
          keys.jump = true; break;
        default: break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'ArrowLeft': case 'a': case 'A':
          keys.left = false; break;
        case 'ArrowRight': case 'd': case 'D':
          keys.right = false; break;
        case 'ArrowUp': case 'w': case 'W': case ' ':
          keys.jump = false; break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastTime = 0;
    let animationFrameId;

    const loop = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Apply input
      player.applyInput(keys, 200);

      // Jump
      if (keys.jump && player.onGround) {
        player.jump(350);
      }

      // Update physics
      updatePhysics(level, player, dt, { gravity: 800 });

      // Integrate movement
      player.integrate(dt);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw platforms
      ctx.fillStyle = '#333';
      level.platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

      // Draw coins
      level.coins.forEach(c => c.render(ctx));

      // Update and draw enemies
      level.enemies.forEach(e => { e.update(dt, level); e.render(ctx); });

      // Draw player (blue on ground, red if falling)
      ctx.fillStyle = player.onGround ? '#0b74ff' : '#dc2626';
      player.render(ctx);

      // Debug info
      ctx.fillStyle = 'black';
      ctx.font = '14px monospace';
      ctx.fillText(`vx: ${player.vx.toFixed(1)}, vy: ${player.vy.toFixed(1)}, onGround: ${player.onGround}`, 10, 20);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="platformer-root">
      <canvas ref={canvasRef} width={900} height={500} className="platformer-canvas"></canvas>
      <button onClick={goHome} style={{ marginTop: '10px' }}>Back to Home</button>
    </div>
  );
}
