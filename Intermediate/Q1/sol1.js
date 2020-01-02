const { Sudoku } = require("./sudoku");

class MySudoku extends Sudoku {
  constructor(sudoku) {
    super(sudoku);
  }

  // Main OPS

  analyzeGrid(gridItems) {
    const occurences = {};
    for (let position in gridItems) {
      const itemPossVals = gridItems[position];
      if (!!itemPossVals) {
        for (let possNum of itemPossVals) {
          const a = occurences[possNum];
          const b = !!a ? "filterOut" : position;
          occurences[possNum] = b;
        }
      }
    }

    // Analyze Occurences...
    const uniques = [];
    for (let num in occurences) {
      const position = occurences[num];
      if (position != "filterOut") {
        uniques.push({ val: Number(num), position });
      }
    }

    return uniques;
  }

  loopOverGrid(gridIdx, showFills = false) {
    let fills = 0;
    let loopRuns = 0;
    const gridItems = {};
    const { startCol, startRow } = this.getStartRowColForGrid(gridIdx);

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        loopRuns++;
        const { vals, filled } = this.analyzeItem(i, j, gridIdx, showFills);
        fills += filled;
        const key = String(i) + String(j);
        gridItems[key] = vals;
      }
    }
    for (let k = startRow + 2; k >= startRow; k = k - 1) {
      for (let l = startCol + 2; l >= startCol; l = l - 1) {
        loopRuns++;
        const { vals, filled } = this.analyzeItem(k, l, gridIdx, showFills);
        fills += filled;
        const key = String(k) + String(l);
        gridItems[key] = vals;
      }
    }

    // Analyze Grid...
    const gridUniques = this.analyzeGrid(gridItems, gridIdx);

    for (let unique of gridUniques) {
      // Update unique
      const { val, position } = unique;
      fills++;
      loopRuns++;
      this.updateItem(
        Number(position[0]),
        Number(position[1]),
        gridIdx,
        val,
        showFills
      );
    }

    return { fills, loopRuns };
  }

  loopByRow(rowIdx, showFills = false) {
    let fills = 0;
    let loopRuns = 0;
    for (let i = 0; i < 9; i++) {
      loopRuns++;
      const gridIdx = this.getGridFromRowCol(rowIdx, i);
      const { vals, filled } = this.analyzeItem(rowIdx, i, gridIdx, showFills);
      fills += filled;
    }
    for (let i = 8; i >= 0; i--) {
      loopRuns++;
      const gridIdx = this.getGridFromRowCol(rowIdx, i);
      const { vals, filled } = this.analyzeItem(rowIdx, i, gridIdx, showFills);
      fills += filled;
    }
    return { fills, loopRuns };
  }

  loopByCol(colIdx, showFills = false) {
    let fills = 0;
    let loopRuns = 0;
    for (let i = 0; i < 9; i++) {
      loopRuns++;
      const gridIdx = this.getGridFromRowCol(i, colIdx);
      const { vals, filled } = this.analyzeItem(i, colIdx, gridIdx, showFills);
      if (filled === "NEW") fills++;
    }
    for (let i = 8; i >= 0; i--) {
      loopRuns++;
      const gridIdx = this.getGridFromRowCol(i, colIdx);
      const { vals, filled } = this.analyzeItem(i, colIdx, gridIdx, showFills);
      if (filled === "NEW") fills++;
    }
    return { fills, loopRuns };
  }

  loopOverSudoku(showFills = false) {
    const loopData = [];
    for (let i = 0; i < 9; i++) {
      loopData.push(this.loopOverGrid(i, showFills));
      loopData.push(this.loopByRow(i, showFills));
      loopData.push(this.loopByCol(i, showFills));
    }
    for (let i = 8; i >= 0; i--) {
      loopData.push(this.loopOverGrid(i, showFills));
      loopData.push(this.loopByRow(i, showFills));
      loopData.push(this.loopByCol(i, showFills));
    }
    const sum = (a, b) => a + b;
    const fills = loopData.map(item => item.fills).reduce(sum);
    const loopRuns = loopData.map(item => item.loopRuns).reduce(sum);

    return { fills, loopRuns };
  }

  run(showFills = false, print = false) {
    let continueRun = true;
    const b = this.unfilledCount;
    while (continueRun) {
      const { fills } = this.loopOverSudoku(showFills);
      if (fills === 0) continueRun = false;
    }

    // FINAL SUDOKU
    if (print) this.printSudoku();
    if (this.unfilledCount === 0) {
      const aa = this.checkIfSolved();
      if (aa) console.log("SUDOKU SOLVED and VERIFIED");
      else {
        console.log("SUDOKU Complete but with error");
      }
    } else {
      console.log("SUDOKU Incomplete but algo finished", b, this.unfilledCount);
    }
  }
}

exports.sol1 = function(startSoduku) {
  const ss = new MySudoku(startSoduku);
  ss.run(true, true);
};
