const NUM_OF_CIRCLES = 10;
const circles = [];
const colors = ['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B', '#D8C9CB', '#96A88E', '#A75037', '#753740', '#DB9C77'];
const RATE = 10;

let previous;
let current;
let isDragging = false;
let isShooting = false;
let frame = 0;

class Circle {
	constructor(x, y, i) {
		this.x = x;
		this.y = y;
		this.r = 30;
		this.color = color(colors[i]);
		this.degree = 0;
		this.frame = 0;
	}

	render() {
		if(this.x < 0 || this.y < 0 || this.x > windowWidth || this.y > windowHeight) {
			return;
		}
		
		noStroke();
		fill(this.color);
		circle(this.x, this.y, this.r);
	}

	reset(x, y) {
		this.x = x;
		this.y = y;
		this.degree = random(-5, 5);
		this.frame = 0;
	}

	updatePosition(dx, dy) {
		// speed = dx / RATE
		const radian = this.degree * Math.PI / 180;
		const sine = Math.sin(radian);
		const cosine = Math.cos(radian);
		
		this.frame = this.frame + 1;
		const rotatedGradient = (sine * dx + cosine * dy) / (cosine * dx - sine * dy);
		this.x = current.x + (dx / RATE) * this.frame;
		this.y = rotatedGradient * (this.x - current.x) + current.y;
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	previous = createVector(0, 0);
	current = createVector(0, 0);
	for(let i = 0 ; i < NUM_OF_CIRCLES ; i++) {
		circles[i] = new Circle(0, 0, i);
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
			circles[i].reset(current.x, current.y);
		}
	}

	if(isShooting) {
		const dx = previous.x - current.x;
		const dy = previous.y - current.y;

		for(let i = 0 ; i < NUM_OF_CIRCLES ; i++) {
			const integer = Math.floor(frame / 5);
			if(i <= integer) {
				circles[i].render();
				circles[i].updatePosition(dx, dy);
			}
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