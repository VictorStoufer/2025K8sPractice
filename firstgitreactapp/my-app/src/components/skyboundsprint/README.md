# 🏃 Skybound Sprint - 2D Platformer Game

A full-featured 2D platformer game built entirely in React with custom physics engine, enemy AI, and level progression system.

## 🌟 Features

### Core Gameplay
- **Smooth Physics-Based Movement** - Realistic jumping, gravity, and collision detection
- **Enemy AI** - Patrolling enemies with collision detection
- **Coin Collection** - Collectible items with score tracking
- **Level System** - JSON-based level design for easy customization
- **Pause Functionality** - Pause/resume with ESC key
- **Multiple Control Schemes** - Arrow keys or WASD support

### Technical Features
- Custom-built physics engine (`Physics.js`)
- Entity system (Player, Enemy, Coin, Level)
- Modular component architecture
- JSON-based level definitions
- No external game engine dependencies
- Extensible asset system

## 🎮 How to Play

### Objective
Navigate through platforms, collect coins, avoid enemies, and reach the end of each level!

### Controls
- **Move Left**: ← Left Arrow or A
- **Move Right**: → Right Arrow or D
- **Jump**: ↑ Up Arrow, Space Bar, or W
- **Pause/Resume**: ESC
- **Return Home**: Home Button (when paused)

### Gameplay Tips
- Time your jumps carefully to avoid enemies
- Collect all coins for maximum score
- Watch enemy patrol patterns
- Use platforms strategically for safety

## 📁 Project Structure

```
skyboundsprint/
├── PlatformerGame.jsx    # Main game component & game loop
├── Player.js             # Player entity with controls
├── Enemy.js              # Enemy AI and behavior
├── Coin.js               # Collectible coin entity
├── Level.js              # Level management and rendering
├── Physics.js            # Physics engine (gravity, collisions)
├── levels/
│   └── Level1.json       # Level data (platforms, enemies, coins)
├── assets/               # Game sprites (optional)
└── styles/
    └── Platformer.css    # Game styling
```

## 🔧 Technical Architecture

### Physics Engine (`Physics.js`)
- Gravity simulation
- Platform collision detection
- Boundary checking
- Velocity and acceleration handling

### Entity System
Each entity (Player, Enemy, Coin) has:
- Position (x, y)
- Dimensions (width, height)
- Update logic
- Render method
- Collision detection

### Level System (`Level.js`)
Loads from JSON files containing:
```json
{
  "platforms": [
    {"x": 0, "y": 550, "width": 800, "height": 50}
  ],
  "enemies": [
    {"x": 400, "y": 500, "patrolStart": 300, "patrolEnd": 500}
  ],
  "coins": [
    {"x": 250, "y": 450}
  ]
}
```

## 🎨 Customization Guide

### Creating New Levels

1. Create a new JSON file in `levels/`:
```json
{
  "platforms": [
    {"x": 100, "y": 400, "width": 200, "height": 20}
  ],
  "enemies": [
    {"x": 300, "y": 380, "patrolStart": 200, "patrolEnd": 500}
  ],
  "coins": [
    {"x": 350, "y": 350}
  ]
}
```

2. Load it in `PlatformerGame.jsx`

### Adding Sprites

1. Place image files in `assets/` folder
2. Update rendering in entity files:

```javascript
// In Player.js render method
render(ctx) {
  const img = new Image();
  img.src = '/path/to/sprite.png';
  ctx.drawImage(img, this.x, this.y, this.width, this.height);
}
```

### Modifying Physics

Edit constants in `Physics.js`:
- `GRAVITY` - Fall speed
- `JUMP_FORCE` - Jump height
- `MOVE_SPEED` - Horizontal movement speed
- `FRICTION` - Movement smoothing

### Styling

Modify `Platformer.css` for:
- Canvas dimensions
- Background colors
- UI elements (score, pause screen)
- Button styles

## 🚀 Advanced Features

### Enemy AI
Enemies patrol between defined points:
```javascript
{
  "x": 400,
  "y": 500,
  "patrolStart": 300,
  "patrolEnd": 500
}
```

### Collision System
- **Platform Collision**: Prevents falling through platforms
- **Enemy Collision**: Game over on contact
- **Coin Collision**: Collected when player overlaps
- **Boundary Collision**: Prevents leaving the screen

### Game States
- Playing
- Paused
- Game Over
- Level Complete

## 🔍 Code Examples

### Adding a New Enemy Type
```javascript
// In Enemy.js
class FlyingEnemy extends Enemy {
  update() {
    // Custom flying behavior
    this.y += Math.sin(Date.now() / 1000) * 2;
  }
}
```

### Custom Power-Up
```javascript
// Create new PowerUp.js similar to Coin.js
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'speed', 'invincibility', etc.
  }
  
  collect(player) {
    player.applyPowerUp(this.type);
  }
}
```

## 🐛 Debugging Tips

- Check console for error messages
- Verify JSON level files are properly formatted
- Ensure asset paths are correct
- Test collision boundaries with different platform sizes
- Monitor frame rate for performance issues

## 📚 Learning Resources

This game demonstrates:
- Game loop implementation in React
- Canvas rendering and animation
- Custom physics engine creation
- Entity-component patterns
- JSON data-driven design
- State management in games

## 🎯 Future Enhancement Ideas

- [ ] Multiple lives system
- [ ] Moving platforms
- [ ] Double jump ability
- [ ] Particle effects
- [ ] Sound effects and music
- [ ] Boss battles
- [ ] Checkpoints
- [ ] Time trials
- [ ] Leaderboard system
- [ ] Mobile touch controls
- [ ] Character selection
- [ ] Weather/environmental effects

## 🙏 Credits

- Built from scratch with React
- No external game engines used
- Physics engine designed for educational purposes
- Inspired by classic platformer games

---

For the main project README, see: `/my-app/README.md`
