const canvas = document.getElementById('game'),
      btns = document.querySelector('.buttons'),
      btnsItems = btns.querySelectorAll(' button'),
      ctx = canvas.getContext('2d'),
      ground = new Image(),
      foodImg = new Image(),
      foodImg2 = new Image();
      
let colorSnake = 'red';
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

// load audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();


dead.src = 'audio/dead.mp3';
eat.src = 'audio/eat.mp3';
up.src = 'audio/up.mp3';
left.src = 'audio/left.mp3';
right.src = 'audio/right.mp3';
down.src = 'audio/down.mp3';

ground.src = 'img/ground.png';
foodImg.src = 'img/food.png';
foodImg2.src = 'img/orange.png';


let dir;
document.addEventListener('keydown', function(e) {
    if (e.code == 'ArrowLeft' && dir != 'right') {
        dir = 'left';
        left.play();
    } else if (e.code == 'ArrowRight' && dir != 'left') {
        dir = 'right';
        right.play();
    } else if (e.code == 'ArrowUp' && dir != 'down') {
        dir = 'up';
        up.play();
    } else if (e.code == 'ArrowDown' && dir != 'up') {
        dir = 'down';
        down.play();
    }

});


btnsItems.forEach((item, i) => {
    item.addEventListener('click', function(e) {
        if (i === 0 && dir != 'right') {
            dir = 'left';
            left.play();
        } else if (i === 2 && dir != 'left') {
            dir = 'right';
            right.play();
        } else if (i === 3 && dir != 'down') {
            dir = 'up';
            up.play();
        } else if (i === 1 && dir != 'up') {
            dir = 'down';
            down.play();
        }
    });
});

let score = 0;


function renderFullSnake() {
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        // border
        ctx.strokeStyle = colorSnake;
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}


function eatFood(X, Y) {
    if (X == food.x && Y == food.y) {
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        score++;
        eat.play();
        changeSpeed();
        if (Math.floor(Math.random() * 5) === 1 && !Object.keys(food2).length) {
            food2 = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
        }
    } else if (X == food2.x && Y == food2.y) {
        food2 = {};
        score += 2;
        eat.play();
        changeSpeed();
    } else {
        snake.pop();
    }
}


function eatTail(head) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            clearInterval(game);
            dead.play();
            alert('Game Over Eat tail');
            location. reload();
        }
    }
}


function drawGame() {
    ctx.drawImage(ground, 0, 0, fildSize, fildSize);

    ctx.drawImage(foodImg, food.x, food.y, foodSize, foodSize);

    ctx.drawImage(foodImg2, food2.x, food2.y, foodSize, foodSize); 

    // score
    ctx.fillStyle = 'white';
    ctx.font = `${fontSize} Arial`;
    ctx.fillText(score, box * 2.5, box * 1.7);

    // отрисовывание змеи
    renderFullSnake();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // ест еду
    eatFood(snakeX, snakeY);
    
    switch (score) {
        case 5:
            colorSnake = 'blue';
            break;
        case 10:
            colorSnake = 'purple';
            break;
        case 15:
            colorSnake = 'gold';
            break;
        case 20:
            colorSnake = 'black';
            break;
    }

    // gameOver
    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game);
        dead.play();
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

    eatTail(newHead);

    snake.unshift(newHead);
}

let speed = 220;

function changeSpeed() {
    if (score < 5) { // до 5 speed > 180 
        speed -= 6;
        return;
    } else if (score <= 15){ // до 13 speed > 140
        speed -= 3;
        return;
    } else if (score <= 25) { // до 13
        speed -= 2;
        return;
    }
}

const game = setTimeout( function start() {
    drawGame();
    console.log(speed);
    setTimeout(start, speed);
}, speed);



