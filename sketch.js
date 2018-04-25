/* Fault: Audio visualisation procedurally generated from audio analysis data
Developed By Max Adams (15011147)
Available From URL: https://github.com/maxadams97/FAULT.git
Uploaded April 2018

Heavily based on:
1) 17.1: Loading and Playing - p5.js Sound Tutorial(https://www.youtube.com/watch?v=Pn1g1wjxl_0)
2) 17.2: Play and Pause Button - p5.js Sound Tutorial (https://www.youtube.com/watch?v=YcezEwOXun4)
3) 17.3: Timing, Jumps and Cues - p5.js Sound Tutorial (https://www.youtube.com/watch?v=SfA5CghXw18)
4) 17.4: Amplitude Analysis - p5.js Sound Tutorial (https://www.youtube.com/watch?v=NCCHQwNAN6Y)
5) 17.11: Sound Visualization: Frequency Analysis with FFT - p5.js Sound Tutorial (https://www.youtube.com/watch?v=2O3nm0Nvbi4&t=2s)
6) The-Nature-of-Code-Examples/chp05_physicslibraries/toxiclibs/NOC_5_12_SimpleCluster/NOC_5_12_SimpleCluster.pde (https://github.com/shiffman/The-Nature-of-Code-Examples/blob/ed1c9065cd5fad194e4f25fbb0c034d59756137e/chp05_physicslibraries/toxiclibs/NOC_5_12_SimpleCluster/NOC_5_12_SimpleCluster.pde)

Description: This is the main canvas sketch which controlls the visual narrative of this web-based visualiser. It also provides the user with controll by enablingh keyboard shortcuts. As this project consists of an amalgamation of code snippets i have used from differnt sources, I will be highlighting where this *referenced code can still be seen.*/


var physics;// Reference to physics world
var cluster;// An array of the cluster objects
var showPhysics = true; // This boolean operator enables the visibility of the lines between each node
var showParticles = true; // This boolean operator enables the nodes visibility
var song; // This variable hold the loadSound() function data
var amp; // stores the value for the songs amplitude by creating a new p5.Amplitude() object
var fft; // This variable holds the data condcuted from Fast Fourier transform
var colourTime; // This is the variable which stores the colour value to be used as it increases over time
var count = 0; // this count is used to calculate how many time the colourTime varibale has returned to zero after reaching 255
var  colourTimeBoolean = false; // This is used as a trigger once the 'colourTime' variable has reached 255

function setup() {  // * Most of the elements in this section of code where develped from first two p5.js tutorials produced by 'The Coding Train'
    var canvas = createCanvas(window.innerWidth ,window.innerHeight); // This creates a cnavas elements to fit the dimensions of the browser window 
    canvas.parent('sketch-holder'); // This .parent function find the tag elemnts which corresponds in the HTML page
    song = loadSound("FAULT.mp3", loaded); // The load song function imports my audio ep
    amp = new p5.Amplitude(); // the Amplitude function measures volume between 0.0 and 1.0
    physics = new VerletPhysics2D(); // Initialize a new instance of the physics for the cluster environment
    physics.setWorldBounds(new Rect(0,0,width,height));// Set the world's bounding box to keep the sketch in
    cluster = new Cluster(8, 100, new Vec2D(width/2, height/2));// Declares the starting values for the cluster (8 = starting number of nodes / 100 = Maximum number of nodes)  
    fft = new p5.FFT(); // instantiate p5.FFT object

    //This section was coded by adding cues to trigger certain events in the scene at specific points. The following section describes the phases in whcih the shows narrative goes through in code. * My production of this component used features described in 'The Coding Train' third video in their p5.js youtube series
    
    song.addCue(25, line1); // This is the start of the first song
    song.addCue(40.5, changeBackground, color(255,255,255));
    song.addCue(60.5, changeBackground, color(0,0,0));
    song.addCue(60.6, changeBackground, color(255,255,255));
    song.addCue(81, changeBackground, color(0,0,0));
    song.addCue(91, changeBackground, color(255,255,255));
    

    
    song.addCue(101, node1);// This is the start of the second song
    song.addCue(121, changeBackground, color(0,0,0));
    song.addCue(131.1, changeBackground, color(0,0,0));
    song.addCue(141.1, changeBackground, color(255,255,255));
    song.addCue(151.2, changeBackground, color(0,0,0));
    song.addCue(151.3, changeBackground, color(255,255,255));
    
    song.addCue(161.25, changeBackground, color(0,0,0));// This point is at the songs progressive drop.
    song.addCue(164, changeBackground, color(0,0,0));
    song.addCue(166.31, changeBackground, color(255,255,255));   
    song.addCue(171.375, changeBackground, color(0,0,0));
    song.addCue(176.43, changeBackground, color(255,255,255));
    song.addCue(181.5, changeBackground, color(255,255,255));
    

    
    song.addCue(201, none);// This is the start of the third song
    song.addCue(201, changeBackground, color(0,0,0));
    song.addCue(222, lineOnly);
    song.addCue(223, none);
    song.addCue(223.3, changeBackground, color(0,0,0));
    song.addCue(242, lineOnly);
    song.addCue(243, none);
    song.addCue(243.3, changeBackground, color(0,0,0));
    song.addCue(262, lineOnly);
    song.addCue(263, none);
    song.addCue(263.3, changeBackground, color(0,0,0));
    song.addCue(283, lineOnly);
    song.addCue(284, none);
    song.addCue(284.3, changeBackground, color(0,0,0));
}


