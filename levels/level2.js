var level2 = {
  name: "level2",
  state:
  {
    points:
    {
      0: { x: 100, y: 200 },
      1: { x: 300, y: 200 }
    },
    lines:
    {
      0: { pt1: 0, pt2: 1 }
    },
    circles:
    {
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
Levels[level2.name] = level2;
