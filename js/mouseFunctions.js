function clickCanvas (ctx, pointArray, lineArray, circleArray, mouseOverPoint, pt1, pt2){
  if (!pt2) {
    console.log("First point added:", mouseOverPoint.toString());
    return [null, mouseOverPoint.copy(ctx)];
  }
  else if (!pt1) {
    if (pt2.isSame(mouseOverPoint)){
      console.log("Trying to add same point, no changes");
      return [null, pt2];
    }
    else {
      console.log("Second point added: pt1: ", pt2.toString(), "pt2: ", mouseOverPoint.toString());
      return[pt2, mouseOverPoint.copy(ctx)];
    }
  }
  else if (pt2.isSame(mouseOverPoint))
  {
    console.log("Trying to add same point, no changes");
    return [pt1, pt2];
  }
  else{
    console.log("Jimmy the points: pt1: ", pt2.toString(), "pt2: ", mouseOverPoint.toString());
    return [pt2, mouseOverPoint.copy(ctx)];
  }
}

function mouseMove (ctx, pointArray, x, y){
  var i = 0;
  while (i <= pointArray.length - 1){
    var currPoint = pointArray[i];

    if (pointPointDistance(x, y, currPoint.getX(), currPoint.getY()) <= 5){
      return currPoint.copy(ctx);
    }
    i++;
  }
  return null;
}

