class Boss {

  constructor(x, y, widtht, heightt,damage =0) {
    this.img = loadImage("img/boss.png");
    this.boom = loadImage("img/boom_effect.png");

    this.x = x;
    this.y = y;
    this.w = widtht;
    this.h = heightt;
    this.damage = damage;
    //for random displacement with perlin noise
    this.xoff1 =random(0,100);
    this.xoff2 = random(5000,10000);
    //speed
    this.speed =0.01;
  }

  //displays the boss + its movement + its attacks
  show() {
    if (!this.death()) { //si il n'est pas mort
    this.move();
    this.attack();
      //the more damage it takes, the more the dye turns from white to red
      tint(255,255-this.damage*10,255-this.damage*10);
    image(this.img, this.x, this.y, this.w, this.h);
      noTint();
    }
  }

  //boss moves are random between 0 and height-200
  move() {
    //noise more or less random between 0 and 1 gives value between 0 and width
    this.x = map(noise(this.xoff1),0,1,0,width);
    this.y = map(noise(this.xoff2),0,1,0,height-200);
    //faster after taking damage
    if(this.damage > 8 && this.damage <13) {
     this.speed = 0.015; 
    }
    else if(this.damage > 15) {
     this.speed = 0.03; 
    }
    this.xoff1 +=this.speed;
    this.xoff2 +=this.speed;
  }
  
  //frequent attacks and larger bullets
  attack() {
    let speedAtt;
    if (difficulty=="easy") {speedAtt=0.015;}
    else if (difficulty=="medium") {speedAtt=0.02;}
    else if (difficulty == "hard" || "impossible") {speedAtt=0.03;}
    if (random(1) < speedAtt) {
      let bul1 = new Bullet(this.x + 35, this.y + 200, 0, 3,20,23,2);
      bullets.push(bul1);
    }
  }
  
  death () {
   if (this.damage>20) {
    tint(200,0,0);
    image(this.img, this.x, this.y, this.w, this.h);
     image(boom,this.x+10,this.y);
     noTint();
     return true;
   }
    return false;
  }
} 