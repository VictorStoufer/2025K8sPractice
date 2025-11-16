// Enemy simple class: horizontal patroller
export default class Enemy {
  constructor(x, y, w = 28, h = 28, speed = 60) {
    this.x = x; this.y = y; this.w = w; this.h = h; this.speed = speed; this.dir = 1; this.alive = true;
  }

  update(dt, world) {
    this.x += this.dir * this.speed * dt;
    // basic bounce logic
    if (this.x < 20) this.dir = 1;
    if (this.x > world.width - 20) this.dir = -1;
  }

  render(ctx) {
    if (!this.alive) return;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
