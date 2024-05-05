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
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisionsWithJellyfish();
      this.checkCollisionsWithPufferfish();
      this.checkCollisionsWithEndboss();
      this.checkCollisionsWithCoins();
      this.checkCollisionsWithBottles();
      this.checkBubbleCollisionsWithJellyfish();
      this.checkBubbleCollisionsWithPufferfish();
    }, 200);
  }

  checkCollisionsWithJellyfish() {
    this.level.jellyfishes.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.deadJellyfish) {
        this.damageCharacter();
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
    this.level.endboss.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.damageCharacter();
      }
    });
  }

  damageCharacter() {
    this.character.hit();
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
      "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"
    );
    this.throwableObjects.push(bubble);
  }

  shootToxicBubble() {
    let bubble = new ThrowableObject(
      this.character.x + 160,
      this.character.y + 100,
      this.character.otherDirection,
      "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
    );
    this.throwableObjects.push(bubble);
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

    this.ctx.translate(-this.camera_x, 0);
    // ----- Space for fixed objects -----
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);

    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.jellyfishes);
    this.addObjectsToMap(this.level.pufferfishes);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.lights);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

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
