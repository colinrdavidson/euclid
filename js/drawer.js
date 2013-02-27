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

Drawer.prototype.draw = function (object, colour){
  if (!colour){
    var colour = "#000000";
  }

  if (object instanceof Point){
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

  else if (object instanceof Line){
    var layer = this.layers[object.layer];
    var pt1X = object.pt1.x;
    var pt1Y = object.pt1.y;
    var pt2X = object.pt2.x;
    var pt2Y = object.pt2.y;

    //draw the line
    layer.fillstyle = colour;
    layer.beginPath();
    layer.moveTo(pt1X, pt1Y);
    layer.lineTo(pt2X, pt2Y);
    layer.closePath();
    layer.stroke();
  }

  else if (object instanceof Circle){
    var layer = this.layers[object.layer];
    var focX = object.foc.x;
    var focY = object.foc.y;
    var locX = object.loc.x;
    var locY = object.loc.y;
    var radius = Math.sqrt(Math.pow(focX - locX, 2) + Math.pow(focY - locY, 2));

    //draw the circle
    layer.fillStyle = colour;
    layer.beginPath();
    layer.arc(focX, focY, radius, 0, Math.PI*2, true);
    layer.closePath();
    layer.stroke();
  }

  else if (object instanceof State){
    this.draw(object.points);
    this.draw(object.lines);
    this.draw(object.circles);
  }

  else if (object instanceof Array){
    for (var i = 0; i < object.length; i++){
      this.draw(object[i]);
    }
  }
}
  
