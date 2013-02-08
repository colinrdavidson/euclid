var Circle = function (ctx, foc, loc){
  //foc is for focus ie centre
  //loc is for loci ie point on circle
  //TODO: overload function for (ctx, foc, rad) where rad is radius

  this.ctx = ctx;
  this.foc = foc;
  this.loc = loc;}

Circle.prototype.getCtx = function () {
  return this.ctx }

Circle.prototype.getFoc = function () {
  return this.foc }

Circle.prototype.getLoc = function () {
  return this.loc }

Circle.prototype.draw = function (colour) {
  //colour is string "#RRGGBB"
  
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

