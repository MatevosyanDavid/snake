const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scores = document.getElementById('scores');

const ground = new Image();
ground.src = 'img/bg.png';

const mouse = new Image();
mouse.src = 'img/mouse.png';

let dir = '';
let score = 0;
const box = 50;

const showMouse = {
  x: Math.floor(Math.random() * 12 + 1) * box,
  y: Math.floor(Math.random() * 10 + 1) * box,
};

const snake = [
  {
    x: 7 * box,
    y: 5 * box,
  },
];

document.addEventListener('keydown', event => {
  event.preventDefault();

  switch (true) {
    case event.keyCode === 37 && dir !== 'right':
      return (dir = 'left');
    case event.keyCode === 38 && dir !== 'down':
      return (dir = 'up');
    case event.keyCode === 39 && dir !== 'left':
      return (dir = 'right');
    case event.keyCode === 40 && dir !== 'up':
      return (dir = 'down');
    default:
      return;
  }
});

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(gameInterval);
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(mouse, showMouse.x, showMouse.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'blue' : 'green';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === showMouse.x && snakeY === showMouse.y) {
    score++;
    scores.innerHTML = score;
    showMouse.x = Math.floor(Math.random() * 12 + 1) * box;
    showMouse.y = Math.floor(Math.random() * 10 + 1) * box;
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 12 || snakeY < box || snakeY > box * 10) {
    clearInterval(gameInterval);
    alert('you lose');
    window.location.reload();
  }

  switch (dir) {
    case 'left':
      snakeX -= box;
      break;
    case 'right':
      snakeX += box;
      break;
    case 'up':
      snakeY -= box;
      break;
    case 'down':
      snakeY += box;
      break;
    default:
      break;
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

const gameInterval = setInterval(drawGame, 200);
