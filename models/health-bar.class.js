class HealthBar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/Purple/0_ .png",
    "img/4. Marcadores/Purple/20__1.png",
    "img/4. Marcadores/Purple/40_ .png",
    "img/4. Marcadores/Purple/60_ .png",
    "img/4. Marcadores/Purple/80_ .png",
    "img/4. Marcadores/Purple/100_ .png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImgs(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.height = 200;
    this.width = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImgIndex()];
    this.img = this.imageCache[path];
  }

  resolveImgIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
