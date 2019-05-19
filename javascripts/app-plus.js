// Rover Object

var rover = {
  direction : "N",
  x : 0,
  y : 0,
}
rover.travelLog = [[rover.x,rover.y]];

//

//para colocar un obstáculo basta con cambiar -> " " por cualquier otra cosa.
var grid = [
[" "," "," "," "," "," "," "," "," "," "],
[" "," ","X"," "," "," "," "," "," "," "],
[" "," ","X"," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","X","X"," "," "],
[" "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "],
[" "," ","X","X","X"," "," "," "," "," "],
[" "," "," "," "," "," "," "," ","X"," "],
[" "," "," "," "," "," "," "," "," "," "]
]


//cambio de dirección a la izquierda
function turnLeft(){
  switch (rover.direction){
    case "N":
      rover.direction = "W";
      return rover.direction;
    case "W":
      rover.direction = "S";
      return rover.direction;
    case "S":
      rover.direction = "E";
      return rover.direction;
    case "E":
      rover.direction = "N";
      return rover.direction;
  }
}

//cambio de dirección a la derecha
function turnRight(){  
  switch (rover.direction){
    case "N":
      rover.direction = "E";
      return rover.direction;
    case "W":
      rover.direction = "N";
      return rover.direction;
    case "S":
      rover.direction = "W";
      return rover.direction;
    case "E":
      rover.direction = "S";
      return rover.direction;
  }
}

//movimiento hacia arriba, teniendo en cuenta obstáculos y límite del grid
function moveUp(){
  if(rover.y > 0){
    if (grid[(rover.y-1)][rover.x]===" "){
    rover.y = rover.y - 1;
    }else {
      console.log("Obstacle found at " + rover.x + "," + (rover.y-1) );
    }
  }
  rover.travelLog.push([rover.x , rover.y]);  
}

//movimiento hacia abajo, teniendo en cuenta obstáculos y límite del grid
function moveDown(){
  if(rover.y < 9){
    if (grid[(rover.y+1)][rover.x]===" "){
      rover.y = rover.y + 1;
    } else {
      console.log("Obstacle found at " + rover.x + "," + (rover.y+1) );
    }
  }
  rover.travelLog.push([rover.x , rover.y]);
}

//movimiento hacia la izquierda, teniendo en cuenta obstáculos y límite del grid
function moveLeft(){
  if (rover.x > 0){
    if (grid[rover.y][(rover.x-1)]===" "){
      rover.x = rover.x - 1;
    } else {
      console.log("Obstacle found at " + (rover.x-1) + "," + rover.y );
    }
  }
  rover.travelLog.push([rover.x , rover.y]);
}

//movimiento hacia la derecha, teniendo en cuenta obstáculos y límite del grid
function moveRight(){
  if(rover.x < 9){
    if (grid[rover.y][(rover.x+1)]===" "){
      rover.x = rover.x + 1;
    } else{
      console.log("Obstacle found at " + (rover.x+1) + "," + rover.y );
    }
  }
  rover.travelLog.push([rover.x , rover.y]);
}

//avanza una casilla hacia delante, en función de su dirección
function moveForward(){
  switch (rover.direction){
    case "N":
      moveUp();
      return rover;
    case "S":
      moveDown();
      return rover;
    case "W":
      moveLeft();
      return rover;
    case "E":
      moveRight();
      return rover; 
  }
}

//retrocede una casilla hacia atrás, en función de su dirección
function moveBackward(){
  switch (rover.direction){
    case "N":
      moveDown();
      return rover;
    case "S":
      moveUp();
      return rover;
    case "W":
      moveRight();
      return rover;
    case "E":
      moveLeft();
      return rover; 
  }
}

//función que ejecuta la secuencia de comandos
function move(sequence){
  //transformo el string que recibo como "sequence" en un array, lo paso a mayúsculas, y me quedo sólo con las letras L, R, F y B
  var sequenceArray = Array.from(sequence.toUpperCase()).filter(letter => letter === "L" || letter === "R" || letter === "F" || letter === "B");  
  //bucle iterando por el array para ejecutar la función correspondiente a cada letra.
  for (var i = 0; i < sequenceArray.length; i++){    
    switch (sequenceArray[i]){
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
    }
  }
}

//secuencia que encuentra todos los obstáculos y llega al límite del grid:
move("rffrflfrffrflflfffrflfrflfrfffffrfffflfrffrflfrfbbb");

//muestra en la consola las posiciones visitadas (travelLog) y la dirección con la que acaba el rover
console.log("Positions: [" + rover.travelLog.join("] - [") + "] Current direction: " + rover.direction);
