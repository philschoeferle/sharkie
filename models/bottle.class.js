class Bottle extends MoveableObject {
  width = 100;
  height = 80;
  x = 100;
  y = 0;

  IMAGES_BOTTLE = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  constructor(x) {
    super().loadImg("img/4. Marcadores/Posión/Animada/1.png");
    this.loadImgs(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = 350 + Math.random() * 30;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!pausedGame) {
        this.playAnimation(this.IMAGES_BOTTLE);
      }
    }, 120);
  }
}
