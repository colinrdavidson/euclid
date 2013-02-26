function clickStart(pointArray){
  console.log("Clicked Start.");
  for(var i = 0; i < pointArray.length; i++){
    drawer.draw(pointArray[i]);
  }
} 

function clickLine(layer, currentPoint1, currentPoint2, pointArray, lineArray, circleArray, intersectionPoints){
  console.log("Clicked Line");
  if (currentPoint1 && currentPoint2)
  {
    var line = new Line(layer, currentPoint1, currentPoint2);

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
              drawer.draw(intersections[j]);
            }
          }
        }
      }

      lineArray.push(line);
      console.log(line.toString());
      drawer.draw(line);
    }
  }
}

function clickCircle(layer, currentPoint1, currentPoint2, pointArray, lineArray, circleArray, intersectionPoints){
  console.log("Clicked Start");
  if (currentPoint1 && currentPoint2)
  {
    var circle = new Circle(layer, currentPoint1, currentPoint2);

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
            drawer.draw(intersections[j]);
          }
        }
      }
      circleArray.push(circle);
      console.log(circle.toString());
      drawer.draw(circle);
    }
  }
}
