class JellyfishYellow extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];
  IMAGES_REGULAR_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];
  IMAGES_DANGEROUS = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];
  IMAGES_DANGEROUS_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];

  height = 70;
  width = 100;
  floatDirection = "right";
  swimDirection = "up";

  constructor() {
    super().loadImg("img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.y = 50 + Math.random() * 300;
    this.x = 300 + Math.random() * 1000;
    this.speed = 0.5 + Math.random() * 0.25;

    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_REGULAR_DEAD);
    this.loadImgs(this.IMAGES_DANGEROUS);
    this.loadImgs(this.IMAGES_DANGEROUS_DEAD);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!pausedGame) {
        if (this.swimDirection === "up" && this.y > 50) {
          this.moveUp();
        } else if (
          this.swimDirection === "down" &&
          this.y < 450 - (this.height + 50)
        ) {
          this.moveDown();
        } else {
          this.swimDirection = this.swimDirection === "up" ? "down" : "up";
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!pausedGame) {
        this.setJellyfishAnimation();
      }
    }, 200);
  }

  setJellyfishAnimation() {
    if (this.deadJellyfish) {
      if (this.collidingWithJellyfish) {
        this.playAnimation(this.IMAGES_DANGEROUS_DEAD);
      } else {
        this.playAnimation(this.IMAGES_REGULAR_DEAD);
      }
      this.startFloating();
    } else if (this.collidingWithJellyfish) {
      this.playAnimation(this.IMAGES_DANGEROUS);
      setTimeout(() => {
        this.collidingWithJellyfish = false;
      }, 3000);
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }

  startFloating() {
    setInterval(() => {
      this.floatToSurface();
    }, 200);
  }

  floatToSurface() {
    this.y -= 5;
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
}
