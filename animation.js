var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('resize',function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

window.addEventListener('mousemove',function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

var colorArray = [
    '#f57f17',
    '#9e9e9e',
    '#0d47a1',
    '#004d40',
    '#b71c1c'
];

var minRadius = 0;

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.fillStyle = this.color;
        c.fill();
    };//draw
    
    this.update = function () {
        if (this.x + this.radius > innerWidth - 50 || this.x - this.radius < 50){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight - 50 || this.y - this.radius < 50){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interaction to increase the sizes of the circles

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.radius < 50){
                this.radius += 1;
            }
        }else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    };//update
}//Circle

var circleArray = [];

for (var i = 0; i < 5000; i++){

    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var radius = (Math.random() *10) + 15;

    circleArray.push(new Circle(x,y,dx,dy,0));
}//make circles random sizes and move randomly

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}//animate

animate();