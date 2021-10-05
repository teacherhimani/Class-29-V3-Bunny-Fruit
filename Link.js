class Link{
    constructor(bodyA,bodyB)
    {                                               /*
                                                     The last element will be 2 less than the 
                                                     length because the
                                                     index always starts from 0, and
                                                     we also addedfruit in the
                                                     composite that increases the length 1.
                                                     So to get the last
                                                     element index we need to 
                                                     subtract the 2 from the length
                                                    */

                                                    
      var lastlink = bodyA.body.bodies.length-2;
                                                    
                                                   /* 
                                                    We will use bodyA as the last rectangle of 
                                                    the rope.
                                                    Since after being added to the composite, 
                                                    the ball 
                                                    is the last element,
                                                    we will use bodyA.body.bodies.length-2 for 
                                                    denoting the last rectangle of the rope.  
                                                    */
      
     this.link = Constraint.create(
        {
          bodyA:bodyA.body.bodies[lastlink],
          pointA:{x:0,y:0},
          bodyB:bodyB,
          pointB:{x:0,y:0},
          length:-10,
          stiffness:0.01
        });
        World.add(engine.world,this.link);
    } 
}