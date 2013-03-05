function clickStart () {
  console.log("Clicked Start.");
  if (!(game.levelName)){
    game.loadLevel("intro0");
  }
  else if (game.complete()){ 
    if (game.levelName == "intro0"){
      game.loadLevel("intro1");
    }
    else if (game.levelName == "intro1"){
      game.loadLevel("intro2");
    }
    else if (game.levelName == "intro2"){
      game.loadLevel("prop1");
    }
    else if (game.levelName == "prop1"){
      game.loadLevel("level2");
    }
  }
  else{
    game.loadLevel(game.levelName);
  }
  game.drawGoals("#00FFFF");
  game.draw();
  return [null, null, null];
} 

function clickLine(layer, currentPoint1, currentPoint2) {
  console.log("Clicked Line");
  if (currentPoint1 && currentPoint2){
    var line = new Line(layer, currentPoint1, currentPoint2);
    game.add(line);
  }
}

function clickCircle(layer, currentPoint1, currentPoint2) {
  console.log("Clicked Circle");
  if (currentPoint1 && currentPoint2)
  {
    var circle = new Circle(layer, currentPoint1, currentPoint2);
    game.add(circle)
  }
}

function clickSandbox () {
  console.log("Clicked Sandbox");
  game.loadLevel("level0");
  game.draw();
  return [null, null, null];
}
