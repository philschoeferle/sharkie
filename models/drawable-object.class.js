class DrawableObject {
  x = 120;
  y = 250;
  height = 100;
  width = 150;
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
      this instanceof Jellyfish ||
      this instanceof Pufferfish ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      if (this instanceof Character) {
        ctx.rect(this.x + 25, this.y + 80, this.height - 50, this.width - 120);
      } else {
        ctx.rect(this.x, this.y, this.height, this.width);
      }
      ctx.stroke();
    }
  }
}
