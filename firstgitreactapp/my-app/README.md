# 🎮 Retro Arcade - React Games Collection

A collection of classic arcade games built with React, featuring Snake, Pong, and Skybound Sprint platformer. This project demonstrates modern React development practices including component-based architecture, state management, and game loop implementation.

## 🌟 Features

### Games Included

#### 🐍 Snake
Classic snake game with smooth controls and score tracking. Navigate the snake to eat food and grow longer without hitting walls or yourself.

#### 🏓 Pong
The timeless paddle-and-ball game. Test your reflexes in this classic arcade experience.

#### 🏃 Skybound Sprint
A full-featured 2D platformer game with:
- Physics-based movement and jumping
- Enemy AI and collision detection
- Level system with JSON-based level design
- Coin collection mechanics
- Pause/resume functionality
- Smooth animations and responsive controls

### Technical Highlights

- **Zero Game Engine Dependencies**: All games built from scratch using vanilla React
- **Component-Based Architecture**: Modular design for easy maintenance and extension
- **React Router Integration**: Seamless navigation between games
- **Custom Physics Engine**: Purpose-built physics system for the platformer
- **Responsive Design**: Works across different screen sizes
- **Clean Code Structure**: Well-organized components with separation of concerns

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VictorStoufer/2025K8sPractice.git
cd 2025K8sPractice/firstgitreactapp/my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically reload when you make changes.

## 🎯 How to Play

### Snake
- Use arrow keys or WASD to control the snake's direction
- Eat food to grow longer and increase your score
- Avoid hitting walls or your own tail

### Pong
- Use mouse or keyboard controls to move your paddle
- Keep the ball in play and score against your opponent
- First to reach the target score wins

### Skybound Sprint
- **Movement**: Arrow keys or A/D keys to move left/right
- **Jump**: Space bar or Up arrow
- **Pause**: Esc key
- Collect coins and avoid enemies
- Navigate through platforms to complete levels

## 📁 Project Structure

```
my-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── Home.js          # Main menu/game selector
│   │   │   └── Home.css
│   │   ├── snake/
│   │   │   ├── Snake.js         # Snake game logic
│   │   │   └── Snake.css
│   │   ├── pong/
│   │   │   ├── Pong.js          # Pong game logic
│   │   │   └── Pong.css
│   │   └── skyboundsprint/
│   │       ├── PlatformerGame.jsx   # Main game component
│   │       ├── Player.js            # Player entity
│   │       ├── Enemy.js             # Enemy AI
│   │       ├── Coin.js              # Collectibles
│   │       ├── Level.js             # Level management
│   │       ├── Physics.js           # Physics engine
│   │       ├── levels/
│   │       │   └── Level1.json      # Level definitions
│   │       ├── assets/              # Game sprites (optional)
│   │       └── styles/
│   │           └── Platformer.css
│   ├── App.js                   # Main app component with routing
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder with optimized performance

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App for full configuration control

## 🔧 Technologies Used

- **React 18.2.0** - UI library
- **React Router DOM 7.9.6** - Client-side routing
- **React Scripts 5.0.1** - Build tooling
- **Create React App** - Project bootstrapping
- **CSS3** - Styling and animations
- **Canvas API** - Game rendering (where applicable)

## 🎨 Customization

### Adding New Games

1. Create a new component in `src/components/[game-name]/`
2. Import and add the game case in `App.js`:
```javascript
case "your-game":
  return <YourGame goHome={() => setGame(null)} />;
```
3. Add a button in `Home.js`:
```javascript
<button onClick={() => setGame("your-game")}>Play Your Game</button>
```

### Modifying Skybound Sprint Levels

Edit or create new JSON files in `src/components/skyboundsprint/levels/`:
```json
{
  "platforms": [...],
  "enemies": [...],
  "coins": [...]
}
```

### Adding Sprites

1. Place image files in `src/components/skyboundsprint/assets/`
2. Update rendering logic in `Player.js` and `Enemy.js`

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Create React App Documentation](https://create-react-app.dev/)
- [Game Development with React](https://react.dev/learn)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new games
- Improve existing game mechanics
- Enhance UI/UX
- Fix bugs
- Add tests

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Create React App
- Inspired by classic arcade games
- Physics engine designed for educational purposes

---

**Repository**: [2025K8sPractice](https://github.com/VictorStoufer/2025K8sPractice)  
**Author**: Victor Stoufer  
**Last Updated**: November 2025
