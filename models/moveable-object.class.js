class MoveableObject extends DrawableObject {
  health = 100;
  coins = 0;
  coinsAmountFull = false;
  bottles = 0;
  bottlesAmountFull = false;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  lastHit = 0;
  collidingWithJellyfish = false;
  collidingWithPufferfish = false;
  collidingWithEndboss = false;
  deadJellyfish = false;
  deadPufferfish = false;
  madPufferfish = false;
  firstContactEndboss = false;
  invulnerable = false;

  /**
   * Checks if Sharkie is colliding with an object (e.g. Sharkie colliding with a coin) by
   * calculating Sharkie's width, height and coordinates with those of the object
   * @param {object} obj - object (e.g. coin)
   * @returns - boolean depending if it's colliding or not
   */
  isColliding(obj) {
    return (
      this.x + 25 + (this.width - 70) >= obj.x && // Abstand Sharkie zu re. Objekt
      this.x + this.offsetX <= obj.x + obj.width && // Abstand Sharkie zu li. Objekt
      this.y + this.offsetY + (this.height - 120) >= obj.y && // Abstand Sharkie zu überliegendem Objekt
      this.y + this.offsetY <= obj.y + obj.height // Abstand Sharkie zu unterliegendem Objekt
    );
  }

  /**
   * Checks if a shot bubble is colliding with a enemy by calculating the bubble's width,
   * height and coordinates with those of the enemy
   * @param {object} obj - enemy object
   * @returns - boolean depending if it's colliding or not
   */
  isBubbleColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
  }

  /**
   * Checks if Sharkie is colliding with the endboss by calculating Sharkie's width,
   * height and coordinates with those of the endboss
   * @param {object} obj - endboss
   * @returns - boolean depending if it's colliding or not
   */
  isCollidingWithEndboss(obj) {
    return (
      this.x + 25 + (this.width - 70) >= obj.x + 40 &&
      this.x + this.offsetX <= obj.x + obj.width &&
      this.y + this.offsetY + (this.height - 120) >= obj.y + 250 &&
      this.y + this.offsetY <= obj.y + obj.height - 120
    );
  }

  /**
   * Checks if a shot bubble is colliding with the endboss by calculating the bubble's width,
   * height and coordinates with those of the endboss
   * @param {object} obj - endboss
   * @returns - boolean depending if it's colliding or not
   */
  isBubbleCollidingWithEndboss(obj) {
    return (
      this.x + this.width >= obj.x + 40 &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y + 250 &&
      this.y <= obj.y + obj.height - 120
    );
  }

  /**
   * Function to declare that Sharkie is colliding with a jellyfish, while reseting
   * other colliding declarations
   */
  isSharkieCollidingWithJellyfish() {
    this.collidingWithPufferfish = false;
    this.collidingWithEndboss = false;
    this.collidingWithJellyfish = true;
  }

  /**
   * Function to declare that Sharkie is colliding with a pufferfish, while reseting
   * other colliding declarations
   */
  isSharkieCollidingWithPufferfish() {
    this.collidingWithEndboss = false;
    this.collidingWithJellyfish = false;
    this.collidingWithPufferfish = true;
  }

  /**
   * Function to declare that Sharkie is colliding with the endboss, while reseting
   * other colliding declarations
   */
  isSharkieCollidingWithEndboss() {
    this.collidingWithPufferfish = false;
    this.collidingWithJellyfish = false;
    this.collidingWithEndboss = true;
  }

  /**
   * Function to handle Sharkie or the endboss getting hit and reduces the health of them
   * by a certain amount of number, depending on who got hit
   * @param {number} number - amount of the health will get reduced
   */
  hit(number) {
    this.health -= number;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Increases the amount of coins if the coin-bar isn't full
   */
  collectCoin() {
    if (this.coins < 10) {
      this.coins++;
    } else {
      this.coinsAmountFull = true;
    }
  }

  /**
   * Increases the amount of bottles if the bottle-bar isn't full
   */
  collectBottle() {
    if (this.bottles < 5) {
      this.bottles++;
    } else {
      this.bottlesAmountFull = true;
    }
  }

  /**
   * Reduces the amount of collected bottles if a toxic bubble was shot
   */
  reducePercentageBottles() {
    if (this.bottles > 0) {
      this.bottles--;
      this.bottlesAmountFull = false;
    }
  }

  /**
   * Function to make the endboss invulnerable for 2 sec. after getting hit
   */
  invulnerableAfterDamage() {
    this.invulnerable = true;
    setTimeout(() => {
      this.invulnerable = false;
    }, 2000);
  }

  /**
   * Checks if Sharkie or the endboss is currently hurt, depending on the last hit time
   * @returns boolean
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Function to declare the hit jellyfish as dead
   */
  isHurtJellyfish() {
    this.deadJellyfish = true;
  }

  /**
   * Function to declare the hit pufferfish as dead
   */
  isHurtPufferfish() {
    this.deadPufferfish = true;
  }

  /**
   * Function to declare the with a bubble hit pufferfish as "mad"
   */
  isMadPufferfish() {
    this.madPufferfish = true;
  }

  /**
   * Function to declare that it's the first time Sharkie has reached an
   * certain x-coordinate and triggers the encounter with the endboss
   */
  isFirstContactEndboss() {
    this.firstContactEndboss = true;
  }

  /**
   * Function to declare the with a bubble from type normal hit endboss as "mad"
   */
  isMadEndboss() {
    this.currentImg = 0;
    this.madEndboss = true;
  }

  /**
   * Function to declare the object as dead if health is a zero
   * @returns boolean, either true or false
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * Function to play the animation of ordered images of specified objects
   * @param {array} images - images array of speciefied objects
   */
  playAnimation(images) {
    let i = this.currentImg % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImg++;
  }

  /**
   * Function to move an object to positive x-coordinates
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Function to move an object to negative x-coordinates
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Function to move an object to negative y-coordinates
   */
  moveUp() {
    this.y -= this.speed;
  }

  /**
   * Function to move an object to positive y-coordinates
   */
  moveDown() {
    this.y += this.speed;
  }
}
