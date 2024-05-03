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
  y = 80;
  floatDirection = "right";

  constructor() {
    super().loadImg("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");

    this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.25;

    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    /* setInterval(() => {
      this.moveLeft();
    }, 1000 / 60); */

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
