var Line = function (layer, pt1, pt2){
  this.layer = layer;
  this.pt1 = pt1;
  this.pt2 = pt2;
}

Line.prototype.slope = function() {
  return (this.pt1.y - this.pt2.y) / (this.pt1.x - this.pt2.x);
}

Line.prototype.isSame = function(Ln) {
  if ((Ln instanceof Line) && this.pt1.isSame(Ln.pt1) && this.pt2.isSame(Ln.pt2)){
    return true;
  }
  else if ((Ln instanceof Line) && this.pt1.isSame(Ln.pt2) && this.pt2.isSame(Ln.pt1)){
    return true;
  }
  else{
    return false;
  }
}

Line.prototype.copy = function (layer) {
  return new Line(layer, this.pt1, this.pt2);
}

Line.prototype.intersectsWith = function(shape){
  var pointsOfIntersection = [];
  var x1 = this.pt1.x;
  var y1 = this.pt1.y;
  var x2 = this.pt2.x;
  var y2 = this.pt2.y;

  if (shape instanceof Circle){
    //P1 is the first line point
    //P2 is the second line point
    //C is the centre of the circle
    var focX = shape.foc.x;
    var focY = shape.foc.y;
    var locX = shape.loc.x;
    var locY = shape.loc.y;

    var r = pointPointDistance(focX, focY, locX, locY);

    //(dP2x, dP2y) is vector from P1 to P2
    var dP2x = x2 - x1;
    var dP2y = y2 - y1;

    //(dCx, dCy) is vector from P1 to C 
    var dCx = focX - x1;
    var dCy = focY - y1;

    //a is the distance from point 1 to C
    var a = pointPointDistance(x1, y1, focX, locX);

    //P3 is C projected onto the line
    //projScale is the scalar for the projection
    var projScale = (dCx*dP2x + dCy*dP2y)/(dP2x*dP2x + dP2y*dP2y);

    //(dP3x, dP3y) is the vector from P1 to P3
    var dP3x = projScale*dP2x;
    var dP3y = projScale*dP2y;

    x3 = x1 + dP3x;
    y3 = y1 + dP3y;

    //b is the distance from C to P3
    var b = pointPointDistance(focX, focY, x3, y3);

    //d is the dsiatnce from P1 to P3
    var d = pointPointDistance(x1, y1, x3, y3);

    if (d == 0){ //point1 of line is focus of circle
      var offset = r/pointPointDistance(x1, y1, x2, y2);
      var newX1 = x1 - dP2x*(offset);
      var newY1 = y1 - dP2y*(offset);
      var newX2 = x1 + dP2x*(offset);
      var newY2 = y1 + dP2y*(offset);

      var point1 = new Point(this.layer, newX1, newY1);
      var point2 = new Point(this.layer, newX2, newY2);

      //point1 in segment
      if (this.containsPoint(point1)){
        pointsOfIntersection.push(point1);
      }

      //point2 in segment
      if (this.containsPoint(point2)){
        pointsOfIntersection.push(point2);
      }
    }
    else{
      if (b == r){ //intersect at 1 point
        var point = new Point(this.layer, x3, y3); //projection is the only intersection

        //point in segment
        if (this.containsPoint(point)){
          pointsOfIntersection.push(point);
        }
      }
      else if (b < r){
        //offset is the distance from P3 to the intersection
        var offset = Math.sqrt(r*r - b*b)/d;
        var newX1 = x3 - dP3x*(offset);
        var newY1 = y3 - dP3y*(offset);
        var newX2 = x3 + dP3x*(offset);
        var newY2 = y3 + dP3y*(offset);

        var point1 = new Point(this.layer, newX1, newY1);
        var point2 = new Point(this.layer, newX2, newY2);

        //point1 in segment
        if (this.containsPoint(point1)){
          pointsOfIntersection.push(point1);
        }

        //point2 in segment
        if (this.containsPoint(point2)){
          pointsOfIntersection.push(point2);
        }
      }
    }
  }
    
  else if (shape instanceof Line){
    var x1 = this.pt1.x;
    var y1 = this.pt1.y;
    var x2 = this.pt2.x;
    var y2 = this.pt2.y;
    var x3 = shape.pt1.x;
    var y3 = shape.pt1.y;
    var x4 = shape.pt2.x;
    var y4 = shape.pt2.y;

    //check parrallel
    var denominator = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);

    if (denominator != 0){
      var newX = ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4)) / denominator; 
      var newY = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4)) / denominator; 

      var point = new Point(this.layer, newX, newY);

      //points in segment
      if (this.containsPoint(point) && shape.containsPoint(point)){
        pointsOfIntersection.push(point);
      }

    }
    else{
      console.log("parallel");
    }

  }
  else{
    console.log("Not a shape.");
  }

  return pointsOfIntersection;
}


