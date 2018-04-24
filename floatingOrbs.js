// Fault: Audio visualisation procedurally generated from audio analysis data
// Max Adams
// http://
// 24.04.2018
// Heavily based on: 
// 1) Animating the Canvas | HTML5 Canvas Tutorial for Beginners - Ep. 3 (https://www.youtube.com/watch?v=yq2au9EfeRQ)
// 2) Interacting with The Canvas | HTML5 Canvas Tutorial for Beginners - Ep. 4 (https://www.youtube.com/watch?v=vxljFhP2krI&t=584s)

//Description: This JS file generates circles which float about and bounce wihtin the browser window walls. This sketch was developed primarily from  following the 'Chris Courses' youtube tutorial sereis about how to develop for canvas.

var canvas = document.querySelector('canvas');// finds the HTML tag elemnt of canvas
canvas.width = window.innerWidth;// Sets the canvas dimentions to dynamically fit the browser window size
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');// c stands for context 
c.fillStyle = "rgba(0, 0, 200, 0.5)";// 0.5 is the vlaue holder for the circle opaccity
var mouse = {// Setting up an array varibale to hold thethe x & y cordinate data of the  mouse's possition
    x: undefined,
    y: undefined}
var maxRadius = 20;// size of circle when the cursor hovers over it
var minRadius = 5;// size of the circle at rest when the cursor is NOT hovering over it
var colorArray = [// This is an array which contains the available colour selections the circles can be
    '#ffffff',
    '#ffffff',
    '#000000',];
window.addEventListener('mousemove',function(event){// This function monitors where the mouse cursor is on the window and stores it in the variable placeholder
    mouse.x = event.x;
    mouse.y = event.y;})

function Circle(x, y, dx, dy, radius) { // animates by refreshing the page
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    // This is the 'Circle' object which "group togther a set of variables and functions (which take on new names of properties and methods ) to create a model of somthing you would recognize from the real world."
    
    this.draw = function(){
        c.beginPath(); // initialise variable
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);// The 'arc' Method draws an arc to the screen
        c.fillStyle = this.color// The 'fillStyle' Property defines the colour of the circle just drawn randmonly from the  'color' array
        c.fill();// This 'fill()' Method fills all the array elements with a static value 
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){// These IF Statements determine the direction of the circles travell after hitting the walls of the browser window
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius <0){
            this.dy = -this.dy;
        }
        
        this.x += this.dx;//Move with velocity horizontally
        this.y += this.dy;//Move with velocity vertically
        
        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius){ // Interactivity // 50 px within the mouse
                this.radius += 1;
            }
        }else if(this.radius>minRadius){
            this.radius -= 1;
        }
        
        this.draw();
    }
}

var circleArray = [];

for(var i = 0; i<10; i++){//10 = NUMBER OF FLOATING CIRCLES
    var radius = 30; //circles edge, NOT centre
    var x = Math.random() * (innerWidth - radius * 2)+radius; //start position
    var y = Math.random() * (innerHeight - radius * 2) + radius;// "radius * 2) + radius" so that cicles dont get stuck in boundaries
    var dx = (Math.random() - 0.5) * 1; // updates horizontal velocity
    var dy = (Math.random() - 0.5) * 1; // updates vertical velocity
    circleArray.push(new Circle (x, y, dx, dy, radius));
}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i< circleArray.length; i++){
        circleArray[i].update();
}}

animate();