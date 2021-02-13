//Declare Variables
var path,boy,cash,diamonds,jwellery,sword;

var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;

var treasureCollection = 0;
var lives = 3;

var cashG,diamondsG,jwelleryG,swordGroup;

var Play = 1;
var End = 0;
var GameState = Play;

function preload()
{
  //Preload Images And Animations
  pathImg = loadImage("Road.png");
  
  boyImg = loadAnimation("runner1.png","runner2.png");
  
  cashImg = loadImage("cash.png");
  
  diamondsImg = loadImage("diamonds.png");
  
  jwelleryImg = loadImage("jwell.png");
  
  swordImg = loadImage("sword.png");
  
  endImg =loadAnimation("gameOver.png");
  
  GO = loadImage("gameOver.png")
}

function setup()
{
  //Create canvas
  createCanvas(400,500);
  
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 10;


  //creating boy running
  boy = createSprite(70,430,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.setCollider("rectangle", 1, 1, 950, 950);
  boy.scale=0.08;
  
  //Create groups
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() 
{
  //Background
  background(0);
  
  //Gamestate Play
  if (GameState === Play)
  {
    //Boy Follows Mouse
      boy.x = World.mouseX;
    
    //Edges
      edges= createEdgeSprites();
      boy.collide(edges);
  
    //reset the background
      if(path.y > 400 )
       {
          path.y = height/2;
       }
  
    //Create Treasure and swords
      createCash();
      createDiamonds();
      createJwellery();
      createSword();
    
    
    if (cashG.isTouching(boy)) 
    {
      cashG.destroyEach();
      treasureCollection = treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) 
    {
      diamondsG.destroyEach(); 
      treasureCollection = treasureCollection+100;
    }
    else if(jwelleryG.isTouching(boy)) 
    {
      jwelleryG.destroyEach(); 
      treasureCollection = treasureCollection+70;
    }
    else if(swordGroup.isTouching(boy))
      {
        swordGroup.destroyEach();
        lives = lives-1
      }
    
    //Lives
    if (lives === 0)
      {
        GameState = End
      }
  }
  
  if (GameState === End) 
  {
    path.velocityY = 0;
    cashG.setVelocityYEach(0);
    cashG.destroyEach(); 
    diamondsG.setVelocityYEach(0);
    diamondsG.destroyEach();
    jwelleryG.setVelocityYEach(0);
    jwelleryG.destroyEach();
    swordGroup.setVelocityYEach(0);
    swordGroup.destroyEach();
    GameOver = createSprite(200,250,20,20);               
    GameOver.addImage("Game", GO);
    GameOver.scale = 0.9
    boy.visible = false;
  }

  drawSprites();
  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,50,30);
  text("Lives: "+ lives,250,30);

}

function createCash() {
  if (World.frameCount % 30 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 10;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 70 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 10;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 10 ;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 10;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}