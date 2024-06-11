let canvas;
let world;
let keyboard = new Keyboard();
let characterAssets = new Assets();
let mutedSounds = true;
let pausedGame = false;

/**
 * Function to initialize the game
 */
function init() {
  canvas = document.getElementById("canvas");

  initLevel();
  initSounds();
  initWorld();
  showGame();
  mobileTouchEvents();
}

/**
 * Function to initialize the game sounds
 */
function initSounds() {
  sounds = {
    background_audio: new Audio("audio/background-hiphop-beat.mp3"),
    bubble_pop_audio: new Audio("audio/bubble-pop.mp3"),
    bubble_shoot_audio: new Audio("audio/bubble-shoot.mp3"),
    collect_bubble_audio: new Audio("audio/collect-bottle.mp3"),
    collect_coin_audio: new Audio("audio/collect-coin.mp3"),
    endboss_bite_audio: new Audio("audio/endboss-bite.mp3"),
    endboss_fight_audio: new Audio("audio/endboss-fight.mp3"),
    endboss_hurt_audio: new Audio("audio/hurt.mp3"),
    endboss_roar_audio: new Audio("audio/endboss-roar.mp3"),
    fin_slap_audio: new Audio("audio/fin-slap.mp3"),
    game_over_audio: new Audio("audio/game-over.mp3"),
    game_won_audio: new Audio("audio/game-won.mp3"),
    hurt_audio: new Audio("audio/hurt.mp3"),
    hurt_electric_audio: new Audio("audio/hurt-electric.mp3"),
    swim_audio: new Audio("audio/swim.mp3"),
  };
}

/**
 * Function to initialize the game details
 */
function initWorld() {
  world = null;
  world = new World(canvas, keyboard, characterAssets, mutedSounds, pausedGame);
}

/**
 * Function to initalize touchbuttons for mobile devices to control the character
 * without keyboard
 */
function mobileTouchEvents() {
  let keyUp = document.getElementById("key-up");
  let keyLeft = document.getElementById("key-left");
  let keyDown = document.getElementById("key-down");
  let keyRight = document.getElementById("key-right");

  let keyD = document.getElementById("key-d");
  let keyS = document.getElementById("key-s");
  let keySpace = document.getElementById("key-space");

  keyUp.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });

  keyUp.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  keyLeft.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  keyLeft.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  keyDown.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.DOWN = true;
  });

  keyDown.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.DOWN = false;
  });

  keyRight.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  keyRight.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  keyD.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  keyS.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.S = true;
  });

  keySpace.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
}

/**
 * Function to initialize the keys to control the character with keyboard by setting
 * the value to true
 */
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

/**
 * Function to initialize the keys to control the character with keyboard by setting
 * the value to false
 */
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

function backToStart() {
  let startScreen = document.getElementById("start-screen");
  let canvasDiv = document.getElementById("canvas-div");
  let canvasGame = document.getElementById("canvas");
  let ingameMenu = document.getElementById("ingame-menu");
  let ingameArrowKeys = document.getElementById("ingame-arrow-keys-div");
  let ingameLetterKeys = document.getElementById("ingame-letter-keys-div");

  startScreen.classList.remove("d-none");
  canvasDiv.classList.add("d-none");
  canvasGame.classList.add("d-none");
  ingameMenu.classList.add("d-none");
  ingameArrowKeys.classList.add("d-none");
  ingameLetterKeys.classList.add("d-none");
}

/**
 * Removes the start-screen and then displays the canvas with the game-relevant divs
 */
function showGame() {
  let startScreen = document.getElementById("start-screen");
  let canvasDiv = document.getElementById("canvas-div");
  let canvasGame = document.getElementById("canvas");
  let ingameMenu = document.getElementById("ingame-menu");
  let ingameArrowKeys = document.getElementById("ingame-arrow-keys-div");
  let ingameLetterKeys = document.getElementById("ingame-letter-keys-div");

  startScreen.classList.add("d-none");
  canvasDiv.classList.remove("d-none");
  canvasGame.classList.remove("d-none");
  ingameMenu.classList.remove("d-none");
  ingameArrowKeys.classList.remove("d-none");
  ingameLetterKeys.classList.remove("d-none");
}

/**
 * Removes the win-/lost-screen and restarts the game
 */
