class BinaryTree {
  constructor(bt) {
    this.bt = bt;
    this.root = bt[1];
    this.loopRun = 0;
  }

  mixWithChild(pIdx, pVal, left = true) {
    let idx = pIdx * 2;
    if (!left) idx++;
    const val = this.bt[idx];
    if (!val) return null;
    return { idx, val: pVal + String(val), leaf: false };
  }

  mixParent(pNum) {
    const { idx, val } = pNum;
    const l = this.mixWithChild(idx, val, true);
    const r = this.mixWithChild(idx, val, false);
    // No left or right -- Leaf reached...
    if (!l & !r) return { mixed: [{ idx, val, leaf: true }], leafs: 1 };

    const mixed = [];
    if (l) mixed.push(l);
    if (r) mixed.push(r);
    return { mixed, leafs: 0 };
  }

  calcNextLevel(nums) {
    const next = [];
    let totalLeafs = 0;
    for (let n of nums) {
      this.loopRun++;
      // No need to cal for leaf, but keep in next...
      if (n.leaf) {
        totalLeafs++;
        next.push(n);
      } else {
        const { mixed, leafs } = this.mixParent(n);
        totalLeafs += leafs;
        next.push(...mixed);
      }
    }
    const leafsReached = next.length === totalLeafs;
    return { next, leafsReached };
  }

  sum(a = 0, b = 0) {
    return a + b;
  }

  pluckNum(obj) {
    return Number(obj.val);
  }

  traverseAndMix(nums, level) {
    const { next, leafsReached } = this.calcNextLevel(nums);
    if (leafsReached) return { nums: next, level };
    return this.traverseAndMix(next, level + 1);
  }

  findNums() {
    const start = [{ idx: 1, val: String(this.root), leaf: false }];
    const { nums, level } = this.traverseAndMix(start, 0);
    const result = nums.map(this.pluckNum).reduce(this.sum);
    return { sum: result, nums, level };
  }

  treeTraverseDown(currIdx, total) {
    this.loopRun++;
    const val = this.bt[currIdx];
    // Base case
    if (!val) return 0;

    // Update val
    const newTotal = total * 10 + val;

    // if current node is leaf, return newTotal
    const lval = this.bt[currIdx * 2];
    const rval = this.bt[currIdx * 2 + 1];
    if (!lval & !rval) return newTotal;

    // Else parse down further...
    return (
      this.treeTraverseDown(currIdx * 2, newTotal) +
      this.treeTraverseDown(currIdx * 2 + 1, newTotal)
    );
  }
}

const sol1 = function(binaryTree) {
  const myBT = new BinaryTree(binaryTree);
  myBT.loopRun = 0;
  const x = myBT.findNums();
  return { result: x, loopRun: myBT.loopRun };
};

const sol2 = function(binaryTree) {
  const myBT = new BinaryTree(binaryTree);
  myBT.loopRun = 0;
  return { result: myBT.treeTraverseDown(1, 0), loopRun: myBT.loopRun };
};

exports.q11Sols = { 1: sol1, 2: sol2 };
