let groups = [[], []];
let arrayCreatePos
let arrayDimensions

let ox = 15
let oy = 20

function setup() {
  createCanvas(800, 600);
  
  let startingPositions = [createVector(300, 300), createVector(400, 350), createVector(500, 300)]
  
  for (let i = 0; i < startingPositions.length; i++)
  {
    groups[1].push(new boi(startingPositions[i].x, startingPositions[i].y))
  }
  
  arrayCreatePos = createVector(0, 0)
  arrayDimensions = createVector(ox, oy)
}

function draw() {
  background(220);
  strokeWeight(20)
  line(0, 0, 0, height)
  line(0, 0, width/8, 0)
  line(0, height, width/8, height)
  
  line(width - width/8, 0, width - width/8, height)
  line(width - width/8, 0, width - width/4, 0)
  line(width - width/8, height, width - width/4, height)
  
  strokeWeight(1)
  drawBoiIcon(35)
  
  let currentIndex = 2
  
  if (groups.length > 2)
  {
    for (let i = 2; i < groups.length; i++)
    {
      strokeWeight(5)
      displayArray(groups[i], createVector(50, 75 + (50 * (i - 2))))
      currentIndex = i + 1
    }
  }
  
  arrayCreatePos = createVector(50, 75 + (50 * (currentIndex - 2)))
  
  displayNewArrayButton(arrayCreatePos)
  
  for (let i = 0; i < groups.length; i++)
  {
    if (i == 0)
    {
      if (typeof groups[i][0] == "undefined")
        continue
      
      if (groups[i][0].length == null)
      {
        groups[i][0].moveMe(createVector(mouseX, mouseY))
        
        strokeWeight(1)
        groups[i][0].drawMe()
      }
      else
      {
        strokeWeight(5)
        displayArray(groups[i][0], createVector(mouseX, mouseY))
        for (let j = 0; j < groups[i][0].length; j++)
        {
          strokeWeight(1)
          groups[i][0][j].drawMe()
        }
      }
    }
    else
      for (let j = 0; j < groups[i].length; j++)
      {
        strokeWeight(1)
        groups[i][j].drawMe()
      }
  }
}

function drawBoiIcon(size)
{
  let position = createVector(width - width/16, height/2)
  
  circle(position.x, position.y, size)
  circle(position.x + size/4, position.y, size/4)
  circle(position.x - size/4, position.y, size/4)
  line(position.x + size * 0.45, position.y + size * 0.25, position.x + size * 0.5, position.y + size * 0.75)
  line(position.x - size * 0.45, position.y + size * 0.25, position.x - size * 0.5, position.y + size * 0.75)
}

function displayThingInArray(selectedIndex, Arpos)
{
  let offsetX = (selectedIndex + 1) * width / ox
  let offsetY = height / oy
  
  return createVector(offsetX + Arpos.x, offsetY/2 + Arpos.y)
}

function displayArray(theArray, pos)
{
  let offsetX = (theArray.length + 1) * width / ox
  let offsetY = height / oy
  
  line(pos.x, pos.y, pos.x, pos.y + offsetY)
  line(pos.x, pos.y, pos.x + 10, pos.y)
  line(pos.x, pos.y + offsetY, pos.x + 10, pos.y + offsetY)
  
  line(pos.x + offsetX, pos.y, pos.x + offsetX, pos.y + offsetY)
  line(pos.x + offsetX, pos.y, pos.x + offsetX - 10, pos.y)
  line(pos.x + offsetX, pos.y + offsetY, pos.x + offsetX - 10, pos.y + offsetY)
  
  for (let i = 0; i < theArray.length; i++)
  {
    theArray[i].moveMe(displayThingInArray(i, createVector(pos.x, pos.y)))
  }
}

function displayNewArrayButton(pos)
{
  strokeWeight(5)
  displayArray([], pos)
  
  let offsetX = (0 + 1) * width / ox
  let offsetY = height / oy
  
  line(pos.x + offsetX/2, pos.y + offsetY/10, pos.x + offsetX/2, pos.y + offsetY - offsetY/10)
  line(pos.x + offsetX/5, pos.y + offsetY/2, pos.x + offsetX - offsetX/5, pos.y + offsetY/2)
}

function mousePressed()
{
  if (arrayCreateCheck())
  {
    groups.push([])
    return
  }
  
  
  let selectedGroup = 1
  
  if(groups.length > 2)
  {
    for (let i = 2; i < groups.length; i++)
    {
      if (arrayCheckInside(groups[i], createVector(50, 75 + (50 * (i - 2))), createVector(mouseX, mouseY)))
      {
        selectedGroup = i
        break
      }
    }
  }
  
  if (mouseX <= width - width/8)
    if (selectedGroup == 1)
      boiCapture(selectedGroup)
    else
      arrayBoiCheckCapture(selectedGroup)
  else
    boiCreate()
}

