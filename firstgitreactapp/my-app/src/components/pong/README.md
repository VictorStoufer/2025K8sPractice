# 🏓 Pong Game

Classic Pong arcade game recreated in React with smooth paddle controls and ball physics.

## Features

- Two-player gameplay
- Responsive paddle controls
- Ball physics with collision detection
- Score tracking system
- Smooth animations
- Classic arcade feel

## How to Play

1. Control your paddle to keep the ball in play
2. Score points when your opponent misses the ball
3. First player to reach the target score wins
4. Return to the main menu using the Home button

## Controls

- **Keyboard/Mouse Controls** - Move paddle up and down
- **Home Button** - Return to main menu

## Technical Details

- Built with React functional components
- Game loop using `requestAnimationFrame`
- Physics-based ball movement
- Collision detection for paddles and walls
- Real-time score updates

## Game Mechanics

- Ball speed increases slightly with each paddle hit
- Ball angle changes based on where it hits the paddle
- Automatic ball reset after each point
- Responsive paddle movement

## Customization

Modify in `Pong.js` and `Pong.css`:
- Paddle size and speed
- Ball speed and acceleration
- Court dimensions
- Colors and styling
- Winning score threshold
- Ball physics (angle, velocity)

## Future Enhancements

Potential features to add:
- Single-player mode with AI opponent
- Difficulty levels
- Sound effects (ball hit, score, game over)
- Power-ups (larger paddle, slower ball)
- Tournament mode
- High score leaderboard
- Visual effects and particles
