var Circle = function (layer, foc, loc){
  //foc is for focus ie centre
  //loc is for loci ie point on circle
  //TODO: overload function for (layer, foc, rad) where rad is radius

  this.layer = layer;
  this.foc = foc;
  this.loc = loc;
}

Circle.prototype.Layer = function() {
  return this.layer 
}

Circle.prototype.setLayer = function(newLayer) {
  this.layer = newLayer;
}

Circle.prototype.Foc = function() {
  return this.foc 
}

Circle.prototype.Loc = function() {
  return this.loc 
}

Circle.prototype.isSame = function(Cir) {
  if (this.foc.isSame(Cir.Foc()) && this.loc.isSame(Cir.Loc())) return true;
  else return false;
}



Circle.prototype.draw = function(colour) {
  //colour is string "#RRGGBB"
  if (!colour){
    colour = "#000000";
  }
  
  //local vars
  var layer = this.Layer();
  var focX = this.Foc().X();
  var focY = this.Foc().Y();
  var locX = this.Loc().X();
  var locY = this.Loc().Y();
  

  //compute radius
  var radius = Math.sqrt(Math.pow(focX - locX, 2) + Math.pow(focY - locY, 2));

  //draw the circle
  layer.fillStyle = colour;
  layer.beginPath();
  layer.arc(focX, focY, radius, 0, Math.PI*2, true);
  layer.closePath();
  layer.stroke();
}

Circle.prototype.intersectsWith = function(shape){
  var pointsOfIntersection = [];

  if (shape instanceof Circle){
    var x0 = this.Foc().X();
    var y0 = this.Foc().Y();
    var r0 = pointPointDistance(this.Foc().X(), this.Foc().Y(), this.Loc().X(), this.Loc().Y());
    var x1 = shape.Foc().X(); 
    var y1 = shape.Foc().Y();
    var r1 = pointPointDistance(shape.Foc().X(), shape.Foc().Y(), shape.Loc().X(), shape.Loc().Y());
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
  return "Circle: (" + this.Foc().toString() + ", " + this.Loc().toString() + ")";
}
