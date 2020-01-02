class LongestSubString {
  constructor(str, reqUniqueChars) {
    this.str = str;
    this.reqUniqueChars = reqUniqueChars;
  }

  getUniqueChars(word) {
    const charCount = {};
    for (let char of word) {
      charCount[char] = true;
    }
    return Object.keys(charCount).length;
  }

  makeSubstrings(n = 1) {
    let loopRuns = 0;
    let subStr = null;
    for (let i = 0; i < this.str.length - n + 1; i++) {
      loopRuns += n;
      const tempSubStr = this.str.slice(i, i + n);
      const uChars = this.getUniqueChars(tempSubStr);
      if (uChars === this.reqUniqueChars) {
        subStr = tempSubStr;
        break;
      }
    }
    return { subStr, loopRuns };
  }

  run() {
    let loopRun = 0;
    let result = "--NOT FOUND--";
    for (let i = this.str.length; i > 0; i--) {
      const { subStr, loopRuns } = this.makeSubstrings(i);
      loopRun += loopRuns;
      if (subStr) {
        result = subStr;
        break;
      }
    }
    return { result, loopRun };
  }
}

const sol1 = function(str, reqUniqueChars) {
  const xx = new LongestSubString(str, reqUniqueChars);
  return xx.run();
};

exports.q6Sols = {
  1: sol1
};
