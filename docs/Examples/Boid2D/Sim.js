
let boids = [];
let velocity = [];
let acceleration = [];

function setup() {
	createCanvas(600, 600);

	for (let i = 0; i < 200; i++) {
		boids[i] = new Vector2(randomRange(0, 600), randomRange(0, 600));
		velocity[i] = new Vector2(randomRange(-1, 1), randomRange(-1, 1));
		acceleration[i] = new Vector2(0, 0);
	}
}

function draw() {
	background(255, 155, 155);

	for (let i = 0; i < boids.length; i++) {
		boids[i].addVect(velocity[i]);
		velocity[i].addVect(acceleration[i]);

		acceleration[i] = new Vector2(0, 0);
		acceleration[i].addVect(flock(boids[i], velocity[i], boids, velocity));
		
		stroke(255);
		strokeWeight(6);
		point(boids[i].x, boids[i].y);

		if (boids[i].x > 600) boids[i].x = 0;
		else if (boids[i].x < 0) boids[i].x = 600;
		if (boids[i].y > 600) boids[i].y = 0;
		else if (boids[i].y < 0) boids[i].y = 600;
	}
}