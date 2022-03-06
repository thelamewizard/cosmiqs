class Firework {

  constructor(x=random(50, width-75),r=255) {
    this.r =r; //rouge
//main particle
    this.x = x //coordinates
    this.firework = new Particle(this.x, height,this.hu, true);
    this.exploded = false; //the particle did not explode
    this.particules = []; //array of child particles during the explosion
    this.allArrived = false; //once they all arrive at the destination point
  }

  update() {
    if (!this.exploded) {
      /*applies the gravity vector constantly and accelerates, so it will inevitably end up falling no matter how hard you throw it (the further it goes, the higher the fall)*/
      this.firework.applyForce(gravity);
      //update vector and coordinates
      this.firework.update();

  //when the particle starts to stop or go down
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode(); //particle explosion
      }
    }
    //explosion
    else {
      //check that all particles have formed a letter
      for(let p of this.particules) {
     this.allArrived = true;
     if(!p.chaseComplete) {
       this.allArrived = false;
       break;
     }
    }
      
      for (let p of this.particules) { //particles array
        if(this.allArrived) {
        p.applyForce(gravity); //Gravity
        }
        p.update(); //update vector and position
        if (p.done() ) { //if particle is drawn, remove it
         this.particules.splice(p,1); 
        }
      }
    }
  }

  //fireworks trigger
  explode() {
    //fireworks position
    let x = this.firework.pos.x;
    let y = this.firework.pos.y;
    //create String containing the whole box of the letter array at index textCounter
    this.letters = font.textToPoints(letter[textCounter], x, y, 150);
    //for each point in the String
    for (let l of this.letters) {
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.r, false, true, l); //particule fille (false), suivi -> true
      // add the particle that follows l
      this.particules.push(p);
    }

    textCounter++;
    if (textCounter == letter.length) {
      textCounter = 0;
    }
  }

  show() {
    //display the particle if it has not exploded
    if (!this.exploded) {
      this.firework.show();
    } else {
      for (let p of this.particules) {
        p.show();
      }
    }
  }
  
  done() {
    //if it exploded and it the particle array is empty
    if (this.exploded && this.particules.length ==0) {
      return true;
    }
    return false;
  }
}