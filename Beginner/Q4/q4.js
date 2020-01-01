const sortArrByWordLength = function(arr) {
  return arr.sort((a, b) => {
    if (a.length > b.length) return -1;
    else return 1;
  });
};

const sol1 = function(words, str) {
  // str Length:8
  // Delete some chars from str..
  // Largest Word: monkey len:6
  // Delete 2 chars from str.
  const wordsAfterDeletion = [];
  const charsToDelete = 2;
  let loopRun = 0;
  for (let i = 0; i < str.length - 1; i++) {
    const x = str.slice(0, i);
    const y = str.slice(i + 1);
    for (let j = 0; j < y.length; j++) {
      // remove i and j add remaining
      loopRun++;
      const y1 = y.slice(0, j);
      const y2 = y.slice(j + 1);
      wordsAfterDeletion.push(x + y1 + y2);
    }
  }
  console.log(wordsAfterDeletion.length, loopRun);
};

// Find a char in a given string...
const findChar = function(wordCharAti, remStr) {
  let found = false;
  let nextStr = remStr;
  let charLoopRuns = 0;
  for (let i = 0; i < remStr.length; i++) {
    charLoopRuns++;
    if (wordCharAti === remStr[i]) {
      nextStr = remStr.slice(i + 1);
      found = true;
      break;
    }
  }
  return { found, nextStr, charLoopRuns };
};

const findWord = function(word, str) {
  // Time Complexity: Word Length * str Length (worst Case)
  // BigO = n*m
  let remStr = str;
  let charsFound = "";
  let wordLoopRuns = 0;
  for (let i = 0; i < word.length; i++) {
    const { found, nextStr, charLoopRuns } = findChar(word[i], remStr);
    wordLoopRuns += charLoopRuns;
    if (found) {
      charsFound += word[i];
      remStr = nextStr;
    } else {
      break;
    }
  }
  return { charsFound, wordFound: charsFound === word, word, wordLoopRuns };
};

const sol2 = function(words, str, allResults = false) {
  // Time Complexity: wordsLength * wordLengthMax * strLen (worst Case)+wordsLength
  const sortedWords = sortArrByWordLength(words);
  let result = "";
  let loopRun = words.length; // For initial sorting
  for (let word of sortedWords) {
    const { wordFound, wordLoopRuns } = findWord(word, str);
    loopRun += wordLoopRuns;
    if (wordFound) {
      result = word;
      break;
    }
  }
  if (!allResults) return { result, loopRun };
  // If all results are needed
  return { result: sortedWords.map(word => findWord(word, str)) };
};

exports.q4Sols = { 2: sol2 };
