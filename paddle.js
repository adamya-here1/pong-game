class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(up) {
    if (up && this.y > 0) this.y -= this.speed;
    else if (!up && this.y < canvas.height - this.height) this.y += this.speed;
  }
}
