class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  collectedBottles = 0;
  endboss = new Endboss();
  endbossHealthBar = new EndbossHealthBar();
  throwableObjects = [];

  constructor(canvas, keyboard, mutedSounds) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.mutedSounds = mutedSounds;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  run() {
    setInterval(() => {
      this.checkGameStatus();
      this.checkCollisionsWithJellyfish();
      this.checkCollisionsWithPufferfish();
      this.checkCollisionsWithEndboss();
      this.checkCollisionsWithCoins();
      this.checkCollisionsWithBottles();
      this.checkBubbleCollisionsWithJellyfish();
      this.checkBubbleCollisionsWithPufferfish();
      this.checkBubbleCollisionsWithEndboss();
      this.checkContactWithEndboss();
      this.endbossFollowCharacter();
    }, 200);
  }

  updateMutedSounds(muted) {
    this.mutedSounds = muted;
  }

  checkGameStatus() {
    if (this.character.isDeadCharacter) {
    } else {
      if (!this.mutedSounds) {
        sounds.background_audio.volume = 0.1;
        sounds.background_audio.play();
      } else {
        sounds.background_audio.pause();
      }
    }
  }

  checkCollisionsWithJellyfish() {
    this.level.jellyfishes.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.deadJellyfish) {
        enemy.isDangerousJellyfish();
        this.damageCharacter();
        this.character.updateCollidingWithJellyfish(true);
      }
    });
  }

  checkCollisionsWithPufferfish() {
    this.level.pufferfishes.forEach((enemy, hitPufferfish) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.attacking &&
        !enemy.deadPufferfish
      ) {
        this.damageCharacter();
        enemy.isMadPufferfish();
      }
      if (this.character.isColliding(enemy) && this.character.attacking) {
        this.removeHitPufferfish(hitPufferfish);
        if (!enemy.deadPufferfish) {
          enemy.isHurtPufferfish();
        }
      }
    });
  }

  checkCollisionsWithEndboss() {
    if (this.character.isCollidingWithEndboss(this.endboss)) {
      this.endboss.isEndbossAttacking();
      setTimeout(() => {
        this.damageCharacter();
      }, 1000);
    }
  }

  checkContactWithEndboss() {
    if (this.character.x > 1900) {
      if (!this.character.firstContactEndboss) {
        this.endboss.isFirstContactEndboss();
      }
    }
  }

  endbossFollowCharacter() {
    if (this.endboss.firstContactEndboss && this.endboss.following) {
      let desiredY = this.character.y - this.character.height;

      let distanceX = this.character.x - this.endboss.x;
      let distanceY = desiredY - this.endboss.y;

      this.checkDistance(distanceX, distanceY);
    }
  }

  checkDistance(distanceX, distanceY) {
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance > 5) {
      let scaleFactor = 5 / distance;
      let moveX = distanceX * scaleFactor;
      let moveY = distanceY * scaleFactor;

      this.endboss.x += moveX;
      this.endboss.y += moveY;

      this.changeEndbossDirection(moveX);
    }
  }

  changeEndbossDirection(moveX) {
    if (moveX < 0) {
      this.endboss.otherDirection = false;
    } else if (moveX >= 3) {
      this.endboss.otherDirection = true;
    }
  }

  checkBubbleCollisionsWithEndboss() {
    setInterval(() => {
      this.throwableObjects.forEach((bubble, shotBubble) => {
        if (bubble.isBubbleCollidingWithEndboss(this.endboss)) {
          if (
            !this.endboss.madEndboss &&
            this.throwableObjects[shotBubble].bubbleType == "normal"
          ) {
            this.endboss.isMadEndboss();
          }
          if (
            !this.endboss.invulnerable &&
            this.throwableObjects[shotBubble].bubbleType == "toxic"
          ) {
            this.endboss.hit(20);
            this.endbossHealthBar.setPercentage(this.endboss.health);
            this.endboss.invulnerableAfterDamage();
          }
          this.removeShotBubble(shotBubble);
        }
      });
    }, 500);
  }

  damageCharacter() {
    this.character.hit(5);
    this.healthBar.setPercentage(this.character.health);
  }

  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin, currentCoin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.removeCollectedCoin(currentCoin);
        this.coinBar.setPercentageCoins(this.character.coins);
      }
    });
  }

  removeCollectedCoin(currentCoin) {
    if (this.character.coinsAmountFull === false) {
      this.level.coins.splice(currentCoin, 1);
    }
  }

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle, currentBottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.removeCollectedBottle(currentBottle);
        this.bottleBar.setPercentageBottles(this.character.bottles);
      }
    });
  }

  removeCollectedBottle(currentBottle) {
    if (this.character.bottlesAmountFull === false) {
      this.level.bottles.splice(currentBottle, 1);
    }
  }

  shootNormalBubble() {
    let bubble = new ThrowableObject(
      this.character.x + 160,
      this.character.y + 100,
      this.character.otherDirection,
      "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png",
      "normal"
    );
    this.throwableObjects.push(bubble);
  }

  shootToxicBubble() {
    let bubble = new ThrowableObject(
      this.character.x + 160,
      this.character.y + 100,
      this.character.otherDirection,
      "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
      "toxic"
    );
    this.throwableObjects.push(bubble);
    this.character.reducePercentageBottles();
    this.bottleBar.setPercentageBottles(this.character.bottles);
  }

  checkBubbleCollisionsWithJellyfish() {
    setInterval(() => {
      this.throwableObjects.forEach((bubble, shotBubble) => {
        this.level.jellyfishes.forEach((enemy, hitJellyfish) => {
          if (bubble.isBubbleColliding(enemy)) {
            this.removeShotBubble(shotBubble);
            this.removeHitJellyfish(hitJellyfish);
            if (!enemy.deadJellyfish) {
              enemy.isHurtJellyfish();
            }
          }
        });
      });
    }, 500);
  }

  removeShotBubble(shotBubble) {
    this.throwableObjects.splice(shotBubble, 1);
  }

  removeHitJellyfish(hitJellyfish) {
    setTimeout(() => {
      this.level.jellyfishes.splice(hitJellyfish, 1);
    }, 5000);
  }

  checkBubbleCollisionsWithPufferfish() {
    setInterval(() => {
      this.throwableObjects.forEach((bubble, shotBubble) => {
        this.level.pufferfishes.forEach((enemy) => {
          if (bubble.isBubbleColliding(enemy)) {
            this.removeShotBubble(shotBubble);
            if (!enemy.madPufferfish) {
              enemy.isMadPufferfish();
            }
          }
        });
      });
    }, 500);
  }

  removeHitPufferfish(hitPufferfish) {
    setTimeout(() => {
      this.level.pufferfishes.splice(hitPufferfish, 1);
    }, 1000);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.jellyfishes);
    this.addObjectsToMap(this.level.pufferfishes);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.lights);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    // ----- Space for fixed objects -----
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.endboss.firstContactEndboss) {
      this.addToMap(this.endbossHealthBar);
    }

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImg(object);
    }

    object.draw(this.ctx);
    object.drawFrame(this.ctx);

    if (object.otherDirection) {
      this.flipImgBack(object);
    }
  }

  flipImg(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  flipImgBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }
}
