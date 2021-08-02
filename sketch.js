var dog,happydog, database, foodS, foodStock 

function preload()
{
	dogImage = loadImage("images/dogImg.png")
happydogImage = loadImage("images/dogImg1.png")

}

function setup() {

	createCanvas(500, 500);
  
  database= firebase.database()


  dog = createSprite(250,300,150,150)
  dog.addImage(dogImage)

  dog.scale = 0.15

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  

   background(46, 139, 87);

   if (keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happydogImage)
   }
   
  drawSprites();
  //add styles here
  textSize(13)
  fill(255,255,254)
  stroke("black")
  text("Food remaining: "+foodS,170,200)
  text("Note: Press UP ARROW key to Feed the dog with milk...",130,10,300,20)
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else {
    x = x-1
  }
  database.ref('/').update({
    food: x
  })
}

