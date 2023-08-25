canvas.addEventListener("click", (event) => {
  if (animationId) {
    const clientX = event.clientX;
    const clientY = event.clientY;
    let angel = Math.atan2(
      event.clientY - canvas.height / 2,
      event.clientX - canvas.width / 2
    );
    let velocity = {
      x: Math.cos(angel),
      y: Math.sin(angel),
    };
    projectiles.push(
      new Projectile(
        canvas.width / 2,
        canvas.height / 2,
        5,
        "#ecf0f1",
        velocity
      )
    );
    shootSound.currentTime = 0;
    shootSound.play();
    // console.log(projectiles);
  }
});

// tạo kẻ địch
function spawnEnemies() {
  // tạo ra mảng địch , cứ 1,5s chúng ra sẽ cho sản sinh ra 1 kẻ địch
  // let count = 0;
  setInterval(() => {
    // count++;
    let radius = Math.random() * (50 - 10) + 10;
    let x, y;
    let random = Math.random() < 0.5;
    if (random) {
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
    // sau khi có góc chungs ta sẽ tính vận tốc theo  x, y thông qua sin cos
    let velocity = {
      x: Math.cos(angel),
      y: Math.sin(angel),
    };
    // if (count <= 10) {
    enemies.push(new Enemy(x, y, radius, color, velocity));
    // }
  }, 1500);
}
function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  // hiển thị vụ nổ
  particles.forEach((particle, particleIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(particleIndex, 1);
    } else {
      particle.update();
    }
  });
  // hiển thị đường đạn
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update();
  });
  // hiển thị địch
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();
    let distanceToPlayer = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    // // end game khi địch va chạm vào người chơi
    if (distanceToPlayer - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      gameOverSound.play();
      backgroundMusic.pause();
      gameOverEl.classList.remove("d-none");
      // gameOverEl.style.display = "none";
      bigScoreEL.innerText = score;
      score = 0;
    }

    // Lấy toạ độ khi đường đạn và địch gặp nhau
    projectiles.forEach((projectile, projectileIndex) => {
      let distanceToEnemy = Math.hypot(
        enemy.x - projectile.x,
        enemy.y - projectile.y
      );
      // chạm nhau thì gỡ khỏi màn hình
      if (distanceToEnemy - enemy.radius - projectile.radius < 1) {
        enemyHitSound.currentTime = 0;
        enemyHitSound.play();
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
        if (enemy.radius - 10 > 15) {
          score += 100;
          scoreEl.innerHTML = score;

          // hiệu ứng của thư viên gsap khi dich giam dan kich thuoc
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          // tính điểm khi đánh chết một viên to
          score += 150;
          scoreEl.innerHTML = score;
          // xoa  kẻ thù và đường đạn
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}
