
function addEntity(entities, type, loc)
{
	let entity = {
		ID : type,
		Pos : new Vector2(loc.x, loc.y),
		Vel : new Vector2(0, 0),
		Acc : new Vector2(0, 0)
	}
	
	entities.push(entity);

	return entities;
}

function setupGrid(columns, rows)
{
	let array = [];

	for (let x = 0; x < columns; x++)
	{
		array[x] = [];

		for (let y = 0; y < rows; y++)
		{
			array[x][y] = [];
		}
	}

	return array.slice();
}

function displayTile(grid, loc, sizeX, sizeY)
{

	// some display logic that shows the location we are checking.

}

// Unfinished
function queryGrid(grid, loc, canvasX, canvasY, searchX, searchY)
{
	let entities = [];

	// getting the cell size to get the conversion
	let gridCellWidth = canvasX / grid.length;
	let gridCellLength = canvasY / grid[0].length;

	// converting the location to the grid cell coordinates 
	let gridCellX = Math.floor( loc.x / gridCellWidth );
	let gridCellY = Math.floor( loc.y / gridCellLength );

	searchX /= 2;
	searchY /= 2;

	// get the related grid cells
	let cells = [
		{ x : loc.x + searchX, y : loc.y + searchY},
		{ x : loc.x - searchX, y : loc.y + searchY},
		{ x : loc.x + searchX, y : loc.y - searchY},
		{ x : loc.x - searchX, y : loc.y - searchY}
	];

	stroke(255);
	rect(cells[3].x, cells[3].y, searchX * 2, searchY * 2);

	// query the cells for nearby entities


	// put nearby entities in array

	return entities;
}

function updateGrid(grid, entities, canvasX, canvasY)
{





	return grid;
}