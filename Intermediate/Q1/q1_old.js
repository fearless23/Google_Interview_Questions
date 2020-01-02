
const grids = {};
// const values = {};

const findGrid = function(rowIdx, colIdx) {
  let rowStart = 0;
  let colStart = 0;
  if (rowIdx < 9) rowStart = 6;
  if (rowIdx < 6) rowStart = 3;
  if (rowIdx < 3) rowStart = 0;
  if (colIdx < 9) colStart = 6;
  if (colIdx < 6) colStart = 3;
  if (colIdx < 3) colStart = 0;
  const grid = String(rowStart) + String(colStart);
  return { rowStart, colStart, grid };
};

const findNumIn3x3Grid = function(rowIdx, colIdx, remVals) {
  const { rowStart, colStart, grid } = findGrid(rowIdx, colIdx);
  if (grids[grid]) {
    return grids[grid];
  }
  const posVals = { ...remVals };
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      const gridEl = sudoku[i][j];
      if (gridEl != "?") {
        delete posVals[gridEl];
      }
    }
  }
  grids[grid] = posVals;
  return posVals;
};

const findPosValofItem = function(rowIdx, colIdx) {
  if (sudoku[rowIdx][colIdx] != "?") {
    return {};
  }
  const a = findNumIn3x3Grid(rowIdx, colIdx, allValues);

  const b = findNumInRow(rowIdx, { ...a });
  return findNumInCol(colIdx, { ...b });
};
// console.log(findPosValofItem(0, 1));
// console.log(grids);

const loopOverGrid = function(i, j, grid) {
  let filled = 0;
  const occurence = {};

  for (let k = 0; k < 3; k++) {
    for (let l = 0; l < 3; l++) {
      const rowIdx = 3 * i + k;
      const colIdx = 3 * j + l;

      if (sudoku[rowIdx][colIdx] === "?") {
        const keyObj = findPosValofItem(rowIdx, colIdx);
        const keys = Object.keys(keyObj);
        if (keys.length === 1) {
          const val = keys[0];
          sudoku[rowIdx][colIdx] = val;
          delete grids[grid][val];
          filled++;
        } else {
          // console.log("ITEM", rowIdx, colIdx, keys);
          // console.log(keys)
          for (let key of keys) {
            if (!!occurence[key]) {
              // occurence[key].push({ rowIdx, colIdx });
              occurence[key] = "Many";
            } else {
              occurence[key] = [{ rowIdx, colIdx, key }];
            }
          }
        }
      }
    }
  }

  const vals = Object.values(occurence).filter(xx => xx != "Many");
  if (!!vals[0]) {
    const { rowIdx, colIdx, key } = vals[0][0];
    filled++;
    sudoku[rowIdx][colIdx] = key;
  }
  return filled;
};

const loopOverSudoku = function() {
  let totalFilled = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const grid = String(3 * i) + String(3 * j);
      let innerGridLoop = true;
      while (innerGridLoop) {
        const filled = loopOverGrid(i, j, grid);
        totalFilled += filled;
        if (filled === 0) {
          innerGridLoop = false;
        }
      }
    }
  }
  for (let i = 2; i >= 0; i--) {
    for (let j = 2; j >= 0; j--) {
      const grid = String(3 * i) + String(3 * j);
      let innerGridLoop = true;
      while (innerGridLoop) {
        const filled = loopOverGrid(i, j, grid);
        totalFilled += filled;
        if (filled === 0) {
          innerGridLoop = false;
        }
      }
    }
  }

  /*
  for (let i = 0; i < sudoku.length; i++) {
    const row = sudoku[i];
    for (let j = 0; j < row.length; j++) {
      const { grid } = findGrid(i, j);
      // Find rest of empty items in grid

      const keys = Object.keys(findPosValofItem(i, j));
      if (keys.length === 1) {
        const val = keys[0];
        sudoku[i][j] = val;

        console.log(i + 1, j + 1, keys);
        delete grids[grid][val];
        filled++;
      }
    }
  }
  */
  return totalFilled > 0;
};

const printSudoku = function() {
  for (let i = 0; i < sudoku.length; i++) {
    console.log(sudoku[i].join("--"));
  }
};