/* Fault: Audio visualisation procedurally generated from audio analysis data 
Developed By Max Adams (15011147)
Available From URL: https://github.com/maxadams97/FAULT.git
Uploaded April 2018

Heavily based on: The-Nature-of-Code-Examples/chp05_physicslibraries/toxiclibs/NOC_5_12_SimpleCluster/Cluster.pde(https://github.com/shiffman/The-Nature-of-Code-Examples/blob/ed1c9065cd5fad194e4f25fbb0c034d59756137e/chp05_physicslibraries/toxiclibs/NOC_5_12_SimpleCluster/Cluster.pde)

Description: This JS module arranges the nodes in a geomtric way and displays the connection between them. This code is exclusivley based on the 'Cluster.pde' provided by the 'NOC_5_12_SimpleCluster' example found in 'The-Nature-of-Code-Examples' code repository. I made no changes to this bit of code. */

function Cluster(n,d,center) {

  this.nodes = []; // A cluster is a grouping of nodes
  this.diameter = d; // Set the diameter

  for (var i = 0; i < n; i++) { // Create the nodes (can't put them right on top of each other)
    this.nodes.push(new Node(center.add(Vec2D.randomVector())));
  }
  for (var i = 0; i < this.nodes.length-1; i++) {
    for (var j = i+1; j < this.nodes.length; j++) {
      physics.addSpring(new VerletSpring2D(this.nodes[i], this.nodes[j], this.diameter, 0.01)); // These parameters are used to arrange the nodes in a physics context (I & J are reference to the two connecting nodes / this.diameter = resting length/ 0.01 = tension strength)
    }
}
  this.display = function() {// SHOWS ALL THE NODES
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].display();
    }
  }  
  this.showConnections = function() {// Draw all the internal connections
    stroke(255, 150); // Physics line colour and opacity
    strokeWeight(2); //Physics line stroke wight
    for (var i = 0; i < this.nodes.length-1; i++) {
      for (var j = i+1; j < this.nodes.length; j++) {
        line(this.nodes[i].x, this.nodes[i].y, this.nodes[j].x, this.nodes[j].y);
      }
    }
  }  
}

