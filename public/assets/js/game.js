const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const PLAYER_WIDTH = 20;
var PLAYER_MAX_SPEED = 600.0;
var LASER_MAX_SPEED = 300.0;
var LASER_COOLDOWN = .5;

const ENEMIES_PER_ROW = 10;
const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;
var ENEMY_COOLDOWN = 5.0;


var currentScore = 0;
var pointValue = 1000;
var scoreMultiplier = "";
var lossMulti=.25;
var enemyFace="";
var testnumber=1;
var songCounter=false;

const explosion = new Audio("./assets/sounds/explosion.mp3");
// const dolphin = new Audio("./assets/sounds/dolphin.mp3");
// const explosion = new Audio("./assets/sounds/explosion.wav");


//  var gameMusic = new Audio("./assets/sounds/flow.mp3");
//  var gameMusic = new Audio("./assets/sounds/panic.mp3");
 var gameMusic = new Audio("./assets/sounds/drunken.mp3");


const joeFace="./assets/img/joe.png" ;
const dennisFace="./assets/img/denis.png";
const clintFace="./assets/img/clint.png";

const shipone = "./assets/img/player-red-1.png";
const shiptwo = "./assets/img/player-blue-1.png";
const shipthree = "./assets/img/player-green-1.png";

const songone = "./assets/sounds/flow.mp3";
const songtwo = "./assets/sounds/panic.mp3";
const songthree = "./assets/sounds/drunken.mp3";


function diffEasy(PLAYER_MAX_SPEED, LASER_MAX_SPEED, ENEMY_COOLDOWN) {
  var easy = .5;
  var easyLaser = 2;
  scoreMultiplier = .01;
  PLAYER_MAX_SPEED = PLAYER_MAX_SPEED * easy;
  LASER_MAX_SPEED = LASER_MAX_SPEED * easy;
  ENEMY_COOLDOWN = ENEMY_COOLDOWN * easyLaser;
 pointValue=10
};

function diffMedium(PLAYER_MAX_SPEED, LASER_MAX_SPEED, ENEMY_COOLDOWN) {
  var medium = 1;
  var mediumLaser = 1;
  scoreMultiplier = 1;
  PLAYER_MAX_SPEED = PLAYER_MAX_SPEED * medium;
  LASER_MAX_SPEED = LASER_MAX_SPEED * medium;
  ENEMY_COOLDOWN = ENEMY_COOLDOWN * mediumLaser;
  pointValue=1000
};

function diffHard(PLAYER_MAX_SPEED, LASER_MAX_SPEED, ENEMY_COOLDOWN) {
  var hardcore = 2;
  var hardcoreLaser = .5;
  var hardcoreSpeed = .5;
  scoreMultiplier = 100;
  PLAYER_MAX_SPEED = PLAYER_MAX_SPEED*hardcoreSpeed;
  LASER_MAX_SPEED = LASER_MAX_SPEED*hardcore;
  ENEMY_COOLDOWN = ENEMY_COOLDOWN*hardcoreLaser;
  pointValue=100000;
  lossMulti=.0025;
};

function joeMode() {
  PLAYER_MAX_SPEED=600;
  LASER_MAX_SPEED=1000;
  ENEMY_COOLDOWN=10;
  enemyFace=joeFace;
};
function denisMode() {
  PLAYER_MAX_SPEED=200;
  LASER_MAX_SPEED=100;
  ENEMY_COOLDOWN=3.5;
  enemyFace=dennisFace
};
function clintMode() {
 // PLAYER_MAX_SPEED=1200;
  // LASER_MAX_SPEED=50;
  // ENEMY_COOLDOWN=20;
  PLAYER_MAX_SPEED = 600.0;
  LASER_MAX_SPEED = 300.0;
  ENEMY_COOLDOWN = 5.0;
  enemyFace=clintFace;
};
 
const GAME_STATE = {
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
  playerCooldown: 0,
  lasers: [],
  enemies: [],
  enemyLasers: [],
  gameOver: false
};


function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}

function createPlayer($container) {
  GAME_STATE.playerX = GAME_WIDTH / 2;
  GAME_STATE.playerY = GAME_HEIGHT - 50;
  const $player = document.createElement("img");
  $player.src = shipone;
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
  
}

function destroyPlayer($container, player) {
  $container.removeChild(player);
  GAME_STATE.gameOver = true;
  // gameMusic.play()
  gameMusic.pause();
gameMusic.currentTime = 0;
explosion.play();
  currentScore=currentScore * lossMulti;
  console.log(currentScore)
}

function updatePlayer(dt, $container) {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
    songCounter=true;
    console.log(songCounter)
  }

  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );

  if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
    createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY);
    GAME_STATE.playerCooldown = LASER_COOLDOWN;
  }
  if (GAME_STATE.playerCooldown > 0) {
    GAME_STATE.playerCooldown -= dt;
  }

  const player = document.querySelector(".player");
  setPosition(player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function createLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "./assets/img/spinach.png";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.lasers.push(laser);
  songCounter=true;
  startMusic();
  setPosition($element, x, y);
}

