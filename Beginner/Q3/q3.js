const sol1 = function(n) {
  const a = (n + 1) * n * (n - 1);
  return { result: 1 + 2 * n + a / 2, loopRun: 1, N: n };
};

exports.q3Sols = { 1: sol1 };
