import Gameboard from '../gameboard';

function Player() {
  const board = Gameboard();

  function attack(opponent, coord) {
    return opponent.board.receiveAttack(coord);
  }

  return { board, attack };
}

export default Player;
