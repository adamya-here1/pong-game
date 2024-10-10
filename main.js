// Basic Setup
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sound effects
let paddleSound = new Audio("sounds/paddle_hit.wav");
let scoreSound = new Audio("sounds/score.wav");

// Game objects
let player = new Paddle(0, (canvas.height - 150) / 2, 20, 150, 15);
let ai = new Paddle(canvas.width - 20, (canvas.height - 150) / 2, 20, 150, 5);
let ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 5, 5);

let score = { p: 0, ai: 0 };
const winningScore = 7;
let gameOver = false;

let upPressed = false;
let downPressed = false;

// Event listeners for player paddle control
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") upPressed = true;
  if (e.key === "ArrowDown") downPressed = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") upPressed = false;
  if (e.key === "ArrowDown") downPressed = false;
});

function drawDashedLine(x, y, height, dashLength, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.setLineDash([dashLength, dashLength]);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.stroke();
}

function update() {
  if (gameOver) return;

  // Move player paddle
  if (upPressed) {
    player.move(true);
  }
  if (downPressed) {
    player.move(false);
  }

  // Move AI paddle
  if (ball.y < ai.y + ai.height / 2 && ai.y > 0) {
    ai.move(true);
  }
  if (ball.y > ai.y + ai.height / 2 && ai.y < canvas.height - ai.height) {
    ai.move(false);
  }

  // Update ball position
  ball.update();

  // Ball collision with player paddle
  if (
    ball.x - ball.radius < player.width &&
    ball.y > player.y &&
    ball.y < player.y + player.height
  ) {
    ball.vx = -ball.vx * 1.1;
    ball.vy *= 1.1;
    player.speed *= 1.05;
    paddleSound.play();
  }

  // Ball collision with AI paddle
  if (
    ball.x + ball.radius > ai.x &&
    ball.y > ai.y &&
    ball.y < ai.y + ai.height
  ) {
    ball.vx = -ball.vx * 1.05;
    ball.vy *= 1.05;
    ai.speed *= 1.15;
    paddleSound.play();
  }

  // Update score and reset ball if it goes out of bounds
  if (ball.x + ball.radius > canvas.width) {
    score.p++;
    updateScoreboard();
    checkGameOver();
    ball.reset();
    scoreSound.play();
  }
  if (ball.x - ball.radius < 0) {
    score.ai++;
    updateScoreboard();
    checkGameOver();
    ball.reset();
    scoreSound.play();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  ai.draw();
  ball.draw();
  drawDashedLine(canvas.width / 2, 0, canvas.height, 10, "white");
}

function updateScoreboard() {
  document.getElementById(
    "scoreboard"
  ).innerText = `Player: ${score.p} | AI: ${score.ai}`;
}

function checkGameOver() {
  if (score.p >= winningScore) {
    gameOver = true;
    showEndScreen("Player wins!");
  } else if (score.ai >= winningScore) {
    gameOver = true;
    showEndScreen("AI wins!");
  }
}

function showEndScreen(message) {
  let endScreen = document.getElementById("end-screen");
  endScreen.innerHTML = `${message} <br><button onclick="restartGame()">Play Again</button>`;
  endScreen.style.display = "block";
}

function restartGame() {
  gameOver = false;
  score.p = 0;
  score.ai = 0;
  updateScoreboard();
  ball.reset();
  player.speed = 15;
  ai.speed = 5;
  document.getElementById("end-screen").style.display = "none";
  gameLoop();
}

function gameLoop() {
  update();
  draw();
  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
