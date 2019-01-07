var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // canvas 2d rendering context saved in ctx

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10 ,0, Math.PI * 2); // x, y is center of circle
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); // ctx closed
}

function moveBall() {
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear every component in this rectangle
    drawBall();
    x += dx;
    y += dy;
}// when this function call, circle will be moved

setInterval(moveBall, 10); // when every 10 millsec, this function going to be called

