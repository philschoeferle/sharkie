class CoinBar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/Purple/0_ _1.png",
    "img/4. Marcadores/Purple/20_ .png",
    "img/4. Marcadores/Purple/40_ _1.png",
    "img/4. Marcadores/Purple/60_ _1.png",
    "img/4. Marcadores/Purple/80_ _1.png",
    "img/4. Marcadores/Purple/100__1.png",
  ];

  coins = 0;

  constructor() {
    super();
    this.loadImgs(this.IMAGES);
    this.x = 20;
    this.y = 50;
    this.height = 200;
    this.width = 60;
    this.setPercentageCoins(0);
  }

  setPercentageCoins(coin) {
    this.coins = coin;
    let path = this.IMAGES[this.resolveImgIndex()];
    this.img = this.imageCache[path];
  }

  resolveImgIndex() {
    if (this.coins == 10) {
      return 5;
    } else if (this.coins > 7) {
      return 4;
    } else if (this.coins > 5) {
      return 3;
    } else if (this.coins > 3) {
      return 2;
    } else if (this.coins > 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
