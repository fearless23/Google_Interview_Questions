const { performance } = require("perf_hooks");
const { beginnerSols } = require("./Beginner/_beginner");
const { intermediateSols } = require("./Intermediate/_intermediate");

const qSols = Object.freeze({
  b: beginnerSols,
  i: intermediateSols
});

const types = {
  b: "Beginner",
  i: "Intermediate"
};

const print = function(type, ...args) {
  console.log("\x1b[32m", ...args, "\x1b[0m");
};

exports.runSolution = function({ type, quesNo, solNo }, ...input) {
  const fn = qSols[type][quesNo][solNo];
  const a = performance.now();
  const r = fn(...input);
  const b = performance.now();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  // console.log("\x1b[31m", "sometext", "\x1b[0m");
  console.log(`${types[type]} Q:${quesNo} S:${solNo}`);
  const time = Math.floor((b - a) * 10) / 1000;
  print("", `Time: ${time}s`);
  print("", `RAM Used: ${used} MB`);
  if (r) {
    if (r.result) {
      console.log("Result:");
      console.log(r.result);
    }
    if (r.loopRun) {
      console.log(`Loops: ${r.loopRun}`);
    }
    if (r.N) {
      console.log(`N: ${r.N}\n`);
    }
  }
};
