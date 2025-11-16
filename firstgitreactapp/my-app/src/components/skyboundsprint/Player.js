// Player.js
export default class Player {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.w = 48; // width of one frame
    this.h = 48; // height of one frame
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;

    this.image = image;
    this.frameX = 0; // current horizontal frame index
    this.frameY = 0; // vertical index (different animations)
    this.maxFrames = 3; // frames per animation row
    this.frameTimer = 0;
    this.frameInterval = 0.15; // seconds per frame

    this.animations = {
      idle: 0,
      run: 1,
      jump: 2
    };
    this.currentAnimation = 'idle';
  }

  setAnimation(anim) {
    if (this.currentAnimation !== anim) {
      this.currentAnimation = anim;
      this.frameX = 0;
      this.frameY = this.animations[anim];
      this.frameTimer = 0;
    }
  }

  updateAnimation(dt) {
    this.frameTimer += dt;
    if (this.frameTimer >= this.frameInterval) {
      this.frameX = (this.frameX + 1) % this.maxFrames;
      this.frameTimer = 0;
    }
  }

  applyInput(keys, speed) {
    let targetVx = 0;
    if (keys.left) targetVx -= speed;
    if (keys.right) targetVx += speed;
    this.vx += (targetVx - this.vx) * 0.2;
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
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.frameX * this.w, // source x
        this.frameY * this.h, // source y
        this.w,               // source width
        this.h,               // source height
        this.x,               // destination x
        this.y,               // destination y
        this.w,               // destination width
        this.h                // destination height
      );
    } else {
      // fallback rectangle if image not loaded
      ctx.fillStyle = '#ff0b0b';
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}
