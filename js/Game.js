var Game = function (drawer) {
  this.drawer = drawer;
  this.state = new State();
  this.goalState = new State();
}

Game.prototype.loadLevel = function (levelName) {
  //find levelName in levelArray
  var level = Levels[levelName]; 

  this.currentLevel = level;
  
  if (level){
   this.levelInitialize(level);
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

Game.prototype.levelInitialize = function (level) {
  // turns this object into a state
  this.state = new State();
  this.goalState = new State();

  this.state.add(level.state);
  this.goalState.add(level.goalState);
}

Game.prototype.addPoint = function (point){
  this.state.addPoint(point);
  this.draw(point);
}

Game.prototype.addLine = function (line){
  this.state.addLine(line);
  this.draw(line);
}

Game.prototype.addCircle = function (circle){
  this.state.addCircle(circle);
  this.draw(circle);
}

Game.prototype.add = function (object){
  if (object instanceof Point){
    this.addPoint(object);
  }
  else if (object instanceof Line){
    this.addLine(object);
  }
  else if (object instanceof Circle){
    this.addCircle(object);
  }
  else if (object instanceof Array){
    for (var i; i < object.length; i++){
      this.add(object[i]);
    }
  }
  else if (object instanceof State){
    this.add(object.points);
    this.add(object.lines);
    this.add(object.circles);
  }
}

Game.prototype.points = function (){
  return this.state.points;
}

Game.prototype.lines = function (){
  return this.state.lines;
}

Game.prototype.circles = function (){
  return this.state.circles;
}



Game.prototype.draw = function (object, colour){
  if (!object){
    this.drawer.draw(game.state, colour);
  }
  else{
    this.drawer.draw(object, colour);
  }
}

Game.prototype.clearLayer = function (layer){
  this.drawer.clearLayer(layer);
}
