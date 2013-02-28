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
        var potentialPoints = line.intersectsWith(this.lines[i]);

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
    if (!circle.isInArray(this.circles)){
      for (var i = 0; i < this.lines.length; i++){
        var potentialPoints = circle.intersectsWith(this.lines[i]);

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

State.prototype.add = function (object){
  if (object instanceof Point){
    this.addPoint(object);
  }
  else if (object instanceof Line){
    this.addLine(object);
  }
  else if (object instanceof Circle){
    this.addCircle(object);
  }
  else if (object instanceof Array){
    for (var i; i < object.length; i++){
      this.add(object[i]);
    }
  }
  else if (object instanceof State){
    this.add(object.points);
    this.add(object.lines);
    this.add(object.circles);
  }
  else if (object.points || object.lines || object.circles){
    this.add(object.points);
    this.add(object.lines);
    this.add(object.circles);
  }
}


