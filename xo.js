const board = document.getElementById("board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const xWinsDisplay = document.getElementById("xWins");
const oWinsDisplay = document.getElementById("oWins");
const vsBotCheckbox = document.getElementById("vsBot");

let cells = [];
let currentPlayer = "X";
let xWins = 0;
let oWins = 0;
let gameOver = false;

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }

  currentPlayer = "X";
  gameOver = false;
  status.textContent = `Ходит: ${currentPlayer}`;
}

function handleMove(index) {
  if (cells[index].textContent !== "" || gameOver) return;

  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `Победил: ${currentPlayer}`;
    if (currentPlayer === "X") {
      xWins++;
      xWinsDisplay.textContent = xWins;
    } else {
      oWins++;
      oWinsDisplay.textContent = oWins;
    }
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell.textContent !== "")) {
    status.textContent = "Ничья!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Ходит: ${currentPlayer}`;

  if (vsBotCheckbox.checked && currentPlayer === "O" && !gameOver) {
    setTimeout(botMove, 500);
  }
}

function botMove() {
  let emptyIndices = cells
    .map((cell, i) => cell.textContent === "" ? i : null)
    .filter(i => i !== null);

  if (emptyIndices.length === 0) return;

  let randomIndex = Math.floor(Math.random() * emptyIndices.length);
  handleMove(emptyIndices[randomIndex]);
}

function checkWinner() {
  const combos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return combos.some(combo => {
    const [a, b, c] = combo;
    return cells[a].textContent &&
           cells[a].textContent === cells[b].textContent &&
           cells[a].textContent === cells[c].textContent;
  });
}

restartBtn.addEventListener("click", createBoard);

createBoard();
