class Character extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];
  IMAGES_IDLE = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];
  IMAGES_IDLE_LONG = [
    "img/1.Sharkie/2.Long_IDLE/i1.png",
    "img/1.Sharkie/2.Long_IDLE/I2.png",
    "img/1.Sharkie/2.Long_IDLE/I3.png",
    "img/1.Sharkie/2.Long_IDLE/I4.png",
    "img/1.Sharkie/2.Long_IDLE/I5.png",
    "img/1.Sharkie/2.Long_IDLE/I6.png",
    "img/1.Sharkie/2.Long_IDLE/I7.png",
    "img/1.Sharkie/2.Long_IDLE/I8.png",
    "img/1.Sharkie/2.Long_IDLE/I9.png",
    "img/1.Sharkie/2.Long_IDLE/I10.png",
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];
  IMAGES_IDLE_LONG_SLEEP = [
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];
  IMAGES_HURT_TOXIC = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];
  IMAGES_HURT_ELECTRIC = [
    "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];
  IMAGES_DEAD_TOXIC = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
  ];
  IMAGES_DEAD_ELECTRIC = [
    "img/1.Sharkie/6.dead/2.Electro_shock/1.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/2.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/3.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/4.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/5.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/6.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/7.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/8.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/9.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];
  IMAGES_ATTACK_BUBBLE = [
    "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png",
  ];
  IMAGES_ATTACK_SLAP = [
    "img/1.Sharkie/4.Attack/Fin slap/1.png",
    "img/1.Sharkie/4.Attack/Fin slap/2.png",
    "img/1.Sharkie/4.Attack/Fin slap/3.png",
    "img/1.Sharkie/4.Attack/Fin slap/4.png",
    "img/1.Sharkie/4.Attack/Fin slap/5.png",
    "img/1.Sharkie/4.Attack/Fin slap/6.png",
    "img/1.Sharkie/4.Attack/Fin slap/7.png",
    "img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];

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

  constructor() {
    super().loadImg("img/1.Sharkie/3.Swim/1.png");
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_IDLE);
    this.loadImgs(this.IMAGES_IDLE_LONG);
    this.loadImgs(this.IMAGES_IDLE_LONG_SLEEP);
    this.loadImgs(this.IMAGES_ATTACK_BUBBLE);
    this.loadImgs(this.IMAGES_ATTACK_SLAP);
    this.loadImgs(this.IMAGES_HURT_TOXIC);
    this.loadImgs(this.IMAGES_HURT_ELECTRIC);
    this.loadImgs(this.IMAGES_DEAD_TOXIC);
    this.loadImgs(this.IMAGES_DEAD_ELECTRIC);
    this.animate();
  }

  animate() {
    setInterval(() => {
      sounds.swim_audio.pause();
      if (this.world.keyboard.UP && this.y > -80) {
        this.y -= this.speed;
      }
      if (this.world.keyboard.DOWN && this.y < 300) {
        this.y += this.speed;
      }
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        sounds.swim_audio.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        sounds.swim_audio.play();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.UP && this.y > -80) {
        this.idleCounter = 0;
        this.playAnimation(this.IMAGES_SWIMMING);
      }
      if (this.world.keyboard.DOWN && this.y < 300) {
        this.idleCounter = 0;
        this.playAnimation(this.IMAGES_SWIMMING);
      }
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.idleCounter = 0;
        this.playAnimation(this.IMAGES_SWIMMING);
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.idleCounter = 0;
        this.playAnimation(this.IMAGES_SWIMMING);
        this.otherDirection = true;
      }
    }, 200);

    setInterval(() => {
      if (this.isDead()) {
        this.deadCharacter();
      } else if (this.isHurt()) {
        if (this.collidingWithJellyfish) {
          this.playAnimation(this.IMAGES_HURT_ELECTRIC);
          setTimeout(() => {
            this.collidingWithJellyfish = false;
          }, 1000);
        } else {
          this.playAnimation(this.IMAGES_HURT_TOXIC);
        }
        this.idleCounter = 0;
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.idleCounter = 0;
      } else if (this.idleCounter <= 50) {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleCounter += 1;
      } else if (this.idleCounter < 60) {
        this.playAnimation(this.IMAGES_IDLE_LONG);
        this.idleCounter += 1;
      } else {
        this.playAnimation(this.IMAGES_IDLE_LONG_SLEEP);
      }
    }, 150);

    setInterval(() => {
      if (
        this.world.keyboard.D ||
        (this.world.keyboard.S && this.bottles > 0)
      ) {
        this.idleCounter = 0;
        this.activateAttack();
        this.playAnimation(this.IMAGES_ATTACK_BUBBLE);
        this.attacking = true;
      }
      if (this.world.keyboard.SPACE) {
        this.idleCounter = 0;
        this.activateAttack();
        this.playAnimation(this.IMAGES_ATTACK_SLAP);
        this.attacking = true;
      }
    }, 150);
  }

  activateAttack() {
    if (!this.attacking) {
      this.currentImg = 0;
      if (this.world.keyboard.D) {
        this.activateShootNormalBubble();
        sounds.bubble_shoot.play();
      }
      if (this.world.keyboard.S) {
        this.activateShootToxicBubble();
        sounds.bubble_shoot.play();
      }
      if (this.world.keyboard.SPACE) {
        this.activateSlapAttack();
      }
    }
  }

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
    }, 500);
  }

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
    }, 500);
  }

  activateSlapAttack() {
    let keySPACEIsPressed = setInterval(() => {
      this.attacking = true;
      this.world.keyboard.SPACE = true;
    }, 100);
    setTimeout(() => {
      clearInterval(keySPACEIsPressed);
      this.attacking = false;
      this.world.keyboard.SPACE = false;
    }, 500);
  }

  updateCollidingWithJellyfish(colliding) {
    this.collidingWithJellyfish = colliding;
  }

  deadCharacter() {
    this.deadCharacterAnimation();
    this.isDeadCharacter = true;
  }

  deadCharacterAnimation() {
    if (this.collidingWithJellyfish) {
      this.playAnimation(this.IMAGES_DEAD_ELECTRIC);
    } else {
      this.playAnimation(this.IMAGES_DEAD_TOXIC);
    }
    setTimeout(() => {
      this.currentImg = 9;
    }, 800);
  }
}
