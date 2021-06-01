const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var canvas;
var mario, mario_img, mario_img2;
var background1;
var ground;
var edges;
var tower,tower_img;
var scene;
var towerGroup;
var monster, monster_img, monsterGroup;

function preload(){
  mario_img= loadImage("mario3.png");
  mario_img2 = loadImage("mario4.png");
  background1 = loadImage("background.png")
  tower_img = loadImage("tower.png");
  monster_img = loadImage("moster.png");

}
function setup() {
  canvas = createCanvas(displayWidth,displayHeight-145);

  scene = createSprite(0,-70, displayWidth,displayHeight);
  scene.addImage(background1);
  scene.scale= 11;
  scene.x = scene.width/2;

  engine = Engine.create();
  world = engine.world;

  mario = createSprite (400, 600, 50, 50);
  mario.addImage(mario_img);
  mario.scale= 0.1; 
  towerGroup = new Group();
  monsterGroup = new Group();

 

  
  

  ground = createSprite(displayWidth/2,610, 3000,10);
 ground.visible = true;
}

function draw() {
  background(0);
  
  scene.velocityX = -4;
  if(scene.x<0){
    scene.x = scene.width/2;
  }
  ground.velocityX = -3;

  if (ground.x < 0){
    ground.x = ground.width/2;
  }


 mario.velocityX = 0;
 mario.velocityY =0;

  if(keyDown(RIGHT_ARROW)){
    mario.velocityX = 4;
    mario.velocityY = 0;
   // mario.addImage(mario_img2);
   
  }
  if(keyDown("space")){
    mario.velocityY = -10;
    mario.velocityX=0;
  }
mario.velocityY = mario.velocityY+3.8;
mario.depth += 1;

if(towerGroup.isTouching(mario)){
  mario.velocityX = 0;
  mario.velocityY = 0;
  
}
  
  
  
edges = createEdgeSprites();
mario.collide(ground);
mario.collide(edges);
Spawntower();
SpawnMonster();
Engine.update(engine);
  drawSprites();
}

function Spawntower(){
  if(frameCount%270 === 0){
  tower = createSprite(1200,550 ,50,50);
  tower.addImage(tower_img);
  tower.velocityX = -2;
  towerGroup.add(tower);
  }
}

function SpawnMonster(){
  if(frameCount%280 === 0){
  monster = createSprite(1300,550 ,50,50);
  monster.addImage(monster_img);
  monster.scale= 0.5;
  monster.velocityX = -2;
  monsterGroup.add(monster);
  }
}