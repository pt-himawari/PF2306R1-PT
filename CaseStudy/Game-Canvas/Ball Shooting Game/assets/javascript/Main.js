let x = canvas.width / 2,
  y = canvas.height / 2;
let player = new Player(x, y, 20, "#ecf0f1");
let projectiles = [];
let enemies = [];
let particles = [];
let animationId;
let score = 0;
function init() {
  player = new Player(x, y, 20, "#ecf0f1");
  projectiles = [];
  enemies = [];
  particles = [];
  bigScoreEL.innerText = score;
  scoreEl.innerText = score;
}

startBtnEl.addEventListener("click", () => {
  dialogEL.style.display = "none";
  backgroundMusic.play();
  init();
  animate();
  spawnEnemies();
});
replayBtnEl.addEventListener("click", () => {
  gameOverEl.classList.add("d-none");
  backgroundMusic.play();
  init();
  animate();
  spawnEnemies();
  backgroundMusic.play();
});
