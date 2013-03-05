var prop1 = {
  name: "prop1",
  state:
  {
    points:
    {
      0: { x: 100, y: 200 },
      1: { x: 300, y: 200 },
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
      0: { x: 100, y: 200 },
      1: { x: 300, y: 200 },
      2: { x: 200, y: 26.7949192 }
    },
    lines:
    {
      0: { pt1: 0, pt2: 1 },
      1: { pt1: 0, pt2: 2 },
      2: { pt1: 1, pt2: 2 },
    },
    circles:
    {
    }
  }
}
Levels[prop1.name] = prop1;
