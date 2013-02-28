Levels = {}; 

var level0 = {
  name: "Level0",
  state:
  {
    points:
    {
      0: { x: 100, y: 200 },
      1: { x: 300, y: 200 },
      2: { x: 200, y: 100 },
      3: { x: 200, y: 300 },
      4: { x: 100, y: 150 },
      5: { x: 300, y: 250 }
    },
    lines:
    {
      0: { pt1: 0, pt2: 1 }, 
      1: { pt1: 2, pt2: 3 },
      2: { pt1: 4, pt2: 5 }
    },
    circles:
    {
      0: { foc: 0, loc: 2 }
    }
  },
  goalState:
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
