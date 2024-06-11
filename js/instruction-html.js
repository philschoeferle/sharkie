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
      <div class="instructions-menu-about-sources">
        <span>Sources:</span>
        <a href="https://icon-icons.com/de/">Icons</a>
        <span> - </span>
        <a href="https://freesound.org/">Sounds</a>
      </div>
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
