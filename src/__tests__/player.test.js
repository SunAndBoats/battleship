import Player from '../modules/player';

test('Player can attack another player', () => {
  const p1 = Player();
  const p2 = Player();
  p2.board.placeShip(
    { hit: jest.fn(), length: 1, isSunk: () => false },
    [0, 0]
  );

  const result = p1.attack(p2, [0, 0]);
  expect(result).toBe('hit');
});
