export default class Coin {
  constructor(x, y, r = 8) { this.x = x; this.y = y; this.r = r; this.collected = false; }
  render(ctx) { if (this.collected) return; ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2); ctx.fillStyle = '#eab308'; ctx.fill(); }
}
