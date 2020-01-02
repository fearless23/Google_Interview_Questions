const putCharAtIdx = function(word, idx, char) {
  return word.substring(0, idx) + char + word.substring(idx + 1);
};

const swap = function(word, i, j) {
  const newWord = putCharAtIdx(word, i, word[j]);
  return putCharAtIdx(newWord, j, word[i]);
};

const swapAndCompare = function(str1, str2) {
  let result = "Sorry, no swap match found";
  let loopRun = 0;
  mainLoop: for (let i = 0; i < str1.length - 1; i++) {
    for (let j = i + 1; j < str1.length; j++) {
      loopRun++;
      const word = swap(str1, i, j);
      if (word === str2) {
        result = `YES, swap at idx ${i}, ${j}`;
        break mainLoop;
      }
    }
  }
  return { result, loopRun };
};

exports.q9Sols = { 1: swapAndCompare };
