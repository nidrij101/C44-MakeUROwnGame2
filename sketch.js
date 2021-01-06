var PLAY = 1; 
var END = 0;
var gameState;

var score;
var coinGroup, enemyGroup;
var vaccine;

var coinImg, vaccineImg, enemyImg

function preload(){
  coinImg = loadImage("IMGS/Coin.png");
  vaccineImg = loadImage("IMGS/Vaccine.png");
  enemyImg = loadImage("IMGS/Enemy.png");

}

function setup() {
  createCanvas(400,400)
  score = 0;
  coinGroup = createGroup();
  enemyGroup = createGroup();

  vaccine = createSprite(200,200,20,20)
  vaccine.addImage(vaccineImg);
  vaccine.scale = 0.25;

  gameState = PLAY
}

function draw() {
  background("white");
  
  text("Score: "+ score, 250, 100);

  if (gameState === PLAY) {
    createCoins();
    createEnemy(); 
    
    vaccine.y = World.mouseY;
    vaccine.x = World.mouseX;
    
    if (vaccine.isTouching(coinGroup)) {
      coinGroup.destroyEach();
      score=score+2;
    }
    
    if (vaccine.isTouching(enemyGroup)) {
      gameState = END;
    }
    
  } else if (gameState === END) {
     coinGroup.destroyEach();     
     enemyGroup.destroyEach();
     vaccine.destroy();

     //var gameOver = createSprite(200, 200);
     //gameOver.setAnimation("textGameOver_1");
  }

  
  drawSprites();
}

function createCoins(){
  if (World.frameCount % 80 === 0) {
    var postion = Math.round(random(1,2));
    var coin = createSprite(400, 200);
    coin.addImage(coinImg);
    coin.scale = 0.25;

    coin.y = Math.round(random(0,400));
    coin.lifetime = 150;
    
    if (postion === 1) {
      coin.x = 400;
      coin.velocityX = -(4+(score/4));
    } else {
      if (postion === 2) {
        coin.x = 0;
        coin.velocityX = 4+(score/4);
      }
    }

    coinGroup.add(coin);
  }
}

function createEnemy(){
  if (World.frameCount % 200 === 0) {
    var postion = Math.round(random(1,2));
    var enemy = createSprite(400, 200);
    enemy.addImage(enemyImg);
    enemy.scale = 0.25;

    enemy.velocityX = -(4+(score/10));
    enemy.y = Math.round(random(0,400));
    enemy.lifetime = 150;
    
    if (postion === 1) {
      enemy.x = 400;
      enemy.velocityX = -(4+(score/10));
    } else {
      if (postion === 2) {
        enemy.x = 0;
        enemy.velocityX = 4+(score/10);
      }
    }
    enemyGroup.add(enemy);
  }
}