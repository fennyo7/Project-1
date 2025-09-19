let animal;
let score = 0;
let shuffle = true;
let kill;

let madeChoice = false;
let killAni = 0; //controls kill img
let petAni = 0; //controls pet img

function preload() {
  killhoo = loadSound("killhoo.mp3");
  pethoo = loadSound("pethoo.mp3");
  killdog = loadSound("killdog.mp3");
  petdog = loadSound("petdog.mp4");
  killdeer = loadSound("killdeer.mp4");
  petdeer = loadSound("petdeer.mp4");
  hoo1 = loadImage("hoo1.png");
  hoo2 = loadImage("hoo2.png");
  hoo3 = loadImage("hoo3.png");
  dog1 = loadImage("dog1.png");
  dog2 = loadImage("dog2.png");
  dog3 = loadImage("dog3.png");
  deer1 = loadImage("deer1.png");
  deer2 = loadImage("deer2.png");
  deer3 = loadImage("deer3.png");
}

function setup() {
  createCanvas(500, 550);
  animal = int(random(0, 4));
}

function draw() {
  background(230, 219, 247);

  //initial shuffling
  if (shuffle === true) {
    if (animal === 1) {
      image(dog1, 50, 50, 400, 400);
    } else if (animal === 2) {
      image(hoo1, 50, 50, 400, 400);
    } else if (animal === 3){
      image(deer1, 50, 50, 400, 400);
    }
  }

  //text stuff
  textFont("TimesNewRoman");
  textSize(40);
  fill(110, 65, 184); //button color
  rect(50, 450, 150, 80); //kill
  rect(300, 450, 150, 80); //pet
  rect(380, 10, 100, 50); //reset
  fill(230, 219, 247); //text color
  text("Kill", 90, 500);
  text("Pet", 345, 500);
  textSize(20);
  text("Reset", 405, 40);
  textSize(40);
  fill(0); //score color
  text(`Score: ${score}`, 10, 50);

  //animal shuffling && reset
  if (shuffle == true) {
    animal = int(random(1, 4));
    killAni = 0; //resets kill img
    petAni = 0; //resets pet img
    madeChoice = false; //sets a toggle when a choice is made
  }

  //shuffle and audio controller
  if (
    !killdog.isPlaying() &&
    !killhoo.isPlaying() &&
    !killdeer.isPlaying() &&
    !petdog.isPlaying() &&
    !pethoo.isPlaying() && 
    !petdeer.isPlaying()
  ) {
    shuffle = true; //shuffle when audio ends
  }

  //showing killing animals
  if (killAni == 1) {
    image(dog2, 50, 30, 400, 400);
  } else if (killAni == 2) {
    image(hoo2, 50, 50, 400, 400);
  } else if (killAni === 3){
    image(deer2, 50, 50, 400, 400);
  }

  //showing petting animals
  if (petAni == 1) {
    image(dog3, 50, 50, 400, 400);
  } else if (petAni == 2) {
    image(hoo3, 50, 50, 400, 400);
  } else if (petAni === 3){
    image(deer3, 50, 50, 400, 400);
  }

  //selector

  if ((mouseX >= 50 && mouseX <= 200 && mouseY >= 450 && mouseY <= 520) ||
  (mouseX >= 300 && mouseX <= 450 && mouseY >= 450 && mouseY <= 520) || (mouseX >= 380 && mouseX <= 480 && mouseY >= 10 && mouseY <= 60)
  ) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  //Makes sure you cannot cheat the system

  if (score < 0) {
    fill(0);
    text("Game Over", 150, 430);
    shuffle = false;
    if ((mouseX >= 50 && mouseX <= 200 && mouseY >= 450 && mouseY <= 520 && mouseClicked) || (mouseX >= 300 &&mouseX <= 450 && mouseY >= 450 && mouseY <= 520 && mouseClicked)
    ) {
      score = -1;
    }
  }

  //reset button

  if(mouseX >= 380 && mouseX <= 480 && mouseY >= 10 && mouseY <= 60 && mouseIsPressed){
    score = 0;
    shuffle = true;
    madeChoice = false;
  } 

}

function mouseClicked() {
  //kill
  // added new toggles (made choice and shuffle) to make sure we can make an option
  if (mouseX >= 50 && mouseX <= 200 && mouseY >= 450 && mouseY <= 520 && shuffle &&
    !madeChoice && score >= 0) {
    madeChoice = true; // choice has been made
    shuffle = false; // stop shuffle until audio ends

    killAni = int(random(1, 4));
    if (killAni === 1) {
      killdog.play();
      score--;
    } else if (killAni === 2) {
      killhoo.play();
      score++;
    } else if (killAni === 3){
      killdeer.play();
      score += int(random(-3, 3));
    }
  }

  //pet
  // added new toggles (made choice and shuffle) to make sure we can make an option
  if (mouseX >= 300 && mouseX <= 450 && mouseY >= 450 && mouseY <= 520 && 
    shuffle && !madeChoice && score >= 0
  ) {
    madeChoice = true; // choice has been made
    shuffle = false; // stop shuffle until audio ends

    petAni = int(random(1, 4));
    if (petAni === 1) {
      petdog.play();
      score++;
    } else if (petAni === 2) {
      pethoo.play();
      score--;
    } else if (petAni === 3){
      petdeer.play();
      score += int(random(-3, 3));
    }
  }
}