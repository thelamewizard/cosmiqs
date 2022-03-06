class Bullet {

  constructor(x, y, dirX, dirY, wid = 13, hei = 16,owner=0) {
    this.img = loadImage("img/bullet.png");
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.w = wid;
    this.h = hei;
    //the one who shot, 0 for the player, 1 for an average enemy and 2 for the boss
    this.owner = owner; 
  }

  show() {
    this.move();
   //gunner bullets are colored red to distinguish them from //enemies
     //player 
    if (this.owner ==0) {
    tint(200, 83, 20);
    }
    //ennemy
    else if (this.owner ==1) {
      noTint();
    }
    //boss
    else if (this.owner==2) {
      tint(200, 53, 120);
    }
    image(this.img, this.x, this.y, this.w, this.h);
    noTint();
  }

  move() {
    this.x += this.dirX;
    this.y += this.dirY;
  }
  hit(e) {
    if (this.x > e.x && this.x < e.x+e.w && this.y>e.y && this.y<e.y+e.h) {
    //console.log("hit");
      this.y =-10;
      return true;
    }
    //console.log("no hit");
    return false;
    
  }
  out() {
    if (this.y<0 || this.y>height || this.x <0 || this.x > width) {
    return true
    }
    return false;
  }
}