Levels = {}; 

var level0 = {
  name: "Level0",
  points:
  {
    0: { x: 100, y: 200 },
    1: { x: 300, y: 200 },
  },
  lines:
  {
    0: { p1: 0, p2: 1 } 
  },
  circles:
  {
  },
  goals:
  {
    points:
    {
      0: { x: 200, y: 200 } 
    },
    lines:
    {
    },
    circles:
    {
    }
  }
}
Levels[level0.name] = level0;
