var Game = function () {
  //assuming 
 // this.drawer = drawer;
  //this.state = new State();
  // State
  //currentlevel
}

Game.prototype.loadLevel = function (levelName) {

  //find levelName in levelArray
  var level = Levels[levelName]; 

  this.currentLevel = level;
  
  if (level){
   this.state = LevelParse(level);
   //this.drawer.Draw(this.state);
  }
  else{
    console.log("not a level!");
  }
}

LevelParse = function (level) {
  // turns this object into a state
  var state = new State();

  var points = level.points;
  if (points){
    for (var i = 0; i < objectCount(points); i++){
      state.addPoint(new Point(points[i].x, points[i].y));
    }
  }
  var lines = level.lines;

  if (lines){
    for (var i = 0; i < objectCount(lines); i++){
      var point1 = state.Points()[lines[i].pt1];
      var point2 = state.Points()[lines[i].pt2];

      if (point1 && point2){
        state.addLine(new Line(point1, point2));  
      }
      else{
        console.log("those points don't exist");
      }
    }
  }

  var circles = level.circles;
  if (circles){
    for (var i = 0; i < objectCount(circles); i++){
      var foc = state.Points()[circles[i].foc];
      var loc = state.Points()[circles[i].loc];

      if (point1 && point2){
        state.addLine(new Circle(foc, loc));  
      }
      else{
        console.log("those points don't exist");
      }
    }
  }

  //need to do the same for goals

  return state;

}
