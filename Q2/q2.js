// "1??0?101"
const strToArr = function(inputStr, repChar) {
  const arr = [];
  for (let i = 0; i < inputStr.length; i++) {
    const char = inputStr[i];
    if (char === repChar) {
      arr.push(["0", "1"]);
    } else {
      const lastArrEl = arr[arr.length - 1];
      if (lastArrEl) {
        if (lastArrEl.length != 2) {
          arr[arr.length - 1] = [lastArrEl[0] + char];
        } else {
          arr.push([char]);
        }
      } else {
        arr.push([char]);
      }
    }
  }
  return arr;
};

const recursiveCombine = function(arr, loopRun) {
  if (arr.length === 1) {
    return { result: arr[0], loopRun };
  }
  const yy = [];
  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < arr[1].length; j++) {
      loopRun++;
      yy.push(arr[0][i] + arr[1][j]);
    }
  }
  arr.shift();
  arr.shift();
  arr.unshift(yy);
  return recursiveCombine(arr, loopRun);
};

const sol1 = function(inputStr = "1??0?101", repChar = "?") {
  // Time Complexity:
  // Big O =
  const { result, loopRun } = recursiveCombine(strToArr(inputStr, repChar), 0);
  return { result, loopRun: loopRun + inputStr.length, N: inputStr.length };
};

const sol2 = function(inputStr, repChar = "?") {
  let result = inputStr[0] === repChar ? ["0", "1"] : [inputStr[0]];
  let loopRun = 0;

  for (let i = 1; i < inputStr.length; i++) {
    const charAti = inputStr[i];
    if (charAti === repChar) {
      const temp = [];
      for (let k = 0; k < result.length; k++) {
        loopRun++;
        temp.push(result[k] + "0");
        temp.push(result[k] + "1");
      }
      result = temp;
    } else {
      for (let j = 0; j < result.length; j++) {
        loopRun++;
        result[j] = result[j] + charAti;
      }
    }
  }
  return { result, loopRun, N: inputStr.length };
};

const sol3 = function(inputStr, repChar = "?") {
  let result = inputStr[0] === repChar ? ["0", "1"] : [inputStr[0]];
  let loopRun = 0;

  for (let i = 1; i < inputStr.length; i++) {
    let charAti = inputStr[i];
    if (charAti === repChar) {
      const temp = [];
      for (let k = 0; k < result.length; k++) {
        loopRun++;
        temp.push(result[k] + "0");
        temp.push(result[k] + "1");
      }
      result = temp;
    } else {
      let combinedChar = charAti;
      for (let m = i + 1; m < inputStr.length; m++) {
        loopRun++;
        // console.log(`i:${i}, charAti: ${charAti}, m:${m}`);
        i = m - 1; // bcz i++ will be executed
        if (inputStr[m] === repChar) {
          break;
        } else {
          combinedChar = combinedChar + inputStr[m];
        }
      }
      // console.log(`combinedChar: ${combinedChar}, i: ${i}`);
      // console.log(`result: ${result}`);
      for (let j = 0; j < result.length; j++) {
        result[j] = result[j] + combinedChar;
      }
      // console.log(`resultAfter: ${result}`);
      // console.log("END");
    }
  }
  return { result, loopRun, N: inputStr.length };
};

exports.q2Sols = { 1: sol1, 2: sol2, 3: sol3 };
