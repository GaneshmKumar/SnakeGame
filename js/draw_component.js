function drawText(text, x, y, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x, y);
}

function drawRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, start, end, clockwise, color) {
	canvas.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, start, end, clockwise);
	canvasContext.fill();
}