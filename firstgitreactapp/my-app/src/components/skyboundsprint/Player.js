export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 28;
    this.h = 40;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.color = '#0b74ff'; // blue rectangle
  }

  applyInput(keys, speed) {
    let tx = 0;
    if (keys.left) tx -= speed;
    if (keys.right) tx += speed;
    this.vx += (tx - this.vx) * 0.2;

    if (keys.jump) this.jump(300);
  }

  jump(strength) {
    if (this.onGround) {
      this.vy = -strength;
      this.onGround = false;
    }
  }

  integrate(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h); // <-- simple rectangle
    ctx.restore();
  }
}
