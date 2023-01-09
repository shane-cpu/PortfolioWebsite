let balls = []
let walls = []

let selectedBall = null
let mouseStart = null
let mouseEnd = null

function setup() {
  createCanvas(400, 400);
  balls.push(new ball(width/2, height/2))
  balls.push(new ball(width/2, height/2 + 50))
  balls.push(new ball(width/2 + 20, height/2 + 80))
  balls.push(new ball(width/2 - 20, height/2 + 80))
  balls.push(new ball(width/2 + 40, height/2 + 110))
  balls.push(new ball(width/2 - 40, height/2 + 110))
  balls.push(new ball(width/2, height/2 + 110))
  walls.push(new wall(0, 0, width, 20))
  walls.push(new wall(0, 0, 20, height))
  walls.push(new wall(0, height-20, width, 20))
  walls.push(new wall(width-20, 0, 20, height))
}

function updateStuff()
{
  balls.forEach((ball) => {
    let ballHit = ballsCollided(ball, balls)
    
    if (ballHit != null)
    {
      let directionToBall = getDirectionNormal(ball.position, ballHit.position)
      let magnitudeOfVelocity = getLength(ball.velocity)/4
      
      ballHit.applyForce({ x : directionToBall.x * magnitudeOfVelocity, y : directionToBall.y * magnitudeOfVelocity })
      ball.applyForce({ x : -directionToBall.x * magnitudeOfVelocity, y : -directionToBall.y * magnitudeOfVelocity })
    }
    
    ball.update(deltaTime/1000)
  });
}

function draw() {
  updateStuff()
  
  background(220);
  walls.forEach((wall) => {
    wall.draw()
  })
  balls.forEach((ball) => {
    ball.draw()
  });
  
  if (selectedBall != null)
  {
    let distanceBetween = genDist(mouseEnd, selectedBall.position)
    
    if (distanceBetween < 50)
    {
      line(selectedBall.position.x, selectedBall.position.y, mouseEnd.x, mouseEnd.y)
    }
    else
    {
      let pos1 = { x : mouseEnd.x - selectedBall.position.x, y : mouseEnd.y - selectedBall.position.y }
      
      let desiredDistance = 50/distanceBetween
      
      let pos2 = { x : pos1.x * desiredDistance, y : pos1.y * desiredDistance }
      
      let pos3 = { x : pos2.x + selectedBall.position.x, y : pos2.y + selectedBall.position.y }
      
      line(selectedBall.position.x, selectedBall.position.y, pos3.x, pos3.y)
    }
  }
  
  text("Click and drag to aim then release to let the ball fly.", 40, 40)
  text("The balls can go off screen", 40, 60)
}

function mousePressed()
{
  selectedBall = selectBall(balls, { x : mouseX, y : mouseY })
  
  if (selectedBall != null)
  {
    mouseStart = { x : mouseX, y : mouseY }
    mouseEnd = { x : mouseX, y : mouseY }
  }
}

function mouseDragged() {
  if (selectedBall != null)
    mouseEnd = { x : mouseX, y : mouseY }
}

function mouseReleased() {
  if (selectedBall != null)
  {
    let directionVetor = getDirectionNormal(mouseEnd, selectedBall.position)
    let distanceBetween = genDist(mouseEnd, selectedBall.position)
    let power = 0
    
    if (distanceBetween >= 50) power = 200
    else power = (distanceBetween/50) * 200
    
    selectedBall.applyForce({ x : directionVetor.x * power, y : directionVetor.y * power })
    
    selectedBall = null

    mouseStart = null
    mouseEnd = null
  }
}

function touchStarted()
{
  selectedBall = selectBall(balls, { x : mouseX, y : mouseY })
  
  if (selectedBall != null)
  {
    mouseStart = { x : mouseX, y : mouseY }
    mouseEnd = { x : mouseX, y : mouseY }
  }
}

function touchMoved() {
  if (selectedBall != null)
    mouseEnd = { x : mouseX, y : mouseY }
}

function touchEnded() {
  if (selectedBall != null)
  {
    let directionVetor = getDirectionNormal(mouseEnd, selectedBall.position)
    let distanceBetween = genDist(mouseEnd, selectedBall.position)
    let power = 0
    
    if (distanceBetween >= 50) power = 200
    else power = (distanceBetween/50) * 200
    
    selectedBall.applyForce({ x : directionVetor.x * power, y : directionVetor.y * power })
    
    selectedBall = null

    mouseStart = null
    mouseEnd = null
  }
}