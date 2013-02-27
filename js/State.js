var State = function () {
  this.points = [];
  this.potentialPoints = [];
  this.lines = [];
  this.circles = [];
}

State.prototype.addPoint = function (point) {
  if (point instanceof Point){
    if (!point.isInArray(this.points)){
      this.points.push(point);
      console.log(point.toString());
    }
  }
  else {
    console.log("Point already in array.");
  }
}

State.prototype.addLine = function (line) {
  if (line instanceof Line){
    if (!line.isInArray(this.lines)){
      for (var i = 0; i < this.lines.length; i++){
        var potentialPoints = newLine.intersectsWith(this.lines[i]);

        if (potentialPoints){
          for (var j = 0; j < potentialPoints.length; j++){
            this.addPotentialPoint(potentialPoints[j]);  
          }
        }
      }

      this.lines.push(line);
      console.log(line.toString());
    }
    else {
      console.log("Line already in array");
    }
  }
}

State.prototype.addCircle = function (circle) {
  if(circle instanceof Circle){
    if (!circle.isinArray(this.circles){
      for (var i = 0; i < this.lines.length; i++){
        var potentialPoints = newCircle.intersectsWith(this.lines[i]);

        if (potentialPoints){
          for (var j = 0; j < potentialPoints.length; j++){
            this.addPotentialPoint(potentialPoints[j]);  
          }
        }
      }

      this.circles.push(circle);
      console.log(circle.toString());
    } 
    else{
      console.log("Circle already in array.");
    }
  }
}
State.prototype.addPotentialPoint = function (point) {
  if (point instanceof Point){
    if (!point.isInArray(this.potentialPoints)){
      this.potentialPoints.push(point);
    }
  }
  else {
    console.log("not a point.");
  }
}


