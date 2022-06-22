
// This is a demo for the early version of the pillar game
// Tower Tank is a top down twin stick shooter
// The Tower Tank is a tall tank that shoots towards the mouse - Next
// Around the tower tank are little soldiers that fight enemies around the tank - Soon
// The player is a comander of the little ground troops so when all the ground troops die the game is over - Soon
// The enemies are little dinosaurs that attack the player - Next
// The enemies use a flow field to chase the player - Soon

// These are the current buttons the player is pressing
let inputs = [];

// These three are important arrays for the flow field path finding
let arrows = []; // Where the arrows are placed on the grid
let vectors = []; // What directions the arrows are pointing towards
let costGrid = []; // The path length of each square on the grid map

let playSpaceSize // The total play space size

// The width and height of the arrow sections
let segmentWidth = 30;
let segmentHeight = 30;

// The place the player sits on the screen
let playerScreenLocation = new Vector2();

// The place the player currently is in the grid
let playerGridPrevLocation = new Vector2();

// The place the player currently is in the world
let playerWorldLocation = new Vector2();

// The player's movement speed
let playerSpeed = 3;


// The place this piece of the world is sitting on the screen
let playSpaceScreenLocation = new Vector2();

// The place this piece of the world is sitting in the world
let playSpaceWorldLocation = new Vector2();

let enemies = [];
let enemySpawnDelay = 10;
let enemySpawnTimer = 0;

function setup()
{
	// This is setting up the canvas to appear in a specific place once it has started
	let mainCanvas = createCanvas(500, 500);

	document.getElementById("canvasHolder").appendChild(mainCanvas.canvas);

	// This is the total size of the play space for this demo
	playSpaceSize = new Vector2(1500, 1500);

	// Here I'm filling up the arrows and vector arrays with enough vectors to fill the map
	for (let i = 0; i < playSpaceSize.x/segmentWidth; i++)
	{
		arrows[i] = [];
		vectors[i] = [];

		for (let j = 0; j < playSpaceSize.y/segmentHeight; j++)
		{
			// This is where the actual vectors are in the map
			arrows[i][j] = new Vector2(segmentWidth*i + segmentWidth/2, segmentHeight*j + segmentHeight/2);

			vectors[i][j] = new Vector2(0, 0);
		}
	}

	// Setting the location for the player on the screen to be the center
	playerScreenLocation = new Vector2(width/2, height/2);

	// This is finding where the player is in the play space
	let playerWorldToPlaySpacePoint = new Vector2(playerWorldLocation.x + playSpaceSize.x/2, playerWorldLocation.y + playSpaceSize.y/2);

	// This is finding where the player's play space location in the grid
	let playerPlaySpaceToGridPoint = pointToGrid(playerWorldToPlaySpacePoint, playSpaceSize.x/segmentWidth, playSpaceSize.y/segmentHeight, playSpaceSize);
	
	// This is setting up the location the enemies will try to pathfind towards
	playerGridPrevLocation = playerPlaySpaceToGridPoint;

	// Here's where I get the actual vector grid for enemy pathfinding
	vectors = generateGrid(playerPlaySpaceToGridPoint, arrows, playSpaceSize);

	// This is the cost grid but only for a visual I'm testing at the moment
	costGrid = generateCostMap(playerPlaySpaceToGridPoint, arrows);


	// This is the location that the play space is in on the screen
	playSpaceScreenLocation = new Vector2(width/2 - playerWorldLocation.x, height/2 - playerWorldLocation.y);
}

function draw()
{
	background("#000");

	checkPlayerAction();

	drawPlaySpace();

	enemyLoop();

	drawPlayer()
}

function enemyLoop()
{
	enemySpawnTimer++;

	if (enemySpawnTimer >= enemySpawnDelay)
	{
		let enemyGridPosition = new Vector2(randomIntInRange(0, arrows.length), randomIntInRange(0, arrows[0].length));
		// let enemyGridPosition = new Vector2(0, 0);
		let enemyWorldPosition = gridToPoint(enemyGridPosition, arrows.length, arrows[0].length, playSpaceSize);

		enemies.push(makeEnemy(enemyWorldPosition, 10));

		enemySpawnTimer = 0;
	}

	if (enemies.length > 0)
	{
		for (let i = 0; i < enemies.length; i++)
		{
			let enemyGridPosition = pointToGrid(enemies[i].worldPos, arrows.length, arrows[0].length, playSpaceSize);

			let movementVector = vectors[enemyGridPosition.x][enemyGridPosition.y];

			changeVelocity(enemies[i], movementVector);
			moveEnemy(enemies[i], deltaTime);

			let worldPosClone = enemies[i].worldPos.clone();

			let modifiedWorldPos = new Vector2(worldPosClone.x - playSpaceSize.x/2, worldPosClone.y - playSpaceSize.y/2);
			let enemyScreenPosition = worldToScreenSpace(modifiedWorldPos);

			if (enemyGridPosition.x == playerGridPrevLocation.x && enemyGridPosition.y == playerGridPrevLocation.y)
			{
				enemies.splice(i, 1);

				i--;
			}
			else
			{
				drawEnemy(enemies[i], enemyScreenPosition);
			}
		}
	}
}

