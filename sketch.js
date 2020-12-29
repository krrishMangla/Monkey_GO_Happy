//gameStates
var PLAY=1;
var END=0;
var gameState = PLAY;

//monkey and its image variable
var monkey , monkey_running;

//banana and obstacle's  images variable
var bananaImage, obstacleImage;

//food and obstacle group 
var foodGroup, obstacleGroup;

//score variable
var score;
var survivalTime;

// ground variable
var ground,backGround,backgroundImage;



function preload()
{
  //loading monkey's animation
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //loading banana image
  bananaImage = loadImage("banana.png");
  
  //loading obstacle image
  obstaceImage = loadImage("stone.png");
  
  backgroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  //creating canvas
  createCanvas(500,400);
  
  backGround = createSprite(400,200,200,20);
  backGround.addImage("background",backgroundImage);
  backGround.velocityX = -2;
  backGround.x=backGround.width/2;
  
  
  //making monkey sprite and and editing it
  monkey = createSprite(80,307,20,50);
  monkey.addAnimation("monkeyMoving", monkey_running);
  monkey.scale = 0.14;
  monkey.debug = false;
 
  //making groung sprite and making its duplicate
  ground = createSprite(70,380,800,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible = false;
  
  
  
  //creating group
  foodGroup =  createGroup();
  obstacleGroup =  createGroup();
  
  score = 0;
  
  survivalTime = 0;
}



function draw()
{
 background("lightGrey");
  
  if(gameState === PLAY)
  {
   
   //duplicating ground
   if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
     if (backGround.x < 0)
    {
      backGround.x = backGround.width/2;
    }
  
    
   //making monkey jumping when spacebar is pressed
   if(keyDown("space") && monkey.y >= 110)
   {
    monkey.velocityY = -12; 
   }
    
   //giving gravity to monkey
   monkey.velocityY = monkey.velocityY +0.7;
    
   //spawning obstacles and bananas
   bananas();
   obstacles();
    
   //scoring when monkey is touching banana
   if(foodGroup.isTouching(monkey))
   {
    score = score +2; 
    foodGroup.destroyEach(); 
   } 
    
   switch(score)
   {
    case 10: monkey.scale =    0.16;
            break;  
    case 20: monkey.scale =    0.18;
            break; 
    case 30: monkey.scale =    0.20;
            break;  
    case 40: monkey.scale =    0.22;
            break;           
    case 50: monkey.scale =    0.24;
            break; 
    default: break;    
   } 
    
   if(obstacleGroup.isTouching(monkey))
   {
    gameState = END;   
   } 
  }
 
  if(gameState === END)
  {
   monkey.visible = false;
   backGround.velocityX = 0;  
     
   foodGroup.destroyEach();
   obstacleGroup.destroyEach();
  
   if(keyDown("r"))
   {
    reset(); 
   } 
}
  
  monkey.collide(ground);
  
  drawSprites();
  
 if(gameState === END)
 {
   stroke("red");
   textSize(40);
   fill("red");
   text("GAME OVER",130,140); 
    
   stroke("black");
   fill("black");
   textSize(40);
   text("Monkey is dead",110,180); 
    
   stroke("black");
   fill("black");
   textSize(40); 
   text("Press R to Restart",85,250);  
 }
  
  //makaing score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+score,50,50);
  
  
}



function reset()
{
 gameState = PLAY;
 monkey.visible = true;
 backGround.velocityX = -2; 
 monkey.scale = 0.14; 
  
 foodGroup.destroyEach();
 obstacleGroup.destroyEach(); 
  
 score = 0;

}

function bananas()
{
 if(frameCount % 80 === 0)
 {
  //creating banana sprite, spawning it randomly and editing it
  var banana = createSprite(400,120,20,20);
  banana.y = Math.round(random(120,200));
  banana.addImage("banana",bananaImage);
  banana.scale = 0.1;
  banana.lifetime =  120;
  banana.velocityX = -4; 
  //banana.debug = true;
  banana.setCollider("rectangle",0,0,300,300); 
   
  foodGroup.add(banana); 
 }
}



function obstacles()
{
 if(frameCount % 300 === 0)
 {
  var obstacle = createSprite(400,350,20,20);
  obstacle.addImage("obstacle",obstaceImage);
  obstacle.scale = 0.19;
  obstacle.lifetime = 120;
  obstacle.velocityX = -4;
  //obstacle.debug = true;
  obstacle.setCollider("circle",0,0,200); 
   
  obstacleGroup.add(obstacle); 
 } 
}

