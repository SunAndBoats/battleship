import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

test('places ship and receives hits/misses correctly', () => {
  const board = Gameboard();
  board.placeShip(Ship(2), [0, 0], 'horizontal');

  expect(board.receiveAttack([0, 0])).toBe('hit');
  expect(board.receiveAttack([1, 0])).toBe('hit');
  expect(board.receiveAttack([2, 0])).toBe('miss');
});

test('reports if all ships are sunk', () => {
  const board = Gameboard();
  board.placeShip(Ship(1), [0, 0]);
  board.receiveAttack([0, 0]);
  expect(board.allSunk()).toBe(true);
});
