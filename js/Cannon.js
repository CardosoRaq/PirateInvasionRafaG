class Cannon {

  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    
    this.cannonBase = loadImage("./assets/cannonBase.png");
    this.cannon = loadImage("./assets/canon.png")
  }
  
  display(){

    if(keyIsDown(RIGHT_ARROW) && this.angle <= 50){
      this.angle += 1
    }
    if(keyIsDown(LEFT_ARROW) && this.angle >= -40){
      this.angle -= 1;
    }

    push();
    translate(this.x, this.y)
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannon, 0, 0, this.width, this.height)
    pop();

    image(this.cannonBase,65,30,200,200);
    noFill();
    
  }

}
