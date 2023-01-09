
class ball {
  constructor(x, y)
  {
    this.radius = 15
    this.velocity = {
      x : 0,
      y : 0
    }
    this.position = {
      x : x,
      y : y
    }
  }
  applyForce (force)
  {
    this.velocity.x += force.x
    this.velocity.y += force.y
  }
  changeDirection (directionalForce, forceReduced)
  {
    this.velocity.x *= directionalForce.x * forceReduced
    this.velocity.y *= directionalForce.y * forceReduced
  }
  decelerate (deceleration)
  {
    this.velocity.x *= deceleration
    this.velocity.y *= deceleration
  }
  draw()
  {
    ellipse(this.position.x, this.position.y, this.radius * 2)
  }
  move (changeInTime)
  {
    this.position.x += this.velocity.x * changeInTime
    this.position.y += this.velocity.y * changeInTime
  }
  update(changeInTime)
  {
    this.move(changeInTime)
    this.decelerate(0.98)
  }
}