var bg, backgroundImage, wall, wallImage;
var gun, gunImage, bullet, bulletImage;
var invisible, bulletGroup, sound;
var thickness, speed, weight;

function preload(){
  backgroundImage = loadImage("bg.jpg");
  wallImage = loadImage("wall.png");

  gunImage = loadImage("gun.png");
  bulletImage = loadImage("bullet.png");

  sound = loadSound("gunShot.mp3");
}

function setup() {
  createCanvas(1600,400);

  bg = createSprite(770,200,1600,400);
  bg.addImage("background", backgroundImage);
  bg.scale = 3;

  wall = createSprite(1550,200,10,10);
  wall.addImage("wallCheck", wallImage);

  gun = createSprite(200,200,10,10);
  gun.addImage("gunFire", gunImage);
  gun.scale = 0.5;

  invisible = createSprite(375,200,10,400);
  invisible.visible = false;

  bullet = createSprite(375,110,10,10);
  bullet.visible = false;

  bulletGroup = new Group();
}

function draw() {
  background(0,0,0);

  drawSprites();

  edges = createEdgeSprites();
  gun.bounceOff(edges);
  gun.collide(invisible);

  if(bulletGroup.isTouching(wall)){
    bulletGroup.destroyEach();
    thickness = random(22,83);
    speed = random(223,321);
    weight = random(30,52);
    var damage = 0.5 * weight * speed * speed /( thickness * thickness * thickness);
    console.log(damage);

    if(damage <= 10){
      alert("Damage " + Math.round(damage) + " doesn't damaged the wall");
    }
    if(damage > 10){
      alert("Damage " + Math.round(damage) + " damaged the wall");
    }
  }

  if(keyDown("space")){
    fire();
    gun.velocityX = -50;

    sound.play();
    setTimeout(function(){
      sound.stop();
    }, 1000);
  }

}

function fire(){
  bullet = createSprite(375,110,10,10);
  bullet.addImage("bulletImg", bulletImage);
  bullet.scale = 0.1;
  bullet.velocityX = 50;
  bullet.visible = true;
  bulletGroup.add(bullet);
}
