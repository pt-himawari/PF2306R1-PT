const shootSound = new Audio("./assets/sounds/shooting.mp3");
const enemyHitSound = new Audio("./assets/sounds/enemyHitSound.mp3");
const gameOverSound = new Audio("./assets/sounds/gameOverSound.mp3");
const backgroundMusic = new Audio("./assets/sounds/gameBackground.mp3");

// Hàm cập nhật biểu tượng âm thanh và âm lượng dựa trên giá trị âm lượng
function updateVolumeIconAndSound(volumeIcon, volumeRange, sound) {
  if (volumeRange.value === "0") {
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-mute");
    sound.volume = 0;
  } else {
    volumeIcon.classList.remove("fa-volume-mute");
    volumeIcon.classList.add("fa-volume-up");
    sound.volume = parseFloat(volumeRange.value);
  }
}

// Cập nhật biểu tượng âm thanh và âm lượng khi thay đổi
bgVolumeRange.addEventListener("input", () => {
  updateVolumeIconAndSound(bgVolumeIcon, bgVolumeRange, backgroundMusic);
});

shootVolumeRange.addEventListener("input", () => {
  updateVolumeIconAndSound(shootVolumeIcon, shootVolumeRange, shootSound);
});

collisionVolumeRange.addEventListener("input", () => {
  updateVolumeIconAndSound(
    collisionVolumeIcon,
    collisionVolumeRange,
    enemyHitSound
  );
});

// Click vào biểu tượng âm thanh để tắt/bật âm lượng
bgVolumeIcon.addEventListener("click", () => {
  if (bgVolumeRange.value === "0") {
    bgVolumeRange.value = "0.5";
  } else {
    bgVolumeRange.value = "0";
  }
  updateVolumeIconAndSound(bgVolumeIcon, bgVolumeRange, backgroundMusic);

  // Tắt hoặc phát âm thanh backgroundMusic dựa trên giá trị âm lượng
  if (bgVolumeRange.value === "0") {
    backgroundMusic.pause();
  } else {
    backgroundMusic.play();
  }
});

shootVolumeIcon.addEventListener("click", () => {
  if (shootVolumeRange.value === "0") {
    shootVolumeRange.value = "0.5";
  } else {
    shootVolumeRange.value = "0";
  }
  updateVolumeIconAndSound(shootVolumeIcon, shootVolumeRange, shootSound);
});

collisionVolumeIcon.addEventListener("click", () => {
  if (collisionVolumeRange.value === "0") {
    collisionVolumeRange.value = "0.5";
  } else {
    collisionVolumeRange.value = "0";
  }
  updateVolumeIconAndSound(
    collisionVolumeIcon,
    collisionVolumeRange,
    enemyHitSound
  );
});
