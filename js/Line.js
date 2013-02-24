var Line = function (ctx, pt1, pt2){
  this.ctx = ctx;
  this.pt1 = pt1;
  this.pt2 = pt2;
}

Line.prototype.getCtx = function() {
  return this.ctx 
}

Line.prototype.scetCtx = function(newCtx) {
  this.ctx = newCtx;
}

Line.prototype.getPt1 = function() {
  return this.pt1 
}

Line.prototype.getPt2 = function() {
  return this.pt2 
}

Line.prototype.slope = function() {
  return (this.getPt1().getY() - this.getPt2().getY()) / (this.getPt1().getX() - this.getPt2().getX());
}

Line.prototype.isSame = function(Ln) {
  if (this.pt1.isSame(Ln.getPt1()) && this.pt2.isSame(Ln.getPt2())) return true;
  else if (this.pt1.isSame(Ln.getPt2()) && this.pt2.isSame(Ln.getPt1())) return true;
  else return false;
}

Line.prototype.draw = function(colour) {
  //colour is string "#RRGGBB"

  if (!colour){
    colour = "#000000";
  }

  //local vars
  var ctx = this.getCtx();
  var pt1X = this.getPt1().getX();
  var pt1Y = this.getPt1().getY();
  var pt2X = this.getPt2().getX();
  var pt2Y = this.getPt2().getY();

  //draw the line
  ctx.fillstyle = colour;
  ctx.beginPath();
  ctx.moveTo(pt1X, pt1Y);
  ctx.lineTo(pt2X, pt2Y);
  ctx.closePath();
  ctx.stroke();
}

Line.prototype.intersectsWith = function(shape){
  var pointsOfIntersection = [];
  var x1 = this.getPt1().getX();
  var y1 = this.getPt1().getY();
  var x2 = this.getPt2().getX();
  var y2 = this.getPt2().getY();

  if (shape instanceof Circle){
    //P1 is the first line point
    //P2 is the second line point
    //C is the centre of the circle
    var focX = shape.getFoc().getX();
    var focY = shape.getFoc().getY();
    var locX = shape.getLoc().getX();
    var locY = shape.getLoc().getY();

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

    if (b == r){ //intersect at 1 point
      var point = new Point(this.ctx, x3, y3); //projection is the only intersection
      
      //point in segment
      if (this.containsPoint(point)){
        pointsOfIntersection.push(point);
      }
    }
    else if (b < r){
      //offset is the distance from P3 to the intersection
      var offset = Math.sqrt(r*r - b*b);
      var newX1 = x3 - dP3x*(offset/d);
      var newY1 = y3 - dP3y*(offset/d);
      var newX2 = x3 + dP3x*(offset/d);
      var newY2 = y3 + dP3y*(offset/d);

      var point1 = new Point(this.ctx, newX1, newY1);
      var point2 = new Point(this.ctx, newX2, newY2);

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
    
  else if (shape instanceof Line){
    var x1 = this.getPt1().getX();
    var y1 = this.getPt1().getY();
    var x2 = this.getPt2().getX();
    var y2 = this.getPt2().getY();
    var x3 = shape.getPt1().getX();
    var y3 = shape.getPt1().getY();
    var x4 = shape.getPt2().getX();
    var y4 = shape.getPt2().getY();

    //check parrallel
    var denominator = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);

    if (denominator != 0){
      var newX = ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4)) / denominator; 
      var newY = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4)) / denominator; 

      var point = new Point(this.ctx, newX, newY);

      //points in segment
      if (this.containsPoint(point)){
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
  var changeX = this.getPt2().getX() - this.getPt1().getX();
  var changeY = this.getPt2().getY() - this.getPt1().getY();

  var hX;
  var hY;

  if (changeX == 0 && changeY == 0){
    //zey do nothing!
  }
  else if (changeX == 0){
  hY = (point.getY() - this.getPt1().getY()) / changeY;
    if (point.getX() == this.getPt1().getX() && hY > 0 && hY < 1){
      return true;
    }
  }
  else if (changeY == 0){
  hX = (point.getX() - this.getPt1().getX()) / changeX;
    if (point.getY() == this.getPt1().getY() && hX > 0 && hX < 1){
      return true;
    }
  }
  else{
    hX = (point.getX() - this.getPt1().getX()) / changeX;
    hY = (point.getY() - this.getPt1().getY()) / changeY;

    if (hX > 0 && hX < 1){
      return true;
    }
  }
  
  return false;
}

Line.prototype.toString = function(){
  return "Line: (" + this.getPt1().toString() + ", " + this.getPt2().toString() + ")"; 
}

