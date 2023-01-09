function ballsCollided(ball, otherBalls)
{
  let collidedWith = null
  
  for (let i = 0; i < otherBalls.length; i++)
  {
    if (otherBalls[i].position.x == ball.position.x && otherBalls[i].position.y == ball.position.y)
    {
      continue
    }
    else
    {
      if (genDist(ball.position, otherBalls[i].position) <= ball.radius + otherBalls[i].radius)
      {
        collidedWith = otherBalls[i]
        break
      }
    }
  }
  
  return collidedWith
}

function genDist(point1, point2)
{
  return Math.sqrt(Math.pow(point2.x-point1.x, 2) + Math.pow(point2.y-point1.y, 2))
}

function getDirection(point1, point2)
{
  return { x : point2.x - point1.x, y : point2.y - point1.y }
}
    
function getDirectionNormal(point1, point2)
{
  let directionVect = getDirection(point1, point2)
  let length = getLength(directionVect)
  
  return { x : directionVect.x/getLength(directionVect) , y : directionVect.y/getLength(directionVect) }
}

function getLength(vector)
{
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}

function selectBall(balls, position)
{
  let selected = null
  
  balls.forEach((ball) => {
    if (genDist(position, ball.position) <= ball.radius)
    {
      if (selected == null)
      {
        selected = ball
      }
      else
      {
        if (genDist(position, ball.position) < genDist(position, selected.position))
        {
          selected = ball
        }
      }
    }
  });
  
  return selected
}