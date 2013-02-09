var Line = function (ctx, pt1, pt2){
  this.ctx = ctx;
  this.pt1 = pt1;
  this.pt2 = pt2;}

Line.prototype.getCtx = function () {
  return this.ctx }

Line.prototype.getPt1 = function () {
  return this.pt1 }

Line.prototype.getPt2 = function () {
  return this.pt2 }

Line.prototype.draw = function (colour) {
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

