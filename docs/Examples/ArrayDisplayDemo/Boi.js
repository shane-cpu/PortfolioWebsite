
class boi {
  constructor(posX, posY)
  {
    this.position = createVector(posX,  posY)
    this.size = 35
    this.red = Math.floor(Math.random() * 150) + 100
    this.green = Math.floor(Math.random() * 150) + 100
    this.blue = Math.floor(Math.random() * 150) + 100
    
    if (this.red > this.green && this.red > this.blue)
    {
      this.green -= 50
      this.blue -= 50
    }
    else if (this.red < this.green && this.green > this.blue)
    {
      this.red -= 50
      this.blue -= 50
    }
    else if (this.red < this.blue && this.green < this.blue)
    {
      this.red -= 50
      this.green -= 50
    }
  }
  moveMe(newPos)
  {
    this.position = newPos
  }
  drawMe()
  {
    fill(this.red, this.green, this.blue)
    circle(this.position.x, this.position.y, this.size)
    fill(255)
    circle(this.position.x + this.size/4, this.position.y, this.size/4)
    circle(this.position.x - this.size/4, this.position.y, this.size/4)
    line(this.position.x + this.size * 0.45, this.position.y + this.size * 0.25, this.position.x + this.size * 0.5, this.position.y + this.size * 0.75)
    line(this.position.x - this.size * 0.45, this.position.y + this.size * 0.25, this.position.x - this.size * 0.5, this.position.y + this.size * 0.75)
  }
}