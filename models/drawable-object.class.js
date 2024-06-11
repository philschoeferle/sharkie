class DrawableObject {
  x = 0;
  y = 0;
  height = 0;
  width = 0;
  img;
  imageCache = {};
  currentImg = 0;

  /**
   * Function to load an image from the current path
   * @param {string} path - path of the image
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Function to load multiple images from the current path
   * @param {array} arr - array of images
   */
  loadImgs(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the specific context to the canvas and handles if there's an error
   * @param {*} ctx
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("Could not load image, ", this);
    }
  }
}
