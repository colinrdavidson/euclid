var Point = function(ctx, x, y){
  this.ctx = ctx;
  this.x = Math.round(x*10000000)/10000000;
  this.y = Math.round(y*10000000)/10000000;
}
Point.prototype.getCtx = function() {
  return this.ctx; 
}

Point.prototype.setCtx = function(newCtx) {
  this.ctx = newCtx;
}

Point.prototype.getX = function() {
  return this.x; 
}

Point.prototype.getY = function() {
  return this.y; 
}

Point.prototype.copy = function(ctx) {
  if (!ctx){
    return new Point(this.ctx, this.x, this.y);
  }
  else
    return new Point(ctx, this.x, this.y);
}

Point.prototype.isSame = function(pt) {
  if ((pt instanceof Point) && (this.x == pt.getX() && this.y == pt.getY()))
    return true;
  else
    return false; 
}

  
Point.prototype.draw = function(colour) {
  //colour is string "#RRGGBB"

  if (!colour){
    colour = "#000000";
  }

  //local vars
  var ctx = this.getCtx();
  var x = this.getX();
  var y = this.getY();

  //draw the point
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

Point.prototype.toString = function(){
  return "Point: (" + this.getX() + ", " + this.getY() + ")";
}

Point.prototype.isInArray = function(array){
  //assume this array is full of points
  for(var i = 0; i < array.length; i++){
    if (this.isSame(array[i]))
      return true;
  }

  return false;
}
