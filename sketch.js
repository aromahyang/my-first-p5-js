const NUMBER_OF_BALLS = 10;
const balls = [];

let previous;
let current;
let isDragging = false;
let isShooting = false;

class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.d = 30;
		this.color = `rgb(${floor(random(255))},${floor(random(255))},${floor(random(255))})`;
		this.speed = 0;
		this.degree = 0;
	}

	setProperties(x, y, s, d) {
		this.x = x;
		this.y = y;
		this.speed = s;
		this.degree = d;
	}

	updatePosition() {
		const radian = Math.atan2((current.y - previous.y), (current.x - previous.x));
		const newRadian = radian + (this.degree * Math.PI / 180);
		const sine = Math.sin(newRadian);
		const cosine = Math.cos(newRadian);

		this.x = this.x - this.speed * cosine;
		this.y = this.y - this.speed * sine;
	}

	render() {
		fill(this.color);
		noStroke();
		circle(this.x, this.y, this.d);
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	previous = createVector(0, 0);
	current = createVector(0, 0);
	for(let i = 0 ; i < NUMBER_OF_BALLS ; i++) {
		balls[i] = new Ball(0, 0);
	}
}

function draw() {
	background(255);

	if (isDragging) {
		stroke("#FAD4AE");
		strokeWeight(10);
		line(previous.x, previous.y, mouseX, mouseY);

		const dx = current.x - previous.x;
		const dy = current.y - previous.y;
		const speed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 10;
		for(let i = 0 ; i < NUMBER_OF_BALLS ; i++) {
			balls[i].setProperties(current.x, current.y, speed, random(-5, 5));
		}
	}

	if (isShooting) {
		for(let i = 0 ; i < NUMBER_OF_BALLS ; i++) {
			balls[i].render();
			balls[i].updatePosition();
		}
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
