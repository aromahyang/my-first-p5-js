let previous;
let current;
let isDragging = false;
let isShooting = false;
let slope;

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
		slope = (current.y - previous.y) / (current.x - previous.x);
	}

	if (isShooting) {
		noStroke();
		fill('#173F5F');
		circle(current.x, current.y, 30);
		current.x = current.x - 1;
		current.y = slope * current.x + (previous.y - slope * previous.x);
	}
}

function mousePressed() {
	isDragging = true;
	isShooting = false;
	previous.x = mouseX;
	previous.y = mouseY;
}

function mouseDragged() {
	current.x = mouseX;
	current.y = mouseY;
}

function mouseReleased() {
	isDragging = false;
	isShooting = true;
}
