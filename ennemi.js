class Ennemi {

  constructor(x, y, widtht, heightt, damage = 0) {
    this.img = loadImage("img/ennemis.png");

    this.x = x;
    this.y = y;
    this.w = widtht;
    this.h = heightt;
    this.damage = damage;
  }

  //show enemies + move them + attack
  show() {
    this.move(2);
    this.attack();
    if (!this.death()) { //if not dead
     // the more damage it takes, the more the dye changes from white to red
      tint(255, 255 - this.damage * 100, 255 - this.damage * 100);
      image(this.img, this.x, this.y, this.w, this.h);
      noTint();
    }
  }

//add the specified value to the coordinates
  move(value) {
    if (this.x > width) {
      this.x = 0
      this.y += 70;
    }
    //if it exceeds the edge of the screen it //goes back to the beginning + one line below
    this.x += value;
  }

  //attacks, rarer when there are many enemies
  attack() {
    let speedAtt;
    if (difficulty == "easy") {speedAtt=0.02-ennemis.length*0.002;}
    else if (difficulty =="medium") {speedAtt=0.03-ennemis.length*0.002;}
    else if (difficulty =="hard" || difficulty == "impossible") {speedAtt=0.05-ennemis.length*0.003;}
    if (random(1) < speedAtt) {
      let bul1 = new Bullet(this.x + 35, this.y + 80, 0, 3,16,18,1);
      bullets.push(bul1);
    }
  }

  death() {
    if (this.damage > 2) {
      tint(200, 0, 0);
      image(this.img, this.x, this.y, this.w, this.h);
      image(boom, this.x + 10, this.y);
      noTint();
      return true;
    }
    return false;
  }
}