function init () {
  var canvasInitial = $("#initial")[0];
  var ctxInitial = canvasInitial.getContext("2d");

  var canvasDrawn = $("#drawn")[0];
  var ctxDrawn = canvasDrawn.getContext("2d");

  var canvasCurrent = $("#current")[0];
  var ctxCurrent = canvasCurrent.getContext("2d");

  var canvasHighlighted = $("#highlighted")[0];
  var ctxHighlighted = canvasHighlighted.getContext("2d");

  var canvasUser = $("#user")[0];
  var ctxUser = canvasUser.getContext("2d");

  var contexts = {
    0 : ctxInitial,
    1 : ctxDrawn,
    2 : ctxCurrent,
    3 : ctxHighlighted,
    4 : ctxUser
  };

  //compute size of canvas
  var width = canvasUser.width;
  var height = canvasUser.height;
  
  var offsetTop = canvasInitial.offsetTop;
  var offsetLeft = canvasInitial.offsetLeft;

  drawer = new Drawer();
  drawer.initialize(contexts, height, width);

  game = new Game(drawer);

  //Special Points
  var mouseOverObject = null; 
  var currentObject1 = null;
  var currentObject2 = null;

  //Button Events
  $("#startButton").click(function (){
    var array = clickStart();
    mouseOverObject = array[0];
    currentObject1 = array[1];
    currentObject2 = array[2];
  });

  $("#lineButton").click(function (){ 
    clickLine(1, currentObject1, currentObject2); 
  });

  $("#circleButton").click(function (){ 
    clickCircle(1, currentObject1, currentObject2);
  });

  $("#sandboxButton").click(function (){
    clickSandbox();
  });

  //Mouse Events
  //All mouse events occur on user layer as it is on top
  $("#user").mousemove(function (e){ 
    mouseOverObject = getMouseOverObject(3, e.pageX - offsetLeft, e.pageY - offsetTop);
    game.clearLayer(3);
    if (mouseOverObject instanceof Point){
      game.draw(mouseOverObject, "#0000FF");
    }
    else if (mouseOverObject instanceof Line){
      game.draw([mouseOverObject, mouseOverObject.pt1.copy(3), mouseOverObject.pt2.copy(3)], "0000FF");
    }
    else if (mouseOverObject instanceof Circle){
      game.draw([mouseOverObject, mouseOverObject.foc.copy(3), mouseOverObject.loc.copy(3)], "0000FF");
    }
  });

  $("#user").mousedown(function (e){
    var clickedObjects = clickCanvas(2, mouseOverObject, currentObject1, currentObject2);
    currentObject1 = clickedObjects[0];
    currentObject2 = clickedObjects[1];

    if (mouseOverObject instanceof Point){
      game.clearLayer(2);
      if (currentObject1){
        game.draw(currentObject1, "#00FF00");
      }
      if (currentObject2){
        game.draw(currentObject2, "#FF0000");
      }
    }

    else if (mouseOverObject instanceof Line){
      console.log("Clicked on a line");
      game.clearLayer(2);
      if (currentObject1){
        game.draw(currentObject1, "#00FF00")
      }
    }
    else if (mouseOverObject instanceof Circle){
      console.log("Clicked on a line");
      game.clearLayer(2);
      if (currentObject1){
        game.draw(currentObject1, "#00FF00")
      }
    }
  });
}
