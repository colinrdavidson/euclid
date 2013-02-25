var Point = function(layer, x, y){
  this.layer = layer;
  this.x = Math.round(x*10000000)/10000000;
  this.y = Math.round(y*10000000)/10000000;
}
Point.prototype.Layer = function() {
  return this.layer; 
}

Point.prototype.X = function() {
  return this.x; 
}

Point.prototype.Y = function() {
  return this.y; 
}

Point.prototype.copy = function(layer) {
  if (!layer){
    return new Point(this.layer, this.x, this.y);
  }
  else
    return new Point(layer, this.x, this.y);
}

Point.prototype.isSame = function(pt) {
  if ((pt instanceof Point) && (this.x == pt.X() && this.y == pt.Y()))
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
  var layer = this.Layer();
  var x = this.X();
  var y = this.Y();

  //draw the point
  layer.fillStyle = colour;
  layer.beginPath();
  layer.arc(x, y, 5, 0, Math.PI*2, true);
  layer.closePath();
  layer.fill();
}

Point.prototype.toString = function(){
  return "Point: (" + this.X() + ", " + this.Y() + ")";
}

Point.prototype.isInArray = function(array){
  //assume this array is full of points
  for(var i = 0; i < array.length; i++){
    if (this.isSame(array[i]))
      return true;
  }

  return false;
}
