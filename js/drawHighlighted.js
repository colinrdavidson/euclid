function drawHighlighted(layer, point){
  layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
  if (point){
    var x = point.X();
    var y = point.Y();
    layer.fillStyle = ("#0000FF");
    layer.beginPath();
    layer.arc(x, y, 5, 0, Math.PI*2, true);
    layer.closePath();
    layer.fill();
  }
}
