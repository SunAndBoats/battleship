// src/modules/ui/index.js

export function renderBoard(container, board, revealShips = false) {
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.classList.add('board');
  container.appendChild(grid);

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
      } else if (revealShips && board.shipPositions.has(key)) {
        cell.classList.add('ship');
      }

      grid.appendChild(cell);
    }
  }
}
/*
export function bindAttackBoard(container, onAttack) {
  container.querySelector('.board').addEventListener('click', (e) => {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;
    if (cell.classList.contains('hit') || cell.classList.contains('miss'))
      return;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    onAttack([x, y]);
  });
}
*/
export function bindAttackBoard(container, onAttack) {
  // Listener en el container: sobrevive a los rerenders de los hijos
  container.addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell || !container.contains(cell)) return;

    // Evita re-atacar celdas ya marcadas
    if (cell.classList.contains('hit') || cell.classList.contains('miss'))
      return;

    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    onAttack([x, y]);
  });
}

export function setStatus(text) {
  const statusDiv = document.getElementById('status');
  if (statusDiv) statusDiv.textContent = text;
}

export function startGame(player, enemy) {
  const playerContainer = document.getElementById('player-board');
  const computerContainer = document.getElementById('computer-board');

  // Initial render
  renderBoard(playerContainer, player.board, true);
  renderBoard(computerContainer, enemy.board, false);
  setStatus('Your turn: click on the enemy board to attack.');

  // Bind clicks
  bindAttackBoard(computerContainer, (coords) => {
    const result = player.attack(enemy, coords);
    setStatus(`You ${result} at (${coords.join(',')})`);
    renderBoard(computerContainer, enemy.board, false);

    if (enemy.board.allSunk()) {
      setStatus('You win! 🎉');
      disableBoard(computerContainer);
      return;
    }

    // Computer's turn
    const playerContainerUI = playerContainer;
    setTimeout(() => {
      let compCoords;
      do {
        compCoords = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ];
      } while (
        player.board.hits.has(compCoords.join(',')) ||
        player.board.missedShots.has(compCoords.join(','))
      );
      const compResult = enemy.attack(player, compCoords);
      setStatus(`Computer ${compResult} at (${compCoords.join(',')})`);
      renderBoard(playerContainerUI, player.board, true);

      if (player.board.allSunk()) {
        setStatus('Computer wins! 💥');
        disableBoard(computerContainer);
      }
    }, 500);
  });
}

function disableBoard(container) {
  container
    .querySelectorAll('.cell')
    .forEach((c) => c.classList.add('disabled'));
}
