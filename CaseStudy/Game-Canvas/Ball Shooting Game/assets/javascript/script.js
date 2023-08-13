const scoreEl = document.getElementById("scoreElement");
const startBtnEl = document.getElementById("startBtn");
const dialogEL = document.getElementById("dialog");
const bigScoreEL = document.getElementById("bigScore");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// tạo lớp người chơi : khung hinh tron
//  Create player  : circle
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
// lớp đường đạn
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
// lớp kẻ thù và di chuyển từ bên ngoài vào
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
// class hạt nhỏ bị vỡ ra khi bắn
//tạo hằng số ma sát
const friction = 0.99;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
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
    this.velocity.x *= friction;
    this.velocity.y *= friction;

    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}
let x = canvas.width / 2,
  y = canvas.height / 2;
let player = new Player(x, y, 20, "white");
let projectiles = [];
let enemies = [];
let particles = [];
function init() {
  player = new Player(x, y, 20, "white");
  projectiles = [];
  enemies = [];
  particles = [];
  bigScoreEL.innerText = score;
  scoreEl.innerText = score;
}
function spawnEnemies() {
  // tạo ra mảng địch , cứ 1s chúng ra sẽ cho sản sinh ra 1 kẻ địch
  setInterval(() => {
    let radius = Math.random() * (50 - 6) + 6;
    let x, y;

    if (Math.random() < 0.5) {
      // toạ độ x = 0 thì toạ độ y có thể là bất kì đâu ở trong vùng chiểu cao của canvas
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      // toạ độ y = 0 thì toạ độ x có thể ở bất kì đâu trong vùng chiểu rộng của canvas
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      x = Math.random() * canvas.width;
    }

    let color = `hsl(${Math.random() * 360},50%, 50%)`;
    // đổi chiều hướng từ dích đến là tâm thì 'canvas.height / 2' - y ..
    let angel = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    // sau khi có góc chungs ta sẽ tính vận tốc x, y thông qua sin cos
    let velocity = {
      x: Math.cos(angel),
      y: Math.sin(angel),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
    // console.log(enemies);
  }, 1500);
}
let animationId;
let score = 0;
function animate() {
  animationId = requestAnimationFrame(animate);
  // removeEventListener;
  // đổi màu nền của canvas
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  // xoá hình ảnh luồng đạn
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  particles.forEach((particle, particleIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(particleIndex, 1);
    } else {
      particle.update();
    }
  });
  // hiển thị mảng đường đạn khi kích chuột
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update();
    //projectiles.x - projectiles.radius < 0 đường đạn nằm toàn bộ bên trái
    // xoá toàn bộ đường đạn bên trái
    //projectile.x - projectile.radius > canvas.width  thì xoá toàn bộ phía bên phải màn hình
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        // enemies.splice(enemyIndex, 1);
        projectiles.splice(projectileIndex, 1);
      }, 0);
    }
  });

  // hiển thị mảng địch
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();
    let distanceToPlayer = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    // // end game khi địch va chạm vào người chơi
    if (distanceToPlayer - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      dialogEL.style.display = "block";
      bigScoreEL.innerText = score;
      score = 0;
    }
    projectiles.forEach((projectile, projectileIndex) => {
      let distanceToEnemy = Math.hypot(
        enemy.x - projectile.x,
        enemy.y - projectile.y
      );
      // chạm nhau thì gỡ khỏi màn hình
      if (distanceToEnemy - enemy.radius - projectile.radius < 1) {
        // tao ra cac hạt nổ
        //enemy.radius * 2 vụ nổ nhiều hạt hay ít phuj thuộc vào bán kính của kẻ thủ
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 8),
                y: (Math.random() - 0.5) * (Math.random() * 8),
              }
            )
          );
        }
        // nếu trúng kể thù thì nếu bán kính của kẻ thù > 10 thì
        // giảm bán kính của kẻ thù xuống 10
        // nếu bán kinh của kẻ thù - 10 mà lớn hơn thì với giảm còn k thì xoá luôn kẻ thù
        if (enemy.radius - 10 > 5) {
          // tinh diem
          score += 100;
          scoreEl.innerHTML = score;
          console.log(score);
          // hiệu ứng của thư viên gsap

          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });

          //sau khi bắn thì gỡ đưường đạn ra
          // do kích thước giảm dần nên chung ta sẽ thấy kẻ thù cuả chungs ta nhỏ dàn

          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          // tính điểm khi đánh chết một viên to
          score += 150;
          scoreEl.innerHTML = score;
          console.log(score);

          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}
window.addEventListener("click", (event) => {
  //
  console.log(projectiles);
  const clientX = event.clientX;
  const clientY = event.clientY;
  // xác đinh góc (hay chính là hướng ) từ trung tâm tới điểm nhấp chuột
  // atan2(y2-y1; x2-x1);
  let angel = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  // sau khi có góc chungs ta sẽ tính vận tốc x, y thông qua sin cos
  let velocity = {
    x: Math.cos(angel) * 6,
    y: Math.sin(angel) * 6,
  };
  // mỗi lần kích chuột thì tạo ra một đường đạn mới đưa đường đạn này vào một mảng
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "white", velocity)
  );
});
startBtnEl.addEventListener("click", () => {
  dialogEL.style.display = "none";
  console.log("adfsd");
  init();
  animate();
  spawnEnemies();
});
