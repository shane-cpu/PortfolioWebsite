
function makeEnemy(pos, rad)
{
	let enemy = {
		radius : rad,
		velocity : new Vector2(),
		worldPos : new Vector2(pos.x, pos.y)
	};

	return enemy;
}

function moveEnemy(enemy, dt)
{
	let changeInVelocity = enemy.velocity.clone();

	changeInVelocity.mult(dt/100);

	enemy.worldPos.addVect(changeInVelocity);
}

function changeVelocity(enemy, dir)
{
	enemy.velocity.addVect(dir);
	
	let length = enemy.velocity.mag();

	if (length >= 5)
	{
		enemy.velocity.normalize();
		enemy.velocity.mult(10);
	}
}

function drawEnemy(enemy, pos)
{
	ellipse(pos.x, pos.y, enemy.radius, enemy.radius);
}