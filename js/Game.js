var Game = function (drawer) {
  //assuming 
 // this.drawer = drawer;
  //this.state = new State();
  // State
}

Game.prototype.loadLevel = function (levelName) {

  //find levelName in levelArray
  var level = Levels[levelName]; 
  
  if (level){
   //this.state = LevelParse(level);
   //this.drawer.Draw(this.state);
  }
  else{
    console.log("not a level!");
  }
}

levelParse = function (level) {
  // turns this object into a state
}
