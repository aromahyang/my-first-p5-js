let previous;
let current;
let isDragging = false;
let isShooting = false;
let slope;
let speed;

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

		const dx = current.x - previous.x;
		const dy = current.y - previous.y;
		slope = dy / dx;
		speed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 10;
	}

	if (isShooting) {
		noStroke();
		fill('#173F5F');
		circle(current.x, current.y, 30);
		current.x = current.x - speed;
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