function loaded(){ //This needs to be defined for the p5.js setup to work when being hosted on a server
}
function changeBackground(col) { // I used this function when triggering certain cue point.
  background(col); // Depending on other factors in the scene, i used this as a tool to clear the clusters physics and particles
}




// * I developed this next section using the '.jump' functon from the Third p5.js video by 'The Coding Train'
function jumpSong1() { // I made these jump song functions to be triggered when the user presses the corresponding keyboard number key.
    var t = 0; // This variable set the time for when i want the song to skip to
    song.jump(t); // The 'jump' function jumps the songs time to the time i previously set
}
function jumpSong2() {
    var t = 110 ;
    song.jump(t);
}
function jumpSong3() {
    var t = 220;
    song.jump(t);
}



function draw() {
    var spectrum = fft.analyze();// This '.analyze()' function creates an array containinng the spectrum of fft bands at a single given moment. * I first saw this being used from the eleventh video in the p5.js series by 'The Coding Train'
    if (song.currentTime()< 20){ // I created this if statemnt to change the background to update one last time instead of every frame
        background("black");
    }
      
    
    
    
    //COLOUR TIME : OUTSIDE GRAYSCALE RING ---------------------------------------------------------
    // I coded this section entirley by mysellf to setp up a system which would increase specific cololur value to their maximum value of 255. I also made it so that when it reached this point it would return the its riginal value of 0. i chived this by creating a loop using a variable counter and a IF Statements using boolean operators.
    
    if (colourTimeBoolean == false){colourTime = song.currentTime()*50;} // This IF statement which is initially allowed starts the first increase of the 'colourTime' variable boefre having to consider previous cycles
    if (colourTime > 255){ // onced the colour value has reached the maximum of 225...
        colourTimeBoolean = true; // which will allow the 'colourtime' variable to reset
        count = count + 1; // This count is increased everytime so that the prgraam can determine how many times the cololur has looped
    }   
    if (colourTimeBoolean == true){
        colourTime = song.currentTime()*50 - 255 * count; // This resets the colourTime variable back to the start at 0
    }     
    fill(colourTime, colourTime, colourTime);  // These values represent the outer rings grayscale colour gradient 
    ellipse(width / 2, height / 2, 162, 162); 

    fill(0, 0,0);
    ellipse(width / 2, height / 2, 155, 155); // This circle is to give space inbetween the outer ring and the inner colour changing ring
    
    
    
    
    // FFT COLOUR RING ---------------------------------------------------------
    fill(colourTime, spectrum[100], colourTime); // The red and blue value are progressivley rising, but the green value changes depending on the 100th band of the fft specturm array. * I saw how to setpup Fast Fourier transform analysis from the eleventh video in the p5.js series by 'The Coding Train'
    ellipse(width / 2, height / 2, 115, 115);
    
    
    
    
    //INNER RINGS FOR AESTHETICS ---------------------------------------------------------
    
    fill(0, 0, 0);
    ellipse(width / 2, height / 2, 100, 100) // This circle is to give space inbetween this ring and the inside circle
    fill(0, 0, 0);
    ellipse(width / 2, height / 2, 75, 75); // This circles purpose is to display the white outline to form a single thin ring
    fill(255, 255, 255);
    ellipse(width / 2, height / 2, 50, 50); // This circles is used to provide a white space around the centre pusling circle  
    
    
    
    
    //CENTRE CRICLE ---------------------------------------------------------   
    //This feature was strongly based on the fourth video in the p5.js series by 'The Coding Train' which explained how to map the audios amplitude to a circles diameter
    
    var vol = amp.getLevel(); // The 'getLevel()' function captures the max audio amplitude 
    var diam = map(vol, 0, 0.6, 25, 100) // The 'map' function allowes to set the parameters of the cicles diametre (100 = MAX AMPLITUDE SIZE / 25 = START AMPLITUDE SIZE)
    fill(0, 0, 0);
    ellipse(width / 2, height / 2, diam, diam); // Draws an allipse at the given cordinates & changes width and height depending on the mapped amplitude
    physics.update(); // Update physics world
    

    
    
    
    
    // * This following block of code which controlls the cluster of nodes is original material which remains from the 'NOC_5_12_SimpleCluster' from which i initialy based my application, and developed from. The only changes i made to this section wasto add and IF statment to change the number of nodes in the cluster when the amplitude reachers a level of 30.
    if (showParticles) { // Display all points
        cluster.display(); // Shows the nodes
    }
    if (showPhysics) { // If we want to see the physics
        cluster.showConnections();
    }
    if (diam > '30') { // This IF statement changes the number of nodes in the cluster depending on the amplitude
        physics.clear(); // This clears the physics world by removing the current cluster
        cluster = new Cluster(Math.floor(random(2, 20)), random(10, height-100), new Vec2D(width/2, height/2)); // This function draws a new cluster using the 'Math.random' function
    }     
}
function node1() {
    showPhysics = !showPhysics; // When this function is called the physics lines are hidden
    if (!showPhysics)showParticles = true; // This IF Statments determines weather or not it needs to show the nodes if they are not already visible
}
function line1() {
    showParticles = !showParticles;// When this function is called the nodes are hidden
    if (!showParticles) showPhysics = true; // This IF Statments determines weather or not it needs to show the physics lines if they are not already visible
}
function none() {
    showParticles = false; // When this function is called the nodes are hidden
    showPhysics = false; // When this function is called the physics lines are hidden
}
function lineOnly() { // This function show the physics lines without the nodes
    showPhysics = true;
}








// * I used this function by watching the second 5p.js video in 'The Coding Trains' youtube series
function togglePlaying() { // This function is called when the user wants to play/pause the song.
    if(!song.isPlaying()) {
        song.play();  
        song.setVolume(0.3);
        //button.html("pause");
    }else {
        song.pause();
        //button.html("play");
    }    
}




 // * This following block of code uses original keyboard input functions from 'NOC_5_12_SimpleCluster'
function keyPressed() { // Key press COMMANDS
    if (key == ' ') { //This IF statement toggles the songs play/pause dpending on when the user presses the 'space bar' key
        togglePlaying();
    } 
    else if (key == '1') {//This IF statement skips to the point at which the first song starts dpending on when the user presses the '1' key
        jumpSong1();
    } 
    else if (key == '2') {//This IF statement skips to the point at which the second song starts dpending on when the user presses the '2' key
        jumpSong2();
    } 
    else if (key == '3') {//This IF statement skips to the point at which the thrid song starts dpending on when the user presses the '3' key
        jumpSong3();
    } 
}