var Circle = function (layer, foc, loc){
  //foc is for focus ie centre
  //loc is for loci ie point on circle
  //TODO: overload function for (layer, foc, rad) where rad is radius

  this.layer = layer;
  this.foc = foc;
  this.loc = loc;
}

Circle.prototype.isSame = function(Cir) {
  if (this.foc.isSame(Cir.foc) && this.loc.isSame(Cir.loc)) return true;
  else return false;
  if ((Cir instanceof Circle) && this.foc.isSame(Cir.Foc()) && this.loc.isSame(Cir.Loc())){
    return true;
  }
  else{
    return false;
  }
}

Circle.prototype.intersectsWith = function(shape){
  var pointsOfIntersection = [];

  if (shape instanceof Circle){
    var x0 = this.foc.x;
    var y0 = this.foc.y;
    var r0 = pointPointDistance(this.foc.x, this.foc.y, this.loc.x, this.loc.y);
    var x1 = shape.foc.x; 
    var y1 = shape.foc.y;
    var r1 = pointPointDistance(shape.foc.x, shape.foc.y, shape.loc.x, shape.loc.y);
    var a, dx, dy, d, h, rx, ry;
    var x2, y2;

    /* dx and dy are the vertical and horizontal distances between
     * the circle centers.
     */
    dx = x1 - x0;
    dy = y1 - y0;

    /* Determine the straight-line distance between the centers. */
    d = Math.sqrt((dy*dy) + (dx*dx));

    /* Check for solvability. */
    if (d > (r0 + r1)) {
      /* no solution. circles do not intersect. */
      console.log("No intersection, beside each other");
    }
    else if (d < Math.abs(r0 - r1)) {
      /* no solution. one circle is contained in the other */
      console.log("No intersection, one inside other");
    }
    else {

      /* 'point 2' is the point where the line through the circle
       * intersection points crosses the line between the circle
       * centers.  
       */

      /* Determine the distance from point 0 to point 2. */
      a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

      /* Determine the coordinates of point 2. */
      x2 = x0 + (dx * a/d);
      y2 = y0 + (dy * a/d);

      /* Determine the distance from point 2 to either of the
       * intersection points.
       */
      h = Math.sqrt((r0*r0) - (a*a));

      /* Now determine the offsets of the intersection points from
       * point 2.
       */
      rx = -dy * (h/d);
      ry = dx * (h/d);

      /* Determine the absolute intersection points. */
      var xi = x2 + rx;
      var xi_prime = x2 - rx;
      var yi = y2 + ry;
      var yi_prime = y2 - ry;

      var point1 = new Point(this.layer, xi, yi);
      var point2 = new Point(this.layer, xi_prime, yi_prime);

      if (point1.isSame(point2)){
        pointsOfIntersection.push(point1);
      }
      else {
        pointsOfIntersection.push(point1);
        pointsOfIntersection.push(point2);
      }
    }
  }

  else if (shape instanceof Line){
    return shape.intersectsWith(this);
  }
  else{
    console.log("Not a shape");
  }

  return pointsOfIntersection;
}

Circle.prototype.toString = function() {
  return "Circle: (" + this.foc.toString() + ", " + this.loc.toString() + ")";
}

Circle.prototype.isInArray = function (array){
  //assume this array is full of points
  for(var i = 0; i < array.length; i++){
    if (this.isSame(array[i]))
      return true;
  }

  return false;
}
