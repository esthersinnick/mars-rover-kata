// Rover Object

var rover = {
  direction : "N",
  x : 0,
  y : 0,
  travelLog: [[0,0]]
  //travelLog: [[this.x,this.y]]
}

//

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


function moveForward(){
  switch (rover.direction){
    case "N":
      if(rover.y > 0){
        rover.y = rover.y - 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
    case "S":
      if(rover.y < 10){
        rover.y = rover.y + 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
    case "W":
      if (rover.x > 0){
        rover.x = rover.x - 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
    case "E":
      if(rover.x < 10){
        rover.x = rover.x + 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
  }
}

function moveBackward(){
  switch (rover.direction){
    case "S":
      if(rover.y > 0){
        rover.y = rover.y - 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
    case "N":
      if(rover.y < 10){
        rover.y = rover.y + 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
    case "E":
      if (rover.x > 0){
        rover.x = rover.x - 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
    case "W":
      if(rover.x < 10){
        rover.x = rover.x + 1;
      }
      rover.travelLog.push([rover.x , rover.y]);
      return rover;
  }
}

function move(sequence){
  var sequenceArray = Array.from(sequence.toUpperCase()).filter(letter => letter === "L" || letter === "R" || letter === "F" || letter === "B");  
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

move("gfg");

console.log("Positions: [" + rover.travelLog.join("] - [") + "] Current direction: " + rover.direction);
