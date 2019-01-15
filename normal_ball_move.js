var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // canvas 2d rendering context saved in ctx

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

//paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//paddle control
var rightPressed = false;
var leftPressed = false;

// brick

var brickRowCount = 3;
var brickColumnCount = 5;
var brickHeight = 20;
var brickWidth = 75;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickoffsetLeft = 30;

var bricks = [];

for(var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

var score = 0;

var lives = 3;

//giving the player some lives

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Listening for mouse movement

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;     
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);



//win detection

function checkWin() {
    if(score == brickRowCount * brickColumnCount) {
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
        //clearInterval(draw);
    }
}

// counting the score

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// brick drawing logic 
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

// A collision detection function

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


// key listener function
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
// key listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// moving paddle


//draw function

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius ,0, Math.PI * 2); // x, y is center of circle
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); // ctx closed
}

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
                alert("GAME OVER");
                document.location.reload();
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

function movePaddle() {
    drawPaddle();

    if (rightPressed && (paddleX < canvas.width - paddleWidth)) {
        paddleX += 4;
    } else if (leftPressed &&( paddleX > 0)) {
        paddleX -= 4;
    }
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear every component in this rectangle
    drawBricks();
    moveBall();
    movePaddle();
    collisionDetection();
    drawScore();
    drawLives();
    checkWin();
    requestAnimationFrame(draw);
}

draw();

//setInterval(draw, 10); // when every 10 millsec, this function going to be called
