class Character extends MoveableObject {
  width = 200;
  height = 200;
  y = 200;
  offsetY = 80;
  offsetX = 80;
  speed = 3;
  idleCounter = 0;
  attacking = false;
  isDeadCharacter = false;
  world;
  characterAssets;

  constructor() {
    super().loadImg("img/1.Sharkie/3.Swim/1.png");
    this.characterAssets = characterAssets;

    this.loadImgs(this.characterAssets.IMAGES_SWIMMING);
    this.loadImgs(this.characterAssets.IMAGES_IDLE);
    this.loadImgs(this.characterAssets.IMAGES_IDLE_LONG);
    this.loadImgs(this.characterAssets.IMAGES_IDLE_LONG_SLEEP);
    this.loadImgs(this.characterAssets.IMAGES_ATTACK_BUBBLE);
    this.loadImgs(this.characterAssets.IMAGES_ATTACK_SLAP);
    this.loadImgs(this.characterAssets.IMAGES_HURT_TOXIC);
    this.loadImgs(this.characterAssets.IMAGES_HURT_ELECTRIC);
    this.loadImgs(this.characterAssets.IMAGES_DEAD_TOXIC);
    this.loadImgs(this.characterAssets.IMAGES_DEAD_ELECTRIC);
    this.animate();
  }

  /**
   * Initializes the different animation-szenarios of Sharkie
   */
  animate() {
    this.characterControl();
    this.characterMoveAnimation();
    this.characterStateAnimation();
    this.characterAttacks();
  }

  /**
   * Handles the visible control of Sharkie
   */
  characterControl() {
    setInterval(() => {
      if (!pausedGame) {
        sounds.swim_audio.pause();

        this.checkIfMovingUp();
        this.checkIfMovingDown();
        this.checkIfMovingRight();
        this.checkIfMovingLeft();

        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);
  }

  /**
   * Function to control the up-movement
   */
  checkIfMovingUp() {
    if (this.world.keyboard.UP && this.y > -80) {
      this.y -= this.speed;
    }
  }

  /**
   * Function to control the down-movement
   */
  checkIfMovingDown() {
    if (this.world.keyboard.DOWN && this.y < 300) {
      this.y += this.speed;
    }
  }

  /**
   * Function to control the right-movement
   */
  checkIfMovingRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.characterMoveRight();
    }
  }

