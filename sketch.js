const NUM_OF_CIRCLES = 10;
const circles = [];
const colors = ['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B', '#D8C9CB', '#96A88E', '#A75037', '#753740', '#DB9C77'];

let previous;
let current;
let isDragging = false;
let isShooting = false;
let frame = 0;

class Circle {
	constructor(x, y, i, d) {
		this.x = x;
		this.y = y;
		this.r = 30;
		this.color = color(colors[i]);
		this.degree = d;
		this.speed = 0;
	}

	render() {
		if(this.x + this.r / 2 > windowWidth || this.y + this.r / 2 > windowHeight) {
			return;
		}
		
		noStroke();
		fill(this.color);
		circle(this.x, this.y, this.r);
	}

	updatePosition(dx, dy) {
		this.x = previous.x + (dx / 10) * frame;
		this.y = (dy / dx) * this.x + (previous.y - previous.x * dy / dx);
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	previous = createVector(0, 0);
	current = createVector(0, 0);
	for(let i = 0 ; i < NUM_OF_CIRCLES ; i++) {
		circles[i] = new Circle(0, 0, i, random(-10, 10));
	}
}

function draw() {
	background(255);

	if(isDragging) {
		frame = 0;
		stroke("#FAD4AE");
		strokeWeight(10);
		line(previous.x, previous.y, current.x, current.y);
		for(let i = 0 ; i < NUM_OF_CIRCLES ; i++) {
			circles[i].x = previous.x;
			circles[i].y = previous.y;
		}
	}

	if(isShooting) {
		const dx = current.x - previous.x;
		const dy = current.y - previous.y;

		for(let i = 0 ; i < NUM_OF_CIRCLES ; i++) {
			circles[i].updatePosition(dx, dy);
			circles[i].render();
		}
		frame += 1;
	}
}

function mousePressed() {
	isDragging = true;
	isShooting = false;
	previous.x = mouseX;
	previous.y = mouseY;
	current.x = mouseX;
	current.y = mouseY;
}

function mouseDragged() {
	current.x = mouseX;
	current.y = mouseY;
}

function mouseReleased() {
	isDragging = false;
	isShooting = true;
	current.x = mouseX;
	current.y = mouseY;
}