function drawPlaySpace()
{
	// This draws the background
	playSpaceScreenLocation = worldToScreenSpace(new Vector2(0, 0));


	noStroke();
	fill("#fff");
	rectMode(CENTER);
	rect(playSpaceScreenLocation.x, playSpaceScreenLocation.y, playSpaceSize.x, playSpaceSize.y);

	drawField()
}

function drawPlayer()
{
	// This draws the player's green square
	noStroke();
	fill("#0f0");
	rectMode(CENTER);
	rect(playerScreenLocation.x, playerScreenLocation.y, 10, 10);
}

function drawField()
{
	// This draws the flow field on top of the background
	for (let i = 0; i < arrows.length; i++)
	{
		for (let j = 0; j < arrows[i].length; j++)
		{
			if (costGrid[i][j] != 0)
			{
				stroke("#000");

				let arrowPos = worldToScreenSpace(new Vector2((arrows[i][j].x - playSpaceSize.x/2), (arrows[i][j].y - playSpaceSize.y/2)))

				arrow(arrowPos.x,  arrowPos.y, vectors[i][j].x, vectors[i][j].y, segmentWidth);
			}
		}
	}
}

function checkPlayerAction()
{
	// Starting with an empty vector
	let playerMovement = new Vector2();

	// Then we change the vector when the player inputs very specific keys
	if (inputs.includes("w") || inputs.includes("ArrowUp")) // Up
	{
		playerMovement.addVect(new Vector2(0, -1));
	}
	if (inputs.includes("a") || inputs.includes("ArrowLeft")) // Left
	{
		playerMovement.addVect(new Vector2(-1, 0));
	}
	if (inputs.includes("s") || inputs.includes("ArrowDown")) // Down
	{
		playerMovement.addVect(new Vector2(0, 1));
	}
	if (inputs.includes("d") || inputs.includes("ArrowRight")) // Right
	{
		playerMovement.addVect(new Vector2(1, 0));
	}

	// Then we turn it into a unit vector
	playerMovement.normalize();

	// Apply the speed to the direction
	playerMovement.mult(playerSpeed)

	// Change the world location of the player
	playerWorldLocation.addVect(playerMovement)

	// Then we check to see if the player has moved far enough to were the enemies have to recalculate their paths
	let playerWorldToPlaySpacePoint = new Vector2(playerWorldLocation.x + playSpaceSize.x/2, playerWorldLocation.y + playSpaceSize.y/2);
	let playerPlaySpaceToGridPoint = pointToGrid(playerWorldToPlaySpacePoint, playSpaceSize.x/segmentWidth, playSpaceSize.y/segmentHeight, playSpaceSize);

	if (playerPlaySpaceToGridPoint.x != playerGridPrevLocation.x || playerPlaySpaceToGridPoint.y != playerGridPrevLocation.y || (playerPlaySpaceToGridPoint.x != playerGridPrevLocation.x && playerPlaySpaceToGridPoint.y != playerGridPrevLocation.y))
	{
		// If the player's position is different enough we update all the pathfinding variables
		vectors = generateGrid(playerPlaySpaceToGridPoint, arrows, playSpaceSize);
		costGrid = generateCostMap(playerPlaySpaceToGridPoint, arrows);

		playerGridPrevLocation = playerPlaySpaceToGridPoint.clone();
	}
}

function keyPressed(event)
{
	// On any key pressed the key's event is stored
	inputs.push(event.key);
}

function keyReleased(event)
{
	// When they are no longer pressed the key's event is no longer stored
	if (inputs.includes(event.key))
	{
		inputs.splice(inputs.indexOf(event.key), 1);
	}
}

function worldToScreenSpace(pos)
{
	let worldPos = pos.clone()

	let screenPos = new Vector2(width/2 + pos.x - playerWorldLocation.x, height/2 + pos.y - playerWorldLocation.y);

	return screenPos
}