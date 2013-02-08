var Point = function (ctx, x, y){
  this.ctx = ctx;
  this.x = x;
  this.y = y;
}
Point.prototype.getCtx = function () {
  return this.ctx }

Point.prototype.getX = function () {
  return this.x }

Point.prototype.getY = function () {
  return this.y }

Point.prototype.draw = function (colour) {
  //colour is string "#RRGGBB"

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

