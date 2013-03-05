//Proposition 2: To place at a given point a straight line equal to a given straight
//line.

var prop2 = {
  name: "prop2",
  state:
  {
    points:
    {
      0: { x: 200, y: 150 },
      1: { x: 200, y: 50 },
      2: { x: 150, y: 200 },
    },
    lines:
    {
      0: { pt1: 0, pt2: 1 },
    },
    circles:
    {
    }
  },
  goalState:
  {
    points:
    {
      0: { x: 0, y: 0 },
    },
    lines:
    {
    },
    circles:
    {
    }
  }
}
Levels[prop2.name] = prop2;
