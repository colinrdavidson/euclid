var Drawer = function () {
  var contexts = {};
}

Drawer.prototype.initialize = function (canvasList){
  this.contexts = canvasList;
}

Drawer.prototype.draw = function (object, colour){
  if (!colour){
    var colour = "#000000";
  }

  if (object instanceof Point){
    var layer = this.contexts[object.Layer()];
    var x = object.X();
    var y = object.Y();

    //draw the point
    layer.fillStyle = colour;
    layer.beginPath();
    layer.arc(x, y, 5, 0, Math.PI*2, true);
    layer.closePath();
    layer.fill();
  }

  else if (object instanceof Line){
    var layer = this.contexts[object.Layer()];
    var pt1x = object.Pt1().X();
    var pt1y = object.Pt1().Y();
    var pt2x = object.Pt2().X();
    var pt2y = object.Pt2().Y();

    //draw the line
    layer.fillstyle = colour;
    layer.beginPath();
    layer.moveTo(pt1X, pt1Y);
    layer.lineTo(pt2X, pt2Y);
    layer.closePath();
    layer.stroke();
  }

  else if (object instanceof Circle){
    var layer = this.contexts[object.Layer()];
    var focX = object.Foc().X();
    var focY = object.Foc().Y();
    var locX = object.Loc().X();
    var locY = object.Loc().Y();
    var radius = Math.sqrt(Math.pow(focX - locX, 2) + Math.pow(focY - locY, 2));

    //draw the circle
    layer.fillStyle = colour;
    layer.beginPath();
    layer.arc(focX, focY, radius, 0, Math.PI*2, true);
    layer.closePath();
    layer.stroke();
  }
}
  
