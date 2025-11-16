// Physics.js — improved collision + world bounds
export function updatePhysics(world, player, dt, settings) {
  const gravity = settings.gravity || 800;

  // Apply gravity
  player.vy += gravity * dt;

  // Apply movement
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // Reset onGround
  player.onGround = false;

  // Small tolerance for landing
  const landingTolerance = 2;

  // Check collision with platforms
  world.platforms.forEach(p => {
    if (
      player.x < p.x + p.w &&
      player.x + player.w > p.x &&
      player.y < p.y + p.h &&
      player.y + player.h > p.y
    ) {
      const overlapX = (player.x + player.w / 2) - (p.x + p.w / 2);
      const overlapY = (player.y + player.h / 2) - (p.y + p.h / 2);

      // Player falling onto platform from above
      if (player.vy >= 0 && (player.y + player.h - player.vy * dt) <= p.y + landingTolerance) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
      // Hitting sides only if vertical overlap is small
      else if (Math.abs(overlapY) < player.h / 2) {
        if (overlapX < 0) player.x = p.x - player.w;
        else player.x = p.x + p.w;
        player.vx = 0;
      }
      // Ceiling collision
      else if (player.vy < 0 && (player.y - player.vy * dt) >= p.y + p.h - landingTolerance) {
        player.y = p.y + p.h;
        player.vy = 0;
      }
    }
  });

  // --- World bounds ---
  // Left
  if (player.x < 0) {
    player.x = 0;
    player.vx = 0;
  }
  // Right
  if (player.x + player.w > world.width) {
    player.x = world.width - player.w;
    player.vx = 0;
  }
  // Top
  if (player.y < 0) {
    player.y = 0;
    player.vy = 0;
  }
  // Bottom
  if (player.y + player.h > world.height) {
    player.y = world.height - player.h;
    player.vy = 0;
    player.onGround = true;
  }
}
