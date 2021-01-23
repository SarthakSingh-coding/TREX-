var trexImage;
var dino, dinoDie, dinoJump, ckeckDino;
var groundImage;
var ground;
var invisibleGround;
var score;
var trexStop;
var cactig, cloudg;
var restartImage, restart;
var gameImg, gameOver;

const PLAY = 1;
const STOP = 0;
var gameState = STOP;


function preload() {
  trexImage = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  trexStop = loadAnimation("trex_collided.png");

  restartImage = loadImage("restart.png");

  gameImg = loadImage("gameOver.png");

  dinoJump = loadSound("jump.mp3");
  dinoDie = loadSound("die.mp3");
  checkDino = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 300);
  console.log("width = " + width, " height = " + height);

  dino = createSprite(50, 250, 10, 10);
  dino.addAnimation("trex", trexImage);
  dino.addAnimation("trex2", trexStop);
  dino.scale = 0.5;

  ground = createSprite(300, 275, 600, 10);
  ground.addImage("ground", groundImage);
  ground.x = width / 2

  invisibleGround = createSprite(300, 280, 600, 10);
  invisibleGround.visible = false;

  score = 0;

  cactig = new Group();
  cloudg = new Group();

  restart = createSprite(300, 150);
  restart.addImage(restartImage);
  restart.scale = 0.7;
  restart.visible = false;

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameImg);
  gameOver.visible = false;

  // var rn = Math.round(85.5);
  // console.log(rn);

}

function draw() {
  background("white");

  if (gameState === STOP) {
    dino.changeAnimation("trex2", trexStop);
    ground.velocityX = 0;
    
    if (mousePressedOver(restart)) {
      reset();
    }
  } 
  
  else {
     cactus();
    spawnClouds();
    //giving ground some vlocity
    ground.velocityX = -7;
    dino.changeAnimation("trex", trexImage);

    //reset ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //increase the score
    if (frameCount % 3 === 0) {
      score = score + 1;
    }
    
    if(score % 100 === 0 && score > 0){
      checkDino.play();
    }

    if (cactig.isTouching(dino)) {
      gameState = STOP;
      cloudg.setVelocityXEach(0);
      cactig.setVelocityXEach(0);
      cactig.setLifetimeEach(-1);
      cloudg.setLifetimeEach(-1);
      restart.visible = true;
      gameOver.visible = true;
      dinoDie.play();
    }
  } 

  if ((keyDown("space") || keyDown("up")) && dino.y > 250) {
    dino.velocityY = -12;
    gameState = PLAY;
    dinoJump.play();
  }



  //add gravity
  dino.velocityY = dino.velocityY + 0.9;

  //display the score
  fill("black");
  textSize(18);
  textFont("lucinda");
  text("Score : " + score, 500, 50);

  //stop trex from falling
  dino.collide(invisibleGround);


  drawSprites();
}

function cactus() {
  if (frameCount % 60 === 0) {
    var cacti = createSprite(600, 255, 10, 10);
    cacti.velocityX = -7;
    cacti.scale = 0.6;
    cacti.lifetime = 600 / 7;
    var obstacle1;

    cacti.depth = dino.depth;
    dino.depth = dino.depth + 1;

    cactig.add(cacti);

    var rn = Math.round(random(1, 6));

    switch (rn) {
      case 1:
        obstacle1 = loadImage("obstacle1.png");
        cacti.addImage(obstacle1);
        break;
      case 2:
        obstacle1 = loadImage("obstacle2.png");
        cacti.addImage(obstacle1);
        break;
      case 3:
        obstacle1 = loadImage("obstacle3.png");
        cacti.addImage(obstacle1);
        break;
      case 4:
        obstacle1 = loadImage("obstacle4.png");
        cacti.addImage(obstacle1);
        break;
      case 5:
        obstacle1 = loadImage("obstacle5.png");
        cacti.addImage(obstacle1);
        break;
      case 6:
        obstacle1 = loadImage("obstacle6.png");
        cacti.addImage(obstacle1);
        break;
      default:
        break;
    }

  }
}

function spawnClouds() {
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600, random(5, 150), 10, 10);
    cloud.lifetime = 100;
    cloud.velocityX = -6;

    var cloudImage = loadImage("cloud.png");
    cloud.addImage(cloudImage);
    cloudg.add(cloud);
  }
}

function reset() {
  dino.changeAnimation("trex2", trexStop);
  ground.velocityX = 0;
  cloudg.destroyEach();
  cactig.destroyEach();
  restart.visible = false;
  gameOver.visible = false;
  score = 0;
}