var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimg;
var obs1,obs2,obs3,obs4,obs5,obs6;
var trex_collided
var score;
var cloudsGroup,obstaclesGroup;
var PLAY=1;
var END=0;
var gamestate= PLAY;
var gameover,gameoverImg;
var restart,restartImg;
var jumpSound,checkpointSound,dieSound;
var highscore = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
   cloudimg = loadImage("cloud.png");
     obs1 = loadImage("obstacle1.png");
     obs2 = loadImage("obstacle2.png");
     obs3 = loadImage("obstacle3.png");
     obs4 = loadImage("obstacle4.png");
     obs5 = loadImage("obstacle5.png");
     obs6 = loadImage("obstacle6.png");
     trex_collied = loadAnimation("trex_collided.png");
     restartImg = loadImage("restart.png");
     gameoverImg = loadImage("gameOver.png");
     jumpSound = loadSound("jump.mp3");
     checkpointSound = loadSound("checkPoint.mp3");
     dieSound = loadSound("die.mp3");
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collied);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  score=0;
  
  //gameover 
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  gameover.scale= 0.5;
  gameover.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale= 0.3;
  restart.visible = false;
}
  

function draw() {
  //set background color
  background(180);
  
  text("score:"+score,500,50);
  text("highscore"+highscore,400,50);
  if(gamestate==PLAY){
    ground.velocityX = -(6+3*score/100);
    score = score+ Math.round(frameCount/60);
    if(score>0 && score%100==0){
      checkpointSound.play();
    }
    if(keyDown("space")&& trex.y >= 165) {
    trex.velocityY = -10;
    jumpSound.play();
  }
    trex.velocityY = trex.velocityY + 0.8
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnClouds()
  spawnObstacle();
    if(obstaclesGroup.isTouching(trex)){
      gamestate = END;
      dieSound.play();
      
    }
  }
  else if(gamestate==END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collied);
    gameover.visible = true;
    restart.visible = true;
    trex.velocityY = 0;
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invisibleGround);
  
  
  drawSprites();
}

  function reset(){
    gamestate = PLAY;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    gameover.visible = false;
    restart.visible = false;
    trex.changeAnimation("running",trex_running);
    if(highscore<score){
      highscore = score
    }
    score = 0;
  }
function spawnObstacle (){
  if(World.frameCount % 60==0){
  var obstacle = createSprite (600,165,10,40);
    obstacle.velocityX = -(6+3*score/100);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obs1);
        break;
      case 2: obstacle.addImage(obs2);
        break;  
        case 3: obstacle.addImage(obs3);
        break;
        case 4: obstacle.addImage(obs4);
        break;
        case 5: obstacle.addImage(obs5);
        break;
        case 6: obstacle.addImage(obs6);
        break;
        default :break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime = 130 ;
    obstaclesGroup.add(obstacle);
  }
    
}

function spawnClouds (){
  if(World.frameCount % 60==0){
   var cloud = createSprite(600,120,40,10);
  cloud.velocityX = -3;
   cloud.y = Math.round (random(70,120)) ;
    cloud.addImage(cloudimg);
    cloud.scale = 0.7;
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1
    cloud. lifetime = 200;
    cloudsGroup.add(cloud);
     }
  
}



