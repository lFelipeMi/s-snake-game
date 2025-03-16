const canvas = document.querySelector("[snake]");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
    { x: 210, y: 210 }
];

let direction, loopId;

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

const snakeGame = () => {
    clearInterval(loopId);
    ctx.clearRect(0, 0, 600, 600);

    drawSnake();
    moveSnake();

    loopId = setTimeout(() => {
        snakeGame();
    }, 100);
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