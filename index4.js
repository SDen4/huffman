// const strInn = 'accepted'; // 6 20
// const strInn = 'accepteda'; // 6 23
// const strInn = 'jjacceptedas';
// const strInn = 'abacabad'; // 4 14
// const strInn = 'aaaaa'; // 1 5
const strInn = 'asdfghjkl'; // 9 32

// const strInn = 'accepted';
// 01010101101100011001 = 20 - должно быть
// c: 10
// e: 11
// a: 010
// p: 011
// t: 000
// d: 001

const str = strInn.trim();

// объект уникальных значений с частотностью
const unicObj = str.split('').reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});
// console.log(unicObj);

// отсортированный массив по частоте по возрастанию
let sortedArr = [];
for (let key in unicObj) {
  sortedArr.push({ [key]: unicObj[key] });
}
sortedArr.sort((a, b) => (Object.values(a)[0] > Object.values(b)[0] ? 1 : -1));
// console.log('sortedArr', sortedArr);

let iterArr = sortedArr.concat();

while (iterArr.length > 1) {
  const newObj = {};
  const name = `${Object.keys(iterArr[0])[0]}${Object.keys(iterArr[1])[0]}`;
  const value = Number(
    Object.values(iterArr[0])[0] + Object.values(iterArr[1])[0],
  );
  newObj[name] = value;

  // sort iterArr by frequency
  // iterArr = iterArr.sort((a, b) => Object.values(a)[0] < Object.values(b)[0]);

  let index = iterArr.length;

  for (let i = 0; i < iterArr.length; i++) {
    if (Object.values(iterArr[i])[0] === value) {
      index = i !== iterArr.length - 1 ? i + 1 : i;
      break;
    }
  }
  iterArr.splice(index, 0, newObj);

  sortedArr.push(newObj);

  iterArr[0] = null;
  iterArr[1] = null;
  iterArr = iterArr.filter((el) => el !== null);

  // console.log('iterArrEnd', iterArr);
}

// добавление кодов
if (sortedArr.length > 1) {
  let firstBranch = sortedArr[sortedArr.length - 2];
  let firstBranchArr = Object.keys(firstBranch)[0].split('');
  // console.log('firstBranchArr', firstBranchArr);
  let firstCodeStart = '0';
  let count = 0;

  for (let i = sortedArr.length - 1; i >= 0; i--) {
    for (let j = 0; j < firstBranchArr.length; j++) {
      if (Object.keys(sortedArr[i])[0] === firstBranchArr[j]) {
        firstCodeStart = `1${firstCodeStart}`;
        sortedArr[i].code = firstCodeStart;
        count += 1;
      }

      if (
        Object.keys(sortedArr[i])[0] === firstBranchArr[j] &&
        count === firstBranchArr.length
      ) {
        firstCodeStart = `${firstCodeStart.slice(0, -2)}1`;
        sortedArr[i].code = firstCodeStart;
      }
    }
  }

  // определение 2 ветки или оставшегося элемента (в случае без 2 ветки)
  const firstArr = Object.keys(sortedArr[sortedArr.length - 1])[0].split('');
  const secondArr = Object.keys(sortedArr[sortedArr.length - 2])[0].split('');
  let result2Arr;

  const diff = function (a1, a2) {
    return a1
      .filter((i) => !a2.includes(i))
      .concat(a2.filter((i) => !a1.includes(i)));
  };
  result2Arr = diff(firstArr, secondArr);
  // console.log('result2Arr', result2Arr);

  // добавление кодов
  let secondBranch = sortedArr[sortedArr.length - 2];
  let secondBranchArr = Object.keys(secondBranch)[0].split('');
  let secondCodeStart = '1';
  let count2 = 0;

  for (let i = sortedArr.length - 1; i >= 0; i--) {
    for (let j = 0; j < result2Arr.length; j++) {
      if (Object.keys(sortedArr[i])[0] === result2Arr[j]) {
        secondCodeStart = `0${secondCodeStart}`;
        sortedArr[i].code = secondCodeStart;
        count2 += 1;
      }

      if (
        Object.keys(sortedArr[i])[0] === result2Arr[j] &&
        count2 === result2Arr.length
      ) {
        secondCodeStart = `${secondCodeStart.slice(0, -2)}0`;
        sortedArr[i].code = secondCodeStart;
      }
    }
  }
} else {
  sortedArr[0].code = '1';
}

// console.log('sortedArr', sortedArr);

// генерация итоговой кодовой строки
let codeArr = [];
for (let i = 0; i < str.length; i++) {
  codeArr.push(sortedArr.find((el) => Object.keys(el)[0] === str[i]).code);
}
const codeStr = codeArr.join('');

// отображение решения в нужной последовательности
console.log(
  sortedArr.filter((el) => Object.keys(el)[0].length === 1).length,
  codeStr.length,
);
for (let i = 0; i < sortedArr.length; i++) {
  if (Object.keys(sortedArr[i])[0].length === 1) {
    console.log(`${Object.keys(sortedArr[i])[0]}: ${sortedArr[i].code}`);
  }
}
console.log(codeStr);
