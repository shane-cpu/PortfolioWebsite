class wall {
  constructor(x, y, w, h)
  {
    this.position = {
      x : x,
      y : y
    }
    this.rect = {
      w : w,
      h : h
    }
  }
  draw ()
  {
    rect(this.position.x, this.position.y, this.rect.w, this.rect.h)
  }
}