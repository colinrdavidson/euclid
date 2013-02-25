function drawHighlighted(ctx, point){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (point){
    var x = point.X();
    var y = point.Y();
    ctx.fillStyle = ("#0000FF");
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}
