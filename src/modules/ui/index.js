// src/modules/ui/index.js

export function renderBoard(container, board, isPlayer = false) {
  container.innerHTML = '';
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      const key = `${x},${y}`;

      if (board.hits.has(key)) {
        cell.classList.add('hit');
      } else if (board.missedShots.has(key)) {
        cell.classList.add('miss');
      } else if (isPlayer && board.occupied.has(key)) {
        cell.classList.add('ship');
      }

      container.appendChild(cell);
    }
  }
}

export function bindAttackBoard(container, callback) {
  container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) return;
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    callback([x, y]);
  });
}

export function setStatus(message) {
  const statusDiv = document.getElementById('status');
  if (statusDiv) statusDiv.textContent = message;
}

export function startGame() {
  const playerBoard = document.createElement('div');
  const computerBoard = document.createElement('div');
  const status = document.createElement('div');

  playerBoard.id = 'player-board';
  computerBoard.id = 'computer-board';
  status.id = 'status';

  playerBoard.classList.add('board');
  computerBoard.classList.add('board');

  document.body.appendChild(status);
  document.body.appendChild(playerBoard);
  document.body.appendChild(computerBoard);
}
