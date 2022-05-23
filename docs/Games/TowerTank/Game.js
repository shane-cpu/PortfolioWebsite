
// This is a demo for the early version of the pillar game
// Tower Tank is a top down twin stick shooter
// The Tower Tank is a tall tank that shoots towards the mouse
// Around the tower tank are little soldiers that fight enemies around the tank
// The player is a comander of the little ground troops so when all the ground troops die the game is over
// The enemies are little dinosaurs that attack the player

let inputW = false;
let inputA = false;
let inputS = false;
let inputD = false;

let arrows = [];
let vectors = [];
let costGrid = [];

let playSpaceSize
let segmentWidth = 30;
let segmentHeight = 30;

let playerScreenLocation = new Vector2();
let playerGridPrevLocation = new Vector2();
let playerWorldLocation = new Vector2();

let playerSpeed = 1;

let playSpaceScreenLocation = new Vector2();
let playSpaceWorldLocation = new Vector2();

function setup()
{
	let mainCanvas = createCanvas(500, 500);

	document.getElementById("canvasHolder").appendChild(mainCanvas.canvas);

	playSpaceSize = new Vector2(1500, 1500);

	for (let i = 0; i < playSpaceSize.x/segmentWidth; i++)
	{
		
		arrows[i] = [];
		vectors[i] = [];

		for (let j = 0; j < playSpaceSize.y/segmentHeight; j++)
		{
			arrows[i][j] = new Vector2(segmentWidth*i + segmentWidth/2, segmentHeight*j + segmentHeight/2);

			vectors[i][j] = new Vector2(0, 0);
		}
	}

	playerScreenLocation = new Vector2(width/2, height/2);

	let playerWorldToPlaySpacePoint = new Vector2(playerWorldLocation.x + playSpaceSize.x/2, playerWorldLocation.y + playSpaceSize.y/2);
	let playerPlaySpaceToGridPoint = pointToGrid(playerWorldToPlaySpacePoint, playSpaceSize.x/segmentWidth, playSpaceSize.y/segmentHeight, playSpaceSize);
	playerGridPrevLocation = playerPlaySpaceToGridPoint;

	vectors = generateGrid(playerPlaySpaceToGridPoint, arrows, playSpaceSize);
	costGrid = generateCostMap(playerPlaySpaceToGridPoint, arrows);

	playSpaceScreenLocation = new Vector2(width/2 - playerWorldLocation.x, height/2 - playerWorldLocation.y);
}

function draw()
{
	background("#000");

	checkPlayerAction();

	drawPlaySpace();

	drawPlayer()
}

function checkPlayerAction()
{
	let playerMovement = new Vector2();

	if (inputW == true) // Up
	{
		playerMovement.addVect(new Vector2(0, -1));
	}
	if (inputA == true) // Left
	{
		playerMovement.addVect(new Vector2(-1, 0));
	}
	if (inputS == true) // Down
	{
		playerMovement.addVect(new Vector2(0, 1));
	}
	if (inputD == true) // Right
	{
		playerMovement.addVect(new Vector2(1, 0));
	}

	playerMovement.normalize();

	playerMovement.mult(playerSpeed)

	playerWorldLocation.addVect(playerMovement)

	let playerWorldToPlaySpacePoint = new Vector2(playerWorldLocation.x + playSpaceSize.x/2, playerWorldLocation.y + playSpaceSize.y/2);
	let playerPlaySpaceToGridPoint = pointToGrid(playerWorldToPlaySpacePoint, playSpaceSize.x/segmentWidth, playSpaceSize.y/segmentHeight, playSpaceSize);

	if (playerPlaySpaceToGridPoint.x != playerGridPrevLocation.x || playerPlaySpaceToGridPoint.y != playerGridPrevLocation.y || (playerPlaySpaceToGridPoint.x != playerGridPrevLocation.x && playerPlaySpaceToGridPoint.y != playerGridPrevLocation.y))
	{
		vectors = generateGrid(playerPlaySpaceToGridPoint, arrows, playSpaceSize);
		costGrid = generateCostMap(playerPlaySpaceToGridPoint, arrows);

		playerGridPrevLocation = playerPlaySpaceToGridPoint.clone();
	}
}

function drawPlaySpace()
{
	playSpaceScreenLocation = new Vector2(width/2 - playerWorldLocation.x, height/2 - playerWorldLocation.y);

	noStroke();
	fill("#fff");
	rectMode(CENTER);
	rect(playSpaceScreenLocation.x, playSpaceScreenLocation.y, playSpaceSize.x, playSpaceSize.y);

	drawField()
}

function drawPlayer()
{
	noStroke();
	fill("#0f0");
	rectMode(CENTER);
	rect(playerScreenLocation.x, playerScreenLocation.y, 10, 10);
}

function drawField()
{
	for (let i = 0; i < arrows.length; i++)
	{
		for (let j = 0; j < arrows[i].length; j++)
		{
			if (costGrid[i][j] != 0)
			{
				stroke("#000");
				arrow((arrows[i][j].x - playSpaceSize.x/2) + playSpaceScreenLocation.x, (arrows[i][j].y - playSpaceSize.y/2) + playSpaceScreenLocation.y, vectors[i][j].x, vectors[i][j].y, segmentWidth);
			}
		}
	}
}

function keyPressed(event)
{
	if (event.key == "w") // Up
	{
		// move up
		inputW = true;
	}
	else if (event.key == "a") // Left
	{
		// move left
		inputA = true;
	}
	else if (event.key == "s") // Down
	{
		// move down
		inputS = true;
	}
	else if (event.key == "d") // Right
	{
		// move right
		inputD = true;
	}
}

function keyReleased(event)
{
	if (event.key == "w") // Up
	{
		// dont move up
		inputW = false;
	}
	else if (event.key == "a") // Left
	{
		// dont move left
		inputA = false;
	}
	else if (event.key == "s") // Down
	{
		// dont move down
		inputS = false;
	}
	else if (event.key == "d") // Right
	{
		// dont move right
		inputD = false;
	}
}