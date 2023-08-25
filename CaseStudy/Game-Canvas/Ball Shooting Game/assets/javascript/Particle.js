class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.friction = 0.99; // ma sát khi các hạt bắt ra khoảng cách dài hay ngắn
    this.alpha = 1; // để các hạt mờ đi  giá trị ban đầu của nó sẽ là 1 sau đó sẽ mờ dần đi
  }
  draw() {
    ctx.save(); // lưu giữa trạng thái ngữ cảnh
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore(); // khôi phục trái thái save
  }
  update() {
    this.draw();
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}
