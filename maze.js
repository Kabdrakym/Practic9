const maze = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1],
  [1,0,0,1,0,0,0,1,0,1],
  [1,1,0,0,0,1,0,0,2,1],
  [1,1,1,1,1,1,1,1,1,1]
];

let playerPos = { x: 1, y: 1 };
let timer = 0;
let timerInterval;

const mazeContainer = document.getElementById("maze");
const timerDisplay = document.getElementById("timer");
const messageDisplay = document.getElementById("message");

function drawMaze() {
  mazeContainer.innerHTML = "";
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (x === playerPos.x && y === playerPos.y) {
        cell.classList.add("player");
      } else if (maze[y][x] === 1) {
        cell.classList.add("wall");
      } else if (maze[y][x] === 2) {
        cell.classList.add("exit");
      } else {
        cell.classList.add("path");
      }

      mazeContainer.appendChild(cell);
    }
  }
}

function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if (
    newX >= 0 && newX < 10 &&
    newY >= 0 && newY < 10 &&
    maze[newY][newX] !== 1
  ) {
    playerPos.x = newX;
    playerPos.y = newY;
    drawMaze();

    if (maze[newY][newX] === 2) {
      clearInterval(timerInterval);
      messageDisplay.textContent = `Победа! Вы прошли лабиринт за ${timer} секунд.`;
    }
  }
}

function startTimer() {
  timer = 0;
  timerDisplay.textContent = timer;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

function restartGame() {
  playerPos = { x: 1, y: 1 };
  messageDisplay.textContent = "";
  drawMaze();
  startTimer();
}

document.addEventListener("keydown", (e) => {
  if (messageDisplay.textContent !== "") return;

  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
});

restartGame();
