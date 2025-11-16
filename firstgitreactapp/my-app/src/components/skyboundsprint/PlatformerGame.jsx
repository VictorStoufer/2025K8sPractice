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

    // Create level & player
    const level = new Level(levelData);
    const player = new Player(50, 200); // start above the ground

    // input state
    const keys = { left: false, right: false, jump: false };

    // Input handlers (clean, not nested)
    const handleKeyDown = (e) => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') keys.left = true;
      if (k === 'ArrowRight' || k === 'd' || k === 'D') keys.right = true;
      if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === ' ') keys.jump = true;
    };
    const handleKeyUp = (e) => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') keys.left = false;
      if (k === 'ArrowRight' || k === 'd' || k === 'D') keys.right = false;
      if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === ' ') keys.jump = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastTime = performance.now();
    let rafId = 0;

    // helper: simple rect vs circle/rect checks for coin pickup
    const rectRect = (ax, ay, aw, ah, bx, by, bw, bh) =>
      ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

    const loop = (time) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      // apply input if method exists
      if (typeof player.applyInput === 'function') player.applyInput(keys, 200);

      // jump only from main loop (not inside applyInput)
      if (keys.jump && player.onGround && typeof player.jump === 'function') {
        player.jump(350);
      }

      // physics (this should update player.x/player.y and set player.onGround)
      updatePhysics(level, player, dt, { gravity: 900 });

      // if player has integrate(dt) call it (some implementations include it)
      if (typeof player.integrate === 'function') {
        player.integrate(dt);
      }

      // Coin collection: mark coin.collected when overlapping player
      if (Array.isArray(level.coins)) {
        level.coins.forEach((c) => {
          if (c.collected) return;
          // coin might be a simple object with x,y; treat as 12px box
          const cr = c.r ?? 6;
          // approximate coin bounding box for rect collision
          if (rectRect(player.x, player.y, player.w, player.h, c.x - cr, c.y - cr, cr * 2, cr * 2)) {
            c.collected = true;
            // optional: you can increment a score here if you add state
          }
        });
      }

      // --- rendering ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background
      ctx.fillStyle = '#9fd3ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw platforms
      ctx.fillStyle = '#333';
      if (Array.isArray(level.platforms)) {
        level.platforms.forEach((p) => {
          ctx.fillRect(p.x, p.y, p.w, p.h);
        });
      }

      // draw coins
      if (Array.isArray(level.coins)) {
        level.coins.forEach((c) => {
          if (c.collected) return;
          ctx.beginPath();
          ctx.fillStyle = '#eab308';
          ctx.arc(c.x, c.y, c.r ?? 6, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // draw enemies (defensive: they may be plain objects or class instances)
      if (Array.isArray(level.enemies)) {
        level.enemies.forEach((e) => {
          // if enemy has update() method, call it
          if (typeof e.update === 'function') e.update(dt, level);

          if (typeof e.render === 'function') {
            e.render(ctx);
          } else {
            // fallback rectangle
            ctx.fillStyle = '#c33';
            const ex = e.x ?? 0;
            const ey = e.y ?? 0;
            const ew = e.w ?? 28;
            const eh = e.h ?? 28;
            ctx.fillRect(ex, ey, ew, eh);
          }
        });
      }

      // draw player (use player.render if present)
      if (typeof player.render === 'function') {
        // color overlay for debug: blue if onGround else red
        ctx.save();
        // let player's own render handle color; but we draw a debug border
        player.render(ctx);
        ctx.restore();
      } else {
        ctx.fillStyle = player.onGround ? '#0b74ff' : '#dc2626';
        ctx.fillRect(player.x, player.y, player.w, player.h);
      }

      // debug HUD
      ctx.fillStyle = '#111';
      ctx.font = '13px monospace';
      ctx.fillText(`x:${player.x.toFixed(1)} y:${player.y.toFixed(1)} vx:${(player.vx ?? 0).toFixed(1)} vy:${(player.vy ?? 0).toFixed(1)} onGround:${!!player.onGround}`, 8, 18);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // run once

  return (
    <div className="platformer-root" style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 8 }}>
        <button onClick={goHome} className="back-button">Back</button>
      </div>
      <canvas ref={canvasRef} width={900} height={500} className="platformer-canvas" />
    </div>
  );
}
