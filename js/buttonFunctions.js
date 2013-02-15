function clickStart(pointArray){
  for(var i = 0; i < pointArray.length; i++){
    pointArray[i].draw();
  }
} 

function clickLine(ctx, currentPoint1, currentPoint2, pointArray, lineArray, circleArray, intersectionPoints){
  if (currentPoint1 && currentPoint2)
  {
    var line = new Line(ctx, currentPoint1, currentPoint2);

    var contains = false;

    for (var i = 0; i < lineArray.length; i++){
      if (line.isSame(lineArray[i])){
        contains = true;
        break;
      }
    }

    if (!contains){
      for(var i = 0; i < lineArray.length; i++){
        var intersections = line.intersectsWith(lineArray[i]);

        if (intersections[0]){
          if (!intersections[0].isInArray(intersectionPoints)){
            intersectionPoints.push(intersections[0]);
          }

          if (!intersections[0].isInArray(pointArray)){
            pointArray.push(intersections[0]);
          }
          intersections[0].draw();
        }
      }

      lineArray.push(line);
    }

    console.log(line.toString());
    line.draw();
  }
}

function clickCircle(ctx, currentPoint1, currentPoint2, circleArray){
  if (currentPoint1 && currentPoint2)
  {
    var circle = new Circle(ctx, currentPoint1, currentPoint2);

    var contains = false;

    for (var i = 0; i < circleArray.length; i++){
      if (circle.isSame(circleArray[i])){
        contains = true;
        break;
      }
    }

    if (!contains){
      circleArray.push(circle);
    }

    console.log(circle.toString());
    circle.draw();
  }
}
