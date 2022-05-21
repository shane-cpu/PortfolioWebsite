
// Going to try out an idea
// Going to set up a grid - Done
// The grid will display a flow field - Done
// The flow field will be generated when the player clicks within the screen - Next
// Eventually want to add the ability to change the terrain to have obstacles

let arrows = [];
let vectors = [];
let costGrid = [];

let xSections = 20;
let ySections = 20;
let offset = 20;

function setup()
{
	let mainCanvas = createCanvas(400, 400);

	document.getElementById("canvasHolder").appendChild(mainCanvas.canvas);

	let offsetX = offset/2;
	let offsetY = offset/2;

	for (let i = 0; i < xSections; i++)
	{
		arrows[i] = [];
		vectors[i] = [];

		for (let j = 0; j < ySections; j++)
		{
			arrows[i][j] = new Vector2(offsetX, offsetY);

			// Going to make this different in a bit
			vectors[i][j] = new Vector2();

			offsetY += offset;
		}

		offsetX += offset;
		offsetY = offset/2;
	}

	generatePathing(new Vector2(1, 10));
}

function draw()
{
	background(235, 155, 155);

	for (let i = 0; i < arrows.length; i++)
	{
		for (let j = 0; j < arrows[i].length; j++)
		{

			// let dir = getDirection(arrows[i][j], new Vector2(width/2, height/2));

			// dir.normalize();

			// vectors[i][j] = dir;

			if (costGrid[i][j] == 0)
			{
				stroke("#fff");
				fill("#fff");
				ellipse(arrows[i][j].x, arrows[i][j].y, 10);
			}
			else
			{
				stroke("#fff");
				strokeWeight(2);
				arrow(arrows[i][j].x, arrows[i][j].y, vectors[i][j].x, vectors[i][j].y, offset);
			}
		}
	}

	// if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)
	// {
	// 	generatePathing(pointToGrid(new Vector2(mouseX, mouseY)));

	// 	console.log("x : " + mouseX + " , y : " + mouseY);
	// }
		
}

