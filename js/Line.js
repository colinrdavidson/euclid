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

  if (shape instanceof Circle){
    console.log("Not doin' circles yet!");
  }
  else if (shape instanceof Line){
   var m1 = this.slope();
   var m2 = shape.slope();
   var x;
   var y;

   var b1 = this.getPt1().getY() - this.getPt1().getX()*m1;
   var b2 = shape.getPt1().getY() - this.getPt1().getX()*m2;
      

   if (m1 != m2){
    if (m1 == Infinity || m1 == -Infinity){
      x = this.getPt1().getX();
      y = m2 * x + b2;
    }
    else if (m2 == Infinity || m1 == -Infinity){
      x = shape.getPt1().getX();
      y = m1 * x + b1;
    }
    else{
      x = (b2 - b1) / (m1 - m2);
      y = m1 * x + b1;
    }

    if ((this.getPt1().getX() <= x && x <= this.getPt2().getX()) ||
         this.getPt2().getX() <= x && x <= this.getPt1().getX()){
           pointsOfIntersection.push(new Point(this.getCtx(), x, y));
    }
   }
  }
  else{
    console.log("Not a shape!");
  }
  
  return pointsOfIntersection;

}

Line.prototype.toString = function(){
  return "Line: (" + this.getPt1().toString() + ", " + this.getPt2().toString() + ")"; 
}

