export default function Gameboard() {
  const missedShots = new Set();
  const hits = new Set();
  const shipPositions = new Set();
  const ships = [];

  function placeShip(ship, [x, y], direction = 'horizontal') {
    const positions = [];
    for (let i = 0; i < ship.length; i++) {
      const pos = direction === 'horizontal' ? [x + i, y] : [x, y + i];
      positions.push(pos);
      shipPositions.add(`${pos[0]},${pos[1]}`);
    }
    ships.push({ ship, positions });
  }

  function receiveAttack([x, y]) {
    const key = `${x},${y}`;
    for (const { ship, positions } of ships) {
      if (positions.some(([px, py]) => px === x && py === y)) {
        ship.hit();
        hits.add(key);
        return 'hit';
      }
    }
    missedShots.add(key);
    return 'miss';
  }

  function allSunk() {
    return ships.every(({ ship }) => ship.isSunk());
  }

  return {
    placeShip,
    receiveAttack,
    allSunk,
    missedShots,
    hits,
    shipPositions,
  };
}
