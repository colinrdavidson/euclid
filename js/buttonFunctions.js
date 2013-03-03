function clickStart(mouseOverObject, currentPoint1, currentPoint2){
  console.log("Clicked Start.");
  game.loadLevel("Level0");
  game.clearLayer();
  game.drawGoals("#00FFFF");
  game.draw();
  return [null, null, null];
} 

function clickLine(layer, currentPoint1, currentPoint2){
  console.log("Clicked Line");
  if (currentPoint1 && currentPoint2){
    var line = new Line(layer, currentPoint1, currentPoint2);
    game.add(line);
  }
}

function clickCircle(layer, currentPoint1, currentPoint2){
  console.log("Clicked Circle");
  if (currentPoint1 && currentPoint2)
  {
    var circle = new Circle(layer, currentPoint1, currentPoint2);
    game.add(circle)
  }
}
