class FindJumpingNumbers {
  loopRun = 0;
  constructor(maxNum) {
    this.maxNum = maxNum;
  }

  firstNDigitNum(l, start) {
    let str = String(start);
    let startDigit = str;
    for (let i = 1; i < l; i++) {
      startDigit = this.nextSmallestDigit(startDigit);
      str += startDigit;
    }
    return str;
  }

  nextJump(n) {
    const num = String(n);
    let idx = 0;
    let start = "0";
    let loopRuns = 0;
    mainLoop: for (let i = num.length - 2; i >= 0; i--) {
      const xx = this.nextDigits(num[i]);
      const max = xx[xx.length - 1];
      loopRuns++;
      if (num[i + 1] !== max) {
        idx = i + 1;
        start = max;
        break mainLoop;
      }
    }
    let newLen = num.length - idx;
    let pre = num.substring(0, idx) || "1";
    if (idx === 0 && num[0] !== 9) {
      newLen += -1;
      pre = String(Number(num[0]) + 1);
      start = num[0];
    }

    const nextNum = Number(pre + this.firstNDigitNum(newLen, start));
    return { nextNum, loopRuns: loopRuns + newLen - 1 };
  }

  isJumpingNum = function(num) {
    if (num <= 10) {
      this.loopRun++;
      return true;
    }
    const numStr = String(num);
    let isJumping = true;
    main: for (let i = 0; i < numStr.length - 1; i++) {
      this.loopRun++;
      const diff = Math.abs(Number(numStr[i]) - Number(numStr[i + 1]));
      if (diff !== 1) {
        isJumping = false;
        break main;
      }
    }
    return isJumping;
  };

  nextDigits(firstDigit) {
    const d = Number(firstDigit);
    if (d === 0) return ["1"];
    else if (d === 9) return ["8"];
    else return [String(d - 1), String(d + 1)];
  }

  nextSmallestDigit(firstDigit) {
    const d = Number(firstDigit);
    if (d === 0) return "1";
    else return String(d - 1);
  }

  bfs(nums) {
    const nextNums = [];
    for (let num of nums) {
      this.loopRun++;
      const { stopHere, newNums } = this.addValidDigitAtEnd(num);
      nums.push(...newNums);
      nextNums.push(...newNums);
      if (stopHere) {
        return nums;
      }
    }
    this.bfs(nextNums);
  }

  addValidDigitAtEnd(n) {
    const num = String(n);
    const lastDigit = num[num.length - 1];
    let stopHere = false;
    const validNextDigits = this.nextDigits(lastDigit);
    let newNums = validNextDigits.map(d => {
      const newNum = num + d;
      if (Number(newNum) >= this.maxNum) {
        stopHere = true;
        return null;
      }
      return Number(newNum);
    });
    if (stopHere) {
      newNums = newNums.filter(x => !!x);
    }
    return { newNums, stopHere };
  }

  makeNDigitNums(firstDigits, n, limit = false, numStr = "") {
    if (n === 1) {
      return firstDigits;
    }
    const nDigitNums = [];
    for (let digit of firstDigits) {
      this.loopRun++;
      let nextValidDigits = this.nextDigits(digit);
      if (limit & (digit === numStr[0])) {
        nextValidDigits = nextValidDigits.filter(
          a => Number(a) <= Number(numStr[1])
        );
      }
      const n1Digits = this.makeNDigitNums(
        nextValidDigits,
        n - 1,
        limit,
        numStr.substring(1)
      );

      const nDigitForA = n1Digits.map(n1Digit => {
        this.loopRun++;
        return String(digit) + String(n1Digit);
      });
      nDigitNums.push(...nDigitForA);
    }
    return nDigitNums;
  }

  // Solutions

  // sol4
  bfsSol() {
    const nums = [];

    for (let i = 1; i < Math.min(this.maxNum, 10); i++) {
      this.loopRun++;
      nums.push(i);
    }
    if (this.maxNum < 10) {
      return [0, ...nums];
    }

    const fc = Number(String(this.maxNum)[0]);
    return this.bfs(nums.filter(n => n <= fc));
  }

  // Sol3
  getJumps() {
    const nums = [];

    for (let i = 0; i < Math.min(this.maxNum, 10); i++) {
      this.loopRun++;
      nums.push(i);
    }
    if (this.maxNum < 10) {
      return nums;
    }
    let startNum = "10";
    while (startNum < this.maxNum) {
      nums.push(Number(startNum));
      const { nextNum, loopRuns } = this.nextJump(startNum);
      this.loopRun += loopRuns;
      startNum = nextNum;
    }
    return nums;
  }

  // Sonum.length2
  createNums() {
    const nums = [];
    const forN1Digits = [];
    for (let i = 0; i < Math.min(this.maxNum, 10); i++) {
      this.loopRun++;
      nums.push(i);
      forN1Digits.push(String(i));
    }
    if (this.maxNum < 10) {
      return nums;
    }
    const str = String(this.maxNum);
    const N = str.length;
    // For Rest From 2 digit Nums to N-1...
    for (let i = 2; i < N; i++) {
      const n1Digits = this.makeNDigitNums(forN1Digits, i, false);
      nums.push(...n1Digits.map(n1Digit => Number(n1Digit)));
    }

    // For N Digit number
    const forNDigits = [];
    for (let i = 1; i <= Number(str[0]); i++) {
      forNDigits.push(String(i));
    }
    const nDigits = this.makeNDigitNums(forNDigits, N, true, str);
    nums.push(...nDigits.map(nDigit => Number(nDigit)));

    return nums;
  }

  // sol1
  getJumpingNumbers() {
    const result = [];
    for (let i = 0; i < this.maxNum; i++) {
      if (this.isJumpingNum(i)) result.push(i);
    }
    return result;
  }
}

const sol1 = function(maxNum = 10) {
  const a = new FindJumpingNumbers(maxNum);
  a.loopRun = 0;
  return { result: a.getJumpingNumbers(), loopRun: a.loopRun, N: maxNum };
};

const sol2 = function(maxNum = 10) {
  const a = new FindJumpingNumbers(maxNum);
  a.loopRun = 0;
  return { result: a.createNums(), loopRun: a.loopRun, N: maxNum };
};

const sol3 = function(maxNum = 10) {
  const a = new FindJumpingNumbers(maxNum);
  a.loopRun = 0;
  return { result: a.getJumps(), loopRun: a.loopRun, N: maxNum };
};

const sol4 = function(maxNum = 10) {
  const a = new FindJumpingNumbers(maxNum);
  a.loopRun = 0;
  return { result: a.bfsSol(), loopRun: a.loopRun, N: maxNum };
};

exports.q10Sols = { 1: sol1, 2: sol2, 3: sol3, 4: sol4 };
