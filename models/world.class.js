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

  constructor(canvas, keyboard, mutedSounds, pausedGame) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.mutedSounds = mutedSounds;
    this.pausedGame = pausedGame;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Function to set up the world by assinging character and endboss to it
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  /**
   * Function to initialize game-relevant intervalles
   */
  run() {
    setInterval(() => {
      if (!this.pausedGame) {
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
      }
    }, 200);
  }

  /**
   * Updates the world-class about the current status of pausedGame
   * @param {boolean} pause
   */
  updateGameRunning(pause) {
    this.pausedGame = pause;
  }

  /**
   * Updates the world-class about the current status of mutedSounds
   * @param {boolean} muted
   */
  updateMutedSounds(muted) {
    this.mutedSounds = muted;
  }

  /**
   * Checks the current game status dependent on sharkies health-status and
   * initializes the appropriate functions
   */
  checkGameStatus() {
    if (!this.character.isDeadCharacter) {
      this.playBackgroundTheme();
    }
  }

  characterLost() {
    this.playLostTheme();
    setTimeout(() => {
      showLostScreen();
      this.character.isDeadCharacter = false;
    }, 1000);
  }

  /**
   * Shows the win-screen and initializes the win-theme if sharkie defeated the endboss
   */
  characterWon() {
    this.playWinTheme();
    setTimeout(() => {
      showWinScreen();
    }, 2000);
  }

  /**
   * Plays the background-theme if the sounds are not muted
   */
  playBackgroundTheme() {
    if (!this.mutedSounds) {
      sounds.background_audio.volume = 0.1;
      sounds.background_audio.play();
    } else {
      sounds.background_audio.pause();
    }
  }

  /**
   * Plays the lose-theme if sharkie is defeated and sounds are not muted
   */
  playLostTheme() {
    if (!this.mutedSounds) {
      sounds.background_audio.pause();
      sounds.endboss_fight_audio.pause();
      sounds.game_over_audio.volume = 0.1;
      sounds.game_over_audio.play();
      setTimeout(() => {
        this.mutedSounds = true;
      }, 2000);
    }
  }

  /**
   * Plays the win-theme if sharkie defeated the endboss and sounds are not muted
   */
  playWinTheme() {
    if (!this.mutedSounds) {
      sounds.endboss_fight_audio.pause();
      sounds.game_won_audio.volume = 0.1;
      sounds.game_won_audio.play();
      setTimeout(() => {
        this.mutedSounds = true;
      }, 3000);
    }
  }

  /**
   * Checks if sharkie collidies with a jellyfish and initializes the appropriate
   * functions
   */
  checkCollisionsWithJellyfish() {
    this.level.jellyfishes.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.deadJellyfish) {
        this.character.isSharkieCollidingWithJellyfish();
        enemy.isSharkieCollidingWithJellyfish();
        this.damageCharacter();
      }
    });
  }

  /**
   * Checks if sharkie collidies with a pufferfish and initializes the appropriate
   * functions
   */
  checkCollisionsWithPufferfish() {
    this.level.pufferfishes.forEach((enemy, hitPufferfish) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.attacking &&
        !enemy.deadPufferfish
      ) {
        this.damageCharacter();
        enemy.isMadPufferfish();
        this.character.isSharkieCollidingWithPufferfish();
      }
      if (this.character.isColliding(enemy) && this.character.attacking) {
        this.removeHitPufferfish(hitPufferfish);
        if (!enemy.deadPufferfish) {
          enemy.isHurtPufferfish();
        }
      }
    });
  }

  /**
   * Checks if sharkie collidies with the endboss and initializes the appropriate
   * functions
   */
  checkCollisionsWithEndboss() {
    if (this.character.isCollidingWithEndboss(this.endboss)) {
      this.endboss.isEndbossAttacking();
      this.character.isSharkieCollidingWithEndboss();
      setTimeout(() => {
        this.damageCharacter();
      }, 1000);
    }
  }

  /**
   * Checks if sharkie is facing the endboss after reaching a certain x-coordinate
   * and initializes the appropriate functions
   */
  checkContactWithEndboss() {
    if (this.character.x > 1900) {
      if (!this.character.firstContactEndboss) {
        this.endboss.isFirstContactEndboss();
      }
    }
  }

  /**
   * Function to track the coordinates of sharkie
   */
  endbossFollowCharacter() {
    if (this.endboss.firstContactEndboss && this.endboss.following) {
      let desiredY = this.character.y - this.character.height;

      let distanceX = this.character.x - this.endboss.x;
      let distanceY = desiredY - this.endboss.y;

      this.checkDistance(distanceX, distanceY);
    }
  }

  /**
   * Function to let the endboss move to the updated coordinates of sharkie
   * @param {number} distanceX - Current x-coordinate distance between Sharkie and Endboss
   * @param {number} distanceY - Current y-coordinate distance between Sharkie and Endboss
   */
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

  /**
   * Flips the endboss in the other direction if sharkie moves over an certain x-coordinate
   * @param {number} moveX - current x-coordinate of sharkie
   */
  changeEndbossDirection(moveX) {
    if (moveX < 0) {
      this.endboss.otherDirection = false;
    } else if (moveX >= 3) {
      this.endboss.otherDirection = true;
    }
  }

  /**
   * Checks if an active bubble collides with the endboss and initializes the appropriate
   * functions, depending on the type of the bubble
   */
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

  /**
   * Reduces the health of sharkie and updates the health-bar after
   * getting hit
   */
  damageCharacter() {
    this.character.hit(5);
    this.healthBar.setPercentage(this.character.health);
  }

  /**
   * Checks if Sharkie is colliding with a coin and initializes the appropriate
   * functions
   */
  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin, currentCoin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.removeCollectedCoin(currentCoin);
        this.coinBar.setPercentageCoins(this.character.coins);
      }
    });
  }

  /**
   * Removes the collected coin from the game
   * @param {number} currentCoin - current coin by index
   */
  removeCollectedCoin(currentCoin) {
    if (this.character.coinsAmountFull === false) {
      this.level.coins.splice(currentCoin, 1);
    }
  }

  /**
   * Checks if Sharkie is colliding with a bottle and initializes the appropriate
   * functions
   */
  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle, currentBottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.removeCollectedBottle(currentBottle);
        this.bottleBar.setPercentageBottles(this.character.bottles);
      }
    });
  }

  /**
   * Removes the collected bottle from the game
   * @param {number} currentBottle - current bottle by index
   */
  removeCollectedBottle(currentBottle) {
    if (this.character.bottlesAmountFull === false) {
      this.level.bottles.splice(currentBottle, 1);
    }
  }

  /**
   * Shoots a bubble from type "normal" either to positiv or negativ x-coordinates,
   * depending of the direction sharkie is facing
   */
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

  /**
   * Shoots a bubble from type "toxic" either to positiv or negativ x-coordinates,
   * depending of the direction sharkie is facing. Also updates the the bottle-bar
   */
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

  /**
   * Checks if the shot bubble is colliding with a jellyfish and initializes
   * the appropriate functions
   */
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

  /**
   * Removes the shot bubble, if it collided with an enemy
   * @param {number} shotBubble - current shot bubble by index
   */
  removeShotBubble(shotBubble) {
    this.throwableObjects.splice(shotBubble, 1);
  }

  /**
   * Removes the hit jellyfish
   * @param {number} hitJellyfish - hit jellyfish by index
   */
  removeHitJellyfish(hitJellyfish) {
    setTimeout(() => {
      this.level.jellyfishes.splice(hitJellyfish, 1);
    }, 5000);
  }

  /**
   * Checks if the shot bubble is colliding with a pufferfish and initializes
   * the appropriate functions
   */
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

  /**
   * Removes the hit pufferfish
   * @param {number} hitPufferfish - hit pufferfish by index
   */
  removeHitPufferfish(hitPufferfish) {
    setTimeout(() => {
      this.level.pufferfishes.splice(hitPufferfish, 1);
    }, 1000);
  }

  /**
   * Draws all objects onto the canvas
   */
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

  /**
   * Adds multiple objects from an array to the map
   * @param {array} objects - objects array
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the map
   * @param {object} object - single object
   */
  addToMap(object) {
    if (object.otherDirection) {
      this.flipImg(object);
    }

    object.draw(this.ctx);
    /* object.drawFrame(this.ctx); */ // Function to draw a frame around objects

    if (object.otherDirection) {
      this.flipImgBack(object);
    }
  }

  /**
   * Flips the image
   * @param {object} object - object image
   */
  flipImg(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   * Flips the image back to "normal"
   * @param {object} object - object image
   */
  flipImgBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }
}
