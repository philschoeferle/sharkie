class Endboss extends MoveableObject {
  IMAGES_INTRO = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  IMAGES_SWIMMING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];
  IMAGES_ATTACKING = [
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
    "img/2.Enemy/3 Final Enemy/Attack/5.png",
    "img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  IMAGES_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  world;
  height = 500;
  width = 500;
  offsetY = 300;
  offsetX = 80;
  y = 1000;
  madEndboss = false;
  following = false;
  attacking = false;

  constructor() {
    super().loadImg(this.IMAGES_SWIMMING[0]);
    this.loadImgs(this.IMAGES_INTRO);
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_ATTACKING);
    this.loadImgs(this.IMAGES_HURT);
    this.loadImgs(this.IMAGES_DEAD);
    this.animate();

    this.x = 2200;
  }

  animate() {
    let i = 0;
    this.currentImg = 0;
    setInterval(() => {
      if (this.firstContactEndboss && i < 10) {
        this.playAnimation(this.IMAGES_INTRO);
        this.y = -50;
        this.following = true;
        i++;
      } else if (this.madEndboss) {
        this.playAnimation(this.IMAGES_ATTACKING);
        setTimeout(() => {
          this.madEndboss = false;
        }, 200);
      } else if (this.attacking) {
        this.playAnimation(this.IMAGES_ATTACKING);
        this.playEndbossBiteSound();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.playEndbossHurtSound();
      } else if (this.isDead()) {
        this.following = false;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.deadEndboss();
        }, 500);
      } else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
      this.playEndbossThemeSound();
    }, 200);
  }

  isEndbossAttacking() {
    this.attacking = true;
    setTimeout(() => {
      this.attacking = false;
    }, 1000);
  }

  deadEndboss() {
    this.currentImg = 5;
    this.startSinking();
  }

  startSinking() {
    setInterval(() => {
      this.sinkToBottom();
    }, 200);
  }

  sinkToBottom() {
    this.y += 5;
    if (this.floatDirection === "right") {
      this.x += 5;
      setTimeout(() => {
        this.floatDirection = "left";
      }, 50);
    } else {
      this.x -= 5;
      setTimeout(() => {
        this.floatDirection = "right";
      }, 50);
    }
  }

  playEndbossThemeSound() {
    if (!this.mutedSounds && this.firstContactEndboss) {
      sounds.background_audio.pause();
      sounds.endboss_fight_audio.volume = 0.05;
      sounds.endboss_fight_audio.play();
    }
  }

  playEndbossBiteSound() {
    if (!this.mutedSounds) {
      sounds.endboss_bite_audio.play();
    }
  }

  playEndbossHurtSound() {
    if (!this.mutedSounds) {
      sounds.endboss_hurt_audio.volume = 0.3;
      sounds.endboss_hurt_audio.play();
    }
  }

  playBiteSound() {
    if (!this.mutedSounds) {
      sounds.endboss_bite_audio.play();
    }
  }
}
