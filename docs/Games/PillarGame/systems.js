
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

function displayTile(grid, loc)
{

	// some display logic that shows the location we are checking.

}

function queryGrid(grid, loc)
{
	let entities = [];

	// query for the entities and add them to array.
	// might also neew to change this to make this take in a search area.

	return entities;
}

function updateGrid(grid, entities)
{
	return grid;
}