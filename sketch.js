const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  ground=new Ground(250,680,700,20);

  rope = new Rope(7,{x:245,y:30});

  fruit = Bodies.circle(300,300,20);
                                        /*   a composite consists of
                                        multiple bodies within it. When we want multiple bodies to
                                        have the same properties such as shape and size and
                                        behave in a certain manner, we make a composite of
                                        these bodies.
                                        In our game, the rope we are creating is made up of
                                        multiple rectangles, hence we call it a composite. But we
                                        also have to add our fruit in the same composite.
                                        To add a body to the composite, we use the function,
                                        Matter.Composite.add(name_of_composite,
                                        body_to_add)
                                        */
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  
  rope.show();
  ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
  ground.show();
   
}





/*

● In the constructor() we are taking two parameters
nlinks - number of links and
pointA - points of connection.
*/