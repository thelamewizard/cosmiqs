let ite = 0;
let phase = 0;

let gun;
let ennemis = [];
let bullets = [];

let background;
let gunCol; //gunner color 
let selectDiff; //difficulty selector

let boss, boss2;
//image when character dies and life of the character
let boom, heart;
//difficulties
let difficulty = "easy";
// the necessary for the fireworks
//fireworks array 
let fireworks = [];
//array containing the text to display
let gravity;
//tableau contenant le texte à afficher
let letter = ["Vctory!", "Defeat"];
//count the progress in the table
let textCounter = 0;

//before setup, load font and music
function preload() {
  font = loadFont('Montserrat-Regular.ttf');
}

function setup() {
  createCanvas(800, 600);
  boom = loadImage("img/boom_effect.png");
  heart = loadImage("img/heart.png");
  gun = new Gunner(400, 510, 0, 100, 100);
  boss = new Boss(width / 2, 50, 80, 180);
  boss2 = new Boss(width / 3, 0, 100, 200);

 /*initialization of the arrays moved to start so that for the tests on the boss I can go directly to phase 2 without facing the enemies*/

 //initialisation du tableau de balles
  /*for (let i =0; i<8; i++) {
   bullets[i]= new Bullet(i*100,600,2,-2);
  }*/

  background = loadImage("img/background.png");

//small text under the canvas
  createP("By: Afsheen Shargh");
  createP("Difficulty");

//choose the difficulty
  selectDiff = createSelect();
  selectDiff.option('easy');
  selectDiff.option('medium');
  selectDiff.option('hard');
  selectDiff.option('impossible');
  selectDiff.changed(mySelectEvent); //if we change value then it launches the mySelectEvent function

  //fireworks :
  //gravité dirige de 0 en abscisse et +0.2 en ordonné
  gravity = createVector(0, 0.2);
}

function draw() {
  image(background, 0, 0, width, height);
  /*course of the game with a phase for the start, one for the enemies, one for the boss and 2 for victory or defeat*/
  allPhases();
  //constant display
  display();

}

//constant display
function display() {
// display of player life 
  life();
//display balls
  for (let b of bullets) {
    b.show();
  //check if a bullet hits an enemy
    for (let e of ennemis) {
      if (b.hit(e)) {
        e.damage++;
      }
    }
    //checks if a bullet hits the boss
    if (phase == 2) {
      if (b.hit(boss)) {
        boss.damage++;
      }
      if (difficulty == "impossible" && b.hit(boss2)) {
        boss2.damage++;
      }
    }
    //chek if bullet hit us
    if (b.hit(gun)) {
      gun.damage++;
    }
  }

//display + movement of our cannon
  gun.show(ite);
  gun.move();
// display of enemies, reverse path (because problem during the supp)
  for (let i = ennemis.length - 1; i >= 0; i--) {
    ennemis[i].show();
    //si l'ennemi est mort on l'enlève de l'array
    if (ennemis[i].death() && frameCount % 30 == 5) {
      ennemis.splice(i, 1);
    }
  }
  //elimination of balls, reverse course (because problem during the supp)
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].out()) {
      bullets.splice(i, 1);
    }
  }

  if (phase!=4) { //stop if defeated!
  //on death
  if (gun.death() && frameCount % 100 == 80) {
    phase = 4;
    addFirework(0, 255);
    }
  }
}

  //course of the game in different phases
function allPhases() {
  //enemies are coming
  if (phase == 0) {
    start();
  }

  //enemies are coming
  else if (phase == 1) {
    //cannon animation
    if (ite < 2 && frameCount % 50 == 49) {
      ite++;
    }
    if (ennemis.length == 0) { //if there are no more enemies
      phase = 2;
    }
  }
  //all enemies are dead, the boss is coming
  else if (phase == 2) {
    boss.show();
    if (difficulty == "impossible") {
      boss2.show();
      //if the 2 bosses are dead
      if (boss.death() && boss2.death() && frameCount % 150 == 140) {
        phase = 3;
      }
    } else { //if we are not in impossible mode
      //if the boss is dead + frameCount to leave the death animation a bit
      if (boss.death() && frameCount % 150 == 140) {
        phase = 3;
        //add a firework
        addFirework(10, 0);
      }
    }
  }

  //the boss is dead, victory
  else if (phase == 3) {
    //victory display, fireworks
    textCounter = 0; //array index 0
    fill(0, 175);
    rect(0, 0, width, height);
    noFill();
    // black background that covers the first background but with a // little transparency which allows to leave traces
    allumeLeFeu();

    //recommencer
    fill(255);
    textSize(20);
    text("Press R to Restart Game", 300, 300);
  }
  //notre canon est mort, défaite
  else if (phase == 4) {
    //affichage de la défaite, feu d'artifice
    textCounter = 1; //indice 1 du tableau
    fill(0, 175);
    rect(0, 0, width, height);
    noFill();
    //fond noir qui recouvre le premier fond mais avec un //peu de transparence ce qui permet de laisser des traces
    allumeLeFeu();
    //recommencer
    fill(255);
    textSize(20);
    text("Press R to Restart Game", 300, 300);
  }
}

//début de la partie, lorsque phase =0
function start() {
  ite = 0;
  //réinitialisation de la vie de notre canon et du boss
  gun.damage = 0;
  boss.damage = 0;
  //en difficulté moyen on a seulement 3 vies
  if (difficulty == "medium") {
    gun.life = 3;
  } else {
    gun.life = 5;
  }
  //initialisation du tableau d'ennemis
  iniTab();
  if (frameCount % 50 == 49) {
    ite++;
    phase = 1;
  }
}

//si on appuit sur une touche
function keyPressed() {
  if (key === " ") {
    bul = new Bullet(gun.x + 35, gun.y - 10, 0, -3);
    bullets.push(bul);
  } else if (key === "r" || key === "R") {
    phase = 0;
  }

  if (keyCode === RIGHT_ARROW) {
    gun.setDirX(5);
  } else if (keyCode === LEFT_ARROW) {
    gun.setDirX(-5);
  }
}

//si on relache la touche
function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode == LEFT_ARROW) {
    gun.setDirX(0);
  }
}

//initialisation des tableaux 
function iniTab() {
  let nbEnnemi;
  //selon la difficulté
  switch (difficulty) {
    case 'easy':
      nbEnnemi = 8;
      break;
    case 'medium':
      nbEnnemi = 12;
      break;
    case 'hard':
      nbEnnemi = 13;
      break;
    case 'impossible':
      nbEnnemi = 13;
      break;
    default:
      console.log("difficulté indéterminée !");
  }

  //tableau des ennemis
  for (let i = 0; i < nbEnnemi; i++) {
    ennemis[i] = new Ennemi(i * 100, 0, 70, 70);
  }
  //réinitialisation du tableau de balles à 0 au début
  bullets = [];
}

//vie de notre canon + difficulté
function life() {
  //5 coeurs, 1 coeur en moins pour chaque dégats
  for (let i = 0; i < gun.life - gun.damage; i++) {
    image(heart, width - 175 + i * 35, 50, 30, 30);
  }
  fill(255);
  textSize(20);
  text("Mode : " + difficulty, width - 200, 120);
}

//changement de difficulté
function mySelectEvent() {
  difficulty = selectDiff.value();
}
//feux d'artifices

//affiche les firework et les enlèves une fois fini
function allumeLeFeu() {
  //parcours de la fin au début car on retire des objets
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  console.log(fireworks.length); //affiche le nombre de feux d'artifices
}

//ajoute un feu d'artifice
function addFirework(x, r) {
  let f = new Firework(x, r);
  fireworks.push(f);
}
