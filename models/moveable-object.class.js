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
  deadJellyfish = false;
  deadPufferfish = false;
  madPufferfish = false;
  firstContactEndboss = false;

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

  isFirstContactEndboss() {
    this.firstContactEndboss = true;
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

  checkDifference(charX, charY) {
    if (charX != undefined && charY != undefined) {
      this.differenceX = charX - this.x;
      this.differenceY = charY - this.y;

      this.gapX =
        this.differenceX > 0
          ? Math.min(10, this.differenceX)
          : Math.max(-10, this.differenceX);
      this.gapY =
        this.differenceY > 0
          ? Math.min(10, this.differenceY)
          : Math.max(-10, this.differenceY);

      if (this.gapX > 0) {
        this.otherDirection = true;
      } else {
        this.otherDirection = false;
      }

      this.position_x += this.gapX;
      this.position_y += this.gapY;
    }
  }
}
