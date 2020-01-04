class FindCeleb {
  people = [];
  callToFn = 0;

  constructor(totalPeople = 3, celeb = 2) {
    this.celeb = celeb;
    this.makePeople(totalPeople);
  }

  makePeople(n) {
    for (let i = 1; i <= n; i++) this.people.push(i);
  }

  doesKnow(a, b) {
    this.callToFn++;
    // 5 is the celebrity
    if (a === this.celeb) return false;
    if (b === this.celeb) return true;
    return Math.random() > 0.5;
  }

  findCelebOfTwo(A, B) {
    if (A === B) return A;
    const AknowB = this.doesKnow(A, B);
    const BknowA = this.doesKnow(B, A);
    if (!AknowB && BknowA) return A;
    if (AknowB && !BknowA) return B;
    return null;
  }

  checkIfCeleb(personToCheck) {
    if (!personToCheck) return false;
    let isCeleb = personToCheck;
    main: for (let person of this.people) {
      const celeb = this.findCelebOfTwo(person, personToCheck);
      if (celeb !== personToCheck) {
        isCeleb = "Nobody";
        break main;
      }
    }
    return isCeleb;
  }

  checkForCeleb(arr) {
    if (arr.length === 1) {
      return arr[0];
    }
    if (arr.length === 0) {
      return null;
    }
    // Check First Two People...
    const celeb = this.findCelebOfTwo(arr[0], arr[1]);
    arr.shift();
    arr.shift();
    if (celeb) arr.unshift(celeb);

    return this.checkForCeleb(arr);
  }

  find() {
    const people = [...this.people];
    const celeb = this.checkForCeleb(people);
    return this.checkIfCeleb(celeb);
  }
}

const sol1 = function(totalPeople, celeb) {
  const a = new FindCeleb(totalPeople, celeb);
  return { result: a.find(), loopRun: a.callToFn };
};

exports.q12Sols = { 1: sol1 };
