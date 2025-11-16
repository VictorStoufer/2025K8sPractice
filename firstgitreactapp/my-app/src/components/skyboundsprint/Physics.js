export function updatePhysics(level, player, dt, settings) {
  const gravity = settings.gravity || 900;

  // apply gravity
  player.vy += gravity * dt;

  // apply velocities
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  player.onGround = false;

  // platform collision
  level.platforms.forEach((p) => {
    const px = player.x;
    const py = player.y;
    const pw = player.w;
    const ph = player.h;

    if (
      px < p.x + p.w &&
      px + pw > p.x &&
      py < p.y + p.h &&
      py + ph > p.y
    ) {
      // from top
      if (player.vy > 0 && py + ph - player.vy * dt <= p.y) {
        player.y = p.y - ph;
        player.vy = 0;
        player.onGround = true;
      } else {
        // hit from side
        if (px + pw / 2 < p.x + p.w / 2) player.x = p.x - pw;
        else player.x = p.x + p.w;
        player.vx = 0;
      }
    }
  });
}
