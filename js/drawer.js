var Drawer = function () {
  var layers = {};
  var height;
  var width;
}

Drawer.prototype.initialize = function (canvasList, height, width){
  this.layers = canvasList;
  this.height = height;
  this.width = width;
}

Drawer.prototype.clearLayer = function (layerToClear){
  var context = this.layers[layerToClear];
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}
  
Drawer.prototype.drawPoint = function (object, colour){
  var layer = this.layers[object.layer];
  var x = object.x;
  var y = object.y;

  //draw the point
  layer.fillStyle = colour;
  layer.beginPath();
  layer.arc(x, y, 5, 0, Math.PI*2, true);
  layer.closePath();
  layer.fill();
}

Drawer.prototype.drawLine = function (object, colour){
  var layer = this.layers[object.layer];
  var x1 = object.pt1.x;
  var y1 = object.pt1.y;
  var x2 = object.pt2.x;
  var y2 = object.pt2.y;

  //draw the line
  layer.lineWidth = 3;
  layer.strokeStyle = colour;
  layer.beginPath();
  layer.moveTo(x1, y1);
  layer.lineTo(x2, y2);
  layer.closePath();
  layer.stroke();
}

Drawer.prototype.drawCircle = function (object, colour){
  var layer = this.layers[object.layer];
  var focX = object.foc.x;
  var focY = object.foc.y;
  var locX = object.loc.x;
  var locY = object.loc.y;
  var radius = Math.sqrt(Math.pow(focX - locX, 2) + Math.pow(focY - locY, 2));

  //draw the circle
  layer.lineWidth = 3;
  layer.strokeStyle = colour;
  layer.beginPath();
  layer.arc(focX, focY, radius, 0, Math.PI*2, true);
  layer.closePath();
  layer.stroke();
}

Drawer.prototype.draw = function (object, colour){
  if (!colour){
    var colour = "#000000";
  }

  if (object instanceof Point){
    this.drawPoint(object, colour);
  }
  else if (object instanceof Line){
    this.drawLine(object, colour);
  }
  else if (object instanceof Circle){
    this.drawCircle(object, colour);
  }
  else if (object instanceof State){
    this.draw(object.points, colour);
    this.draw(object.lines, colour);
    this.draw(object.circles, colour);
  }
  else if (object instanceof Array){
    for (var i = 0; i < object.length; i++){
      this.draw(object[i], colour);
    }
  }
}

