
var intro1 = {
  name: "intro1",
  state:
  {
    points:
    {
      0: { x: 200, y: 200 },
      1: { x: 200, y: 100 },
    },
    lines:
    {
    },
    circles:
    {
    }
  },
  goalState:
  {
    points:
    {
      0: { x: 200, y: 200 },
      1: { x: 200, y: 100 },
    },
    lines:
    {
    },
    circles:
    {
      0: { foc: 0, loc: 1 }
    }
  }
}
Levels[intro1.name] = intro1;
