const W = 8;
const vals = [10, 40, 50, 70];
const wts = [1, 3, 4, 5];
// Output : 110

const sortByProp = prop => (order = "dec") => (prev, curr) => {
  if (order === "dec") return curr[prop] - prev[prop];
  else return prev[prop] - curr[prop];
};
const sortByW = sortByProp("wt")();
const sortByVT = sortByProp("valT")();

const mixWandV = function(wts, vals) {
  return wts
    .map((wt, idx) => {
      return { wt, val: vals[idx] };
    })
    .sort(sortByW);
};

const mixWToPrev = function(W, mixed, wt, val, isLast) {
  const newMixed = [];
  for (let mix of mixed) {
    const { wtT, valT } = mix;
    const leftQ = Math.floor((W - wtT) / wt);
    for (let q = 0; q <= leftQ; q++) {
      const item = {
        wtT: wtT + q * wt,
        valT: valT + q * val
      };
      // If not last just push item
      if (!isLast) {
        newMixed.push(item);
      }
      // If last check if wtT equals W
      if (item.wtT === W) {
        newMixed.push(item);
      }
    }
  }
  return newMixed;
};

const findValidQuantities = function(W, items, mixed) {
  if (items.length === 0) return mixed;
  let { val, wt } = items.shift();
  const newMixed = mixWToPrev(W, mixed, wt, val, items.length === 1);
  return findValidQuantities(W, items, newMixed);
};

const find = function(W, wts, vals) {
  const items = mixWandV(wts, vals);
  const startMixed = [{ wtT: 0, valT: 0 }];
  const validQ = findValidQuantities(W, items, startMixed);
  return validQ.sort(sortByVT)[0].valT;
};

console.log(find(W, wts, vals));
