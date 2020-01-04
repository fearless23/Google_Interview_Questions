const BinaryTree = function(bTree) {
  const bt = bTree;
  let loopRun = 0;

  const mixWithChild = function(pIdx, pVal, left = true) {
    let idx = pIdx * 2;
    if (!left) idx++;
    const val = bt[idx];
    if (!val) return null;
    return { idx, val: pVal + String(val), leaf: false };
  };

  const mixParent = function(pNum) {
    const { idx, val } = pNum;
    const l = mixWithChild(idx, val, true);
    const r = mixWithChild(idx, val, false);
    // No left or right -- Leaf reached...
    if (!l & !r) return { mixed: [{ idx, val, leaf: true }], leafs: 1 };

    const mixed = [];
    if (l) mixed.push(l);
    if (r) mixed.push(r);
    return { mixed, leafs: 0 };
  };

  const calcNextLevel = function(nums) {
    const next = [];
    let totalLeafs = 0;
    for (let n of nums) {
      loopRun++;
      // No need to cal for leaf, but keep in next...
      if (n.leaf) {
        totalLeafs++;
        next.push(n);
      } else {
        const { mixed, leafs } = mixParent(n);
        totalLeafs += leafs;
        next.push(...mixed);
      }
    }
    const leafsReached = next.length === totalLeafs;
    return { next, leafsReached };
  };

  const sum = (a = 0, b = 0) => a + b;
  const pluckNum = obj => Number(obj.val);

  const traverseAndMix = function(nums, level) {
    const { next, leafsReached } = calcNextLevel(nums);
    if (leafsReached) return { nums: next, level };
    return traverseAndMix(next, level + 1);
  };

  const findNums = function() {
    const start = [{ idx: 1, val: String(bt[1]), leaf: false }];
    const { nums, level } = traverseAndMix(start, 0);
    const result = nums.map(pluckNum).reduce(sum);
    return { sum: result, nums, level };
  };

  const rollDown = function(idx, total, type = "root") {
    loopRun++;
    const val = bt[idx];
    // console.log(idx, val, type);
    // Base case
    if (!val) return 0;

    // Another Case -- For Leaf return nextTotal
    const isLeaf = !bt[idx * 2] && !bt[idx * 2 + 1];
    if(isLeaf) return total * 10 + val

    // Else parse down further...
    return (
      rollDown(idx * 2, total * 10 + val, "left") +
      rollDown(idx * 2 + 1, total * 10 + val, "right")
    );
  };

  return { sol1: findNums, sol2: rollDown, loopRun };
};

const sol1 = function(binaryTree) {
  const myBT = BinaryTree(binaryTree);
  const x = myBT.sol1();
  return { result: x, loopRun: myBT.loopRun };
};

const sol2 = function(binaryTree) {
  const myBT = BinaryTree(binaryTree);
  return { result: myBT.sol2(1, 0), loopRun: myBT.loopRun };
};

exports.q11Sols = { 1: sol1, 2: sol2 };
