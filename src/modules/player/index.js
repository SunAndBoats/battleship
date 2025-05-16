import Gameboard from '../gameboard/index.js';

function Player() {
  const board = Gameboard();

  function attack(opponent, coord) {
    return opponent.board.receiveAttack(coord);
  }

  return { board, attack };
}

export default Player;
