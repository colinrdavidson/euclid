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
   this.state = this.levelParse(level);
   //this.drawer.Draw(this.state);
  }
  else{
    console.log("not a level!");
  }
}

Game.prototype.addPoint = function (point) {

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

        for (var i = 0; i < state.lines.length; i++){
          var potentialPoints = newLine.intersectsWith(state.lines[i]);

          if (potentialPoints){
            for (var j = 0; j < potentialPoints.length; j++){
              if (!potentialPoints[j].isInArray(state.potentialPoints)){
                state.addPotentialPoint(potentialPoints[j]);  
              }
            }
          }
        }
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

        for (var i = 0; i < state.lines.length; i++){
          var potentialPoints = newCircle.intersectsWith(state.lines[i]);

          if (potentialPoints){
            for (var j = 0; j < potentialPoints.length; j++){
              if (!potentialPoints[j].isInArray(state.potentialPoints)){
                state.addPotentialPoint(potentialPoints[j]);  
              }
            }
          }
        }
        for (var i = 0; i < state.circles.length; i++){
          var potentialPoints = newCircle.intersectsWith(state.lines[i]);

          if (potentialPoints){
            for (var j = 0; j < potentialPoints.length; j++){
              if (!potentialPoints[j].isInArray(state.potentialPoints)){
                state.addPotentialPoint(potentialPoints[j]);  
              }
            }
          }
        }
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
