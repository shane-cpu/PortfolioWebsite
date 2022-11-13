let player, pBall
let pBallRotation = 0
let pBallSize = 200

let up = 87
let upPressed = false

let down = 83
let downPressed = false

let left = 65
let leftPressed = false

let right = 68
let rightPressed = false

let space = 32
let spacePressed = false

let rKey = 82

let leftMousePressed = false

let playerSpeed = 3
let pikstate = 0
let pikSelect = 0

let pGroupPositions = []
let pGroupOffset = 20
let pRallyPositions = []

let pikmin = []
let pikminSpeeds = [1.5, 2, 2.5]
let pikminColors = ["#f00", "#ff0", "#00f"]
let maxPikminDistance = 1.5

let prevMousePos
let prevPlayerPos

function setup() {
  createCanvas(600, 600);
  
  prevMousePos = createVector(mouseX, mouseY)
  player = createVector(width/2, height/2);
  prevPlayerPos = createVector(player.x, player.y)
  pBall = createVector(width/2, height/2);
  
  let pikminCount = 200
  
  pGroupPositions = createPikminCircle(pikminCount)
  
  for (let i = 0; i < pikminCount; i++)
  {
    pikmin.push({
      worldPosition : createVector(pGroupPositions[i].x, pGroupPositions[i].y),
      level : Math.floor(Math.random() * 3),
      type : Math.floor(Math.random() * 3)
    });
  }
}

function draw() {
  background(0);
  
  textSize(16)
  text("Controls", 20, 50)
  text("Pikmin AI Demo", 225, 25)
  text("Hold Space : Rally/Randomize", 20, 100)
  text("Hold Left Click : Rotate/Sort", 20, 150)
  text("Hold Left Click + R Key : Choose Type", 20, 200)
  text("W A S D Keys : Move", 20, 250)
  
  let moveVector = createVector((leftPressed * -1) + (rightPressed * 1), (upPressed * -1) + (downPressed * 1))
  
  moveVector = normalizeVector(moveVector)
  
  
  player.x += moveVector.x * playerSpeed
  player.y += moveVector.y * playerSpeed
  
  updatePikState()
  updatePikBall()
  
  switch (pikstate)
  {
    case 0:
      strokeWeight(1)
      stroke("#fff")
      noFill()
      circle(pBall.x, pBall.y, pBallSize)
      break;
    case 1:
      strokeWeight(4)
      stroke("#fff")
      noFill()
      point(lerp( player.x, mouseX, 0.25), lerp( player.y, mouseY, 0.25))
      point(lerp( player.x, mouseX, 0.5), lerp( player.y, mouseY, 0.5))
      point(lerp( player.x, mouseX, 0.75), lerp( player.y, mouseY, 0.75))
      break;
    case 2:
      strokeWeight(1)
      stroke("#fff")
      noFill()
      circle(pBall.x, pBall.y, pBallSize)
      break;
  }
  
  strokeWeight(6)
  for (let i = 0; i < pikmin.length; i++){
    stroke(pikminColors[pikmin[i].type])
    point(pikmin[i].worldPosition)
  }
  strokeWeight(16);
  stroke("#fff")
  point(player)
  
  strokeWeight(2)
  circle(mouseX, mouseY, pBallSize/4)
  line( -(pBallSize/4)/3 + mouseX, -(pBallSize/4)/3 + mouseY, (pBallSize/4)/3 + mouseX, (pBallSize/4)/3 + mouseY)
  line( -(pBallSize/4)/3 + mouseX, (pBallSize/4)/3 + mouseY, (pBallSize/4)/3 + mouseX, -(pBallSize/4)/3 + mouseY)
  
  updatePikmin()
  
  prevMousePos = createVector(mouseX, mouseY)
  prevPlayerPos = createVector(player.x, player.y)
}

function createPikminCircle(n) {
  let sortedPositions = []
  let unsortedPositions = []
  let circleSections = 8
  let circleOffset = 1
  let p = n
  
  while (p > 0) {
    if (p == 100)
    {
      unsortedPositions.push(createVector(0, 0))
      p--
    }
    else
    {
      let totalSections = (p - circleSections > 0) ? circleSections : p
      let rotation = (2 * Math.PI) / totalSections
      
      for (let i = 0; i < totalSections; i++) {
          unsortedPositions.push(createVector((circleOffset * pGroupOffset) * cos(rotation * i), (circleOffset * pGroupOffset) * sin(rotation * i)))
      }
      
      circleSections *= 2
      circleOffset += 1
      p -= (p - circleSections > 0) ? totalSections : p
    }
  }
  
  
  for (let i = 0; i < unsortedPositions.length; i++) {
    if (sortedPositions.length == 0) {
      sortedPositions.push(unsortedPositions[i])
    }
    else if (sortedPositions.length == 1) {
      if (sortedPositions[0].y > unsortedPositions[i].y) {
        sortedPositions.splice(0, 0, unsortedPositions[i])
      }
      else {
        sortedPositions.push(unsortedPositions[i])
      }
    }
    else {
      if (sortedPositions[0].y > unsortedPositions[i].y) {
        sortedPositions.splice(0, 0, unsortedPositions[i])
      }
      else {
        sor:
        for (let j = 1; j < sortedPositions.length; j++) {
          if (sortedPositions[j].y > unsortedPositions[i].y) {
            sortedPositions.splice(j, 0, unsortedPositions[i])
            break sor;
          }
          else if (j + 1 == sortedPositions.length) {
            sortedPositions.push(unsortedPositions[i])
            break sor;
          }
          else {
            continue;
          }
        }
      }
    }
  }
  
  
  return sortedPositions.slice()
}

