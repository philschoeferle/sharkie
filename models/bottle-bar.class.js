class BottleBar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/Purple/0_.png",
    "img/4. Marcadores/Purple/20_.png",
    "img/4. Marcadores/Purple/40_.png",
    "img/4. Marcadores/Purple/60_.png",
    "img/4. Marcadores/Purple/80_.png",
    "img/4. Marcadores/Purple/100_.png",
  ];

  bottles = 0;

  constructor() {
    super();
    this.loadImgs(this.IMAGES);
    this.x = 20;
    this.y = 100;
    this.height = 200;
    this.width = 60;
    this.setPercentageBottles(0);
  }

  setPercentageBottles(bottle) {
    this.bottles = bottle;
    let path = this.IMAGES[this.resolveImgIndex()];
    this.img = this.imageCache[path];
  }

  resolveImgIndex() {
    if (this.bottles == 5) {
      return 5;
    } else if (this.bottles >= 4) {
      return 4;
    } else if (this.bottles >= 3) {
      return 3;
    } else if (this.bottles >= 2) {
      return 2;
    } else if (this.bottles >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
