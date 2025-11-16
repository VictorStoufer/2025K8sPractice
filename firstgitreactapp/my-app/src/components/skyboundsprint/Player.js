export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 28;
    this.h = 40;

    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
  }

  applyInput(keys, speed) {
    let targetVX = 0;
    if (keys.left) targetVX -= speed;
    if (keys.right) targetVX += speed;

    // smooth accel
    this.vx += (targetVX - this.vx) * 0.2;
  }

  jump(force) {
    this.vy = -force;
    this.onGround = false;
  }

  render(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
