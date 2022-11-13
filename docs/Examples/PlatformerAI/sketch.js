
let platforms = []
let paths = []
let bridges = []
let npcs = []

function setup() {
  createCanvas(900, 500);
  
  _makePlatforms(7, 5)
  
  paths = _generatePaths(platforms)
  bridges = _generateBridges(platforms, 150, 125)
  
  let npcCount = 100
  for (let i = 0; i < npcCount; i++)
  {
    npcs.push(_makeNpc(platforms))
  }
}

function draw() {
  _updateNpcs(deltaTime / 1000, npcs, platforms)
  
  
  background(150);
  
  platforms.forEach((platform) => {
    
    noStroke()
    fill(0)
    rect(platform.rect.position.x, platform.rect.position.y, platform.rect.size.x, platform.rect.size.y)
    
    stroke(255)
    strokeWeight(1)
    line(platform.path[0].x, platform.path[0].y, platform.path[1].x, platform.path[1].y)
        
    let itterations = 10
    
    if (platform.bridges.length > 0)
    {
      for (let j = 0; j < platform.bridges.length; j++)
      {
        let percent = 1/itterations

        let prevPoint = platform.bridges[j][1][0]
        for (let i = 0; i < itterations; i++)
        {
          let point = qLerp(platform.bridges[j][1][0], platform.bridges[j][1][1], platform.bridges[j][1][2], percent * i)
          
          line(prevPoint.x, prevPoint.y, point.x, point.y)
          
          prevPoint = point
          
          if (i + 1 == itterations)
          {
            line(point.x, point.y, platform.bridges[j][1][2].x, platform.bridges[j][1][2].y)
          }
        }
      }
    }
  })
  
  noStroke()
  npcs.forEach((npc) => {
    fill(255)
    rect(npc.pPosition.x-2, npc.pPosition.y - 15, 20, 20)
    fill(255, 0, 0)
    rect(npc.pPosition.x, npc.pPosition.y - 15, 20, 20)
  });
}

function _generatePaths(platforms)
{
  let paths = []
  
  for (let i = 0; i < platforms.length; i++)
  {
    let path = _generatePath(platforms[i])
    
    paths.push(path)
    platforms[i].path = path
  }
  
  return paths
}

function _generatePath(platform)
{
  return [
    createVector(platform.rect.position.x + platform.rect.size.x * 0.05, platform.rect.position.y),
    createVector(platform.rect.position.x + platform.rect.size.x * 0.95, platform.rect.position.y)
  ]
}

function _generateBridges(platforms, maxDistanceX, maxDistanceY)
{
  let bridges = []
  
  for (let i = 0; i < platforms.length; i++)
  {
    platforms[i].bridges = []
    
    for (let j = 0; j < platforms.length; j++)
    {
      if (j != i)
      {
        let center1 = pLerp(platforms[i].path[0], platforms[i].path[1], 0.5);
        let center2 = pLerp(platforms[j].path[0], platforms[j].path[1], 0.5);
        
        let distanceX = Math.abs(center2.x - center1.x);
        let distanceY = Math.abs(center2.y - center1.y);
        
        if (distanceX < maxDistanceX && distanceY < maxDistanceY)
        {
          let bridge = _generateBridge(platforms[i].path, platforms[j].path)
          
          if (bridge)
          {
            bridges.push(bridge)
            
            platforms[i].bridges.push([platforms[j].id, bridge])
          }
        }
      }
    }
  }
  
  return bridges
}

function _generateBridge(path1, path2)
{
	let point1; let point2; let point3
	
	let highestY = path1[0].y
	
    
    
	if (highestY < path2[0].y) highestY = path2[0].y;
	
	if (path1[0].x > path2[1].x)
    {
		let dif = path1[0].x - path2[1].x
		let off = dif/4
		
		point1 = path1[0]
		point2 = createVector((path1[0].x + path2[1].x)/2 - off, highestY - 50)
		point3 = path2[1]
    }
	else if (path2[0].x > path1[1].x)
    {
		let dif = path2[0].x - path1[1].x
		let off = dif/4
		
		point1 = path1[1]
		point2 = createVector((path2[0].x + path1[1].x)/2 + off, highestY - 50)
		point3 = path2[0]
    }
	else if (path1[0].x > path2[0].x && path1[0].x < path2[1].x)
    {
		point1 = path1[0]

		if (path1[0].y < path2[0].y) point2 = createVector((path2[0].x + path1[0].x)/(2), highestY - 50)
		else point2 = createVector(path1[0].x, highestY - 150)

		point3 = createVector((path2[0].x + path1[0].x)/(2), path2[0].y)
    }
	else if (path1[1].x > path2[0].x && path1[0].x < path2[1].x)
    {
		point1 = path1[1]

		if (path1[1].y > path2[1].y) point2 = createVector(path1[1].x, highestY - 150)
		else point2 = createVector((path2[1].x + path1[1].x)/(2), highestY - 50)

		point3 = createVector((path2[1].x + path1[1].x)/(2), path2[1].y)
    }
	if (point1) return [point1, point2, point3]
	else return
}

function qLerp(point1, point2, point3, percent)
{
  let lerp1 = pLerp(point1, point2, percent)
  let lerp2 = pLerp(point2, point3, percent)
  
  return pLerp(lerp1, lerp2, percent)
}

function pLerp(point1, point2, percent)
{
  return createVector(point1.x + (point2.x - point1.x)*percent, point1.y + (point2.y - point1.y)*percent)
}
  
function _makePlatforms(maxX, maxY)
{
  let id = 0
  
  for (let x = 0; x < maxX; x++)
  {
    for (let y = 0; y < maxY; y++)
    {
      if ((y+1) % 2 == 0 && x == maxX - 1)
      {
        
      }
      else
      {
        let posX = width/maxX * x + 25
        let posY = height/maxY * y + 50
        
        if ((y+1) % 2 == 0)
        {
          posX += 75
        }
        
        var p = _makePlatform(posX, posY, 100, 20, true, "block", id)
        platforms.push(p)
        
        id++
      }
    }
  }
}

function _makePlatform(x, y, sx, sy, walkable, type, id)
{
  return {
    walkable : walkable,
    rect : {
      position : createVector(x, y),
      size : createVector(sx, sy)
    },
    type : type,
    id : id
  }
}