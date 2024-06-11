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
  deadEndboss = false;
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
      if (!pausedGame) {
        if (this.firstContactEndboss && i < 10) {
          this.playIntroAnimation();
          i++;
        } else if (this.madEndboss) {
          this.playMadEndbossAnimation();
        } else if (this.attacking) {
          this.playEndbossAttackingAnimation();
        } else if (this.isHurt()) {
          this.playEndbossHurtAnimation();
        } else if (this.isDead()) {
          this.endbossIsDefeated();
        } else {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
        this.playEndbossThemeSound();
      }
    }, 200);
  }

  /**
   * Shows the Intro of the endboss
   */
  playIntroAnimation() {
    this.playAnimation(this.IMAGES_INTRO);
    this.y = -50;
    this.following = true;
  }

  /**
   * Shows the mad-endboss animation if he gets hit by the normal bubble
   */
  playMadEndbossAnimation() {
    this.playAnimation(this.IMAGES_ATTACKING);
    setTimeout(() => {
      this.madEndboss = false;
    }, 200);
    this.playEndbossRoarSound();
  }

  /**
   * Shows the attacking animation of the endboss if he collides with Sharkie
   */
  playEndbossAttackingAnimation() {
    this.playAnimation(this.IMAGES_ATTACKING);
    this.playEndbossBiteSound();
  }

  /**
   * Shows the hurt-animation of the endboss if he gets damage
   */
  playEndbossHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.playEndbossHurtSound();
  }

  /**
   * Initializes the win of Sharkie by defeating the endboss
   */
  endbossIsDefeated() {
    this.deadEndboss = true;
    this.following = false;
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.isDeadEndboss();
    }, 500);
  }

  /**
   * Function to cool-down the damage to Sharkie after an attack for 1 sec.
   */
  isEndbossAttacking() {
    this.attacking = true;
    setTimeout(() => {
      this.attacking = false;
    }, 1000);
  }

  /**
   * Initializes the win functions and death-animation of the endboss
   */
  isDeadEndboss() {
    this.currentImg = 5;
    this.startSinking();
    this.world.characterWon();
  }

  /**
   * Initializes the shrink-animation of the endboss
   */
  startSinking() {
    setInterval(() => {
      this.sinkToBottom();
    }, 200);
  }

  /**
   * Slowley increasing the y-coordinate while toggle between positive and negative
   * x-coordinate of the dead endboss to simulate shrinking
   */
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

  /**
   * Pauses the background-theme and plays the endboss-theme if Sharkie encounters
   * the endboss and sounds are not muted
   */
  playEndbossThemeSound() {
    if (!mutedSounds && this.firstContactEndboss && !this.deadEndboss) {
      sounds.background_audio.pause();
      sounds.endboss_fight_audio.volume = 0.05;
      sounds.endboss_fight_audio.play();
    } else {
      sounds.endboss_fight_audio.pause();
    }
  }

  /**
   * Plays the sound of the endboss biting if sounds are not muted
   */
  playEndbossBiteSound() {
    if (!mutedSounds) {
      sounds.endboss_bite_audio.play();
    }
  }

  /**
   * Plays the sound of the endboss getting hurt if sounds are not muted
   */
  playEndbossHurtSound() {
    if (!mutedSounds) {
      sounds.endboss_hurt_audio.volume = 0.3;
      sounds.endboss_hurt_audio.play();
    }
  }

  /**
   * Plays the sound of the endboss roaring if the endboss is mad, because of
   * getting hit with an normal bubble and sounds are not muted
   */
  playEndbossRoarSound() {
    if (!mutedSounds) {
      sounds.endboss_roar_audio.volume = 0.5;
      sounds.endboss_roar_audio.play();
    }
  }
}
