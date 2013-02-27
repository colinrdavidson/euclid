var State = function () {
  this.points = [];
  this.potentialPoints = [];
  this.lines = [];
  this.circles = [];
}

State.prototype.addCircle = function (circle) {
  if (circle instanceof Circle){
    this.circles.push(circle);
  }
  else {
    console.log("not a circle.");
  }
}

State.prototype.addPoint = function (point) {
  if (point instanceof Point){
    this.points.push(point);
  }
  else {
    console.log("not a point.");
  }
}

State.prototype.addPotentialPoint = function (point) {
  if (point instanceof Point){
    this.potentialPoints.push(point);
  }
  else {
    console.log("not a point.");
  }
}

State.prototype.addLine = function (line) {
  if (line instanceof Line){
    this.lines.push(line);
  }
  else {
    console.log("not a line.");
  }
}
