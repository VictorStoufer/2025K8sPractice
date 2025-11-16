// Level.js — loads JSON and creates platform/enemy/coin objects
import Enemy from './Enemy';
import Coin from './Coin';

export default class Level {
  constructor(json) {
    this.width = json.width || 2000;
    this.height = json.height || 480;
    this.platforms = json.platforms || [];
    this.enemies = (json.enemies || []).map(e => new Enemy(e.x, e.y, e.w, e.h, e.patrol || 60));
    this.coins = (json.coins || []).map(c => new Coin(c.x, c.y));
  }
}
