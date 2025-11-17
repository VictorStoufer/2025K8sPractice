# 🐍 Snake Game

Classic snake game implementation in React with smooth controls and real-time score tracking.

## Features

- Responsive keyboard controls (Arrow keys or WASD)
- Real-time score tracking
- Game over detection
- Smooth animations
- Collision detection (walls and self)
- Food generation system

## How to Play

1. Use **Arrow Keys** or **WASD** to control the snake's direction
2. Eat the food (red squares) to grow longer and increase your score
3. Avoid hitting the walls or your own tail
4. Try to achieve the highest score possible!

## Controls

- **↑ / W** - Move Up
- **↓ / S** - Move Down
- **← / A** - Move Left
- **→ / D** - Move Right
- **Home Button** - Return to main menu

## Technical Details

- Built with React functional components and hooks
- Uses `useEffect` for game loop management
- Canvas-based rendering for smooth performance
- State management for snake position, direction, and score
- Collision detection algorithm for walls and self-collision

## Game Logic

The game operates on a grid system where:
- The snake grows by one unit when it eats food
- Game speed remains constant for consistent gameplay
- Food spawns randomly on the grid
- Snake cannot reverse direction (e.g., can't go left immediately if moving right)

## Customization

You can modify the following in `Snake.js`:
- Grid size
- Snake speed (game tick rate)
- Colors and styling in `Snake.css`
- Initial snake length
- Food appearance

## Future Enhancements

Potential improvements:
- Difficulty levels (speed variations)
- High score persistence (localStorage)
- Sound effects
- Power-ups and special food items
- Obstacles and level progression
- Multiplayer mode
