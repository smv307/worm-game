let x = 200;
let y = 200;
const wormParts = [];
let maxWormParts = 10;
const foods = []; // array to store food objects
let foodEaten = 0;
let time = 1000;

// food factory
const drawFood = () => {
  return {
    x: random(0, 400),
    y: random(0, 400),
    size: 10, // diameter of food
    draw() {
      fill("#52413C"); // food color
      noStroke();
      ellipse(this.x, this.y, this.size, this.size);
    },
  };
};

// check for collisions between worm and food
function checkFoodCollision(food) {
  const d = dist(x, y, food.x, food.y);
  return d < 10; // Adjust this value based on your desired collision radius
}

// draw worm segmant
function wormSegment(x, y) {
  const wormColors = ["#c3816e", "#D3A99E", "#E2B1A3"];
  const currentWormColor = wormColors[int(random(0, wormColors.length))];
  fill(currentWormColor);
  stroke(currentWormColor);
  ellipse(x, y, 10, 10);
}

// setup
function setup() {
  createCanvas(400, 400);
  background("#795548");
  textSize(20);
  for (let i = 0; i < 5; i++) {
    foods.push(drawFood()); // draw 5 initial food objects
  }
}

function draw() {
  // worm wiggle
  const wiggle = int(random(-3, 3));

  // follow mouse
  x += (mouseX - x) * 0.04 + wiggle;
  y += (mouseY - y) * 0.04 + wiggle;

  // add the current segment to parts list
  wormParts.push({ x, y });

  // if worm is too long...
  if (wormParts.length > maxWormParts) {
    wormParts.shift(); // delete oldest part
  }

  background("#795548");

  // draw and update food objects
  for (let i = foods.length - 1; i >= 0; i--) {
    const food = foods[i];
    food.draw();

    // check for collisions
    if (checkFoodCollision(food)) {
      foods.splice(i, 1); // remove the eaten food
      foods.push(drawFood()); // add a new food object
      foodEaten++;
    }
  }

  // draw all worm segments
  for (let i = 0; i < wormParts.length; i++) {
    wormSegment(wormParts[i].x, wormParts[i].y);
  }

  // change length and time
  maxWormParts = 10 + foodEaten;
  time--;

  // show text in upper left corner
  noStroke();
  fill("#52413C");
  text(`length: ${maxWormParts}`, 10, 50);
  text(`time: ${time}`, 10, 30);

  // game ending
  if (time < 1) {
    textSize(25);
    textStyle(BOLD);
    fill("#2E211F");
    text(`your final score is ${maxWormParts}!`, 60, 200);
    exit; // error to end game :)
  }
}
