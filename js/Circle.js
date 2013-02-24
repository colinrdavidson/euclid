var Circle = function (ctx, foc, loc){
  //foc is for focus ie centre
  //loc is for loci ie point on circle
  //TODO: overload function for (ctx, foc, rad) where rad is radius

  this.ctx = ctx;
  this.foc = foc;
  this.loc = loc;
}

Circle.prototype.getCtx = function() {
  return this.ctx 
}

Circle.prototype.setCtx = function(newCtx) {
  this.ctx = newCtx;
}

Circle.prototype.getFoc = function() {
  return this.foc 
}

Circle.prototype.getLoc = function() {
  return this.loc 
}

Circle.prototype.isSame = function(Cir) {
  if (this.foc.isSame(Cir.getFoc()) && this.loc.isSame(Cir.getLoc())) return true;
  else return false;
}



Circle.prototype.draw = function(colour) {
  //colour is string "#RRGGBB"
  if (!colour){
    colour = "#000000";
  }
  
  //local vars
  var ctx = this.getCtx();
  var focX = this.getFoc().getX();
  var focY = this.getFoc().getY();
  var locX = this.getLoc().getX();
  var locY = this.getLoc().getY();
  

  //compute radius
  var radius = Math.sqrt(Math.pow(focX - locX, 2) + Math.pow(focY - locY, 2));

  //draw the circle
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(focX, focY, radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke();
}

Circle.prototype.intersectsWith = function(shape){
  var pointsOfIntersection = [];

  if (shape instanceof Circle){
    var x0 = this.getFoc().getX();
    var y0 = this.getFoc().getY();
    var r0 = pointPointDistance(this.getFoc().getX(), this.getFoc().getY(), this.getLoc().getX(), this.getLoc().getY());
    var x1 = shape.getFoc().getX(); 
    var y1 = shape.getFoc().getY();
    var r1 = pointPointDistance(shape.getFoc().getX(), shape.getFoc().getY(), shape.getLoc().getX(), shape.getLoc().getY());
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

      var point1 = new Point(this.ctx, xi, yi);
      var point2 = new Point(this.ctx, xi_prime, yi_prime);

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
  return "Circle: (" + this.getFoc().toString() + ", " + this.getLoc().toString() + ")";
}
