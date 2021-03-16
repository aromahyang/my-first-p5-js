let previous;
let current;
let isDragging = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
	previous = createVector(0, 0);
	current = createVector(0, 0);
}

function draw() {
	background(255);

	if (isDragging) {
		stroke("#FAD4AE");
		strokeWeight(10);
		line(previous.x, previous.y, mouseX, mouseY);
	}
}

function mousePressed() {
	isDragging = true;
	previous.x = mouseX;
	previous.y = mouseY;
}

function mouseDragged() {
	current.x = mouseX;
	current.y = mouseY;
}

function mouseReleased() {
	isDragging = false;
}
