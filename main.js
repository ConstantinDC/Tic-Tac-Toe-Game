const board = document.getElementById('board');
const cells = document.getElementsByClassName('cell');
const players = ['X', 'O'];
let currentPlayer = players[0];
const message = document.createElement('h2');
message.textContent = `X turn`;
board.after(message);
message.style.textAlign='center';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

for (let i = 0; i < cells.length; ++i) {
  cells[i].addEventListener('click', () => {
    if (cells[i].textContent !== '' || checkWin(currentPlayer) || checkTie()) {
      return; 
    }
    cells[i].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      message.textContent = `Game over! ${currentPlayer} wins!`;
      return; 
    }
    if (checkTie()) {
      message.textContent = `Game is tied!`;
      return; 
    }
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    if (currentPlayer == players[0]) {
      message.textContent = `X turn`;
    } else {
      message.textContent = `O turn`; 
    }
  });
}

function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombinations.length; ++i) {
    const [a, b, c] = winningCombinations[i];
    if (cells[a].textContent === currentPlayer && cells[b].textContent === currentPlayer && cells[c].textContent === currentPlayer) {
      return true; 
    } 
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < cells.length; ++i) {
    if (cells[i].textContent === '') {
      return false;
    }
  }
  return true; 
}

function restartGame() {
  for (let i = 0; i < cells.length; ++i) {
    cells[i].textContent = ''; 
  }
  message.textContent = `X turn!`;
  currentPlayer = players[0];
}

