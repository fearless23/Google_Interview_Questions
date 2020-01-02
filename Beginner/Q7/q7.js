const sol1 = function(arr = [1, 1, 2, 3]) {
  const counts = {};
  let loopRun = 0;
  for (let num of arr) {
    loopRun++; // arrLength = N
    if (!counts[String(num)]) {
      counts[String(num)] = 1;
    } else {
      counts[String(num)]++;
    }
  }
  const result = [];
  for (let num in counts) {
    loopRun++; // uniqueVals in counts, (N-2)/2 + 2
    const numCount = counts[num];
    if (numCount === 1) {
      result.push(Number(num));
    }
  }
  // TimeComplexity: N + N/2 + 1 = 3N/2 + 1
  return { result, loopRun, N: arr.length };
};

exports.q7Sols = { 1: sol1 };
