const { runSolution } = require("./_helpers");
const show = { showResults: true, showLoops: true, showN: false };
const opts = solNo => ({ type: "b", quesNo: 11, solNo, ...show });

const binaryTree = [null, 6, 3, 5, 2, 5, null, 4, null, null, 7, 4];
runSolution(opts(1), binaryTree);
runSolution(opts(2), binaryTree);