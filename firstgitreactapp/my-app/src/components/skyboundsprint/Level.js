export default class Level {
  constructor(json) {
    this.width = json.width || 2000;
    this.height = json.height || 480;
    this.platforms = json.platforms || [];
    this.coins = json.coins || [];
    this.enemies = json.enemies || [];
  }
}
