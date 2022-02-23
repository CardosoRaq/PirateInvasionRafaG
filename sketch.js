const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Bodies;

var engine, world, backgroundImg;

var tower, ground, cannon, cannonBall;
var angle = 70;

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

  tower = Bodies.rectangle(80, 200, 160, 310, {isStatic:true});
  World.add(world, tower);

  cannon = new Cannon (180, 120, 130, 110, angle);
  
}

function draw() {

  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width*2, 1);

  image(towerImage, tower.position.x, tower.position.y, 160, 310);

  cannon.display();

  showBoats();

  for (var i=0; i < balls.length; i++){
    showCannonBalls(balls[i]);
  }


}


function keyReleased(){

  if(keyCode === DOWN_ARROW){
    balls[balls.length -1].shoot();
  }
}

function keyPressed(){

  if(keyCode === DOWN_ARROW){

    cannonBall = new CannonBall (cannon.x, cannon.y);
    balls.push(cannonBall);

  }

}

function showCannonBalls(ball){

  if(ball){
    ball.display();
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
        Matter.Body.setVelocity(boat.body, {x:-1 ,y:0 })
        boats[i].display();
      }
    }


  }else {

    var boat = new Boat(width +70, height -60, 170, 170, -80);
    boats.push(boat);

  }




}