function restartGame() {
  let lostScreen = document.getElementById("lost-screen");
  let winScreen = document.getElementById("win-screen");

  lostScreen.classList.add("d-none");
  winScreen.classList.add("d-none");

  showGame();
  initLevel();
  initWorld();
  world.resetGameSettings();
}

/**
 * Function to either stop or resume moveable-objects, so to freeze or resume the game
 */
function toggleGameRunning() {
  let gameRunningImg = document.getElementById("game-running-img");

  if (gameRunningImg.src.includes("game-stop.png")) {
    gameRunningImg.src = "img/6.Botones/Menu/game-play.png";
    pausedGame = true;
  } else {
    gameRunningImg.src = "img/6.Botones/Menu/game-stop.png";
    pausedGame = false;
  }
  setGameRunning();
}

/**
 * Updates the current state of pausedGame
 */
function setGameRunning() {
  if (world) {
    world.updateGameRunning(pausedGame);
  }
}

/**
 * Function to either stop or play sounds, including the background-theme
 */
function toggleVolume() {
  let volumeImgStart = document.getElementById("volume-img-start");
  let volumeImgIngame = document.getElementById("volume-img-ingame");

  if (volumeImgStart.src.includes("volume-off.png")) {
    volumeImgStart.src = "img/6.Botones/Menu/volume-on.png";
    volumeImgIngame.src = "img/6.Botones/Menu/volume-on.png";
    mutedSounds = false;
  } else {
    volumeImgStart.src = "img/6.Botones/Menu/volume-off.png";
    volumeImgIngame.src = "img/6.Botones/Menu/volume-off.png";
    mutedSounds = true;
  }
  setToggledVolume();
}

/**
 * Updates the current state of mutedSounds
 */
function setToggledVolume() {
  if (world) {
    world.updateMutedSounds(mutedSounds);
  }
}

/**
 * Function to either apply or dismatch fullscreen, if the device is a desktop
 */
function toggleFullscreen() {
  let fullscreenElement = document.documentElement;
  if (!document.fullscreenElement) {
    openFullscreen(fullscreenElement);
  } else {
    closeFullscreen();
  }
  toggleFullscreenImg();
}

/**
 * Function to apply the fullscreen
 * @param {*} elem
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * Function to dismatch the fullscreen
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Sets the appropriate fullscreen-icon image for the current fullscreen state
 */
function toggleFullscreenImg() {
  let fullscreenImgStart = document.getElementById("fullscreen-img-start");
  let fullscreenImgIngame = document.getElementById("fullscreen-img-ingame");

  if (fullscreenImgStart.src.includes("fullscreen-open.png")) {
    fullscreenImgStart.src = "img/6.Botones/Menu/fullscreen-close.png";
    fullscreenImgIngame.src = "img/6.Botones/Menu/fullscreen-close.png";
  } else {
    fullscreenImgStart.src = "img/6.Botones/Menu/fullscreen-open.png";
    fullscreenImgIngame.src = "img/6.Botones/Menu/fullscreen-open.png";
  }
}

/**
 * Shows the instructions-screen
 */
function openInstructions() {
  let instructionsScreen = document.getElementById("instructions-menu-screen");
  instructionsScreen.classList.remove("d-none");
  showMenuAboutSharkie();
}

/**
 * Closes the instructions-screen
 */
function closeInstructions() {
  let instructionsScreen = document.getElementById("instructions-menu-screen");
  instructionsScreen.classList.add("d-none");
}

/**
 * Shows the win-screen if sharkie won against the endboss
 */
function showWinScreen() {
  let canvasDiv = document.getElementById("canvas-div");
  let canvasGame = document.getElementById("canvas");
  let ingameMenu = document.getElementById("ingame-menu");
  let winScreen = document.getElementById("win-screen");

  canvasDiv.classList.add("d-none");
  canvasGame.classList.add("d-none");
  ingameMenu.classList.add("d-none");
  winScreen.classList.remove("d-none");
}

/**
 * Show a lose-screen if sharkie lost against enemies
 */
function showLostScreen() {
  let canvasDiv = document.getElementById("canvas-div");
  let canvasGame = document.getElementById("canvas");
  let ingameMenu = document.getElementById("ingame-menu");
  let lostScreen = document.getElementById("lost-screen");

  canvasDiv.classList.add("d-none");
  canvasGame.classList.add("d-none");
  ingameMenu.classList.add("d-none");
  lostScreen.classList.remove("d-none");
}

/**
 * Stops every Intevall and resets them
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