function mouseReleased()
{
  if (typeof groups[0][0] == "undefined")
        return
  
  let selectedGroup = 1
  
  if(groups.length > 2 && !outOfBoundsCheck())
  {
    for (let i = 2; i < groups.length; i++)
    {
      if (arrayCheckInside(groups[i], createVector(50, 75 + (50 * (i - 2))), createVector(mouseX, mouseY)))
      {
        selectedGroup = i
        break
      }
    }
  }
  
  if (outOfBoundsCheck())
  {
    selectedGroup = -1
  }
  
  if (groups[0][0].length == null)
    boiRelease(selectedGroup)
  else
    arrayRelease(selectedGroup)
  
  if (arrayCreateCheck())
  {
    groups[1][groups[1].length - 1].moveMe(createVector(mouseX + 100, mouseY))
  }
}

function arrayCheckInside(theArray, Arpos, pos)
{
  let length = theArray.length
  let offsetX = (length + 1) * width / ox
  let offsetY = height / oy
  
  if (pos.x > Arpos.x && pos.x < Arpos.x + offsetX && pos.y > Arpos.y && pos.y < Arpos.y + offsetY)
  {
    return true
  }
  else
    return false
}

// arrayDimensions arrayCreatePos

function arrayCreateCheck()
{
  let mousePos = createVector(mouseX, mouseY)
  let offsetX = width / arrayDimensions.x
  let offsetY = height / arrayDimensions.y
  
  if (mousePos.x > arrayCreatePos.x && mousePos.x < arrayCreatePos.x + offsetX && mousePos.y > arrayCreatePos.y && mousePos.y < arrayCreatePos.y + offsetY)
  {
    return true
  }
  else
    return false
}

function arrayBoiCheckCapture(selectedGroup)
{
  let captured = []
  let index = 0
  
  for (let i = 0; i < groups[selectedGroup].length; i++) {
    if (captured.length == 0 && relativeDistance(groups[selectedGroup][i].position, createVector(mouseX, mouseY)) < groups[selectedGroup][i].size/2)
    {
      captured.push(groups[selectedGroup][i])
      index = i
    }
    else if (captured.length == 1)
    {
      if (relativeDistance(groups[selectedGroup][i].position, createVector(mouseX, mouseY)) < relativeDistance(captured[0].position, createVector(mouseX, mouseY)))
      {
        captured.splice(0, 1, groups[selectedGroup][i])
        index = i
      }
    }
  }
  
  if (captured.length > 0)
  {
    boiCapture(selectedGroup)
  }
  else
  {
    arrayCapture(selectedGroup)
  }
}

function arrayCapture(selectedGroup)
{
  groups[0].splice(0, 0, groups[selectedGroup])
  groups.splice(selectedGroup, 1)
}

function arrayRelease(selectedGroup)
{
  if (selectedGroup == -1)
  {
    groups[0].splice(0, 1)
    return
  }
    
  for (let i = 0; i < groups[0][0].length; i++)
  {
    groups[selectedGroup].push(groups[0][0][i])
  }
  
  groups[0].splice(0, 1)
}

function boiCapture(selectedGroup)
{
  let captured = []
  let index = 0
  
  for (let i = 0; i < groups[selectedGroup].length; i++) {
    if (captured.length == 0 && relativeDistance(groups[selectedGroup][i].position, createVector(mouseX, mouseY)) < groups[selectedGroup][i].size/2)
    {
      captured.push(groups[selectedGroup][i])
      index = i
    }
    else if (captured.length == 1)
    {
      if (relativeDistance(groups[selectedGroup][i].position, createVector(mouseX, mouseY)) < relativeDistance(captured[0].position, createVector(mouseX, mouseY)))
      {
        captured.splice(0, 1, groups[selectedGroup][i])
        index = i
      }
    }
  }
  
  if (captured.length > 0)
  {
    groups[0].splice(0, 0, groups[selectedGroup][index])
    groups[selectedGroup].splice(index, 1)
  }
}

function boiCreate()
{
  groups[0].splice(0, 0, new boi(mouseX, mouseY))
}

function boiRelease(selectedGroup)
{
  if (selectedGroup == -1)
  {
    groups[0].splice(0, 1)
    return
  }
      
  if (groups[0].length > 0)
  {
    groups[selectedGroup].splice(groups[selectedGroup].length, 0, groups[0][0])
    groups[0].splice(0, 1)
  }
}

function outOfBoundsCheck()
{
  if (mouseX > width - width/8)
  {
    return true
  }
  else
    return false
}

function relativeDistance(point1, point2)
{
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}