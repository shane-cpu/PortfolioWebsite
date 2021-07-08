// This is the demo for one of the projects I plan to make.
// I just more or less want to make a proof of concept for the game.


// We're going to test a few things.
// entity creation
// entity movement
// entity filtering / querying

// the main player character will consist of a few thingss
// first is the main body
// second is the minions
// third is a turret so to speak

// the enemies will come later you can worry about that at a later time.
// first we worry about pathfinding and ganeral charactor movement

let entities = [];
let gameGrid = [];

let up = false;
let left = false;
let down = false;
let right = false;

function setup()
{
	createCanvas(600, 600);

	gameGrid = setupGrid(10, 10);
	
	entities = addEntity( entities, 0, { x : 300, y : 300 } );
	entities = addEntity( entities, 1, { x : 300, y : 300 } );
	entities = addEntity( entities, 1, { x : 300, y : 300 } );
	entities = addEntity( entities, 1, { x : 300, y : 300 } );
}

function draw()
{
	background(0);

	for (let x = 0; x < gameGrid.length; x++)
	{
		for (let y = 0; y < gameGrid[x].length; y++)
		{
			noFill();
			stroke(255);
			rect(x * (600/gameGrid.length) , y * (600/gameGrid[x].length), 600/gameGrid.length, 600/gameGrid[x].length);
		}
	}

	entities.forEach( (entity) => {

		switch (entity.ID)
		{
			case 0:
				entity = playerMovement(entity);

				let bla = queryGrid(gameGrid, entity.Pos, 600, 600, 600/gameGrid.length, 600/gameGrid[0].length);
				break;
			case 1:
				entity = friendlyMovement(entity);
				break;
			case 2:
				break;
		}

		fill(255);
		stroke(0)
		ellipse(entity.Pos.x, entity.Pos.y, 20, 20)
	})
}

function playerMovement(entity)
{
	entity.Pos.addVect(entity.Vel);

	entity.Vel.mult(0.85);

	entity.Acc = new Vector2(((left * -1) + (right * 1)), ((up * -1) + (down * 1)));

	entity.Acc.normalize();

	entity.Vel.addVect(entity.Acc);

	return entity;
}

function friendlyMovement(entity)
{
	

	return entity;
}

function keyPressed()
{
	if (keyCode == "87") // W Up
	{
		up = true;
	}
	if (keyCode == "65") // A Left
	{
		left = true;
	}
	if (keyCode == "83") // S Down
	{
		down = true;
	}
	if (keyCode == "68") // D Right
	{
		right = true;
	}
}

function keyReleased()
{
	if (keyCode == "87") // W Up
	{
		up = false;
	}
	if (keyCode == "65") // A Left
	{
		left = false;
	}
	if (keyCode == "83") // S Down
	{
		down = false;
	}
	if (keyCode == "68") // D Right
	{
		right = false;
	}
}