function randomizePikmin() {
  let newPikmin = []
  
  let pikminClone = pikmin.slice()
  
  for (let i = 0; i < pikmin.length; i++)
  {
    let randomNumber = Math.floor(Math.random()*pikminClone.length)
    
    newPikmin.push(pikminClone[randomNumber])
    pikminClone.splice(randomNumber, 1)
  }
  
  pikmin = newPikmin.slice()
}

function reorganizePikmin()
{
  let newPikmin = []
  
  let currentTypeOrder = []
  
  if (pikSelect == 0)
  {
    currentTypeOrder = [0, 1, 2]
  }
  else if (pikSelect == 1)
  {
    currentTypeOrder = [1, 2, 0]
  }
  else if (pikSelect == 2)
  {
    currentTypeOrder = [2, 0, 1]
  }
  
  for (let p = 0; p < currentTypeOrder.length; p++) {
    for (let i = 0; i < pikmin.length; i++) {
      if (pikmin[i].type == currentTypeOrder[p])
      {
        newPikmin.push(pikmin[i])
      }
    }
  }
  
  pikmin = newPikmin.slice()
}

function typeSwap()
{
  pikSelect++
  
  if (pikSelect > 2)
  {
    pikSelect = 0
  }
  
  reorganizePikmin()
}

function updatePikState() {
  if (spacePressed)
  {
    pikstate = 1
  }
  else
  {
    if (mouseIsPressed)
    {
      pikstate = 2
    }
    else
    {
      pikstate = 0
    }
  }
}

function updatePikBall() {
  if (pikstate != 2)
  {
    pBall = followPlayer(pBall, player)
  }
  else
  {
    pBall = backPlayer()
  }
}

function updatePikmin() {
  
  switch (pikstate)
  {
    case 0:
      followState()
      break;
    case 1:
      rallyState()
      break;
    case 2:
      followState()
  }
}

function followState() {
  let p = -1
  
  for (let i = 0; i < pGroupPositions.length; i++) {
      
    if (p < pikmin.length - 1)
    {
      p++

      let point = createVector(pGroupPositions[i].x, pGroupPositions[i].y)

      let rotatedPoint = rotatePoint(point, pBallRotation)

      let offsetToPos = createVector(rotatedPoint.x + pBall.x, rotatedPoint.y + pBall.y)

      if (dist(pikmin[p].worldPosition.x, pikmin[p].worldPosition.y, offsetToPos.x, offsetToPos.y) < maxPikminDistance)
      {
        pikmin[p].worldPosition = offsetToPos
      }

      let direction = createVector(offsetToPos.x - pikmin[p].worldPosition.x, offsetToPos.y - pikmin[p].worldPosition.y)

      let normalizedDirection = normalizeVector(direction)

      pikmin[p].worldPosition.x += normalizedDirection.x * (pikminSpeeds[pikmin[p].level])
      pikmin[p].worldPosition.y += normalizedDirection.y * (pikminSpeeds[pikmin[p].level])
    }
    else
    {
      continue
    }
  }
}

function rallyState()
{
  if (prevMousePos.x == mouseX && prevMousePos.y == mouseY && prevPlayerPos.x == player.x && prevPlayerPos.y == player.y && pRallyPositions > 0)
  {}
  else
    pRallyPositions = calculateRallyField()
  
  let p = -1
  
  for (let i = 0; i < pRallyPositions.length; i++)
  {
    for (let j = 0; j < pRallyPositions[i].length; j++)
    {
      if (p < pikmin.length - 1)
      { 
        p++
        
        let offsetToPos = createVector(pRallyPositions[i][j].x, pRallyPositions[i][j].y)
        
        let distanceToThing = dist(pikmin[p].worldPosition.x, pikmin[p].worldPosition.y, offsetToPos.x, offsetToPos.y)
        
        let direction = createVector(pRallyPositions[i][j].x - pikmin[p].worldPosition.x, pRallyPositions[i][j].y - pikmin[p].worldPosition.y)

        let normalizedDirection = normalizeVector(direction)
        
        let pikminVelocity = createVector(normalizedDirection.x * pikminSpeeds[pikmin[p].level],  normalizedDirection.y * pikminSpeeds[pikmin[p].level])
        
        if (distanceToThing < maxPikminDistance)
        {
          pikmin[p].worldPosition = offsetToPos
        }
        else
        {
          pikmin[p].worldPosition.x += pikminVelocity.x
          pikmin[p].worldPosition.y += pikminVelocity.y
        }
      }
      else
      {
        continue
      }
    }
  }
}

