import './style/style.css';
import Player from './modules/player/index.js';
import {
  renderBoard,
  bindAttackBoard,
  setStatus,
  startGame,
} from './modules/ui/index.js';

document.addEventListener('DOMContentLoaded', startGame);

// Setup
const player = Player();
const enemy = Player();

// Colocar barcos del jugador y del enemigo
player.board.placeShip(
  { hit: () => {}, length: 2, isSunk: () => false },
  [0, 0],
  'horizontal'
); // ejemplo
enemy.board.placeShip(
  { hit: () => {}, length: 2, isSunk: () => false },
  [1, 1],
  'horizontal'
);

// Vincular tableros
const playerBoardDiv = document.getElementById('player-board');
const enemyBoardDiv = document.getElementById('computer-board');

renderBoard(playerBoardDiv, player.board, true);
renderBoard(enemyBoardDiv, enemy.board);

bindAttackBoard(enemyBoardDiv, (coords) => {
  const result = player.attack(enemy, coords);
  setStatus(`You ${result} at ${coords.join(',')}`);
  renderBoard(enemyBoardDiv, enemy.board);

  if (enemy.board.allSunk()) {
    setStatus('You win!');
    return;
  }

  // Movimiento del bot (simplemente aleatorio)
  let compCoords;
  do {
    compCoords = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
  } while (
    player.board.hits.has(compCoords.join(',')) ||
    player.board.missedShots.has(compCoords.join(','))
  );

  enemy.attack(player, compCoords);
  renderBoard(playerBoardDiv, player.board, true);

  if (player.board.allSunk()) {
    setStatus('Computer wins!');
  }
});
