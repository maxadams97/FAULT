/* Fault: Audio visualisation procedurally generated from audio analysis data 
Developed By Max Adams (15011147)
Available From URL: https://github.com/maxadams97/FAULT.git
Uploaded April 2018

Heavily based on:
1) The-Nature-of-Code-Examples/chp05_physicslibraries/toxiclibs/NOC_5_12_SimpleCluster/Node.pde (https://github.com/shiffman/The-Nature-of-Code-Examples/blob/ed1c9065cd5fad194e4f25fbb0c034d59756137e/chp05_physicslibraries/toxiclibs/NOC_5_12_SimpleCluster/Node.pde)

Description: The JS module is used to create the nodes. This code is exclusivley based on the 'Node.pde' provided by the 'NOC_5_12_SimpleCluster' example found in 'The-Nature-of-Code-Examples' code repository. The only changes I made where to the fill and stroke style parametres of the node.*/

function Node(pos) {
  VerletParticle2D.call(this,pos);
  this.display = function(){  // Override the display method
    fill(0); //Nodes colour fill
    stroke(255); //Nodes outline colour
    strokeWeight(2); // Node outline line wight
    ellipse(this.x,this.y,16,16); // 16 = CIRCLE SIZE
  }
}
Node.prototype = Object.create(VerletParticle2D.prototype);// Inherit from the parent class
Node.prototype.constructor = Node;


