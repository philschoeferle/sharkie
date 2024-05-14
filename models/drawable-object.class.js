class DrawableObject {
  x = 0;
  y = 0;
  height = 0;
  width = 0;
  img;
  imageCache = {};
  currentImg = 0;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImgs(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("Could not load image, ", this);
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof JellyfishLila ||
      this instanceof JellyfishYellow ||
      this instanceof PufferfishRed ||
      this instanceof PufferfishGreen ||
      this instanceof PufferfishOrange ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      if (this instanceof Character) {
        ctx.rect(this.x + 25, this.y + 80, this.height - 50, this.width - 120);
      } else if (this instanceof Endboss) {
        ctx.rect(
          this.x + 40,
          this.y + 250,
          this.height - 120,
          this.width - 350
        );
      } else {
        ctx.rect(this.x, this.y, this.height, this.width);
      }
      ctx.stroke();
    }
  }
}
