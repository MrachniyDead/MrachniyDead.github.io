const canvas = document.getElementById('game'),
      btns = document.querySelector('.buttons'),
      btnsItems = btns.querySelectorAll(' button'),
      ctx = canvas.getContext('2d'),
      ground = new Image(),
      foodImg = new Image(),
      foodImg2 = new Image();
      
let colorSnake = 'white';
console.log(btnsItems);
let box = 32;
let fildSize = 608;
let fontSize = '50px';
if (document.documentElement.clientWidth < 608) {
    fildSize = 382;
    box = 20;
    fontSize = '31px';
}
let foodSize = box;

canvas.width = fildSize;
canvas.height = fildSize;
console.log(document.documentElement.clientWidth);

if (document.documentElement.clientWidth > 1000) {
    btns.remove();
}


let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let food2 = {};

const snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

ground.src = 'img/ground.png';
foodImg.src = 'img/food.png';
foodImg2.src = 'img/orange.png';

let dir;
document.addEventListener('keydown', function(e) {
    if (e.code == 'ArrowLeft' && dir != 'right') {
        dir = 'left';
    } else if (e.code == 'ArrowRight' && dir != 'left') {
        dir = 'right';
    } else if (e.code == 'ArrowUp' && dir != 'down') {
        dir = 'up';
    } else if (e.code == 'ArrowDown' && dir != 'up') {
        dir = 'down';
    }

});


btnsItems.forEach((item, i) => {
    item.addEventListener('click', function(e) {
        if (i === 0 && dir != 'right') {
            dir = 'left';
        } else if (i === 2 && dir != 'left') {
            dir = 'right';
        } else if (i === 3 && dir != 'down') {
            dir = 'up';
        } else if (i === 1 && dir != 'up') {
            dir = 'down';
        }
    });
});


function eatTail(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            clearInterval(game);
            alert('Game Over Eat tail');
            location. reload();
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0, fildSize, fildSize);

    ctx.drawImage(foodImg, food.x, food.y, foodSize, foodSize);

    ctx.drawImage(foodImg2, food2.x, food2.y, foodSize, foodSize); 

    // отрисовывание змеи
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : colorSnake;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // score
    ctx.fillStyle = 'white';
    ctx.font = `${fontSize} Arial`;
    ctx.fillText(score, box * 2.5, box * 1.7);


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // ест еду
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        score++;
        if (Math.floor(Math.random() * 5) === 1 && !Object.keys(food2).length) {
            food2 = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
        }
    } else if (snakeX == food2.x && snakeY == food2.y) {
        food2 = {};
        score += 2;
    } else {
        snake.pop();
    }
    
    switch (score) {
        case 5:
            colorSnake = 'red';
            console.log('5');
            break;
        case 10:
            colorSnake = 'purple';
            break;
        case 15:
            colorSnake = 'gold';
            break;
        case 20:
            colorSnake = 'black';
    }

    // gameOver
    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game);
        alert(`Game Over \n You score: ${score}`);
        location. reload();
    }

    // render newHead
    if (dir == 'left') {snakeX -= box;}
    if (dir == 'right') {snakeX += box;}
    if (dir == 'up') {snakeY -= box;}
    if (dir == 'down') {snakeY += box;}

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

const game = setInterval(drawGame, 120);

console.log(Boolean({}));
