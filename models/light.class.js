class Light extends MoveableObject {
  y = 0;
  height = 500;
  width = 250;
  speed = 0.15;

  constructor() {
    super().loadImg("img/3. Background/Layers/1. Light/1.png");

    this.x = Math.random() * 700;
    this.animate();
  }

  animate() {
    /**
     * Handles the Movement of the light-object
     */
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
