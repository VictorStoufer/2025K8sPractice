// Physics.js — working collision
export function updatePhysics(world, player, dt, settings) {
  const gravity = settings.gravity || 800;

  // Apply gravity
  player.vy += gravity * dt;

  // Apply movement
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // Reset onGround
  player.onGround = false;

  // Check collision with platforms
  world.platforms.forEach(p => {
    // Axis-Aligned Bounding Box collision
    if (
      player.x < p.x + p.w &&
      player.x + player.w > p.x &&
      player.y < p.y + p.h &&
      player.y + player.h > p.y
    ) {
      // Player falling onto platform from above
      if (player.vy >= 0 && (player.y + player.h - player.vy * dt) <= p.y) {
        player.y = p.y - player.h;   // Snap to top
        player.vy = 0;               // Stop vertical velocity
        player.onGround = true;      // Player is grounded
      }
      // Hitting from sides
      else {
        if (player.x + player.w / 2 < p.x + p.w / 2) player.x = p.x - player.w;
        else player.x = p.x + p.w;
        player.vx = 0;
      }
    }
  });
}
