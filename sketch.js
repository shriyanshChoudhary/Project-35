//Create variables here
var dog,Food;
var foodS;

function preload(){
	
  dogImg = loadImage("dogImg.png");
  dogImg2 = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();

  dog = createSprite(400,450,50,50)
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodS = database.ref('Food');
  foodS.on("value",readStock);
  
}


function draw() {  
  background("green");

  if(keyWentDown(UP_ARROW)&& foodS >= 1){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }
  
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  drawSprites();
  //add styles here
  
  fill("white");
  textSize(16);
  text("Note Press UP_ARROW Key To Feed Drago",240,20);

  textSize(30)

  text("Food remaining : "+ foodS,250,300)
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}