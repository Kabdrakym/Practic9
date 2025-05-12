const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const averageDisplay = document.getElementById('averageTime');
const timeLeftDisplay = document.getElementById('timeLeft');

let score = 0;
let totalReactionTime = 0;
let startTime;
let gameTimer;
let spawnTimer;
let timeLeft = 30;

function startGame() {
  score = 0;
  totalReactionTime = 0;
  timeLeft = 30;
  scoreDisplay.textContent = '0';
  averageDisplay.textContent = '0';
  timeLeftDisplay.textContent = timeLeft;
  startBtn.style.display = 'none';
  resetBtn.style.display = 'inline-block';

  gameTimer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  spawnButtonRandomly();
}

function endGame() {
  clearInterval(gameTimer);
  clearTimeout(spawnTimer);
  gameArea.innerHTML = '';
  alert(`Игра окончена!\nУспешных нажатий: ${score}\nСреднее время реакции: ${score ? Math.round(totalReactionTime / score) : 0} мс`);
  startBtn.style.display = 'inline-block';
  resetBtn.style.display = 'none';
}

function resetGame() {
  clearInterval(gameTimer);
  clearTimeout(spawnTimer);
  gameArea.innerHTML = '';
  startGame();
}

function spawnButtonRandomly() {
  const delay = Math.floor(Math.random() * 4000) + 1000; // от 1 до 5 сек
  spawnTimer = setTimeout(() => {
    const button = document.createElement('button');
    button.classList.add('reaction-btn');
    button.textContent = 'Жми!';
    
    const maxX = gameArea.clientWidth - 100;
    const maxY = gameArea.clientHeight - 50;
    button.style.left = Math.floor(Math.random() * maxX) + 'px';
    button.style.top = Math.floor(Math.random() * maxY) + 'px';

    startTime = Date.now();

    button.addEventListener('click', () => {
      const reactionTime = Date.now() - startTime;
      totalReactionTime += reactionTime;
      score++;
      scoreDisplay.textContent = score;
      averageDisplay.textContent = Math.round(totalReactionTime / score);
      gameArea.innerHTML = '';
      spawnButtonRandomly();
    });

    gameArea.innerHTML = '';
    gameArea.appendChild(button);
  }, delay);
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
