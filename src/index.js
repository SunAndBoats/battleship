import Player from './modules/player/index.js';

const player = Player();
const enemy = Player();

enemy.board.placeShip(
  { hit: () => {}, length: 1, isSunk: () => false },
  [0, 0]
);
console.log(player.attack(enemy, [0, 0])); // 'hit'
