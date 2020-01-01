const { performance } = require("perf_hooks");
const xx = require("os");
const { q1Sols } = require("./Q1/q1");
const { q2Sols } = require("./Q2/q2");

const qSols = {
  1: q1Sols,
  2: q2Sols
};

const runSol = function(quesNo = 1, solNo = 1, input) {
  let fn = qSols[1][1];
  const a = performance.now();
  fn = qSols[quesNo][solNo];
  const result = fn(input);
  const b = performance.now();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Q:${quesNo} S:${solNo}`);
  console.log(`Time: ${b - a}ms`);
  console.log(`RAM Used: ${used} MB`);
  console.log(
    `Results: ${result.result.length}, Loops: ${result.loopRun}, N: ${result.N}\n`
  );
  //   return { time: b - a, result };
};
