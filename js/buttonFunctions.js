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
      shapesArray = lineArray.concat(circleArray);
      for(var i = 0; i < shapesArray.length; i++){
        var intersections = line.intersectsWith(shapesArray[i]);

        for (var j = 0; j < intersections.length; j++){
          if (intersections[j]){
            if (!intersections[j].isInArray(intersectionPoints)){
              intersectionPoints.push(intersections[j]);
            }

            if (!intersections[j].isInArray(pointArray)){
              pointArray.push(intersections[j]);
              console.log(intersections[j].toString());
              intersections[j].draw();
            }
          }
        }
      }

      lineArray.push(line);
      console.log(line.toString());
      line.draw();
    }
  }
}

function clickCircle(ctx, currentPoint1, currentPoint2, pointArray, lineArray, circleArray, intersectionPoints){
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
      shapesArray = lineArray.concat(circleArray);
      for(var i = 0; i < shapesArray.length; i++){
        var intersections = circle.intersectsWith(shapesArray[i]);

        for (var j = 0; j < intersections.length; j++){
          if (!intersections[j].isInArray(intersectionPoints)){
            intersectionPoints.push(intersections[j]);
          }

          if (!intersections[j].isInArray(pointArray)){
            pointArray.push(intersections[j]);
            console.log(intersections[j].toString());
            intersections[j].draw();
          }
        }
      }
      circleArray.push(circle);
      console.log(circle.toString());
      circle.draw();
    }
  }
}
