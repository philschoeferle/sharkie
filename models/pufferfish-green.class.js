class PufferfishGreen extends MoveableObject {
  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];
  IMAGES_ATTACKING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
  ];
  IMAGES_ATTACKING_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
  ];
  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
  ];

  height = 60;
  width = 60;
  swimDirection = "left";

  constructor() {
    super().loadImg(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );

    this.x = 500 + Math.random() * 300;
    this.y = 50 + Math.random() * 300;
    this.speed = 0.5 + Math.random() * 3;

    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_DEAD);
    this.loadImgs(this.IMAGES_ATTACKING);
    this.loadImgs(this.IMAGES_ATTACKING_SWIMMING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.swimDirection === "left" && this.x > 500 + Math.random() * 300) {
        this.moveLeft();
        this.otherDirection = false;
      } else if (
        this.swimDirection === "right" &&
        this.x < 1000 + Math.random() * 500
      ) {
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
