

function generateGrid(point, arrows, gridSize)
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

	return vectors.slice();
}

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

function randomInt()
{
	let number = Math.random();

	return (number < 0.5) ? Math.floor(number) : Math.ceil(number);
}