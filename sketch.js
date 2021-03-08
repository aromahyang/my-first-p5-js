const NUM_OF_CIRCLES = 10;
const circles = [];

const colors = ['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B', '#D8C9CB', '#96A88E', '#A75037', '#753740', '#DB9C77'];

let previous;
let current;
let isDragging = false;
let isShooting = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
	previous = createVector(0, 0);
	current = createVector(0, 0);

	// for(let i = 0 ; i < NUM_OF_CIRCLES ; i++) {
	// 	fill(colors[i]);
	// 	stroke(0);
	// 	strokeWeight(4);
	// 	circles[i] = new 
	// }
}

function draw() {
	background(255);

	if(isDragging) {
		stroke("#FAD4AE");
		strokeWeight(10);
		line(previous.x, previous.y, current.x, current.y);
	}

	if(isShooting) {
	}
}

function mousePressed() {
	isDragging = true;
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