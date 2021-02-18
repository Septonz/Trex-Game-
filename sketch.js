
var PLAY=1;
var END=0;
var gameState=PLAY


var trex,trexani
var groundImg,ground
var edge
var inv
var score
function preload () {
  
  trexani=loadAnimation("t111.png","t22.png","t33.png");
  trex_collided=loadAnimation("trex_collided.png")
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  gameImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
   checkPoint=loadSound("checkPoint.mp3");
}
function setup(){
  
  createCanvas(600,200)
  trex=createSprite(50,170,20,50)
  trex.addAnimation("t1",trexani)
  trex.addAnimation("c1",trex_collided)
  trex.scale=0.5;
  trex.x=50;  
  edge=createEdgeSprites();
  ground=createSprite(300,180,600,20);
  ground.addImage(groundImg)
  game=createSprite(300,100);
  game.addImage(gameImg);
  game.scale=0.5;
  restart=createSprite(300,140)
  restart.addImage(restartImg);
  restart.scale=0.5;
  inv=createSprite(300,180,600,10)
  inv.visible=false
  score=0
  obstacleGroup=new Group()
  cloudGroup= new Group()
  //ex.setCollider("rectangle",0,0,400,trex.height);
   trex.setCollider("circle",0,0,40);
  // trex.debug=true;
}

function draw(){
  background("white")
  text("SCORE: "+score,500,30);
 console.log("this is"+gameState)
  console.log(trex.y);
  // console.log(frameCount)
  
  if(gameState===PLAY){
     score=score+Math.round(frameRate()/60);
  ground.velocityX=-(6 + 3*score/100);
    restart.visible=false;
    game.visible=false;
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(score%100===0&&score>0){
      checkPoint.play()
    }
  if(keyDown("UP") && trex.y>=154){
          trex.velocityY=-10;
     jump.play()
  }
  trex.velocityY=trex.velocityY+0.7;
      spawnClouds()
  spawnObstacles()
    if(obstacleGroup.isTouching(trex)){
    gameState=END
      die.play()
      trex.velocityY=-10;
    jump.play()
    }
  }
  if(gameState===END){
    ground.velocityX=0;
      restart.visible=true;
    game.visible=true;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityEach(0)
    trex.velocityX=0;
    trex.velocityY=0;
    trex.changeAnimation("c1",trex_collided)
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset()
      
    }
  }
  
  
  trex.collide(inv);

  drawSprites();
  
  
}


function spawnClouds(){
  if(frameCount % 100===0){
    var cloud = createSprite(600,100,40,10)
  cloud.velocityX=-4;
    cloud.y=Math.round(random(50,100))
    cloud.addImage(cloudImg)
    cloud.scale=0.6;
    cloud.lifetime=200
 cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloudGroup.add(cloud);
  }
  
  
}

function spawnObstacles(){
  if (frameCount % 80===0){
    var obstacle = createSprite(600,165,10,40)
    obstacle.velocityX=-(6 + 3*score/100);
    obstacle.lifetime=200;
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break 
        
            case 2:obstacle.addImage(obstacle2);
        break 
        
            case 3:obstacle.addImage(obstacle3);
        break 
        
            case 4:obstacle.addImage(obstacle4);
        break 
        
            case 5:obstacle.addImage(obstacle5);
        break 
        
            case 6:obstacle.addImage(obstacle6);
        break 
        default: break;  
        
    }
    obstacle.scale=0.5;
     obstacle.depth=trex.depth
    trex.depth=trex.depth+1
    obstacleGroup.add(obstacle)
  }
}

function reset(){
  gameState=PLAY;
  score=0;
trex.changeAnimation("t1",trexani)
  game.visible=false
  restart.visible=false
  obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
}