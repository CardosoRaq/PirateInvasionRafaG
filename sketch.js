const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, backgroundImg;

var tower, ground, cannon;
//var angle = 70;

var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 30;
  
  ground = Bodies.rectangle(0, height - 1, width*2, 1, {isStatic:true});
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, {isStatic:true});
  World.add(world, tower);

  cannon = new Cannon (180, 120, 130, 110, angle);
  
}

function draw() {

  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width*2, 1);

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  

  for (var i=0; i < balls.length; i++){
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }

  cannon.display();

  showBoats();
}


function keyReleased(){

  if(keyCode === DOWN_ARROW){
    balls[balls.length -1].shoot();
  }
}

function keyPressed(){

  if(keyCode === DOWN_ARROW){

    var cannonBall = new CannonBall (cannon.x, cannon.y);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);

  }

}

function showCannonBalls(ball, index){

  if(ball){
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height -50){
      ball.remove(index);
    }
  }
}

function showBoats(){

  if(boats.length > 0){

    if(boats[boats.length -1] === undefined ||
       boats[boats.length -1].body.position.x < width -300){

        var positions = [-40, -60, -70, -20]
        var position = random(positions);
        var boat = new Boat(width +70, height -60, 170, 170, position);
        boats.push(boat);


       }

    for(var i=0; i < boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body, {x:-1 ,y:0 })
        boats[i].display();
      }
    }


  }else {

    var boat = new Boat(width +70, height -60, 170, 170, -80);
    boats.push(boat);

  }

}

function collisionWithBoat(index){

  for(var i=0; i < boats.length; i++){

    if (balls[index]  !== undefined && boats[i] !== undefined){

      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
      
      if (collision.collided){

        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];

      }

    }

  }  


}

// ! NOT(negação)
// == igualdade (verdadeiro se forem iguais)
// != desigualdade (verdadeiro se forem diferentes)



