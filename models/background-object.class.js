class BackgroundObject extends MoveableObject {
  width = 720;
  height = 720;
  constructor(imagePath, x) {
    super().loadImg(imagePath);

    this.x = x;
    this.y = 480 - this.height;
  }
}
