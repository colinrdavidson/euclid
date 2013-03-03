var Point = function(layer, x, y){
  this.layer = layer;
  this.x = Math.round(x*10000000)/10000000;
  this.y = Math.round(y*10000000)/10000000;
}

Point.prototype.copy = function (layer) {
  if (!layer){
    return new Point(this.layer, this.x, this.y);
  }
  else
    return new Point(layer, this.x, this.y);
}

Point.prototype.isSame = function (pt) {
  if ((pt instanceof Point) && (this.x == pt.x && this.y == pt.y)){
    return true;
  }
  else{
    return false; 
  }
}

Point.prototype.toString = function (){
  return "Point: (" + this.x + ", " + this.y + ")";
}

Point.prototype.isInArray = function (array){
  //assume this array is full of points
  for(var i = 0; i < array.length; i++){
    if (this.isSame(array[i])){
      return true;
    }
  }
  return false;
}

Point.prototype.distanceToPoint = function (point) {
  return pointPointDistance(this.x, this.y, point.x, point.y);
}

Point.prototype.distanceToLine = function (line) {
  if (line instanceof Line){
    if (this.projectedOnto(line)){
      return this.distanceToPoint(this.projectedOnto(line));
    }
    else{
      return Math.min(this.distanceToPoint(line.pt1), this.distanceToPoint(line.pt2));
    }
  }
}

Point.prototype.distanceToCircle = function (circle) {
  var d = pointPointDistance(this.x, this.y, circle.foc.x, circle.foc.y);
  var r = circle.radius;

  return Math.abs(d - r);
}

Point.prototype.distanceTo = function (object) {
  if (object instanceof Point){
    return this.distanceToPoint(object);
  }
  else if (object instanceof Line){
    return this.distanceToLine(object);
  }
  else if (object instanceof Circle){
    return this.distanceToCircle(object);
  }
  else{
    console.log("Trying to check distance to not an object");
  }
}

Point.prototype.projectedOnto = function (line) {
  //P1 is first point of line, P2 is second point of line, P3 is point to project
  var x1 = line.pt1.x;
  var y1 = line.pt1.y;
  var x2 = line.pt2.x;
  var y2 = line.pt2.y;
  var x3 = this.x;
  var y3 = this.y;

  //(dx2, dy2) is vector from P1 to P2, (dx3, dy3) is vector from P1 to P3
  var dx2 = x2 - x1;
  var dy2 = y2 - y1;
  var dx3 = x3 - x1;
  var dy3 = y3 - y1;

  //P4 is P3 projected onto the line
  //projScale is the scalar for the projection
  var projScale = (dx2*dx3 + dy2*dy3)/(dx2*dx2 + dy2*dy2);

  //(dx4, dy4) is the vector from P1 to P4
  var dx4 = projScale*dx2;
  var dy4 = projScale*dy2;

  //P4 is the projected point
  x4 = x1 + dx4;
  y4 = y1 + dy4;
  
  var dummyPoint = new Point(this.layer, x4, y4);

  //point in segment
  if (line.containsPoint(dummyPoint)){
    return dummyPoint;
  }
}
