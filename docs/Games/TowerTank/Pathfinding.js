

function generateGrid(point, arrows, gridSize)
{
	// Getting the total squares that need paths generated for them.
	let totalSections = (arrows.length * arrows[0].length);
	let checkedSections = 0;

	// These two arrays store the path cost and tile has been checked or now values
	let theMap = [];
	let checkingGrid = [];

	for (let i = 0; i < arrows.length; i++)
	{
		theMap.push([]);
		checkingGrid[i] = [];

		for (let j = 0; j < arrows[i].length; j++)
		{
			theMap[i].push(0);
			checkingGrid[i][j] = 0;
		}
	}

	// Here I'm making sure the square we start on is marked as checked
	let startingPoint = point.clone();
	checkingGrid[startingPoint.x][startingPoint.y] = -1;

	// This is an array full of points I'm checking to see the distance from the desired point 
	let checkingPoints = [startingPoint];

	// This is the number that keeps track of the number off iterations we have gone through
	// It deturmines how many spaces away from the target point each square is
	let layer = 0;

	// While there are more total squares than squares that have been checked
	while (totalSections > checkedSections)
	{
		let nextPoints = [];

		// We look at each point and give it a distance value
		checkingPoints.forEach((thing) => {
			theMap[thing.x][thing.y] = layer;

			// Then grab each of its neighbors to check them next
			if (thing.x - 1 >= 0)
			{
				if (checkingGrid[thing.x - 1][thing.y] == 0)
				{
					nextPoints.push(new Vector2(thing.x - 1, thing.y));
					checkingGrid[thing.x - 1][thing.y] = -1;
				}
			}

			if (thing.x + 1 < theMap.length)
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

			if (thing.y + 1 < theMap[thing.x].length)
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

		// after looking at this layer we move the the next layer
		layer++;
	}

	// Then using that information we make vectors that point to the squares that have less distance to the target than them
	for (let i = 0; i < theMap.length; i++)
	{
		for (let j = 0; j < theMap[i].length; j++)
		{
			let checkingPoints = [];

			let currentPoint

			if (j - 1 >= 0)
			{
				currentPoint = new Vector2(i, j - 1);
			}

			if (j + 1 < theMap[i].length)
			{
				if (!currentPoint)
				{
					currentPoint = new Vector2(i, j + 1);
				}
				else
				{
					if (theMap[currentPoint.x][currentPoint.y] > theMap[i][j + 1])
					{
						currentPoint = new Vector2(i, j + 1);
					}
					else if (theMap[currentPoint.x][currentPoint.y] == theMap[i][j + 1])
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
					if (theMap[currentPoint.x][currentPoint.y] > theMap[i - 1][j])
					{
						currentPoint = new Vector2(i - 1, j);
					}
					else if (theMap[currentPoint.x][currentPoint.y] == theMap[i - 1][j])
					{
						currentPoint = (randomInt() == 0) ? currentPoint : new Vector2(i - 1, j);
					}
				}
			}

			if (i + 1 < theMap.length)
			{
				if (!currentPoint)
				{
					currentPoint = new Vector2(i + 1, j);
				}
				else
				{
					if (theMap[currentPoint.x][currentPoint.y] > theMap[i + 1][j])
					{
						currentPoint = new Vector2(i + 1, j);
					}
					else if (theMap[currentPoint.x][currentPoint.y] == theMap[i + 1][j])
					{
						currentPoint = (randomInt() == 0) ? currentPoint : new Vector2(i + 1, j);
					}
				}
			}

			vectors[i][j] = getDirection(gridToPoint(new Vector2(i, j), theMap.length, theMap[0].length, gridSize), gridToPoint(currentPoint, theMap.length, theMap[0].length, gridSize));
		}
	}

	// And then we return the result
	return vectors.slice();
}

// This is the same as above with the exception os only building the cost map
function generateCostMap(point, arrows)
{
	let totalSections = (arrows.length * arrows[0].length);
	let checkedSections = 0;

	let theMap = [];
	let checkingGrid = [];

	for (let i = 0; i < arrows.length; i++)
	{
		theMap.push([]);
		checkingGrid[i] = [];

		for (let j = 0; j < arrows[i].length; j++)
		{
			theMap[i].push(0);
			checkingGrid[i][j] = 0;
		}
	}

	let startingPoint = point.clone();
	checkingGrid[startingPoint.x][startingPoint.y] = -1;

	let checkingPoints = [startingPoint];

	let layer = 0;

	while (totalSections > checkedSections)
	{
		let nextPoints = [];

		checkingPoints.forEach((thing) => {
			theMap[thing.x][thing.y] = layer;

			if (thing.x - 1 >= 0)
			{
				if (checkingGrid[thing.x - 1][thing.y] == 0)
				{
					nextPoints.push(new Vector2(thing.x - 1, thing.y));
					checkingGrid[thing.x - 1][thing.y] = -1;
				}
			}

			if (thing.x + 1 < theMap.length)
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

			if (thing.y + 1 < theMap[thing.x].length)
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

	return theMap;
}

// This function gets the direction vector from one point to another
function getDirection(pos1, pos2)
{
	let direction = Math.atan2(pos2.y-pos1.y, pos2.x-pos1.x);

	let directionVector = new Vector2(Math.cos(direction), Math.sin(direction));

	return directionVector.clone();
}

// This function returns a normalized version of the result above
function getNormalizedDirection(pos1, pos2)
{
	let newPoint = getDirection(pos1, pos2);

	newPoint.normalize();

	return newPoint.clone();
}

// This translates a point from the world to the grid
function pointToGrid(point, xSections, ySections, gridSize) {
	let gridHeight = ySections;
 	let gridWidth = xSections;
 	let h = gridSize.y;
 	let w = gridSize.x;

 	let heightIncrement = (h/gridHeight);
 	let widthIncrement = (w/gridWidth);

 	let refPoint = point.clone();
 	
 	let x = floor(refPoint.x / widthIncrement);
 	let y = floor(refPoint.y / heightIncrement);

 	refPoint = new Vector2(x, y);

	return refPoint.clone();
}

// This translates a point from the grid to the world
function gridToPoint(grid, xSections, ySections, gridSize) {
	let gridHeight = ySections;
 	let gridWidth = xSections;
 	let h = gridSize.y;
 	let w = gridSize.x;

 	let heightIncrement = (h/gridHeight);
 	let widthIncrement = (w/gridWidth);

 	let refPoint = grid;
 	
 	let x = refPoint.x * widthIncrement;
 	let y = refPoint.y * heightIncrement;

 	refPoint = new Vector2(x, y);

	return refPoint.clone();
}

// This generates a random 0 or 1 number
function randomInt()
{
	let number = Math.random();

	return (number < 0.5) ? Math.floor(number) : Math.ceil(number);
}