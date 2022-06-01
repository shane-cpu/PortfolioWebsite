
function makeEnemy(pos, rad)
{
	let enemy = {
		radius : rad,
		worldPos : new Vector2(pos.x, pos.y)
	};

	return enemy;
}

function moveEnemy(enemy, dir)
{
	enemy.worldPos.addVect(dir);
}

function drawEnemy(enemy, pos)
{
	ellipse(pos.x, pos.y, enemy.radius, enemy.radius);
}