let canvas;
let world;
let keyboard = new Keyboard();
let mutedSounds = true;
let pausedGame = false;

/**
 * Function to initialize the game
 */
function init() {
  canvas = document.getElementById("canvas");
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
  world = new World(canvas, keyboard, mutedSounds, pausedGame);

  this.showGame();
  this.mobileTouchEvents();
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
 * Reloads the whole site to show the start-screen
 */
function backToStart() {
  window.location.reload();
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
 * Shows a short introduction about Sharkie in the instructions
 */
function showMenuAboutSharkie() {
  let intTextfield = document.getElementById("instruction-menu-textfield");
  intTextfield.innerHTML = "";

  intTextfield.innerHTML = `
  <div class="instructions-menu-about">
    <p>In "Sharkie" you play as a powerful shark navigating the ocean depths. 
    Battle through swarms of jellyfish and pufferfish using your fin slap and bubble attacks. 
    Collect toxic bottles to enhance your bubbles with deadly poison to defeat the mighty orca-endboss and 
    claim dominance over the deep sea.</p>
  </div>
  `;
}

/**
 * Shows the control of Sharkie in the instructions
 */
function showMenuControls() {
  let intTextfield = document.getElementById("instruction-menu-textfield");
  intTextfield.innerHTML = "";

  intTextfield.innerHTML = `
  <div class="instructions-menu-control">
    <div class="instructions-menu-control-div">
      <span>Movement: </span>
      <span>Arrow Keys</span>
    </div>
    <div class="instructions-menu-control-div">
      <span>Normal Bubble Attack:</span>
      <span class="instructions-menu-key">D</span>
    </div>
    <div class="instructions-menu-control-div">
      <span>Toxic Bubble Attack:</span>
      <span class="instructions-menu-key">S</span>
    </div>
    <div class="instructions-menu-control-div">
      <span>Fin Slap Attack:</span>
      <span class="instructions-menu-key">SPACE</span>
    </div>
  </div>
  `;
}

/**
 * Shows the mechanic-rules of enemies in the instructions
 */
function showMenuInstructions() {
  let intTextfield = document.getElementById("instruction-menu-textfield");
  intTextfield.innerHTML = "";

  intTextfield.innerHTML = `
  <div class="instructions-menu-control">
    <div class="instructions-menu-control-div">
      <span>Jellyfish: </span>
      <span>Can only be damaged<br> with bubble attacks.</span>
    </div>
    <div class="instructions-menu-control-div">
      <span>Pufferfish:</span>
      <span>Can only be damaged<br> with fin slap attacks.</span>
    </div>
    <div class="instructions-menu-control-div">
      <span>Endboss (Orca):</span>
      <span>Collect toxic bottles to<br> shoot toxic bubbles,<br> 
      which are the only way<br> to damage the orca.</span>
    </div>
  </div>
  `;
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
  let highestTimeoutId = setInterval(";");
  for (var i = 0; i < highestTimeoutId; i++) {
    clearInterval(i);
  }
}
