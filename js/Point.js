var Point = function(layer, x, y){
  this.layer = layer;
  this.x = Math.round(x*10000000)/10000000;
  this.y = Math.round(y*10000000)/10000000;
}

Point.prototype.copy = function (layer) {
  if (!layer){
    return new Point(this.layer, this.x, this.y);
  }
  else
    return new Point(layer, this.x, this.y);
}

Point.prototype.isSame = function (pt) {
  if ((pt instanceof Point) && (this.x == pt.x && this.y == pt.y)){
    return true;
  }
  else{
    return false; 
  }
}

Point.prototype.toString = function (){
  return "Point: (" + this.x + ", " + this.y + ")";
}

Point.prototype.isInArray = function (array){
  //assume this array is full of points
  for(var i = 0; i < array.length; i++){
    if (this.isSame(array[i])){
      return true;
    }
  }
  return false;
}
