// Rover Objects

var user1 = {
  direction : "N", //norte
  x : 0,
  y : 0,
}

var user2 = {
  direction : "N", //norte
  x : 9,
  y : 0,
}

var user3 = {
  direction : "N", //norte
  x : 0,
  y : 9,
}

//declaro fuera esta propiedad para que la posición inicial dependa de X e Y. 
user1.travelLog = [[user1.x,user1.y]];
user2.travelLog = [[user2.x,user2.y]];
user3.travelLog = [[user3.x,user3.y]];

//declaro array con cada rover, para poder iterar entre ellos
var rovers=[user1, user2, user3];

//para colocar un obstáculo basta con cambiar -> " " por cualquier otra cosa.
var grid = [
["R"," "," "," "," "," "," "," "," ","R"],
[" "," ","X"," "," "," "," "," "," "," "],
[" "," ","X"," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","X","X"," "," "],
[" "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "],
[" "," ","X","X","X"," "," "," "," "," "],
[" "," "," "," "," "," "," "," ","X"," "],
["R"," "," "," "," "," "," "," "," "," "]
]
console.log(grid);

//variable con la que determinaré a qué rover le toca mover.
var i=0;

//cambio de dirección a la izquierda
function turnLeft(){
  switch (rovers[i].direction){
    case "N":
      return rovers[i].direction = "W";
    case "W":
      return rovers[i].direction ="S";
    case "S":
      return rovers[i].direction = "E";
    case "E":
      return rovers[i].direction = "N";
  }
}

//cambio de dirección a la derecha
function turnRight(){  
  switch (rovers[i].direction){
    case "N":
      return rovers[i].direction = "E";
    case "W":
      return rovers[i].direction = "N";
    case "S":
      return rovers[i].direction = "W";
    case "E":
      return rovers[i].direction = "S";

  }
}

//movimiento hacia arriba, teniendo en cuenta obstáculos y límite del grid
function moveUp(){
  if(rovers[i].y > 0){
    if (grid[(rovers[i].y-1)][rovers[i].x]===" "){
      grid[rovers[i].y][rovers[i].x] = " ";
      rovers[i].y -= 1;
      grid[rovers[i].y][rovers[i].x] = "R";
    }else {
      console.log("Obstacle found at " + rovers[i].x + "," + (rovers[i].y-1) );
    }
  }
  rovers[i].travelLog.push([rovers[i].x , rovers[i].y]);  
}

//movimiento hacia abajo, teniendo en cuenta obstáculos y límite del grid
function moveDown(){
  if(rovers[i].y < 9){
    if (grid[(rovers[i].y+1)][rovers[i].x]===" "){
      grid[rovers[i].y][rovers[i].x] = " ";
      rovers[i].y += 1;
      grid[rovers[i].y][rovers[i].x] = "R";
    } else {
      console.log("Obstacle found at " + rovers[i].x + "," + (rovers[i].y+1) );
    }
  }
  rovers[i].travelLog.push([rovers[i].x , rovers[i].y]);
}

//movimiento hacia la izquierda, teniendo en cuenta obstáculos y límite del grid
function moveLeft(){
  if (rovers[i].x > 0){
    if (grid[rovers[i].y][(rovers[i].x-1)]===" "){
      grid[rovers[i].y][rovers[i].x] = " ";
      rovers[i].x -= 1;
      grid[rovers[i].y][rovers[i].x] = "R";
    } else {
      console.log("Obstacle found at " + (rovers[i].x-1) + "," + rovers[i].y );
    }
  }
  rovers[i].travelLog.push([rovers[i].x , rovers[i].y]);
}

//movimiento hacia la derecha, teniendo en cuenta obstáculos y límite del grid
function moveRight(){
  if(rovers[i].x < 9){
    if (grid[rovers[i].y][(rovers[i].x+1)]===" "){
      grid[rovers[i].y][rovers[i].x] = " ";
      rovers[i].x += 1;
      grid[rovers[i].y][rovers[i].x] = "R";
    } else{
      console.log("Obstacle found at " + (rovers[i].x+1) + "," + rovers[i].y );
    }
  }
  rovers[i].travelLog.push([rovers[i].x , rovers[i].y]);
}


//avanza una casilla hacia delante, en función de su dirección
function moveForward(){
  switch (rovers[i].direction){
    case "N":
      moveUp();
      return rovers[i];
    case "S":
      moveDown();
      return rovers[i];
    case "W":
      moveLeft();
      return rovers[i];
    case "E":
      moveRight();
      return rovers[i]; 
  }
}

//retrocede una casilla hacia atrás, en función de su dirección
function moveBackward(){
  switch (rovers[i].direction){
    case "N":
      moveDown();
      return rovers[i];
    case "S":
      moveUp();
      return rovers[i];
    case "W":
      moveRight();
      return rovers[i];
    case "E":
      moveLeft();
      return rovers[i]; 
  }
}

//función para terminar el turno de un rover y pasar al siguiente
function endTurn(){
  if (i< rovers.length -1){
    i++;
  } else {
    i=0;
  }
}


//función que ejecuta la secuencia de comandos
function move(sequence){
  //transformo el string que recibo como "sequence" en un array, lo paso a mayúsculas, y me quedo sólo con las letras L (left), R(right), F(forward), B(backward) y E (endTurn)
  var sequenceArray = Array.from(sequence.toUpperCase()).filter(letter => letter === "L" || letter === "R" || letter === "F" || letter === "B" || letter==="E");  
  //bucle iterando por el array para ejecutar la función correspondiente a cada letra.
  for (var j = 0; j < sequenceArray.length; j++){    
    switch (sequenceArray[j]){
      case "L":
        turnLeft();
        break;
      case "R":
        turnRight();
        break;
      case "F":
        moveForward();
        break;
      case "B":
        moveBackward();
        break;
      case "E":
        endTurn();
        break;
    }
  }
}


/* ---------- PRUEBAS -------*/

//Prueba con solo 1 rover: secuencia que encuentra todos los obstáculos y llega al límite del grid:
move("rffrflfrffrflflfffrflfrflfrfffffrfffflfrffrflfrfbbb");


//Mover 3 rovers por turnos. para cambiar de turno: "e".
//mueve los 3 rovers un turno y vuelve a mover el primer
move("rfferrffefrfellffeeff");
console.log(rovers[0]);
console.log(rovers[1]);
console.log(rovers[2]);

console.log(grid);


//secuencia que hace chocar al primer rover con el segundo
move("rffffffffff");

//muestra en la consola las posiciones visitadas (travelLog) y la dirección con la que acaba el rover
console.log("Positions rover1: [" + rovers[0].travelLog.join("] - [") + "] Current direction: " + rovers[0].direction);
console.log("Positions rover2: [" + rovers[1].travelLog.join("] - [") + "] Current direction: " + rovers[1].direction);
console.log("Positions rover3: [" + rovers[2].travelLog.join("] - [") + "] Current direction: " + rovers[2].direction);


