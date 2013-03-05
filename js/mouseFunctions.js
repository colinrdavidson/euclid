function clickCanvas (layer, mouseOverObject, pt1, pt2){
  if (mouseOverObject.isInArray(game.points())){
    if (!pt2) {
      console.log("First point added:", mouseOverObject.toString());
      return [null, mouseOverObject.copy(layer)];
    }
    else if (!pt1) {
      if (pt2.isSame(mouseOverObject)){
        console.log("Trying to add same point, no changes");
        return [null, pt2];
      }
      else {
        console.log("Second point added: pt1: ", pt2.toString(), "pt2: ", mouseOverObject.toString());
        return[pt2, mouseOverObject.copy(layer)];
      }
    }
    else if (pt2.isSame(mouseOverObject))
    {
      console.log("Trying to add same point, no changes");
      return [pt1, pt2];
    }
    else{
      console.log("Jimmy the points: pt1: ", pt2.toString(), "pt2: ", mouseOverObject.toString());
      return [pt2, mouseOverObject.copy(layer)];
    }
  }
  else if (mouseOverObject.isInArray(game.potentialPoints())){
    game.add(mouseOverObject.copy(1))
    return [pt2, mouseOverObject.copy(layer)];
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

