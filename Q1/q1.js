const arrToObj = function(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    const value = String(arr[i]);
    // Assuming unique Values...
    obj[value] = i;
  }
  return obj;
};

const sol1 = function(arr) {
  // Time Complexity: ((N**2 - 3*N + 2) / 2) + N
  // Big O = N**2
  const N = arr.length;
  const arrObj = arrToObj(arr);
  const triplets = [];
  let loopRun = 0;

  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      loopRun++;
      const valueToFind = -1 * (arr[i] + arr[j]);
      const k = arrObj[String(valueToFind)];
      // Check if valueToFind exists and idx != i or j
      if (!!k & (k > i) & (k > j)) {
        triplets.push([arr[i], arr[j], valueToFind]);
      }
    }
  }
  return { triplets, loopRun, N };
};

exports.q1Sols = { 1: sol1 };
