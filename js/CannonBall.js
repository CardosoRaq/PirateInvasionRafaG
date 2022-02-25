class CannonBall {

    constructor(x, y){

        this.raio = 30;

        this.body = Bodies.circle(x, y, this.raio, {isStatic: true});
        World.add(world, this.body);

        this.image = loadImage("/assets/cannonball.png");

    }

    display(){

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image,0,0, this.raio, this.raio);
        pop();

    }

    shoot(){

        var newAngle = cannon.angle -30;
        newAngle = newAngle *(3.14/180);

        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.3)

        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, 
            {x:velocity.x * (180/3.14) ,
             y:velocity.y * (180/3.14)})

    }

    remove(index){

        Matter.Body.setVelocity(this.body, {x:0, y:0})

        setTimeout (() =>{

            Matter.World.remove(world, this.body);
            delete balls[index];
        
        }, 1000);


    }

}