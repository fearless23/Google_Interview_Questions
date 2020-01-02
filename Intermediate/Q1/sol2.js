const { Sudoku } = require("./sudoku");

class MySudoku extends Sudoku {
  sudokuVals = [];
  constructor(sudoku) {
    super(sudoku);
    this.setSudokuVals();
  }

  setSudokuVals() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const k = this.getGridFromRowCol(i, j);
        const { vals } = this.analyzeItem(i, j, k, false);
        if (vals) {
          this.sudokuVals.push({ pos: { i, j }, vals });
        }
      }
    }

    // Possible Loops
    let loops = 1;
    for (let item of this.sudokuVals) {
      loops = loops * item.vals.length;
    }
    console.log(loops / 1000000000);
  }
}
exports.sol2 = function(startSoduku) {
  const ss = new MySudoku(startSoduku);
  // console.log(ss.sudokuVals);
};
