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
  offsetY = 0;
  lastHit = 0;
  deadJellyfish = false;
  deadPufferfish = false;
  madPufferfish = false;

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
      this.x + 25 + (this.width - 70) >= obj.x &&
      this.x + 25 <= obj.x + obj.width &&
      this.y + 80 + this.offsetY + (this.height - 120) >= obj.y &&
      this.y + 80 + this.offsetY <= obj.y + obj.height
    );
  }

  isBubbleColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsetY + this.height >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height
    );
  }

  hit() {
    this.health -= 5;
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

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isHurtJellyfish() {
    this.deadJellyfish = true;
  }

  isHurtPufferfish() {
    this.deadPufferfish = true;
  }

  isMadPufferfish() {
    this.madPufferfish = true;
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

  jump() {
    this.speedY = 10;
  }
}
