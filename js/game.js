let canvas;
let world;
let keyboard = new Keyboard();
let mutedSounds = true;
let pausedGame = false;

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

function showGame() {
  let startScreen = document.getElementById("start-screen");
  let canvasGame = document.getElementById("canvas");
  let ingameMenu = document.getElementById("ingame-menu");

  startScreen.classList.add("d-none");
  canvasGame.classList.remove("d-none");
  ingameMenu.classList.remove("d-none");
}

function backToStart() {
  window.location.reload();
}

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

function setGameRunning() {
  if (world) {
    world.updateGameRunning(pausedGame);
  }
}

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

function setToggledVolume() {
  if (world) {
    world.updateMutedSounds(mutedSounds);
  }
}

function toggleFullscreen() {
  let fullscreenElement = document.documentElement;
  if (!document.fullscreenElement) {
    openFullscreen(fullscreenElement);
  } else {
    closeFullscreen();
  }
  toggleFullscreenImg();
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

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

function openInstructions() {
  let instructionsScreen = document.getElementById("instructions-menu-screen");
  instructionsScreen.classList.remove("d-none");
  showMenuAboutSharkie();
}

function closeInstructions() {
  let instructionsScreen = document.getElementById("instructions-menu-screen");
  instructionsScreen.classList.add("d-none");
}

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

function showWinScreen() {
  let canvasGame = document.getElementById("canvas");
  let winScreen = document.getElementById("win-screen");

  canvasGame.classList.add("d-none");
  winScreen.classList.remove("d-none");
}

function showLostScreen() {
  let canvasGame = document.getElementById("canvas");
  let lostScreen = document.getElementById("lost-screen");

  canvasGame.classList.add("d-none");
  lostScreen.classList.remove("d-none");
}

function clearAllIntervals() {
  let highestTimeoutId = setInterval(";");
  for (var i = 0; i < highestTimeoutId; i++) {
    clearInterval(i);
  }
}

