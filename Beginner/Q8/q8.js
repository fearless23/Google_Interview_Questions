const inputScreen = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 1, 1],
  [1, 2, 2, 2, 2, 0, 1, 2],
  [1, 1, 1, 2, 2, 0, 1, 2],
  [1, 1, 1, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 1, 1, 1, 2, 2, 1]
];

class Paint {
  constructor(initScreen) {
    this.initScreen = initScreen;
    this.screen = initScreen;
    this.colLen = initScreen.length;
    this.rowLen = initScreen[0].length;
    this.loopRun = 0;
  }

  printScreen() {
    for (let row of this.screen) {
      console.log(row.join("--"));
    }
  }

  checkPoint(x, y, color) {
    if (x < 0 || x >= this.rowLen) return null;
    if (y < 0 || y >= this.colLen) return null;
    return this.screen[x][y] === color;
  }

  setPoint(x, y, color) {
    this.screen[x][y] = color;
  }

  checkAndSetPoint(x = 0, y = 0, prevColor, newColor) {
    const check = this.checkPoint(x, y, prevColor);
    if (!!check) {
      this.setPoint(x, y, newColor);
      return [x, y];
    } else {
      return null;
    }
  }

  getNeighbours([x, y] = [0, 0], prevColor, newColor) {
    const l = this.checkAndSetPoint(x - 1, y, prevColor, newColor);
    const r = this.checkAndSetPoint(x + 1, y, prevColor, newColor);
    const t = this.checkAndSetPoint(x, y - 1, prevColor, newColor);
    const b = this.checkAndSetPoint(x, y + 1, prevColor, newColor);
    return [l, r, t, b].filter(item => item != null);
  }

  getNewBorder(currBorder, prevColor, newColor) {
    const newBorder = [];
    for (let point of currBorder) {
      this.loopRun++;
      newBorder.push(...this.getNeighbours(point, prevColor, newColor));
    }
    return newBorder;
  }

  expandBorder(currBorder, prevColor, newColor) {
    if (currBorder.length === 0) return;
    const newBorder = this.getNewBorder(currBorder, prevColor, newColor);
    if (newBorder.length === 0) return;
    this.expandBorder(newBorder, prevColor, newColor);
  }

  touchAt(touchPoint = [0, 0], newColor) {
    this.loopRun = 0;
    const [x, y] = touchPoint;
    const prevColor = this.screen[x][y];
    this.checkAndSetPoint(x, y, prevColor, newColor);
    this.expandBorder([touchPoint], prevColor, newColor);
  }
}

const sol1 = function(
  screen = inputScreen,
  print = false,
  touchPoint = [4, 4],
  newColor = 3
) {
  const paintGrid = new Paint(screen);
  paintGrid.touchAt(touchPoint, newColor);
  if (print) paintGrid.printScreen();
  return { loopRun: paintGrid.loopRun, result: paintGrid.screen };
};
exports.q8Sols = { 1: sol1 };
