
// We need a particle system
// we need a way to define a flow field
// we need a visual representation of the vectors (arrows)
// Look into noise algorithms
// Look into dijkstra's algorithm to see about making some cool paths using flow fields

let arrows = [];
let vectors = [];

function setup() {
	createCanvas(600, 600);

	let offsetX = 10;
	let offsetY = 10;

	for (let i = 0; i < 40; i++) {
		arrows[i] = [];
		vectors[i] = [];
		
		offsetX = 10;

		for (let j = 0; j < 40; j++) {
			arrows[i][j] = new Vector2(offsetX, offsetY);
			offsetX += 20;

			vectors[i][j] = new Vector2(randomRange(-1, 1), randomRange(-1, 1));
		}

		offsetY += 20;
	}
}

function draw() {
	background(235, 155, 155);

	strokeWeight(1);
	stroke(255);
	for (let i = 0; i < arrows.length; i++) {
		for (let j = 0; j < arrows[i].length; j++) {
			let vec = new Vector2(arrows[i][j].x - mouseX, arrows[i][j].y - mouseY);

			//arrow(arrows[i][j].x, arrows[i][j].y, vec.x, vec.y, 20);
			arrow(arrows[i][j].x, arrows[i][j].y, vectors[i][j].x, vectors[i][j].y, 20);
		}
	}
}

function arrow(PosX, PosY, DirX, DirY, mult) {
	let Pos = new Vector2(PosX, PosY);
	let Dir = new Vector2(DirX, DirY);
	let DefMult = 7.5;

	if (mult != null) mult /= 2;

	let S1 = Pos.clone();
	let S2 = Pos.clone();
	let D1 = Dir.clone();

	D1.normalize();
	if (mult == null) D1.mult(DefMult);
	else D1.mult(mult);

	S1.addVect(D1);
	S2.subVect(D1);

	line(S1.x, S1.y, S2.x, S2.y);

	D1.normalize();
	D1.mult(-1);
	let Angle = Math.atan2(D1.y, D1.x);

	let P1 = 0;
	if (mult == null) P1 = new Vector2((DefMult * 0.8) * Math.cos(Angle + 0.3), (DefMult * 0.8) * Math.sin(Angle + 0.3));
	else P1 = new Vector2((mult * 0.8) * Math.cos(Angle + 0.3), (mult * 0.8) * Math.sin(Angle + 0.3));
	P1.addVect(Pos.clone());

	let P2 = 0;
	if (mult == null) P2 = new Vector2((DefMult * 0.8) * Math.cos(Angle - 0.3), (DefMult * 0.8) * Math.sin(Angle - 0.3));
	else P2 = new Vector2((mult * 0.8) * Math.cos(Angle - 0.3), (mult * 0.8) * Math.sin(Angle - 0.3));
	P2.addVect(Pos.clone());

	line(S2.x, S2.y, P1.x, P1.y);
	line(S2.x, S2.y, P2.x, P2.y);
}

function arrowAngle(Pos, Angle, Mult) {
	let DirX = Math.cos(Angle);
	let DirY = Math.sin(Angle);

	arrow(Pos.x, Pos.y, DirX, DirY, Mult);
}

function arrowVector(Pos, Dir, Mult) {
	arrow(Pos.x, Pos.y, Dir.x, Dir.y, Mult);
}