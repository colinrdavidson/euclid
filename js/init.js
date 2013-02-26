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

  drawer = new Drawer();
  drawer.initialize(contexts);

  //All mouse events occur on user layer as it is on top

  //Offset so we can compute location on canvas form location on screen
  var offsetTop = canvasInitial.offsetTop;
  var offsetLeft = canvasInitial.offsetLeft;

  //Arrays
  var pointArray = [];
  var lineArray = [];
  var circleArray = [];

  var intersectionPoints = [];

  //Special Points
  var mouseOverPoint = null; 
  var currentPoint1 = null;
  var currentPoint2 = null;

  //test points
  var point1 = new Point(0, 100, 200);
  var point2 = new Point(0, 300, 200);
  pointArray.push(point1, point2);

  //Button Events
  $("#startButton").click(function (){
    clickStart(pointArray);
  });

  $("#lineButton").click(function (){ 
    clickLine(ctxDrawn, currentPoint1, currentPoint2, pointArray, lineArray, circleArray, intersectionPoints); 
  });

  $("#circleButton").click(function (){ 
    clickCircle(ctxDrawn, currentPoint1, currentPoint2, pointArray, lineArray, circleArray, intersectionPoints);
  });

  //Mouse Events
  $("#user").mousemove(function (e){ 
    mouseOverPoint = mouseMove(ctxHighlighted, pointArray, e.pageX - offsetLeft, e.pageY - offsetTop);
    drawHighlighted(ctxHighlighted, mouseOverPoint);
  });

  $("#user").mousedown(function (e){
    if (mouseOverPoint){
      var clickedPoints = clickCanvas(ctxCurrent, pointArray, lineArray, circleArray,  mouseOverPoint, currentPoint1, currentPoint2);
      currentPoint1 = clickedPoints[0];
      currentPoint2 = clickedPoints[1];

      ctxCurrent.clearRect(0,0,400,400);
      if (currentPoint1) currentPoint1.draw("#00FF00");
      if (currentPoint2) currentPoint2.draw("#FF0000");
    }
  });
}
