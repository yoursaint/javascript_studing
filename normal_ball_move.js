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

// key listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("Keyup", keyUpHandler, false);

// key listener function
function keydownHandler(e) {
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

// moving paddle


//draw function

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddlex, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStye("#0095DD");
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
    }
}

function moveBall() {
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear every component in this rectangle
    drawBall();
    moveCirclesX();
    moveCirclesY();
}// when this function call, circle will be moved

function draw() {
    moveBall();
}


setInterval(draw, 10); // when every 10 millsec, this function going to be called

