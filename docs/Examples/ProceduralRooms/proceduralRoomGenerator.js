// This is a simple project to learn what would and would not work when generating a procedural level

// The goal is for it to be grid based
// and for it to follow a few simple rules

// 1. rooms can be attached to multiple other rooms
// 2. special rooms are only connected to a simgle regular room
// 3. secret rooms can be connected to a special room and a regular room
// 4. secret rooms can't be attached to the same room as other secret rooms
// 5. there is one starting room.

// We'll tweak these rules as we go to make things more specific and interesting.

let canvisSize = 660;

// define the level itself
let level = [];

// define room scale
let roomSize = 15;

// set up the generation
function setup()
{
	createCanvas(canvisSize, canvisSize);
	background(0);
	generateLevel();
}

function generateLevel()
{
	background(0);


	// create 2D array
	for (let i = 0; i < canvisSize/roomSize; i++)
	{
		level[i] = [];
		for (let j = 0; j < canvisSize/roomSize; j++)
		{
			level[i][j] = 0;
		}
	}


	// define start point
	let startPoint = {
		x: Math.floor(canvisSize/roomSize/2),
		y: Math.floor(canvisSize/roomSize/2),
	};


	// here's the rooms array
	let levelCopy = level.slice();
	levelCopy[startPoint.x][startPoint.y] = 2;


	// the basic variables for finsing new rooms
	let totalRooms = 100;
	let totalSpecialRooms = 20;
	let roomCount = 0;
	let specialRoomCount = 0;
	let availableSpaces = [];
	let rooms = [];

	rooms.push(startPoint);

	// here's when we're setting up the rooms
	while (roomCount < totalRooms)
	{
		availableSpaces = [];

		if (roomCount == 0)
		{
			let checkingRooms = [];

			if (startPoint.x + 1 < levelCopy.length    && levelCopy[startPoint.x + 1][startPoint.y] == 0) availableSpaces.push({x: startPoint.x + 1, y: startPoint.y});
			if (startPoint.x - 1 > 0                   && levelCopy[startPoint.x - 1][startPoint.y] == 0) availableSpaces.push({x: startPoint.x - 1, y: startPoint.y});
			if (startPoint.y + 1 < levelCopy[0].length && levelCopy[startPoint.x][startPoint.y + 1] == 0) availableSpaces.push({x: startPoint.x, y: startPoint.y + 1});
			if (startPoint.y - 1 > 0                   && levelCopy[startPoint.x][startPoint.y - 1] == 0) availableSpaces.push({x: startPoint.x, y: startPoint.y - 1});


			let firstRoom = randomIntInRange(0, availableSpaces.length)
			checkingRooms.push(availableSpaces[firstRoom]);
			availableSpaces.splice(firstRoom, 1);

			let secondRoom = randomIntInRange(0, availableSpaces.length)
			checkingRooms.push(availableSpaces[secondRoom]);

			levelCopy[checkingRooms[0].x][checkingRooms[0].y] = 1;
			levelCopy[checkingRooms[1].x][checkingRooms[1].y] = 1;

			rooms.push(checkingRooms[0]);
			rooms.push(checkingRooms[1]);
		}
		else
		{
			for (let i = 0; i < rooms.length; i++)
			{
				availableSpaces = findClearRoomSpace(rooms[i], levelCopy, availableSpaces);
			}

			let checkingRooms = [];

			let firstRoom = randomIntInRange(0, availableSpaces.length);
			checkingRooms.push(availableSpaces[firstRoom]);
			availableSpaces.splice(firstRoom, 1);

			let secondRoom = randomIntInRange(0, availableSpaces.length);
			checkingRooms.push(availableSpaces[secondRoom]);

			levelCopy[checkingRooms[0].x][checkingRooms[0].y] = 1;
			levelCopy[checkingRooms[1].x][checkingRooms[1].y] = 1;

			rooms.push(checkingRooms[0]);
			rooms.push(checkingRooms[1]);
		}

		roomCount++;
	}

	while(specialRoomCount < totalSpecialRooms)
	{
		let availableRooms = [];

		for (let i = 0; i < rooms.length; i++)
		{
			availableRooms = findSpecialRooms(rooms[i], levelCopy, availableRooms);
		}

		if (availableRooms.length == 0)
		{
			break;
		}

		let theRoom = randomIntInRange(0, availableRooms.length);

		// for (let i = 0; i < availableRooms.length; i++)
		// {
			levelCopy[availableRooms[theRoom].x][availableRooms[theRoom].y] = 3;
		// }

		specialRoomCount++;
	}

	// drawing the rooms
	for (let i = 0; i < canvisSize/roomSize; i++)
	{
		for (let j = 0; j < canvisSize/roomSize; j++)
		{
			if (level[i][j] == 0)
			{
				fill(0);
				noStroke();
				rect(i * roomSize, j * roomSize, roomSize, roomSize);
			}
			else if (level[i][j] == 1)
			{
				fill(255);
				stroke(0);
				rect(i * roomSize, j * roomSize, roomSize, roomSize);
			}
			else if (level[i][j] == 2)
			{
				fill(255, 255, 0);
				stroke(0);
				rect(i * roomSize, j * roomSize, roomSize, roomSize);
			}
			else if (level[i][j] == 3)
			{
				fill(255, 0, 0);
				stroke(0);
				rect(i * roomSize, j * roomSize, roomSize, roomSize);
			}
		}
	}
}

