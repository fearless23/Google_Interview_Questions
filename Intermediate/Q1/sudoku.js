const isudoku = [
  [3, "?", 6, 5, "?", 8, 4, "?", "?"],
  [5, 2, "?", "?", "?", "?", "?", "?", "?"],
  ["?", 8, 7, "?", "?", "?", "?", 3, 1],
  ["?", "?", 3, "?", 1, "?", "?", 8, "?"],
  [9, "?", "?", 8, 6, 3, "?", "?", 5],
  ["?", 5, "?", "?", 9, "?", 6, "?", "?"],
  [1, 3, "?", "?", "?", "?", 2, 5, "?"],
  ["?", "?", "?", "?", "?", "?", "?", 7, 4],
  ["?", "?", 5, 2, "?", 6, 3, "?", "?"]
];

const hardSoduku = [
  ["?", "?", "?", "?", 4, 1, 3, "?", "?"],
  ["?", 3, "?", "?", "?", 9, "?", 6, 1],
  ["?", 8, 1, "?", 3, "?", "?", "?", "?"],
  ["?", "?", "?", "?", "?", "?", "?", 3, 7],
  ["?", 5, "?", "?", "?", "?", "?", 9, "?"],
  [2, 4, "?", "?", "?", "?", "?", "?", "?"],
  ["?", "?", "?", "?", 8, "?", 2, 5, "?"],
  [6, 2, "?", 9, "?", "?", "?", 1, "?"],
  ["?", "?", 3, 5, 1, "?", "?", "?", "?"]
];
class Sudoku {
  rowVals = {};
  colVals = {};
  allValues = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true
  };
  gridVals = {};
  unfilledCount = 0;
  constructor(sudoku = isudoku) {
    this.sudoku = sudoku;
    this.initSudoku = sudoku;
    this.setValsForSudoku();
  }

  resetSudoku() {
    this.sudoku = [...this.initSudoku];
    this.setValsForSudoku();
  }

  setValsForSudoku = function() {
    for (let i = 0; i < 9; i++) {
      this.setValsForRow(i);
      this.setValsForCol(i);
      this.setValsForGrid(i);
    }
  };

  setValsForRow = function(rowIdx) {
    this.rowVals[rowIdx] = { ...this.allValues };
    for (let num of this.sudoku[rowIdx]) {
      if (num != "?") delete this.rowVals[rowIdx][num];
      else this.unfilledCount++;
    }
  };

  setValsForCol = function(colIdx) {
    this.colVals[colIdx] = { ...this.allValues };
    for (let row of this.sudoku) {
      const num = row[colIdx];
      if (num != "?") delete this.colVals[colIdx][num];
    }
  };

  getStartRowColForGrid = function(gridIdx = 0) {
    const q = Math.floor(gridIdx / 3);
    const r = gridIdx % 3;
    return {
      startCol: 3 * r,
      startRow: 3 * q
    };
  };

  getGridFromRowCol = function(rowIdx, colIdx) {
    const col = Math.floor(colIdx / 3);
    const row = 3 * Math.floor(rowIdx / 3);
    return col + row;
  };

  setValsForGrid = function(gridIdx) {
    const { startRow, startCol } = this.getStartRowColForGrid(gridIdx);
    this.gridVals[gridIdx] = { ...this.allValues };
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        const gridNum = this.sudoku[i][j];
        if (gridNum != "?") {
          delete this.gridVals[gridIdx][gridNum];
        }
      }
    }
  };

  getRowVals(rowIdx) {
    return this.rowVals[rowIdx];
  }

  getColVals(colIdx) {
    return this.colVals[colIdx];
  }

  getGridVals(gridIdx) {
    return this.gridVals[gridIdx];
  }

  // Main OPS

  updateItem(rowIdx, colIdx, gridIdx, newVal, show) {
    this.sudoku[rowIdx][colIdx] = Number(newVal);
    this.unfilledCount--;
    delete this.rowVals[rowIdx][newVal];
    delete this.colVals[colIdx][newVal];
    delete this.gridVals[gridIdx][newVal];
    if (show) {
      console.log(`Filled ${rowIdx}${colIdx} with ${newVal}`);
    }
  }

  getItemPossVals(rowIdx, colIdx, gridIdx) {
    if (this.sudoku[rowIdx][colIdx] != "?") {
      // Already Filled
      return { itemVals: null, update: false };
    }
    // Not Filled
    const row = this.getRowVals(rowIdx);
    const col = this.getColVals(colIdx);
    const grid = this.getGridVals(gridIdx);
    const itemValsObj = {};
    const itemValsArr = [];
    for (let i = 1; i < 10; i++) {
      if (row[i] && col[i] && grid[i]) {
        itemValsObj[i] = true;
        itemValsArr.push(i);
      }
    }
    if (itemValsArr.length === 1) {
      return { itemVals: itemValsArr[0], update: true };
    } else {
      return { itemVals: itemValsArr, update: false };
    }
  }

  analyzeItem(rowIdx, colIdx, gridIdx, show = false) {
    const { itemVals, update } = this.getItemPossVals(rowIdx, colIdx, gridIdx);
    if (update) {
      this.updateItem(rowIdx, colIdx, gridIdx, itemVals, show);
      return { vals: null, filled: 1 };
    } else {
      return { vals: itemVals, filled: 0 };
    }
  }

  printSudoku() {
    const hLine = "-------------------------------------";
    console.log(hLine);
    console.log(hLine);
    for (let i = 0; i < this.sudoku.length; i++) {
      let row = "";
      for (let j = 0; j < this.sudoku[i].length; j++) {
        const num = this.sudoku[i][j];
        this.sudoku[i].join(" | ");
        row += num;
        if (j % 3 === 2) row += " || ";
        else row += " | ";
      }
      console.log(row);
      console.log(hLine);
      if (i % 3 === 2) {
        console.log(hLine);
      }
    }
  }

  checkRow(rowIdx) {
    const row = this.sudoku[rowIdx];
    let rowSum = 0;
    for (let num of row) {
      if (num === "?") return false;
      rowSum += Number(num);
    }
    if (rowSum != 45) return false;
    return true;
  }

  checkCol(colIdx) {
    let colSum = 0;
    for (let row of this.sudoku) {
      const num = row[colIdx];
      if (num === "?") return false;
      colSum += Number(num);
    }

    if (colSum != 45) return false;
    return true;
  }

  checkGrid(gridIdx) {
    const { startCol, startRow } = this.getStartRowColForGrid(gridIdx);
    let gridSum = 0;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        const num = this.sudoku[i][j];
        if (num === "?") return false;
        gridSum += Number(num);
      }
    }
    if (gridSum != 45) return false;
    return true;
  }

  checkIfSolved() {
    for (let i = 0; i < 9; i++) {
      const a = this.checkRow(i);
      if (!a) return false;
      const b = this.checkCol(i);
      if (!b) return false;
      const c = this.checkGrid(i);
      if (!c) return false;
    }
    return true;
  }
}

module.exports = { Sudoku };
