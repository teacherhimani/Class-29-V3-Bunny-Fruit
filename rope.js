class Rope
  {
                                  /*To create an object, we will need to pass 2 parameters.

                                  1. Length of the rope (no. of rectangles).
                                  2. x,y of the point where we are going to hang the rope. */

    constructor(nlink, pointA)
    {

      this.nlink = nlink

                                  /* 3 
                                  The rope is a combination of different rectangular bodies.

                                  A group/combination of different bodies is known as a composite.
                                  Composites are a container that can represent complex 
                                  objects made of multiple parts. 
                                  */

      const group = Body.nextGroup(true);


                                  /* 
                                  if we add a rectangular and a circular body to a composite, 
                                  we can rotate
                                  both of them from a given point. 
                                  Just like we could set velocity as zero
                                  for all the objects in a group in p5.play.
                                  */

                                  /*
                                  Using Composites.stack() function we create the multiple
                                  rectangular bodies and store it in the rect variable.
                                    * Create a new composite containing bodies created in the
                                      callback in a grid arrangement.
                                    * This function uses the body's bounds to prevent overlaps.
                                    * @method stack
                                    * @param {number} xx
                                    * @param {number} yy
                                    * @param {number} columns
                                    * @param {number} rows
                                    * @param {number} columnGap
                                    * @param {number} rowGap
                                    * @param {function} callback
                                    * @return {composite} A new composite containing objects created 
                                      in the callback
                                    */
  const rects = Composites.stack(
                            100,
                            100,
                            this.nlink,
                            1, 
                            5,
                            5, 
                            function(x, y) 
                            {
                                return Bodies.rectangle(x, y, 30, 5, 
                                                      { collisionFilter: { group: group } });
                            }
                                 );
      
  this.pointA = pointA;


                                  /*  
                                  Using the Composites.chain() function we create the
                                  chain of the rectangles.
                                    * Chains all bodies in the given composite
                                      together using constraints.
                                    * @method chain
                                    * @param {composite} composite
                                    * @param {number} xOffsetA
                                    * @param {number} yOffsetA
                                    * @param {number} xOffsetB
                                    * @param {number} yOffsetB
                                    * @param {object} options
                                    * @return {composite} A new composite containing objects
                                      chained 
                                    * together with constraints
                                    */

  this.body = Composites.chain(rects, 0.1, 0, -0.6, 0, 
              {
                stiffness: 0.1,
                 length: 0.1,
                 render: {type: 'line'}
              });
      
  World.add(engine.world, this.body);
  
    
                                  /*
                                   using the Constraints.create() we add the
                                   constraints to the chain which connects all the bodies of
                                   the chain together like we have string in a necklac
                                  * Generic single or multi-add function. 
                                    Adds a single or an array of body(s), constraint(s)
                                    or composite(s) to the given composite.
                                  * Triggers `beforeAdd` and `afterAdd` events on the
                                   `composite`.
                                  * @method add
                                  * @param {composite} composite
                                  * @param {object|array} object A single or an array of 
                                    body(s), constraint(s) or  composite(s)
                                  * @return {composite} The original composite 
                                    with the objects added
                                  */

    Composite.add(rects, Constraint.create({
    pointA: this.pointA,
    bodyB: rects.bodies[0],
    pointB: {x: -25, y: 0},
    length:10,
    stiffness: 0.1
  }));
      
    }

                                    /*We have the break() function which helps us
                                     to break the chain.
                                     It simply makes the rope body null
                                    */
    
    break()
    { //Matter.Composite.clear(this.rope,true);
      this.body = null;
    }
    
    show()
    {
      if(this.body!=null)
        {
          for (let i = 0; i < this.body.bodies.length-1; i++)
          {
              this.drawVertices(this.body.bodies[i].vertices);
             }
        }
    }
    
    drawVertices(vertices) 
    {
      beginShape();
      fill('#FFF717')
      noStroke();
      
      for (let i = 0; i < vertices.length; i++) 
      {
       vertex(vertices[i].x, vertices[i].y);
       }
      endShape(CLOSE);
   }

   showConstraints(constraints) 
   {
     if(constraints!=null)
     {
    for (let i = 0; i < constraints.length; i++) {
      this.drawConstraint(constraints[i]);
    }
  }
  }
  
  drawConstraint(constraint) {
    if(constraint!=null)
      {
    const offsetA = constraint.pointA;
    let posA = {x:0, y:0};
    if (constraint.bodyA) {
      posA = constraint.bodyA.position;
    }
    const offsetB = constraint.pointB;
    let posB = {x:0, y:0};
    if (constraint.bodyB) {
      posB = constraint.bodyB.position;
    }
    push()
    strokeWeight(4);
    stroke(255);
    line(
      posA.x + offsetA.x,
      posA.y + offsetA.y,
      posB.x + offsetB.x,
      posB.y + offsetB.y
    );
    pop();
      }
  }
  
    
  }


  /*2 Next Object Rope

  To create an object, we will need to pass 2 parameters.

1. Length of the rope (no. of rectangles).
2. x,y of the point where we are going to hang the rope.

  */

/*---------------------------------------------------------------------------- 
------------------About collisionFilter.group---------------------------------
------------------------------------------------------------------------------


The default value for collisionFilter.group is 0. 
This means that the default behavior is for the collision system to use the category/mask rules.


The practical outcome is that all bodies collide with each other.

Now, let's say we create two MatterSprites and set the group to different values:
	
const ship1 = this.matter.add.sprite(100, 100, 'ship')
ship1.setCollisionGroup(1)

const ship2 = this.matter.add.sprite(200, 200, 'ship')
ship2.setCollisionGroup(2)

Each ship has a different group value so they should not collide, right?


Nope. 🧐

This may feel unexpected as the docs say:

    If the two bodies have the same non-zero value of collisionFilter.group, they will
     always collide if the value is positive, and they will never collide if the value is 
     negative.

Clearly, we have 2 non-zero positive values that are different: 1 != 2.

So why are they colliding?

This is where the second half of the rules come in. If the group values are positive or zero 
and different from each other then it will use the category/mask rules.

The outcome is the same as having the default group value of 0.

We can have the group values work by setting the collisionFilter.mask property to 0.


	

const ship1 = this.matter.add.sprite(100, 100, 'ship')
ship1.setCollisionGroup(1)
ship1.setCollidesWith(0)

const ship2 = this.matter.add.sprite(200, 200, 'ship')
ship2.setCollisionGroup(2)
ship2.setCollidesWith(0)

Now, the two ships will no longer collide with each other. Phaser 3 uses setCollidesWith() as
 a more understandable way to set the collisionFilter.mask property.
You can also directly set the collisionFilter property of the Matter body like this:


const ship1 = this.matter.add.sprite(100, 100, 'ship')

ship1.body.collisionFilter.group = 1
ship1.body.collisionFilter.mask = 0

The key point to remember is that if you want to use groups and ignore the category/mask rules
 then you need to set the mask property to 0. The mask property is set to -1 by default which
  means everything will collide with each other.

Collision Category/Mask

The category/mask system is more complicated but also more powerful.
 It uses a bitmask system and this is where most people get lost. 

Phaser will shield you from having to deal with bitmasks as long as you use
 the setCollidesWith() method. 
 But if you are trying to read the documentation then very little will make sense
  without some understanding of bitmasks.


/*
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies
        will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     
 Body.nextGroup = function(isNonColliding) {
  if (isNonColliding)
      return Body._nextNonCollidingGroupId--;

  return Body._nextCollidingGroupId++;
};
*/

