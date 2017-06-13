var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');

var blockLength = 19, blockHeight = 19, blockGap = 20;
var foodWidth = 19, foodHeight = 19;
var run;
var foodX, foodY;
var eaten = true;
var wallHitAdjust = 20;

var direction = 'r', prev = 't';

var score = 0;

var snakeBody = [
	{x: 40, y: 40},
	{x: 60, y: 40},
	{x: 80, y: 40},
	{x: 100, y: 40},
	{x: 120, y: 40},
	{x: 140, y: 40}
];

var initialSnakeBody = snakeBody;

var gameOver = false;
window.onload = function() {
	canvas.width = document.documentElement.clientWidth - 30;
	canvas.height = document.documentElement.clientHeight - 30;
	initialize();
	window.addEventListener('keydown', handleKeyPress);
}

function initialize() {
	//snakeBody = initialSnakeBody;
	run = setInterval(function() {
		drawAll();
	}, 100);
}

function createFood() {
	foodX = Math.floor(Math.random() * 30);
	foodY = Math.floor(Math.random() * 30);
	eaten = false;
}

function handleKeyPress(e) {
	if(e.keyCode == 37 && direction != 'r')
	{
		direction = 'l';
	}
	if(e.keyCode == 38 && direction != 'b')
	{
		direction = 't';
	}
	if(e.keyCode == 39 && direction != 'l')
	{
		direction = 'r'
	}
	if(e.keyCode == 40 && direction != 't')
	{
		direction = 'b';
	}
}

function drawAll() {
	drawRect(0, 0, canvas.width, canvas.height, '#212121');
	if(gameOver)
	{
		drawText('Game Over !!!', (canvas.width / 2) - 50, canvas.height / 2, '#ffffff');
		return;
	}
	if(eaten)
	{
		createFood();
	}
	createSnake();	
	drawRect(foodX * 20, foodY * 20, foodWidth, foodHeight, '#ff4436');
}

function move() {
	var lastBlock = snakeBody[snakeBody.length - 1];
	if(direction == 'l')
	{
		snakeBody.push({x: lastBlock.x - blockGap, y: lastBlock.y});
	}
	if(direction == 'r')
	{
		snakeBody.push({x: lastBlock.x + blockGap, y: lastBlock.y});	
	}
	if(direction == 't')
	{	
		snakeBody.push({x: lastBlock.x, y: lastBlock.y - blockGap});
	}
	if(direction == 'b')
	{
		snakeBody.push({x: lastBlock.x, y: lastBlock.y + blockGap});
	}
}

function createSnake() {
	snakeBody.shift();
	move();
	for(var i = 0; i < snakeBody.length; i ++)
	{
		//alert(`snakeX: ${snakeBody[i].x} snakeY: ${snakeBody[i].y} foodX: ${foodX} foodY: ${foodY}`);
		console.log(`snakeX: ${snakeBody[i].x} snakeY: ${snakeBody[i].y} foodX: ${foodX} foodY: ${foodY}`);
		if(snakeBody[i].x > canvas.width - wallHitAdjust || snakeBody[i].x < 20 || snakeBody[i].y > canvas.height - wallHitAdjust || snakeBody[i].y < 20)
		{
			resetGame();
		}
		if(i == snakeBody.length - 1)
		{
			drawRect(snakeBody[i].x, snakeBody[i].y, blockLength, blockHeight, '#19bd9b');		
		}
		else
		{
			drawRect(snakeBody[i].x, snakeBody[i].y, blockLength, blockHeight, '#ffffff');		
		}
		
	}
}

function drawText(text, x, y, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x, y);
}

function drawRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

function resetGame() {
	gameOver = true;
}