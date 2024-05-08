class Level {
  jellyfishes;
  pufferfishes;
  lights;
  bottles;
  coins;
  backgroundObjects;
  level_end_x = 2200;

  constructor(
    jellyfishes,
    pufferfishes,
    lights,
    bottles,
    coins,
    backgroundObjects
  ) {
    this.jellyfishes = jellyfishes;
    this.pufferfishes = pufferfishes;
    this.lights = lights;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
  }
}
