const { performance } = require("perf_hooks");
const { beginnerSols } = require("./Beginner/_beginner");
const { intermediateSols } = require("./Intermediate/_intermediate");

const qSols = {
  b: beginnerSols,
  i: intermediateSols
};

const runSol = function(type = "b", quesNo = 1, solNo = 1, ...input) {
  let fn = qSols["b"][1][1];
  const a = performance.now();
  fn = qSols[type][quesNo][solNo];
  const r = fn(...input);
  const b = performance.now();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Q:${quesNo} S:${solNo}`);
  console.log(`Time: ${b - a}ms`);
  console.log(`RAM Used: ${used} MB`);
  if (r) {
    if (r.result) {
      console.log(`Result`);
      console.log(r.result);
    }
    if (r.loopRun) {
      console.log(`Loops: ${r.loopRun}, N: ${r.N}\n`);
    }
  }
  //   return { time: b - a, result };
};

const arr = ["ale", "apple", "monkey", "plea"];
const str = "abpcplea";
runSol("i", 1, 2);
