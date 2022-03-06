class Gunner {

  /*for (let i=0; i<3; i++) {
   gun[i] = loadImage("img/gun"+i+".png"); 
    console.log("img/gun"+i+".png");
  }*/

  constructor(x, y, ite, widtht, heightt) {
    this.gun = [];
    this.gun[0] = loadImage("img/gun0.png");
    this.gun[1] = loadImage("img/gun1.png");
    this.gun[2] = loadImage("img/gun2.png");

    this.x = x;
    this.y = y;
    this.ite = ite;
    this.w = widtht;
    this.h = heightt;

    this.dirX = 0;
    //de base, 5 vies
    this.life =5;

  }



  //takes the index of the image as a parameter and displays the corresponding gun
  show(ite) {
    /* animation loop
  image(gun[frameCount%gun.length],0,0);*/
    //si il n'est pas mort
    if (!this.death()) {
      //couleur choisie avec la case
    
      image(this.gun[ite], this.x, this.y, this.w, this.h);
      noTint();
    }
  }

 //add the specified value to the abscissa
  move(value = this.dirX) {
    if (this.x < 0) {
      this.x = width - 10;
    } else if (this.x > width) {
      this.x = 10;
    }
    this.x += value;
  }
 /*for movement, in the draw and pressing an arrow changes the direction, release -> 0. Allows a more pleasant movement than the simple keyPressed -> x+ value */
  setDirX(val) {
    this.dirX = val;
  }

  //Defeated
  death() {
    if (this.damage >= this.life) {
      tint(200, 0, 0);
      image(this.gun[0], this.x, this.y, this.w, this.h);
      image(boom, this.x - 20, this.y + 20);
      noTint();
      return true;
    }
    return false;
  }
}