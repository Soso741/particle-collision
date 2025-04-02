import { randomIntFromRange, randomColor, distance, rotate, resolveCollision } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FF7F66"];

const randomRadius = randomIntFromRange(25, 25);

// Event Listeners
addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 2; //resolve collision needs mass
    this.opacity = 0;
    this.dx = randomIntFromRange(-4, 4);
    this.dy = randomIntFromRange(-4, 4);
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update(particleArr) {
    this.draw();

    //collision detection
    for (let i = 0; i < particleArr.length; i++) {
      if (this === particleArr[i]) continue; // "jumps over" one iteration in the loop.
      if (distance(this.x, this.y, particleArr[i].x, particleArr[i].y) - this.radius * 2 < 0) {
        resolveCollision(this, particleArr[i]);
      }
    }

    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    //mouse collision detection
    if (distance(this.x, this.y, mouse.x, mouse.y) < 150 && this.opacity < 0.5) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;

      this.opacity = Math.max(0, this.opacity); //prevents opacity from going below 0
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

// Implementation
function init() {
  particles = [];

  for (let i = 0; i < 170; i++) {
    let x = randomIntFromRange(randomRadius, innerWidth - randomRadius);
    let y = randomIntFromRange(randomRadius, innerHeight - randomRadius);

    if (particles.length !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (distance(x, y, particles[j].x, particles[j].y) - randomRadius * 2 < 0) {
          x = randomIntFromRange(randomRadius, innerWidth - randomRadius);
          y = randomIntFromRange(randomRadius, innerHeight - randomRadius);
          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, randomRadius, randomColor(colors)));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(particles);
  });
}

init();
animate();
