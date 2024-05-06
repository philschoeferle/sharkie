class Jellyfish extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];
  IMAGES_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
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
    this.loadImgs(this.IMAGES_DEAD);
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
      this.playAnimation(this.IMAGES_DEAD);
      this.startFloating();
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
