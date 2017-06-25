function drawText(text, x, y, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x, y);
}

function drawRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}
