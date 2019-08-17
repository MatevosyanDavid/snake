const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scores = document.getElementById('scores');

const ground = new Image();
ground.src = 'img/bg.png';

const mouse = new Image();
mouse.src = 'img/mouse.png';

const box = 50;
let score = 0;

let showMouse = {
  x: Math.floor(Math.random() * 12 + 1) * box,
  y: Math.floor(Math.random() * 10 + 1) * box
}

const snake = [{
  x: 7 * box,
  y: 5 * box
}];

let dir = ''

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const { keyCode } = event;
  if(keyCode == 37 && dir !== 'right') {
    dir = 'left';
  }
  if(keyCode == 38 && dir !== 'down') {
    dir = 'up';
  }
  if(keyCode == 39 && dir !== 'left') {
    dir = 'right';
  }
  if(keyCode == 40 && dir !== 'up') {
    dir = 'down';
  }
});

function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(gameInterval);
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(mouse, showMouse.x, showMouse.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'blue': 'green';
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
  }
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === showMouse.x && snakeY === showMouse.y) {
    score++;
    scores.innerHTML = score;
    showMouse = {
      x: Math.floor(Math.random() * 12 + 1) * box,
      y: Math.floor(Math.random() * 10 + 1) * box
    };
  } else {
    snake.pop()
  }

  if(snakeX  < box || snakeX > box * 12 || snakeY < box || snakeY > box * 10) {
    clearInterval(gameInterval);
  }

  if(dir === 'left') {
    snakeX -= box;
  }
  if(dir === 'right') {
    snakeX += box;
  }
  if(dir === 'up') {
    snakeY -= box;
  }
  if(dir === 'down') {
    snakeY += box;
  }
  const newHead = {
    x: snakeX,
    y: snakeY
  }

  eatTail(newHead, snake)

  snake.unshift(newHead);
}

const gameInterval = setInterval(drawGame, 200);