Line.prototype.containsPoint = function(point){
  //check if its even on the line
  var changeX = this.pt2.x - this.pt1.x;
  var changeY = this.pt2.y - this.pt1.y;

  var hX;
  var hY;

  if (changeX == 0 && changeY == 0){
    //zey do nothing!
  }
  else if (changeX == 0){
  hY = (point.y - this.pt1.y) / changeY;
    if (point.x == this.pt1.x && hY > 0 && hY < 1){
      return true;
    }
  }
  else if (changeY == 0){
  hX = (point.x - this.pt1.x) / changeX;
    if (point.y == this.pt1.y && hX > 0 && hX < 1){
      return true;
    }
  }
  else{
    hX = (point.x - this.pt1.x) / changeX;
    hY = (point.y - this.pt1.y) / changeY;

    if (hX > 0 && hX < 1){
      return true;
    }
  }
  return false;
}

Line.prototype.extend = function (layer) {
  //draws the other parts of the line to make it touch the sides of the window
  var x1 = this.pt1.x;
  var y1 = this.pt1.y;
  var x2 = this.pt2.x;
  var y2 = this.pt2.y;

  var dx = x2 - x1;
  var dy = y2 - y1;

  var c; //scalar multiple to represent any point on the line
  var d; //scalar multiple to represent any point on the line

  if (dx == 0){ //only look at y dir
    c = (0 - y1)/dy;
    d = (400 - y1)/dy;
  }
  else if (dy == 00){ //only look at x dir
    c = (0 - x1)/dx;
    d = (400 - x1)/dx;
  }
  else{ //find scalars when line hits sides of screen
    if ( Math.abs((0 - x1)/dx) < Math.abs((0 - y1)/dy) ){ //line hits top/left side when x = 0
      c = (0 - x1)/dx;
    }
    else{ //line hits top/left side when y = 0
      c = (0 - y1)/dy;
    }
    if ( Math.abs((400 - x1)/dx) < Math.abs((400 - y1)/dy) ){ //line hits bottom/right side when x = 400
      d = (400 - x1)/dx;
    }
    else{ //line hits bottom/right side when y = 400
      d = (400 - y1)/dy;
    }
  }
  
  new_point1 = new Point(layer, x1 + c*dx, y1 + c*dy);
  new_point2 = new Point(layer, x1 + d*dx, y1 + d*dy);

  if (this.pt1.distanceTo(new_point1) > this.pt2.distanceTo(new_point1)){ //swap new points
    var temp = new_point2;
    new_point2 = new_point1;
    new_point1 = temp;
  }
  
  var new_line1 = new Line(layer, new_point1, this.pt1);
  var new_line2 = new Line(layer, this.pt2, new_point2);


  console.log(new_line1.toString());
  console.log(this.toString());
  console.log(new_line2.toString());

  return [new_line1, new_line2];
}

Line.prototype.toString = function () {
  return "Line: (" + this.pt1.toString() + ", " + this.pt2.toString() + ")"; 
}

Line.prototype.isInArray = function (array){
  for(var i = 0; i < array.length; i++){
    if (this.isSame(array[i]))
      return true;
  }
  return false;
}
