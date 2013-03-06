function clickCanvas (layer, mouseOverObject, pt1, pt2){
  if (mouseOverObject.isInArray(game.points())){
    if (!(pt1 instanceof Point)) {
      console.log("First point selected:", mouseOverObject.toString());
      return [mouseOverObject.copy(layer), null];
    }
    else if (!pt2) {
      if (pt1.isSame(mouseOverObject)){
        console.log("Trying to select same point, no changes");
        return [pt1, null];
      }
      else {
        console.log("Second point selected: pt1: ", pt1.toString(), "pt2: ", mouseOverObject.toString());
        return[pt1, mouseOverObject.copy(layer)];
      }
    }
    else if (pt2.isSame(mouseOverObject))
    {
      console.log("Trying to select same point, no changes");
      return [pt1, pt2];
    }
    else{
      console.log("Selected new point, jimmy the points: pt1: ", pt2.toString(), "pt2: ", mouseOverObject.toString());
      return [pt2, mouseOverObject.copy(layer)];
    }
  }
  else if (mouseOverObject.isInArray(game.potentialPoints())){
    game.add(mouseOverObject.copy(1))
    return [pt2, mouseOverObject.copy(layer)];
  }
  else if (mouseOverObject.isInArray(game.lines())){
    console.log("Selected line: ", mouseOverObject.toString());
    return [mouseOverObject.copy(layer), null]
  }
  else if (mouseOverObject.isInArray(game.circles())){
    console.log("Selected circle: ", mouseOverObject.toString());
    return [mouseOverObject.copy(layer), null]
  }
}

function getMouseOverObject (layer, x, y){
  var dummyPoint = new Point(layer, x, y);

  for (var i = 0; i < game.allObjects().length; i++){
    var currObject = game.allObjects()[i];

    if (currObject instanceof Point){
      if (dummyPoint.distanceTo(currObject) <= 8){
        return currObject.copy(layer);
      }
    }
    else if (dummyPoint.distanceTo(currObject) <= 5){
      return currObject.copy(layer);
    }
  }
  return null;
}

