
// We need a particle system
// we need a way to define a flow field
// we need a visual representation of the vectors (arrows)
// Look into noise algorithms

let arrows = [];
let vectors = [];

let pPos = [];
let pVel = [];

let mouseDown = false;

let increment = 0.05;

function setup() {
	let mainCanvas = createCanvas(600, 600);

	document.getElementById("canvasHolder").appendChild(mainCanvas.canvas);

	let offsetX = 10;
	let offsetY = 10;

	
	let noiseY = 1;

	for (let i = 0; i < 40; i++) {
		arrows[i] = [];
		vectors[i] = [];
		
		offsetX = 10;
		let noiseX = 1;
		for (let j = 0; j < 40; j++) {
			arrows[i][j] = new Vector2(offsetX, offsetY);
			offsetX += 20;

			let angle = noise(noiseX, noiseY) * TWO_PI;


			vectors[i][j] = new Vector2(cos(angle), sin(angle));
			noiseX += increment;
		}

		offsetY += 20;
		noiseY += increment;
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

	if (mouseDown) {
		pPos.push(new Vector2(mouseX, mouseY));

		pVel.push(new Vector2(random(-2,2), random(-2,2)));
	}

	for (let i = 0; i < pPos.length; i++) {
		
		pPos[i].addVect(pVel[i]);

		if (pPos[i].x < 0 || pPos[i].x > width || pPos[i].y < 0 || pPos[i].y > height) {
			pPos.splice(i, 1);
			pVel.splice(i, 1);

			i--;
		}
		else {
			let acc = pointToGrid(pPos[i]);
			//arrow(arrows[acc.y][acc.x].x, arrows[acc.y][acc.x].y, vectors[acc.y][acc.x].x, vectors[acc.y][acc.x].y, 20);
			acc = vectors[acc.y][acc.x].clone();

			pVel[i].addVect(acc);
			pVel[i].clamp(-4, 4);

			strokeWeight(7);
			stroke(255);
			point(pPos[i].x, pPos[i].y);
		}
	}

	// if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
	// 	let mPos = pointToGrid(new Vector2(mouseX, mouseY));
	// 	arrow(arrows[mPos.y][mPos.x].x, arrows[mPos.y][mPos.x].y, vectors[mPos.y][mPos.x].x, vectors[mPos.y][mPos.x].y, 100);
	// }
}

function mousePressed() {
	mouseDown = true;
}
 function mouseReleased() {
 	mouseDown = false;
 }

 function pointToGrid(point) {
 	let gridHeight = arrows.length;
 	let gridWidth = arrows[0].length;
 	let h = height;
 	let w = width;

 	let heightIncrement = h/gridHeight + 5;
 	let widthIncrement = w/gridWidth + 5;

 	let refPoint = point.clone();
 	
 	let x = floor(refPoint.x / widthIncrement);
 	let y = floor(refPoint.y / heightIncrement);

 	refPoint = new Vector2(x, y);

 	return refPoint.clone();
 }