var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');

var foodX, foodY, eaten = true, direction = 'r', score = 0, gameOver = false, snakeBody = [];

window.onload = function() {
	window.addEventListener('keydown', handleKeyPress);
	initialize();
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
	if(e.keyCode == 13 && gameOver == true)
	{
		gameOver = false;
		score = 0;
		createInitialSnake();
	}
}


function initialize() {
	canvas.width = document.documentElement.clientWidth - 30;
	canvas.height = document.documentElement.clientHeight - 45;

	createInitialSnake();
	setInterval(function() {
		drawAll();
	}, config.speed);
}

function createInitialSnake() {
	var x = 40, y = 40;
	for(var i = 0; i < config.initialSnakeLength; i ++)
	{
		snakeBody.push({x: x, y: y});
		x += 20;
	}
}

function drawAll() {
	drawRect(0, 0, canvas.width, canvas.height, '#1D1F20');
	drawText("Score: " + score, (canvas.width / 2) - 30, 20, '#ffffff');
	if(gameOver)
	{
		drawText('Game Over !!!', (canvas.width / 2) - 50, canvas.height / 2 - 10, '#ffffff');
		drawText('Press ENTER to start a new game', (canvas.width / 2) - 100, canvas.height / 2 + 10, '#ffffff');
		return;
	}
	if(eaten)
	{
		createFood();
	}
	createSnake();	

	drawRect(foodX * 20, foodY * 20, config.foodWidth, config.foodHeight, '#ff4436');
}

function createFood() {
	foodX = Math.floor(Math.random() * 20)
	foodY = Math.floor(Math.random() * 20)
	eaten = false;
}

function createSnake() {
	snakeBody.shift();
	move();
	if(didEat())
	{
		score += 1;
		move();
		createFood();
	}
	var lastBlock = snakeBody[snakeBody.length - 1];
	if(lastBlock.x > canvas.width - config.wallHitAdjust || lastBlock.x < 0 || lastBlock.y > canvas.height - config.wallHitAdjust || lastBlock.y < 0)
	{
		resetGame();
	}
	if(selfDestruct(lastBlock.x, lastBlock.y)) 
	{
		resetGame();
	}
	for(var i = 0; i < snakeBody.length; i ++)
	{
		console.log(`snakeX: ${snakeBody[i].x} snakeY: ${snakeBody[i].y} foodX: ${foodX} foodY: ${foodY}`);
		if(i == snakeBody.length - 1)
		{
			drawRect(snakeBody[i].x, snakeBody[i].y, config.blockLength, config.blockHeight, '#19bd9b');	
		}
		else
		{
			drawRect(snakeBody[i].x, snakeBody[i].y, config.blockLength, config.blockHeight, '#ffffff');		
		}
		
	}
}


function move() {
	var lastBlock = snakeBody[snakeBody.length - 1];
	if(direction == 'l')
	{
		snakeBody.push({x: lastBlock.x - config.blockGap, y: lastBlock.y});
	}
	if(direction == 'r')
	{
		snakeBody.push({x: lastBlock.x + config.blockGap, y: lastBlock.y});	
	}
	if(direction == 't')
	{	
		snakeBody.push({x: lastBlock.x, y: lastBlock.y - config.blockGap});
	}
	if(direction == 'b')
	{
		snakeBody.push({x: lastBlock.x, y: lastBlock.y + config.blockGap});
	}
}

function didEat() {
	var lastBlock = snakeBody[snakeBody.length - 1];
	return (lastBlock.x == foodX * 20 && lastBlock.y == foodY * 20)? true : false;
}

function selfDestruct(x, y) {
    for(var i = 0; i < snakeBody.length - 1; i++) 
    {
        if(snakeBody[i].x === x && snakeBody[i].y === y)
            return true;
    } 
    return false;
}

function resetGame() {
	gameOver = true;
	snakeBody = [];
	direction = 'r';
}