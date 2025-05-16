function Gameboard() {
  const board = {};
  const missed = [];
  const ships = [];

  function placeShip(ship, [x, y], dir = 'horizontal') {
    ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      const pos = dir === 'horizontal' ? [x + i, y] : [x, y + i];
      board[pos.toString()] = ship;
    }
  }

  function receiveAttack([x, y]) {
    const key = [x, y].toString();
    const target = board[key];
    if (target) {
      target.hit();
      return 'hit';
    } else {
      missed.push(key);
      return 'miss';
    }
  }

  function allSunk() {
    return ships.every((s) => s.isSunk());
  }

  return { placeShip, receiveAttack, allSunk, missed };
}

export default Gameboard;
