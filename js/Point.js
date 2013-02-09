var Point = function (ctx, x, y){
  this.ctx = ctx;
  this.x = x;
  this.y = y;
}
Point.prototype.getCtx = function () {
  return this.ctx; 
}

Point.prototype.getX = function () {
  return this.x; 
}

Point.prototype.getY = function () {
  return this.y; 
}

Point.prototype.isSame = function(pt) {
  if (this.ctx == pt.getCtx() && this.x == pt.getX() && this.y == pt.getY()) return true;
  else return false; 
}

  
Point.prototype.draw = function (colour) {
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

