class ThrowableObject extends MoveableObject {
  constructor(x, y, otherDirection, img, bubbleType) {
    super().loadImg(img);
    this.x = x;
    this.y = y;
    this.characterFacingLeft = otherDirection;
    this.bubbleType = bubbleType;
    this.height = 30;
    this.width = 30;

    this.shoot();
  }

  /**
   * Function to initialize the movement of the shot bubble
   */
  shoot() {
    this.speedY = 30;
    if (!this.characterFacingLeft) {
      setInterval(() => {
        this.x += 10;
      }, 25);
    } else {
      this.x -= 160;
      setInterval(() => {
        this.x -= 10;
      }, 25);
    }
  }
}
