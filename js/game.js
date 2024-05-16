let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  if (e.keyCode == 83) {
    keyboard.S = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
  if (e.keyCode == 83) {
    keyboard.S = false;
  }
});

function toggleVolume() {
  let volumeImg = document.getElementById("volume-img");

  if (volumeImg.src.includes("volume-off.png")) {
    volumeImg.src = "img/6.Botones/Menu/volume-on.png";
  } else {
    volumeImg.src = "img/6.Botones/Menu/volume-off.png";
  }
}

function toggleInstructions() {
  let instructionsImg = document.getElementById("instructions-img");

  if (instructionsImg.src.includes("instruction-open.png")) {
    instructionsImg.src = "img/6.Botones/Menu/instruction-close.png";
  } else {
    instructionsImg.src = "img/6.Botones/Menu/instruction-open.png";
  }
}

function toggleFullscreen() {
  let fullscreenImg = document.getElementById("fullscreen-img");

  if (fullscreenImg.src.includes("fullscreen-open.png")) {
    fullscreenImg.src = "img/6.Botones/Menu/fullscreen-close.png";
  } else {
    fullscreenImg.src = "img/6.Botones/Menu/fullscreen-open.png";
  }
}

function clearAllIntervals() {
  let highestTimeoutId = setInterval(";");
  for (var i = 0; i < highestTimeoutId; i++) {
    clearInterval(i);
  }
}
