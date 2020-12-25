var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var invisibleGround
var survivalTime
var banana,bananaImage
var obstacle,obstacleImage
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png"); 
}

function setup() {
  FoodGroup = new Group()
  ObstacleGroup = new Group()

 monkey = createSprite(70,370,50,50)
 monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(250,405,1000,10)
  ground.x = ground.x / 2
  
  invisibleGround = createSprite(250,405,1000,10)
  invisibleGround.x = ground.width / 2
  
  
}


function draw() {
createCanvas(500,480)
  background("pink")
  
 if(gameState === PLAY){ 
  if (ground.x < 0 ){
    ground.x = ground.width / 2  
     }
  if (invisibleGround.x < 0 ){
    invisibleGround.x = invisibleGround.width / 2  
     }
  if(keyDown("space")&& monkey.isTouching(ground)){
    monkey.velocityY= - 20
  }
    score =Math.round(frameCount/3)
    survivaltime = Math.ceil(frameCount/frameRate)
     ground.velocityX = -(5+0.2*score/100)
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach()
  }

Food();
Obstacle();
   if(monkey.isTouching(ObstacleGroup)){
     gameState = END;
   }
 }
  else if (gameState === END){
    ground.velocity = 0
    invisibleGround.velocity = 0
    ObstacleGroup.setvelocityEach(0)
    FoodGroup.setvelocityEach(0)
  }  
 
monkey.velocityY = monkey.velocityY+0.9
monkey.collide(invisibleGround)

  stroke("black")
  textSize(20)
  fill("red")
  text("score:" + score,400,50)
  
 
  stroke("red")
  textSize(20)
  fill("black")
  text("survival Time:"+ survivalTime ,100,50)
  
  drawSprites();
}

function Food(){
  if (frameCount %80 === 0){
    banana = createSprite(500,10,10,20)
    banana.addImage("banana",bananaImage)
    banana.velocityX = -(1+2*score/100)
    banana.Y = Math.round(random(120,200))
    banana.scale = 0.1
    FoodGroup.add(banana)
    FoodGroup.setLifetimeEach(100)
    banana.setCollider("rectangle",0,0,400,400)
  }
}
function Obstacle(){
  if(frameCount %300 === 0){
    obstacle = createSprite(500,365,23,323)
    obstacle.addImage("obstacle",obstacleImage)
    obstacle.scale = 0.2
    ObstacleGroup.add(obstacle)
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle",0,0,200)
  }
}