function generatePathing(point)
{
	let totalSections = (xSections * ySections);
	let checkedSections = 0;

	costGrid = [];
	let checkingGrid = [];

	for (let i = 0; i < arrows.length; i++)
	{
		costGrid[i] = [];
		checkingGrid[i] = [];

		for (let j = 0; j < arrows[i].length; j++)
		{
			costGrid[i][j] = 0;
			checkingGrid[i][j] = 0;
		}
	}

	// costGrid.forEach((thing) => {
	// 	console.log(thing + "");
	// })

	let startingPoint = point.clone();
	checkingGrid[startingPoint.x][startingPoint.y] = -1;

	let checkingPoints = [startingPoint];

	let layer = 0;

	while (totalSections > checkedSections)
	{
		let nextPoints = [];

		checkingPoints.forEach((thing) => {
			costGrid[thing.x][thing.y] = layer;

			if (thing.x - 1 >= 0)
			{
				if (checkingGrid[thing.x - 1][thing.y] == 0)
				{
					nextPoints.push(new Vector2(thing.x - 1, thing.y));
					checkingGrid[thing.x - 1][thing.y] = -1;
				}
			}

			if (thing.x + 1 < costGrid.length)
			{
				if (checkingGrid[thing.x + 1][thing.y] == 0)
				{
					nextPoints.push(new Vector2(thing.x + 1, thing.y));
					checkingGrid[thing.x + 1][thing.y] = -1;
				}
			}

			if (thing.y - 1 >= 0)
			{
				if (checkingGrid[thing.x][thing.y - 1] == 0)
				{
					nextPoints.push(new Vector2(thing.x, thing.y - 1));
					checkingGrid[thing.x][thing.y - 1] = -1;
				}
			}

			if (thing.y + 1 < costGrid[thing.x].length)
			{
				if (checkingGrid[thing.x][thing.y + 1] == 0)
				{
					nextPoints.push(new Vector2(thing.x, thing.y + 1));
					checkingGrid[thing.x][thing.y + 1] = -1;
				}
			}

			checkedSections++;
		});

		checkingPoints = nextPoints.slice();

		layer++;
	}

	// console.clear();

	// costGrid.forEach((thing) => {
	// 	console.log(thing + "");
	// })

	for (let i = 0; i < arrows.length; i++)
	{
		for (let j = 0; j < arrows[i].length; j++)
		{
			let checkingPoints = [];

			let currentPoint

			if (j - 1 >= 0)
			{
				currentPoint = new Vector2(i, j - 1);
			}

			if (j + 1 < arrows[i].length)
			{
				if (!currentPoint)
				{
					currentPoint = new Vector2(i, j + 1);
				}
				else
				{
					if (costGrid[currentPoint.x][currentPoint.y] > costGrid[i][j + 1])
					{
						currentPoint = new Vector2(i, j + 1);
					}
					else if (costGrid[currentPoint.x][currentPoint.y] == costGrid[i][j + 1])
					{
						currentPoint = (randomInt() == 0) ? currentPoint : new Vector2(i, j + 1);
					}
				}
			}

			if (i - 1 >= 0)
			{
				if (!currentPoint)
				{
					currentPoint = new Vector2(i - 1, j);
				}
				else
				{
					if (costGrid[currentPoint.x][currentPoint.y] > costGrid[i - 1][j])
					{
						currentPoint = new Vector2(i - 1, j);
					}
					else if (costGrid[currentPoint.x][currentPoint.y] == costGrid[i - 1][j])
					{
						currentPoint = (randomInt() == 0) ? currentPoint : new Vector2(i - 1, j);
					}
				}
			}

			if (i + 1 < arrows.length)
			{
				if (!currentPoint)
				{
					currentPoint = new Vector2(i + 1, j);
				}
				else
				{
					if (costGrid[currentPoint.x][currentPoint.y] > costGrid[i + 1][j])
					{
						currentPoint = new Vector2(i + 1, j);
					}
					else if (costGrid[currentPoint.x][currentPoint.y] == costGrid[i + 1][j])
					{
						currentPoint = (randomInt() == 0) ? currentPoint : new Vector2(i + 1, j);
					}
				}
			}

			vectors[i][j] = getDirection(gridToPoint(new Vector2(i, j)), gridToPoint(currentPoint));
		}
	}
}

function mousePressed() {
	if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)
	{
		generatePathing(pointToGrid(new Vector2(mouseX, mouseY)));
	}
}

function getDirection(pos1, pos2)
{
	let direction = Math.atan2(pos2.y-pos1.y, pos2.x-pos1.x);

	let directionVector = new Vector2(Math.cos(direction), Math.sin(direction));

	return directionVector.clone();
}

function getNormalizedDirection(pos1, pos2)
{
	let newPoint = getDirection(pos1, pos2);

	newPoint.normalize();

	return newPoint.clone();
}

function pointToGrid(point) {
	let gridHeight = ySections;
 	let gridWidth = xSections;
 	let h = height;
 	let w = width;

 	let heightIncrement = (h/gridHeight);
 	let widthIncrement = (w/gridWidth);

 	let refPoint = point.clone();
 	
 	let x = floor(refPoint.x / widthIncrement);
 	let y = floor(refPoint.y / heightIncrement);

 	refPoint = new Vector2(x, y);

	return refPoint.clone();
}

function gridToPoint(grid) {
	let gridHeight = ySections;
 	let gridWidth = xSections;
 	let h = height;
 	let w = width;

 	let heightIncrement = (h/gridHeight);
 	let widthIncrement = (w/gridWidth);

 	let refPoint = grid;
 	
 	let x = refPoint.x * widthIncrement;
 	let y = refPoint.y * heightIncrement;

 	refPoint = new Vector2(x, y);

	return refPoint.clone();
}

function randomInt()
{
	let number = Math.random();

	return (number < 0.5) ? Math.floor(number) : Math.ceil(number);
}

function randomIntInRange(min, max)
{
	return Math.floor((Math.random() * (max - min)) + min);
}