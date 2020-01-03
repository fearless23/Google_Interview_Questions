const { runSolution } = require("./_helpers");
const show = { showResults: false, showLoops: true, showN: false };
const opts = solNo => ({ type: "b", quesNo: 10, solNo, ...show });
//...........
data = 101;
//...........
runSolution(opts(1), data);
runSolution(opts(2), data);
runSolution(opts(3), data);
runSolution(opts(4), data);
