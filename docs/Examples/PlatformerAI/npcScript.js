function _randomInRange(max, min)
{
  return min + (max-min)*Math.random()
}

function _randomIntInRange(max, min)
{
  return floor(_randomInRange(max, min))
}


function _makeNpc(walkablePlatforms)
{
	var startingLine = _randomIntInRange(walkablePlatforms.length, 0)
	
	var npc = {
		bPercent : 0,
		cPlatform : walkablePlatforms[startingLine].id,
		pBridging : false,
		pDirection : 1,
		pPosition : walkablePlatforms[startingLine].path[0],
		pSpeed : 130,
	}
	
	if (walkablePlatforms[npc.cPlatform ].bridges.length > 0)
	{
      var nextPlatform = _randomIntInRange(0, walkablePlatforms[npc.cPlatform].bridges.length)

      npc.nPlatform = nextPlatform
      npc.pTarget = createVector(walkablePlatforms[npc.cPlatform].bridges[npc.nPlatform][1][0].x, walkablePlatforms[npc.cPlatform].bridges[npc.nPlatform][1][0].y)
    }
	else npc.nPlatform = null
	
	return npc
}


function _updateNpcs(delta, npcArray, platforms)
{	
  npcArray.forEach((npc) => {
    let platform = platforms[npc.cPlatform]
    
    if (npc.nPlatform == null)
    {
      let npcPercent = _getLinePositionPercent(platform.path, npc.pPosition)
      
      if (npcPercent < 1 && npc.pDirection == 1)
      {
        let newPos = createVector(npc.pPosition.x + npc.pSpeed * delta, npc.pPosition.y)
        
        if (newPos.x > platform.path[1].x) npc.pPosition = platform.path[1]
        else if (newPos.x < platform.path[0].x) npc.pPosition = platform.path[0]
        else npc.pPosition = newPos
      }
      else if (npcPercent > 0 && npc.pDirection == -1)
      {
        let newPos = createVector(npc.pPosition.x + -npc.pSpeed * delta, npc.pPosition.y)
        
        if (newPos.x > platform.path[1].x) npc.pPosition = platform.path[1]
        else if (newPos.x < platform.path[0].x) npc.pPosition = platform.path[0]
        else npc.pPosition = newPos
      }
      
      npcPercent = _getLinePositionPercent(platform.path, npc.pPosition)
      
      if (npcPercent == 1 || npcPercent == 0) npc.pDirection*=-1
    }
    else ///////////////////////////////////////////////
    {
      if (npc.pBridging == true)
      {
        if (npc.bPercent >= 1)
        {
          npc.pBridging = false
          npc.bPercent = 0
          npc.cPlatform = platform.bridges[npc.nPlatform][0]

          platform = platforms[npc.cPlatform]

          var nextPlatform = _randomIntInRange(0, platform.bridges.length)

          npc.nPlatform = nextPlatform
          npc.pTarget = createVector(platform.bridges[npc.nPlatform][1][0].x, platform.bridges[npc.nPlatform][1][0].y)
          return
        }
          
        var bridge = platform.bridges[npc.nPlatform][1]

        var newPosition = qLerp(bridge[0], bridge[1], bridge[2], npc.bPercent)
        npc.pPosition.x = newPosition.x
        npc.pPosition.y = newPosition.y

        npc.bPercent = npc.bPercent + 0.05
      }
      else ////////////////
      {
        if (npc.pPosition.x < npc.pTarget.x && (npc.pSpeed * delta) + npc.pPosition.x < npc.pTarget.x)
        {
          let newPos = createVector(npc.pPosition.x + (npc.pSpeed * delta), npc.pPosition.y)

          if (newPos.x > platform.path[1].x)
              npc.pPosition = platform.path[1]
          else if (newPos.x < platform.path[0].x)
              npc.pPosition = platform.path[0]
          else npc.pPosition = newPos
        }
        else if (npc.pPosition.x > npc.pTarget.x && -npc.pSpeed * delta + npc.pPosition.x > npc.pTarget.x)
        {
          let newPos = createVector(npc.pPosition.x + -npc.pSpeed * delta, npc.pPosition.y)

          if (newPos.x > platform.path[1].x)
              npc.pPosition = platform.path[1]
          else if (newPos.x < platform.path[0].x)
              npc.pPosition = platform.path[0]
          else
              npc.pPosition = newPos
        }
        else
        {
          npc.pPosition = npc.pTarget
          npc.pBridging = true
        }
      }
    }
  });
}

function _getLinePositionPercent(line, npcLocation)
{
  let localPosition = createVector(npcLocation.x - line[0].x, npcLocation.y)
  let linePercent = localPosition.x/(line[1].x - line[0].x)
  
  return linePercent
}

function _getLineWorldPosition(line, percent)
{
  let zeroPPosition = line[0]
  let hundredPPosition = line[1]
  
  let worldSpacePosition = createVector(zeroPPosition.x + (hundredPPosition.x - zeroPPosition.x)*percent, zeroPPosition.y)
  
  return worldSpacePosititon
}