function calculateRallyField() {
  let field = []
  
  let sectionSize = pBallSize / 12
  
  let distance = dist(player.x, player.y, mouseX, mouseY)
  
  let sectionCount = Math.floor(distance/sectionSize)
  let sectionLength = Math.floor(pikmin.length/sectionCount)
  
  // let minimumCount = 6
  
  while (sectionCount * sectionLength < pikmin.length + 1)
  {
    sectionCount += 1
  }
  
  let offsetMouse = createVector(mouseX - player.x, mouseY - player.y)
  let perpendicularAxis = createVector(-offsetMouse.y, offsetMouse.x)
  let normalizedAxis = normalizeVector(perpendicularAxis)
  
  let sectionHalfLength = (sectionSize * sectionLength)/2
  let sectionAxis = createVector(normalizedAxis.x * sectionHalfLength, normalizedAxis.y * sectionHalfLength)
  
  for (let i = 0; i < sectionCount; i++)
  {
    field.push([])
    
    let MidXpos = lerp(player.x, mouseX, (1/sectionCount) * (i + 1))
    let MidYpos = lerp(player.y, mouseY, (1/sectionCount) * (i + 1))
    
    for (let j = 0; j < sectionLength; j++)
    {
      let Xpos = lerp(MidXpos - sectionAxis.x/2, sectionAxis.x/2 + MidXpos, (1/sectionLength) * (j + 1))
      let Ypos = lerp(MidYpos - sectionAxis.y/2, sectionAxis.y/2 + MidYpos, (1/sectionLength) * (j + 1))
      
      
      field[i].push(createVector(Xpos, Ypos))
    }
  }
  
  
  return field
}

function followPlayer(point, playerPos) {
  let newPoint = createVector()
  let length = dist(point.x, point.y, playerPos.x, playerPos.y)
  
  if (length > 90)
  {
    let direction = createVector((point.x - playerPos.x) * -1, (point.y - playerPos.y) * -1)
    direction = normalizeVector(direction, length)
    
    newPoint = createVector((direction.x * (playerSpeed*0.95)) + point.x, (direction.y * (playerSpeed*0.95)) + point.y)
  }
  else
  {
    newPoint = point
  }
  
  return newPoint
}

function backPlayer() {
  // pBall, player
  let mousePos = createVector(mouseX, mouseY)
  
  let direction = createVector(player.x - mousePos.x, player.y - mousePos.y)
  let normalizedDirection = normalizeVector(direction)
  
  let newPosition = createVector((normalizedDirection.x * pBallSize/2) + player.x, (normalizedDirection.y * pBallSize/2) + player.y)
  
  pBallRotation = Math.atan2(normalizedDirection.y, normalizedDirection.x) - (Math.PI/2)
  
  return newPosition
}

function rotatePoint(point, angle)
{
  let c = cos(angle)
  let s = sin(angle)
  let p = createVector()
  
  // rotate point
  let xnew = point.x * c - point.y * s;
  let ynew = point.x * s + point.y * c;
  
  p = createVector(xnew, ynew)
  
  return p
}
  
function normalizeVector(vector) {
  let length = findLength(vector)
  
  return createVector(vector.x/length, vector.y/length)
}

function findLength(vector) {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}
  
function mousePressed() {
  leftMousePressed = true
  
  reorganizePikmin()
}

function mouseReleased() {
  leftMousePressed = false
}

function keyPressed() {
  if (up == keyCode) upPressed = true
  if (down == keyCode) downPressed = true
  if (left == keyCode) leftPressed = true
  if (right == keyCode) rightPressed = true
  if (space == keyCode)
  {
    spacePressed = true
    randomizePikmin()
  }
  if (rKey == keyCode && leftMousePressed) typeSwap()
}

function keyReleased() {
  if (up == keyCode) upPressed = false
  if (down == keyCode) downPressed = false
  if (left == keyCode) leftPressed = false
  if (right == keyCode) rightPressed = false
  if (space == keyCode) spacePressed = false
}