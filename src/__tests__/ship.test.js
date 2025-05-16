import Ship from '../modules/ship';

test('Ship tracks hits and reports if sunk', () => {
  const ship = Ship(3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
