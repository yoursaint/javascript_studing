// 1. Variables
// 1. 1. Canvas 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // canvas 2d rendering context saved in ctx

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// 1. 2. paddle 
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// 1. 3. bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickHeight = 20;
var brickWidth = 75;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickoffsetLeft = 30;

var bricks = [];

// 1. 4. Key Control
var rightPressed = false;
var leftPressed = false;

// 1. 5. Score
var score = 0;

// 1. 6. Lives
var lives = 3;

// 2. EventListener
// 2. 1. Key listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// 2. 2. Mouse listener
document.addEventListener("mousemove", mouseMoveHandler, false);

// 3. Execute functions or interval
initializeArrayBricks();
draw();
var detectionInterval = setInterval(detection, 10);

// 4. Functions
// 4. 1. Initialize Variable 
function initializeArrayBricks() {
    for(var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for(var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1};
        }
    }
}

// 4. 2. Handler
// 4. 2. 1. key listener function
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode = 37) {
        leftPressed = false;
    }
}

// 4. 2. 2. Listening for mouse movement
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;     
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

// 4. 3. Move 
// 4. 3. 1. Move paddle
function movePaddle() {
    drawPaddle();

    if (rightPressed && (paddleX < canvas.width - paddleWidth)) {
        paddleX += 4;
    } else if (leftPressed &&( paddleX > 0)) {
        paddleX -= 4;
    }
}

// 4. 3. 2 Move ball
function moveCirclesX() {
    x += dx;

    if (x > (canvas.width - ballRadius) || x< ballRadius) {
        dx = -dx;
    } 
}

function moveCirclesY() {
    y += dy;

    if (y > (canvas.height - ballRadius) || y < ballRadius) {
        dy = - dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if(paddleX < x + dx && x + dx < paddleX + paddleWidth ) { 
            //bounce!
        } else {
            lives--;
            if(!lives) {
                end("GAME OVER");
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
}

function moveBall() {
    drawBall();
    moveCirclesX();
    moveCirclesY();
}// when this function call, circle will be moved

// 4. 4. Draw
// 4. 4. 1. Panel
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// 4. 4. 2. Paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// 4. 4. 3. Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius ,0, Math.PI * 2); // x, y is center of circle
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); // ctx closed
}

// 4. 4. 4. Bricks
function drawBricks() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth + brickPadding)) + brickoffsetLeft;
                var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear every component in this rectangle
    drawBricks();
    moveBall();
    movePaddle();
    drawScore();
    drawLives();
    requestAnimationFrame(draw);
}

function detection() {
    collisionDetection();
    checkWin();
}

// 4. 5 Detection
// 4. 5. 1. Collision
function collisionDetection() {
    for(var c= 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }
            }
        }
    }
}

// 4. 5. 2 Win
function checkWin() {
    if(score == brickRowCount * brickColumnCount) {
        end("YOU WIN, CONGRATULATIONS!");
    }
}

// 4. 6. End
function end(string_msg) {
    alert(string_msg);
    clearInterval(detectionInterval);
    document.location.reload();
    document.location.reload();
}