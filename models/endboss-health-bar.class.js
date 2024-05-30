class EndbossHealthBar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/orange/0_  copia.png",
    "img/4. Marcadores/orange/20_ copia 2.png",
    "img/4. Marcadores/orange/40_  copia.png",
    "img/4. Marcadores/orange/60_  copia.png",
    "img/4. Marcadores/orange/80_  copia.png",
    "img/4. Marcadores/orange/100_  copia.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImgs(this.IMAGES);
    this.x = 500;
    this.y = 0;
    this.height = 200;
    this.width = 60;
    this.setPercentage(100);
  }

  /**
   * Function to set the current percentage of the endboss-health-bar and either
   * decreasing or increasing it
   * @param {number} percentage - current percentage of the endboss-health-bar
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImgIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the endboss-health-bar image by the current health percentage the endboss
   * @returns appropriate endboss-health-bar image
   */
  resolveImgIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
