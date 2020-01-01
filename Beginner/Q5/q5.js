const reqSum = 33;
const arr = [1, 4, 20, 3, 10, 5];
// const arr = [1, 4, 0, 0, 3, 10, 5];

const sol1 = function(arr, reqSum) {
  let subArray = [];
  let loopRun = 0;
  for (let i = 0; i < arr.length; i++) {
    let sum = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      loopRun++;
      sum += arr[j];
      if (sum === reqSum) {
        subArray.push(`reqSum ${reqSum} between idx ${i} and ${j}`);
        break;
      }
      if (sum > reqSum) {
        break;
      }
    }
  }

  console.log(subArray, loopRun);
};

const sol2 = function(arr, reqSum) {
  let subArray = [];
  let loopRun = 0;
  let sum = arr[0];
  let i = 0;
  for (let j = 1; j <= arr.length; j++) {
    // Remove Curr Item to sum if sum is less
    while (sum > reqSum && i < j - 1) {
      loopRun++;
      sum = sum - arr[i];
      i++;
    }

    if (sum === reqSum) {
      loopRun++;
      subArray.push(`reqSum ${reqSum} between idx ${i} and ${j - 1}`);
    }

    if (j < arr.length) {
      loopRun++;
      sum = sum + arr[j];
    }
  }

  console.log(subArray, loopRun);
};

exports.q5Sols = { 1: sol1, 2: sol2 };
