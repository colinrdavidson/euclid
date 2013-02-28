var Game = function (drawer) {
  this.drawer = drawer;
  this.state = new State();
}

Game.prototype.loadLevel = function (levelName) {

  //find levelName in levelArray
  var level = Levels[levelName]; 

  this.currentLevel = level;
  
  if (level){
   this.state = this.levelParse(level);
   //this.drawer.Draw(this.state);
  }
  else{
    console.log("not a level!");
  }
}

Game.prototype.addPoint = function (point) {
  this.state.addPoint(point);
}

Game.prototype.addLine = function (line) {
  this.state.addLine(line);
}

Game.prototype.addCircle = function (circle) {
  this.state.addCircle(circle);
}

Game.prototype.levelParse = function (level) {
  // turns this object into a state
  var state = new State();

  var points = level.points;
  if (points){
    var pointCount = objectCount(points);  

    for (var i = 0; i < pointCount; i++){
      state.addPoint(new Point(0, points[i].x, points[i].y));
    }
  }

  var lines = level.lines;

  if (lines){
    var lineCount = objectCount(lines);

    for (var i = 0; i < lineCount; i++){
      var point1 = state.points[lines[i].pt1];
      var point2 = state.points[lines[i].pt2];

      if (point1 && point2){
        var newLine = new Line(0, point1, point2);
        state.addLine(newLine);
      }
      else{
        console.log("those points don't exist");
      }
    }
  }

  var circles = level.circles;
  if (circles){
    var circleCount = objectCount(circles);

    for (var i = 0; i < circleCount; i++){
      var foc = state.points[circles[i].foc];
      var loc = state.points[circles[i].loc];

      if (foc && loc){
        var newCircle = new Circle(0, foc, loc);
        state.addCircle(newCircle);
      }
      else{
        console.log("those points don't exist");
      }
    }
  }

  //need to do the same for goals

  return state;

}

Game.prototype.draw = function (object){
  if (!object){
    this.drawer.draw(game.state);
  }
  else{
    this.drawer.draw(object);
  }
}
