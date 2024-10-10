class Ball {
  constructor(x, y, radius, vx, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Ball collision with top and bottom
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
  }

  reset() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.vx = 5 * (Math.random() > 0.5 ? 1 : -1); // Random initial direction
    this.vy = 5 * (Math.random() > 0.5 ? 1 : -1);
  }
}
