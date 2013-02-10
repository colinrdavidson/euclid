var Circle = function (ctx, foc, loc){
  //foc is for focus ie centre
  //loc is for loci ie point on circle
  //TODO: overload function for (ctx, foc, rad) where rad is radius

  this.ctx = ctx;
  this.foc = foc;
  this.loc = loc;
}

Circle.prototype.getCtx = function () {
  return this.ctx 
}

Circle.prototype.getFoc = function () {
  return this.foc 
}

Circle.prototype.getLoc = function () {
  return this.loc 
}

Circle.prototype.isSame = function (Cir) {
  if (this.foc.isSame(Cir.getFoc()) && this.loc.isSame(Cir.getLoc())) return true;
  else return false;
}



Circle.prototype.draw = function (colour) {
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

Circle.prototype.toString = function(){
  return "Circle: " + this.getFoc().toString() + ", " + this.getLoc().toString();
}
