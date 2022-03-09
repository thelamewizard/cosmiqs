class Particle {

  constructor(x, y, r=255, firework = false, chase, target) { 
    this.firework = firework;
    this.lifespan = 255;
    this.r = r;
    this.pos = createVector(x, y);
    this.acc = createVector();
    this.vel = createVector();
    if (chase) {
      this.chaseComplete = false;
      this.target = createVector(target.x, target.y);
    } else {
      this.chaseComplete = true;
    }
    if (this.firework) {
      this.vel = createVector(0, -10);
    }
  }
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.chaseComplete) {
      this.applyForce(this.arrive()); 
    } else { 
      if (!this.firework) {
        this.vel.mult(0.9);
        this.lifespan -= 2;
      }
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel); 
    this.acc.mult(0); 
    if (this.chaseComplete == false) 
      this.checkChase();
  }
  checkChase() {
    if (this.target.dist(this.pos) < 10) {
      this.chaseComplete = true; 
    }
  }
  arrive() {
    let desired = p5.Vector.sub(this.target, this.pos);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(0.2);
    return steer;
  }

  show() {
      if (!this.firework) { 
        strokeWeight(4);
        stroke(this.r, 255-this.r, 0, this.lifespan);
      } else { //particule mère
        strokeWeight(8);
        stroke(this.r, 255-this.r, 0);
      }
      point(this.pos.x, this.pos.y);
    
  }
  done() {
    if (this.lifespan <= 0) {
      return true;
    }
    return false;
  }

}
