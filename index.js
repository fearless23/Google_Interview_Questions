const { runSolution } = require("./_helpers");
const show = { showResults: true, showLoops: true, showN: false };
const opts = solNo => ({ type: "b", quesNo: 12, solNo, ...show });

runSolution(opts(1), 900, 5);
