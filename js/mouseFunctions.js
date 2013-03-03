function clickCanvas (layer, mouseOverPoint, pt1, pt2){
  if (mouseOverPoint.isInArray(game.points())){
    if (!pt2) {
      console.log("First point added:", mouseOverPoint.toString());
      return [null, mouseOverPoint.copy(layer)];
    }
    else if (!pt1) {
      if (pt2.isSame(mouseOverPoint)){
        console.log("Trying to add same point, no changes");
        return [null, pt2];
      }
      else {
        console.log("Second point added: pt1: ", pt2.toString(), "pt2: ", mouseOverPoint.toString());
        return[pt2, mouseOverPoint.copy(layer)];
      }
    }
    else if (pt2.isSame(mouseOverPoint))
    {
      console.log("Trying to add same point, no changes");
      return [pt1, pt2];
    }
    else{
      console.log("Jimmy the points: pt1: ", pt2.toString(), "pt2: ", mouseOverPoint.toString());
      return [pt2, mouseOverPoint.copy(layer)];
    }
  }
  else if (mouseOverPoint.isInArray(game.potentialPoints())){
    game.add(mouseOverPoint.copy(1))
    return [pt1, pt2];
  }
}

function getMouseOverObject (layer, x, y){
  var dummyPoint = new Point(layer, x, y);

  for (var i = 0; i < game.allObjects().length; i++){
    var currObject = game.allObjects()[i];

    if (dummyPoint.distanceTo(currObject) <= 5){
      return currObject.copy(layer);
    }
  }
  return null;
}