function updateLasers(dt, $container) {
  const lasers = GAME_STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= dt * LASER_MAX_SPEED;
    if (laser.y < 0) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const enemies = GAME_STATE.enemies;
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      if (enemy.isDead) continue;
      const r2 = enemy.$element.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        // Enemy was hit
        destroyEnemy($container, enemy);
        destroyLaser($container, laser);
        break;
      }
    }
  }
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
}

function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}

function createEnemy($container, x, y) {
  const $element = document.createElement("img");
  $element.src = enemyFace;
  $element.className = "enemy";
  $container.appendChild($element);
  const enemy = {
    x,
    y,
    cooldown: rand(0.5, ENEMY_COOLDOWN),
    $element
  };
  GAME_STATE.enemies.push(enemy);
  setPosition($element, x, y);
}

function updateEnemies(dt, $container) {
  const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
  const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;

  const enemies = GAME_STATE.enemies;
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const x = enemy.x + dx;
    const y = enemy.y + dy;
    setPosition(enemy.$element, x, y);
    enemy.cooldown -= dt;
    if (enemy.cooldown <= 0) {
      createEnemyLaser($container, x, y);
      enemy.cooldown = ENEMY_COOLDOWN;
    }
  }
  GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
}

function destroyEnemy($container, enemy) {
  $container.removeChild(enemy.$element);
  enemy.isDead = true;
  currentScore = currentScore + pointValue;
  console.log(currentScore);
  document.querySelector(".score").textContent = "Score Keeper: " + currentScore;
  // const audio = new Audio("./assets/sounds/explosion.wav");
//   audio.pause();
// audio.currentTime = 0;
//   audio.play();
}

function createEnemyLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "./assets/img/manatee.png";
  $element.className = "enemy-laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.enemyLasers.push(laser);
  setPosition($element, x, y);
}

function updateEnemyLasers(dt, $container) {
  const lasers = GAME_STATE.enemyLasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += dt * LASER_MAX_SPEED;
    if (laser.y > GAME_HEIGHT) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const player = document.querySelector(".player");
    const r2 = player.getBoundingClientRect();
    if (rectsIntersect(r1, r2)) {
      // Player was hit
      destroyPlayer($container, player);
      break;
    }
  }
  GAME_STATE.enemyLasers = GAME_STATE.enemyLasers.filter(e => !e.isDead);
}

function init() {
  const $container = document.querySelector(".game");
  createPlayer($container);


  const enemySpacing =
    (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
  for (let j = 0; j < 3; j++) {
    const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
    for (let i = 0; i < ENEMIES_PER_ROW; i++) {
      const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
      createEnemy($container, x, y);
    }
  }
}

function playerHasWon() {
  return GAME_STATE.enemies.length === 0;
}

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;

  if (GAME_STATE.gameOver) {
    // currentScore = currentScore * lossmulti;
    document.querySelector(".score").textContent = "Score Keeper: " + currentScore;
    document.querySelector(".finalScoreLoss").textContent = "Final Score: " + currentScore;
    document.querySelector(".game-over").style.display = "block";
    let scoreObj = {
      currentScore
    };
    $.ajax('/api/newscore', {
      type: 'POST',
      data: scoreObj
    }).then(() => {
      console.log('new score added');
    });
    return;
  }

  if (playerHasWon()) {
    document.querySelector(".finalScoreWin").textContent = "Final Score: " + currentScore;
    document.querySelector(".congratulations").style.display = "block";
    let scoreObj = {
      currentScore
    };
    $.ajax('/api/newscore', {
      type: 'POST',
      data: scoreObj
    }).then(() => {
      console.log('new score added');
    });
    return;
  }

  const $container = document.querySelector(".game");
  updatePlayer(dt, $container);
  updateLasers(dt, $container);
  updateEnemies(dt, $container);
  updateEnemyLasers(dt, $container);

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  }
}
//these statements work, we just need to put in the correct conditions
//leave them commented out for now

 //game mode
 if (testnumber=testnumber) {
  
  clintMode();
}
//  if (condition) {
//   joeMode()
// }
// if (condition) {
//   denisMode()
// } else {
//   denisMode()
// }
//game difficulty
// if (testnumber!=testnumber) {
  
  // diffEasy();
// }
//  if (condition) {
//   diffMedium()
// }
// if (condition) {
//   diffHard()
// } else {
  // diffMedium()
  // diffHard()
// }

init();


function startMusic() {
 if (songCounter=true){
   gameMusic.play()}
 }

let launchBtn = $('#launchgame');


function songSelection() {
  launchBtn.click(() => {
    return $('input[name="song"]:checked').id;
  })
}

function shipSelection() {
  launchBtn.click(() => {
    return $('input[name="ship"]:checked').id;
  })
}

function modeSelection() {
  launchBtn.click(() => {
    return $('input[name="mode"]:checked').id;
  })
}

function viewUserSetup() {
  $(location).attr('href', './usersetup');
}

function viewHighscore() {
  $(location).attr('href', './highscores');
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);