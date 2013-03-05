var intro2 = {
  name: "intro2",
  state:
  {
    points:
    {
      0: { x: 100, y: 100 },
      1: { x: 300, y: 300 },
      2: { x: 100, y: 300 },
      3: { x: 300, y: 100 },
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
      0: { x: 100, y: 100 },
      1: { x: 300, y: 300 },
      2: { x: 100, y: 300 },
      3: { x: 300, y: 100 },
      4: { x: 200, y: 200 },
    },
    lines:
    {
      0: { pt1: 0, pt2: 1 },
      1: { pt1: 2, pt2: 3 },
    },
    circles:
    {
    }
  }
}
Levels[intro2.name] = intro2;
