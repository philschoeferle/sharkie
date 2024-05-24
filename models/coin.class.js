class Coin extends MoveableObject {
  width = 30;
  height = 30;
  x = 100;
  y = 0;

  IMAGES_COIN = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  constructor(x) {
    super().loadImg("img/4. Marcadores/1. Coins/1.png");
    this.loadImgs(this.IMAGES_COIN);
    this.x = x;
    this.y = this.y + Math.random() * 400;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!pausedGame) {
        this.playAnimation(this.IMAGES_COIN);
      }
    }, 120);
  }
}
