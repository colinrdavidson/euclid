var State = function () {
  this.points = [];
  this.potentialPoints = [];
  this.lines = [];
  this.circles = [];
}

State.prototype.allPoints = function () {
  return this.points.concat(this.potentialPoints);
}

State.prototype.allShapes = function () {
  return this.lines.concat(this.circles);
}

State.prototype.allObjects = function () {
  return this.allPoints().concat(this.allShapes());
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
      for (var i = 0; i < this.allShapes().length; i++){
        var potentialPoints = line.intersectsWith(this.allShapes()[i]);

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
      for (var i = 0; i < this.allShapes().length; i++){
        var potentialPoints = circle.intersectsWith(this.allShapes()[i]);

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

State.prototype.addLevelState = function (levelState) {
  var points = levelState.points;

  if (points){

    for (var p in points){
      var point = new Point(0, points[p].x, points[p].y);
      //So we can refer to this point later
      points[p] = point;
      this.addPoint(point); 
    }
  }

  var lines = levelState.lines;

  if (lines){
    for (var l in lines){
      var line = new Line(0, points[lines[l].pt1], points[lines[l].pt2]);
      
      this.addLine(line);
    }
  }

  var circles = levelState.circles;

  if (circles){
    for (var c in circles){
      var circle = new Circle(0, points[circles[c].foc], points[circles[c].loc]);

      this.addCircle(circle);

    } 
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
    this.addLevelState(object);
  }
}

State.prototype.isContainedIn = function (state) {
  if (state instanceof State){
    for (var i = 0; i < this.points.length; i++){
      if (!this.points[i].isInArray(state.points)){
        return false;
      }
    }
    for (var i = 0; i < this.lines.length; i++){
      if (!this.lines[i].isInArray(state.lines)){
        return false;
      }
    }
    for (var i = 0; i < this.circles.length; i++){
      if (!this.circles[i].isInArray(state.circles)){
        return false;
      }
    }
    return true;
  }
  return false;
}


