class JellyfishLila extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];
  IMAGES_REGULAR_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];
  IMAGES_DANGEROUS = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];
  IMAGES_DANGEROUS_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png",
  ];

  height = 70;
  width = 100;
  floatDirection = "right";
  swimDirection = "up";

  constructor() {
    super().loadImg("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.y = 50 + Math.random() * 300;
    this.x = 700 + Math.random() * 1500;
    this.speed = 0.5 + Math.random() * 0.25;

    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_REGULAR_DEAD);
    this.loadImgs(this.IMAGES_DANGEROUS);
    this.loadImgs(this.IMAGES_DANGEROUS_DEAD);
    this.animate();
  }

  animate() {
    setInterval(() => {
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
    }, 1000 / 60);

    setInterval(() => {
      this.setJellyfishAnimation();
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
