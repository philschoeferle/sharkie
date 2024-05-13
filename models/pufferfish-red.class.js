class PufferfishRed extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];
  IMAGES_ATTACKING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];
  IMAGES_ATTACKING_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
  ];
  IMAGES_DEAD = ["img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png"];

  height = 60;
  width = 60;
  swimDirection = "left";

  constructor() {
    super().loadImg(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png"
    );

    this.x = 500 + Math.random() * 1000;
    this.y = 50 + Math.random() * 300;
    this.speed = 0.3 + Math.random() * 3;

    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_DEAD);
    this.loadImgs(this.IMAGES_ATTACKING);
    this.loadImgs(this.IMAGES_ATTACKING_SWIMMING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.swimDirection === "left" && this.x > 50) {
        this.moveLeft();
        this.otherDirection = false;
      } else if (this.swimDirection === "right" && this.x < 1800) {
        this.moveRight();
        this.otherDirection = true;
      } else {
        this.swimDirection = this.swimDirection === "left" ? "right" : "left";
      }
    }, 1000 / 60);

    setInterval(() => {
      this.setPufferfishAnimation();
    }, 200);
  }

  setPufferfishAnimation() {
    if (this.deadPufferfish) {
      this.playAnimation(this.IMAGES_DEAD);
      this.startShrinking();
    } else if (this.madPufferfish) {
      this.playAnimation(this.IMAGES_ATTACKING_SWIMMING);
      setTimeout(() => {
        this.madPufferfish = false;
      }, 3000);
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }

  startShrinking() {
    this.speed = 0;
    this.x += 5;
    this.y += 5;
    this.height -= 10;
    this.width -= 10;
  }
}
