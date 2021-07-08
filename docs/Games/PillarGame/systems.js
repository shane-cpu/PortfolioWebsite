
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

	// get the related grid cells // needs to be reworked to get all the cells in between these points
	let cells = [
		{ x : loc.x + searchX, y : loc.y + searchY},
		{ x : loc.x - searchX, y : loc.y + searchY},
		{ x : loc.x + searchX, y : loc.y - searchY},
		{ x : loc.x - searchX, y : loc.y - searchY}
	];

	stroke(255);
	rect(cells[3].x, cells[3].y, searchX * 2, searchY * 2);

	// query the cells for nearby entities
	for (let cell = 0; cell < cells.length; cell++)
	{
		cells[cell].x = Math.floor( cells[cell].x / gridCellWidth );
		cells[cell].y = Math.floor( cells[cell].y / gridCellWidth );

		// put nearby entities in array
		entities = entities.concat(grid[cells[cell].x][cells[cell].y]);
	}

	return entities;
}

function updateGrid(grid, entities, canvasX, canvasY)
{
	grid = setupGrid(grid.length, grid[0].length);

	// getting the cell size to get the conversion
	let gridCellWidth = canvasX / grid.length;
	let gridCellLength = canvasY / grid[0].length;

	for (let i = 0; i < entities.length; i++)
	{
		// converting the location to the grid cell coordinates 
		let gridCellX = Math.floor( entities[i].Pos.x / gridCellWidth );
		let gridCellY = Math.floor( entities[i].Pos.y / gridCellLength );

		grid[gridCellX][gridCellY].push(entities[i]);
	}

	return grid;
}