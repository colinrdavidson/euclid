function clickStart(){
  console.log("Clicked Start.");
  game.draw();
} 

function clickLine(layer, currentPoint1, currentPoint2){
  console.log("Clicked Line");
  if (currentPoint1 && currentPoint2){
    var line = new Line(layer, currentPoint1, currentPoint2);
    game.add(line);
  }
}

function clickCircle(layer, currentPoint1, currentPoint2){
  console.log("Clicked Start");
  if (currentPoint1 && currentPoint2)
  {
    var circle = new Circle(layer, currentPoint1, currentPoint2);
    game.add(circle)
  }
}
