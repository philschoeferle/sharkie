class MoveableObject extends DrawableObject {
  health = 100;
  coins = 0;
  coinsAmountFull = false;
  bottles = 0;
  bottlesAmountFull = false;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.01;
  lastHit = 0;
  collidingWithJellyfish = false;
  collidingWithPufferfish = false;
  deadJellyfish = false;
  deadPufferfish = false;
  madPufferfish = false;
  firstContactEndboss = false;
  invulnerable = false;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  isColliding(obj) {
    return (
      this.x + 25 + (this.width - 70) >= obj.x && // Abstand Sharkie zu re. Objekt
      this.x + this.offsetX <= obj.x + obj.width && // Abstand Sharkie zu li. Objekt
      this.y + this.offsetY + (this.height - 120) >= obj.y && // Abstand Sharkie zu überliegendem Objekt
      this.y + this.offsetY <= obj.y + obj.height // Abstand Sharkie zu unterliegendem Objekt
    );
  }

  isBubbleColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
  }

  isCollidingWithEndboss(obj) {
    return (
      this.x + 25 + (this.width - 70) >= obj.x + 40 && // Abstand Sharkie zu re. Objekt
      this.x + this.offsetX <= obj.x + obj.width && // Abstand Sharkie zu li. Objekt
      this.y + this.offsetY + (this.height - 120) >= obj.y + 250 && // Abstand Sharkie zu überliegendem Objekt
      this.y + this.offsetY <= obj.y + obj.height - 120 // Abstand Sharkie zu unterliegendem Objekt
    );
  }

  isBubbleCollidingWithEndboss(obj) {
    return (
      this.x + this.width >= obj.x + 40 &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y + 250 &&
      this.y <= obj.y + obj.height - 120
    );
  }

  hit(number) {
    this.health -= number;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  collectCoin() {
    if (this.coins < 10) {
      this.coins++;
    } else {
      this.coinsAmountFull = true;
    }
  }

  collectBottle() {
    if (this.bottles < 5) {
      this.bottles++;
    } else {
      this.bottlesAmountFull = true;
    }
  }

  reducePercentageBottles() {
    if (this.bottles > 0) {
      this.bottles--;
      this.bottlesAmountFull = false;
    }
  }

  invulnerableAfterDamage() {
    this.invulnerable = true;
    setTimeout(() => {
      this.invulnerable = false;
    }, 2000);
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isHurtJellyfish() {
    this.deadJellyfish = true;
  }

  isCollidingWithJellyfish() {
    this.collidingWithPufferfish = false;
    this.collidingWithJellyfish = true;
  }

  isCollidingWithPufferfish() {
    this.collidingWithJellyfish = false;
    this.collidingWithPufferfish = true;
  }

  test() {
    console.log(this.collidingWithJellyfish);
    console.log(this.collidingWithPufferfish);
  }

  isHurtPufferfish() {
    this.deadPufferfish = true;
  }

  isMadPufferfish() {
    this.madPufferfish = true;
  }

  isFirstContactEndboss() {
    this.firstContactEndboss = true;
  }

  isMadEndboss() {
    this.currentImg = 0;
    this.madEndboss = true;
  }

  isDead() {
    return this.health == 0;
  }

  playAnimation(images) {
    let i = this.currentImg % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImg++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  jump() {
    this.speedY = 10;
  }
}