function findRoomSpace(currentRoom, map, emptySpaces)
{
	let spaces = emptySpaces;

	if (currentRoom.x + 1 < map.length    && map[currentRoom.x + 1][currentRoom.y] == 0) spaces.push({x: currentRoom.x + 1, y: currentRoom.y});
	if (currentRoom.x - 1 > 0             && map[currentRoom.x - 1][currentRoom.y] == 0) spaces.push({x: currentRoom.x - 1, y: currentRoom.y});
	if (currentRoom.y + 1 < map[0].length && map[currentRoom.x][currentRoom.y + 1] == 0) spaces.push({x: currentRoom.x, y: currentRoom.y + 1});
	if (currentRoom.y - 1 > 0             && map[currentRoom.x][currentRoom.y - 1] == 0) spaces.push({x: currentRoom.x, y: currentRoom.y - 1});

	return spaces;
}

function findClearRoomSpace(currentRoom, map, emptySpaces)
{
	let spaces = emptySpaces;

	if (currentRoom.x + 1 < map.length    && map[currentRoom.x + 1][currentRoom.y] == 0 && map[currentRoom.x + 1][currentRoom.y + 1] == 0 && map[currentRoom.x + 1][currentRoom.y - 1] == 0) spaces.push({x: currentRoom.x + 1, y: currentRoom.y});
	if (currentRoom.x - 1 > 0             && map[currentRoom.x - 1][currentRoom.y] == 0 && map[currentRoom.x - 1][currentRoom.y + 1] == 0 && map[currentRoom.x - 1][currentRoom.y - 1] == 0) spaces.push({x: currentRoom.x - 1, y: currentRoom.y});
	if (currentRoom.y + 1 < map[0].length && map[currentRoom.x][currentRoom.y + 1] == 0 && map[currentRoom.x - 1][currentRoom.y + 1] == 0 && map[currentRoom.x + 1][currentRoom.y + 1] == 0) spaces.push({x: currentRoom.x, y: currentRoom.y + 1});
	if (currentRoom.y - 1 > 0             && map[currentRoom.x][currentRoom.y - 1] == 0 && map[currentRoom.x - 1][currentRoom.y - 1] == 0 && map[currentRoom.x + 1][currentRoom.y - 1] == 0) spaces.push({x: currentRoom.x, y: currentRoom.y - 1});

	return spaces;
}

function findSpecialRoomSpace(currentRoom, map, emptySpaces)
{
	let spaces = emptySpaces;

	if (currentRoom.x + 1 < map.length    && map[currentRoom.x + 1][currentRoom.y] == 0 && map[currentRoom.x + 2][currentRoom.y] == 0 && map[currentRoom.x + 1][currentRoom.y + 1] == 0 && map[currentRoom.x + 1][currentRoom.y - 1] == 0) spaces.push({x: currentRoom.x + 1, y: currentRoom.y});
	if (currentRoom.x - 1 > 0             && map[currentRoom.x - 1][currentRoom.y] == 0 && map[currentRoom.x - 2][currentRoom.y] == 0 && map[currentRoom.x - 1][currentRoom.y + 1] == 0 && map[currentRoom.x - 1][currentRoom.y - 1] == 0) spaces.push({x: currentRoom.x - 1, y: currentRoom.y});
	if (currentRoom.y + 1 < map[0].length && map[currentRoom.x][currentRoom.y + 1] == 0 && map[currentRoom.x][currentRoom.y + 2] == 0 && map[currentRoom.x - 1][currentRoom.y + 1] == 0 && map[currentRoom.x + 1][currentRoom.y + 1] == 0) spaces.push({x: currentRoom.x, y: currentRoom.y + 1});
	if (currentRoom.y - 1 > 0             && map[currentRoom.x][currentRoom.y - 1] == 0 && map[currentRoom.x][currentRoom.y - 2] == 0 && map[currentRoom.x - 1][currentRoom.y - 1] == 0 && map[currentRoom.x + 1][currentRoom.y - 1] == 0) spaces.push({x: currentRoom.x, y: currentRoom.y - 1});

	return spaces;
}

function findSpecialRooms(currentRoom, map, emptyRooms)
{
	let rooms = emptyRooms;

	let checks = 0;

	if ( (currentRoom.x + 1 < map.length    && map[currentRoom.x + 1][currentRoom.y] == 0) || (currentRoom.x + 1 > map.length   ) ) checks++;
	if ( (currentRoom.x - 1 > 0             && map[currentRoom.x - 1][currentRoom.y] == 0) || (currentRoom.x - 1 < 0            ) ) checks++;
	if ( (currentRoom.y + 1 < map[0].length && map[currentRoom.x][currentRoom.y + 1] == 0) || (currentRoom.y + 1 > map[0].length) ) checks++;
	if ( (currentRoom.y - 1 > 0             && map[currentRoom.x][currentRoom.y - 1] == 0) || (currentRoom.y - 1 < 0            ) ) checks++;
	if ( map[currentRoom.x][currentRoom.y] == 3 ) checks--;

	if (checks == 3)
	{
		rooms.push(currentRoom);
	}

	return rooms;
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

function keyPressed()
{
	if (keyCode === 83)
	{
		generateLevel();
	}
}