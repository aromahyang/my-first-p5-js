let previous;
let current;
let isDragging = false;
let isShooting = false;
let slope;
let speed;
let radian;

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
		radian = Math.atan2(dy, dx);
		slope = dy / dx;
		speed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 10;
	}

	if (isShooting) {
		noStroke();
		fill('#173F5F');
		circle(current.x, current.y, 30);
		current.x = current.x - speed * Math.cos(radian);
		current.y = current.y - speed * Math.sin(radian);
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
