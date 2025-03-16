const canvas = document.querySelector("[snake]");
const ctx = canvas.getContext("2d");

const audio = new Audio("../midia/audio.mp3");

const size = 30;

const snake = [
    { x: 210, y: 210 },
    { x: 240, y: 210 },
    { x: 270, y: 210 },
    { x: 300, y: 210 },
    { x: 330, y: 210 },
    { x: 360, y: 210 }
];

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const randomPosition = (min, max) => {
    const number = randomNumber(0, (canvas.width - size) / size);
    return number * 30;
};

const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
};

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
};

let direction, loopId;

const drawFood = () => {

    const { x, y, color } = food

    ctx.shadowColor = color;
    ctx.shadowBlur = 4;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd";

    snake.forEach((position, index) => {

        if (index === snake.length - 1){
            ctx.fillStyle = "white";
        };

        ctx.fillRect(position.x, position.y, size, size);
    });
};

const moveSnake = () => {
    if(!direction) return;

    const head = snake.at(-1);

    if (direction === "right") {
        snake.push({ x: head.x + size, y: head.y})
    }

    if (direction === "left") {
        snake.push({ x: head.x - size, y: head.y})
    }

    if (direction === "up") {
        snake.push({ x: head.x, y: head.y - size})
    }

    if (direction === "down") {
        snake.push({ x: head.x, y: head.y + size})
    }

    snake.shift()
};

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "var(--cor-fundo)";

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }
}

const checkEat = () => {
    const head = snake.at(-1);
    
    if(head.x === food.x && head.y === food.y){
        snake.push(head);
        audio.play();
        /*food.x = randomPosition();
        food.y = randomPosition();
        food.color = randomColor();*/

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position) => position.x === x && position.y === y)){
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x;
        food.y = y;
        food.color = randomColor();
    }

}

const checkCollision = () => {
    const head = snake.at(-1);
    const canvaLimit = canvas.width - size;

    const wallCollision = 
        head.x < 0 || head.x > canvaLimit || head.y < 0 || head.y > canvaLimit;

    const selfCollision = snake.find(({ x, y }, index) => {
        return (index < snake.length - 2) && x === head.x && y === head.y;
    })

    if (wallCollision || selfCollision) {
        gameOver();
        alert("você perdeu");
    }
}

const gameOver = () => {
    direction = null;
}

const snakeGame = () => {
    clearInterval(loopId);
    ctx.clearRect(0, 0, 600, 600);

    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();
    // a ordem dos fatores altera o resultado hahaahahaa

    loopId = setTimeout(() => {
        snakeGame();
    }, 200);
};

snakeGame();

document.addEventListener("keydown", ({ key }) => {
    if (key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }

    if (key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }

    if (key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }

    if (key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
})