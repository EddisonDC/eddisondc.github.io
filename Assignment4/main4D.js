/**
 * Template used by Assignment4D.html
 */

// set up canvas
const counter = document.querySelector('p');
let count = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
// Class to give extend features to the balls
class Shape {
   constructor(x, y, velX, velY)
   {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
   }
}

// Class to give features to the balls
class Ball extends Shape {

   constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY);
      this.color = color;
      this.size = size;
      this.exists = true;
   }

  // Method to draw the balls in the screen
   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

  // Method to give speed to the balls
   update() {
      if ((this.x + this.size) >= width) {
         this.velX = -(Math.abs(this.velX));
      }

      if ((this.x - this.size) <= 0) {
         this.velX = Math.abs(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(Math.abs(this.velY));
      }

      if ((this.y - this.size) <= 0) {
         this.velY = Math.abs(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }
   // Method to change balls colour when they cross each other
   collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball && ball.exists)) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.size + ball.size) {
               ball.color = this.color = randomRGB();
            }
         }
      }
   }
   
}

// Class to give features to the evil ball
class EvilCircle extends Shape{
   constructor(x, y) {
      super(x, y, 20, 20);
      this.color = "white";
      this.size = 15;
      // Function to control the evil ball
      window.addEventListener("keydown", (e) => 
      {
         console.log(e.key);
         switch (e.key) {
         case "ArrowLeft":
            this.x -= this.velX;
            break;
         case "ArrowRight":
            this.x += this.velX;
            break;
         case "ArrowUp":
            this.y -= this.velY;
            break;
         case "ArrowDown":
            this.y += this.velY;
            break;
         }
      });
   }
   // Method to draw the evil ball in the screen
   draw() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 7;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
   }
  // Method to move the evil ball
   checkBounds() {
      if ((this.x + this.size) >= width) {
         this.x -= this.size;
      }

      if ((this.x - this.size) <= 0) {
         this.x += this.size;
      }

      if ((this.y + this.size) >= height) {
         this.y -= this.size;
      }

      if ((this.y - this.size) <= 0) {
         this.y = this.size;
      }
   }
   // Method to delete ball when there is a collision with the evil ball
   collisionDetect() {
      for (const ball of balls) 
      {
         if (ball.exists) 
         {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) 
            {
              ball.exists = false;
              count--;
              counter.textContent = 'Ball Count: ' + count;
            }
         }
      }
   }
};

const balls = [];
// Create 25 balls in the screen and push them
while (balls.length < 25) 
{
   const size = random(10,20);
   const ball = new Ball
   (
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );

  balls.push(ball);
  count++;
  counter.textContent = 'Ball count: ' + count;
}

const evilBall = new EvilCircle(random(0, width), random(0, height));
// Give all features to each ball
function loop() 
{
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   for (const ball of balls) 
   {
      if (ball.exists) 
      {
         ball.draw();
         ball.update();
         ball.collisionDetect();
      }
   }
   evilBall.draw();
   evilBall.checkBounds();
   evilBall.collisionDetect();

   requestAnimationFrame(loop);
}
loop();