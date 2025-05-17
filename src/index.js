// src/index.js
import './style/style.css';
import Player from './modules/player/index.js';
import Ship from './modules/ship/index.js';
import { startGame } from './modules/ui/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const player = Player();
  const enemy = Player();

  // Coloca tus barcos usando tu lógica existente
  player.board.placeShip(Ship(2), [0, 0], 'horizontal');
  player.board.placeShip(Ship(3), [2, 2], 'vertical');
  enemy.board.placeShip(Ship(2), [1, 1], 'horizontal');
  enemy.board.placeShip(Ship(3), [4, 5], 'vertical');

  startGame(player, enemy);
});