  /**
   * Function to control the left-movement
   */
  checkIfMovingLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.characterMoveLeft();
    }
  }

  /**
   * Handles the visual character-movement to the right
   */
  characterMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    this.playSwimSound();
  }

  /**
   * Handles the visual character-movement to the left
   */
  characterMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.playSwimSound();
  }

  /**
   * Handles the animation of Sharkie while moving
   */
  characterMoveAnimation() {
    setInterval(() => {
      if (!pausedGame) {
        this.checkAnimationMoveUp();
        this.checkAnimationMoveDown();
        this.checkAnimationMoveRight();
        this.checkAnimationMoveLeft();
      }
    }, 200);
  }

  /**
   * Handles the animation of Sharkie while moving up
   */
  checkAnimationMoveUp() {
    if (this.world.keyboard.UP && this.y > -80) {
      this.swimAnimation();
    }
  }

  /**
   * Handles the animation of Sharkie while moving down
   */
  checkAnimationMoveDown() {
    if (this.world.keyboard.DOWN && this.y < 300) {
      this.swimAnimation();
    }
  }

  /**
   * Handles the animation of Sharkie while moving right
   */
  checkAnimationMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.swimAnimation();
      this.otherDirection = false;
    }
  }

  /**
   * Handles the animation of Sharkie while moving left
   */
  checkAnimationMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.swimAnimation();
      this.otherDirection = true;
    }
  }

  /**
   * Shows the swim animation and resets the idleCounter
   */
  swimAnimation() {
    this.idleCounter = 0;
    this.playAnimation(this.characterAssets.IMAGES_SWIMMING);
  }

  /**
   * Function to handle the appropriate Sharkie-animation dependent on
   * various requirements
   */
  characterStateAnimation() {
    setInterval(() => {
      if (!pausedGame) {
        if (this.isDead()) {
          this.deadCharacter();
        } else if (this.isHurt()) {
          this.hurtCharacterAnimation();
          this.idleCounter = 0;
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.swimAnimation();
        } else if (this.idleCounter <= 50) {
          this.playAnimation(this.characterAssets.IMAGES_IDLE);
          this.idleCounter += 1;
        } else if (this.idleCounter < 60) {
          this.playAnimation(this.characterAssets.IMAGES_IDLE_LONG);
          this.idleCounter += 1;
        } else {
          this.playAnimation(this.characterAssets.IMAGES_IDLE_LONG_SLEEP);
        }
      }
    }, 150);
  }

  /**
   * Function to initialize the specific attack functions
   */
  characterAttacks() {
    setInterval(() => {
      if (!pausedGame) {
        if (
          this.world.keyboard.D ||
          (this.world.keyboard.S && this.bottles > 0)
        ) {
          this.characterBubbleAttack();
        }
        if (this.world.keyboard.SPACE) {
          this.characterSlapAttack();
        }
      }
    }, 150);
  }

  /**
   * Initializes the bubble attack functions
   */
  characterBubbleAttack() {
    this.idleCounter = 0;
    this.activateAttack();
    this.playAnimation(this.characterAssets.IMAGES_ATTACK_BUBBLE);
    this.attacking = true;
  }

  /**
   * Initializes the slap attack functions
   */
  characterSlapAttack() {
    this.idleCounter = 0;
    this.activateAttack();
    this.playAnimation(this.characterAssets.IMAGES_ATTACK_SLAP);
    this.attacking = true;
  }

  /**
   * Function to handle the different attack patterns
   */
  activateAttack() {
    if (!this.attacking) {
      this.currentImg = 0;
      if (this.world.keyboard.D) {
        this.activateShootNormalBubble();
      }
      if (this.world.keyboard.S) {
        this.activateShootToxicBubble();
      }
      if (this.world.keyboard.SPACE) {
        this.activateSlapAttack();
      }
    }
  }

  /**
   * Function to handle the bubble attack from type normal
   */
  activateShootNormalBubble() {
    let keyDIsPressed = setInterval(() => {
      this.attacking = true;
      this.world.keyboard.D = true;
    }, 100);
    setTimeout(() => {
      clearInterval(keyDIsPressed);
      this.attacking = false;
      this.world.keyboard.D = false;
      this.world.shootNormalBubble();
      this.playBubbleShootSound();
    }, 500);
  }

  /**
   * Function to handle the bubble attack from type toxic
   */
  activateShootToxicBubble() {
    let keySIsPressed = setInterval(() => {
      this.attacking = true;
      this.world.keyboard.S = true;
    }, 100);
    setTimeout(() => {
      clearInterval(keySIsPressed);
      this.attacking = false;
      this.world.keyboard.S = false;
      this.world.shootToxicBubble();
      this.playBubbleShootSound();
    }, 500);
  }

  /**
   * Function to handle the slap attack
   */
  activateSlapAttack() {
    let keySPACEIsPressed = setInterval(() => {
      this.attacking = true;
      this.world.keyboard.SPACE = true;
    }, 100);
    setTimeout(() => {
      clearInterval(keySPACEIsPressed);
      this.attacking = false;
      this.world.keyboard.SPACE = false;
      this.playFinSlapSound();
    }, 500);
  }

  /**
   * Function to filter the specific hurt animations and sounds of Sharkie
   */
  hurtCharacterAnimation() {
    if (this.collidingWithJellyfish) {
      this.playAnimation(this.characterAssets.IMAGES_HURT_ELECTRIC);
      this.playHurtElectricSound();
    } else {
      this.playAnimation(this.characterAssets.IMAGES_HURT_TOXIC);
      this.playHurtNormalSound();
    }
  }

  /**
   * Initializes the animation of dead Sharkie
   */
  deadCharacter() {
    this.deadCharacterAnimation();
    this.isDeadCharacter = true;
    this.world.characterLost();
  }

  /**
   * Function to animate the specific death animation of Sharkie
   */
  deadCharacterAnimation() {
    if (this.collidingWithJellyfish) {
      this.playAnimation(this.characterAssets.IMAGES_DEAD_ELECTRIC);
    } else {
      this.playAnimation(this.characterAssets.IMAGES_DEAD_TOXIC);
    }
    setTimeout(() => {
      this.currentImg = 9;
    }, 800);
  }

  /**
   * Function to play the swim sound while Sharkie is moving and
   * sounds are not muted
   */
  playSwimSound() {
    if (!mutedSounds) {
      sounds.swim_audio.volume = 0.5;
      sounds.swim_audio.play();
    }
  }

  /**
   * Function to play the bubble-shot attack sound if sounds are not muted
   */
  playBubbleShootSound() {
    if (!mutedSounds) {
      sounds.bubble_shoot_audio.play();
    }
  }

  /**
   * Function to play the slap attack sound if sounds are not muted
   */
  playFinSlapSound() {
    if (!mutedSounds) {
      sounds.fin_slap_audio.play();
    }
  }

  /**
   * Function to play the normal hurt sound if Sharkie gets
   * hit by a pufferfish or the endboss and sounds are not muted
   */
  playHurtNormalSound() {
    if (!mutedSounds) {
      sounds.hurt_audio.volume = 0.3;
      sounds.hurt_audio.play();
    }
  }

  /**
   * Function to play the electric hurt sound if Sharkie gets
   * hit by a jellyfish and sounds are not muted
   */
  playHurtElectricSound() {
    if (!mutedSounds) {
      sounds.hurt_electric_audio.volume = 0.3;
      sounds.hurt_electric_audio.play();
    }
  }
}
