// const strInn = 'accepteda';
// const strInn = 'jjacceptedas';
// const strInn = 'abacabad';
// const strInn = 'a     ';
// const strInn = `a

// `;
// const strInn = 'aaaaa';

const strInn = 'accepted';
// 11000101110111101011111 = 23 - так считает
// c: 0;
// e: 10;
// a: 110;
// p: 1110;
// t: 11110;
// d: 11111;

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
console.log('sortedArr', sortedArr);

// new variant
let testArr = sortedArr.concat();
let length = sortedArr.length;

while (length > 1) {
  const newObj = {};
  const name = `${Object.keys(sortedArr[0])[0]}${Object.keys(sortedArr[1])[0]}`;
  const value = Number(
    Object.values(sortedArr[0])[0] + Object.values(sortedArr[1])[0],
  );
  newObj[name] = value;

  sortedArr[0] = sortedArr[1] = undefined;

  length -= 1;

  sortedArr = sortedArr.filter((el) => el !== undefined);

  console.log('sortedArr1', sortedArr);
  // исправить тут!!!
  // текущий приоритет = value
  // определить индекс для вставки
  // sortedArr.sort((a, b) =>
  //   Object.values(a)[0] > Object.values(b)[0] ? 1 : -1,
  // );
  let index = 0;
  for (let i = 0; i < sortedArr.length; i++) {
    if (
      Object.values(sortedArr[i])[0] >= value
      // name.length < Object.keys(sortedArr[i])[0].length
    ) {
      index = i;
      break;
    } else {
      index = sortedArr.length;
    }
  }
  // console.log(name);
  // console.log(index);
  // вставить newObj с помощью splice на новое место
  sortedArr.splice(index, 0, newObj);
  // sortedArr.push(newObj);

  console.log('sortedArr2', sortedArr);

  testArr.push(newObj);
}

// console.log('testArr', testArr);

// codes
if (testArr.length > 1) {
  testArr = testArr.slice(0, testArr.length - 1);
  testArr.reverse();
}
// console.log('testArr', testArr);

const firstItem = Object.keys(testArr[0])[0];
// console.log('firstItem', firstItem);

let testArrFilt1 = testArr.filter((a) => firstItem.includes(Object.keys(a)[0]));

let testArrFilt2 = testArr.concat();
for (let i = 0; i < testArr.length; i++) {
  for (let j = 0; j < testArrFilt1.length; j++) {
    if (testArr[i] === testArrFilt1[j]) {
      delete testArrFilt2[i];
    }
  }
}
testArrFilt2 = testArrFilt2.filter((el) => el !== undefined);

// console.log('testArrFilt1', testArrFilt1);
// console.log('testArrFilt2', testArrFilt2);

// Определение буквы-"ствола" дерева
let mark1Prep = testArrFilt1
  .map((el) => Object.keys(el)[0])
  .join('')
  .split('')
  .reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

const mark1 = Object.keys(mark1Prep).find(
  (el) => mark1Prep[el] === Math.max(...Object.values(mark1Prep)),
);

testArrFilt1.forEach((el) =>
  Object.keys(el)[0].includes(mark1)
    ? (el.nodeCode = '1')
    : (el.nodeCode = '0'),
);

console.log('testArrFilt1', testArrFilt1);

// Отсечь узлы дерева
testArrFilt1 = testArrFilt1.filter((el) => Object.keys(el)[0].length === 1);

// добавить коды
testArrFilt1.forEach((el, i) => {
  let newCode = el.nodeCode;
  for (let j = 0; j <= i; j++) {
    if (newCode.length < testArrFilt1.length) {
      newCode = '1' + newCode;
    }
  }
  return (el.nodeCode = newCode);
});
console.log('testArrFilt1', testArrFilt1);

if (testArrFilt2.length) {
  // Определение буквы-"ствола" дерева
  let mark2Prep = testArrFilt2
    .map((el) => Object.keys(el)[0])
    .join('')
    .split('')
    .reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

  const mark2 = Object.keys(mark2Prep).find(
    (el) => mark2Prep[el] === Math.max(...Object.values(mark2Prep)),
  );

  // console.log('mark2', mark2);

  console.log('testArrFilt2', testArrFilt2);
  // Определение ствола дерева
  testArrFilt2.forEach((el) =>
    Object.keys(el)[0].includes(mark2)
      ? (el.nodeCode = '0')
      : (el.nodeCode = '1'),
  );

  // console.log('testArrFilt2', testArrFilt2);

  testArrFilt2 = testArrFilt2.filter((el) => Object.keys(el)[0].length === 1);

  // добавить коды
  testArrFilt2.forEach((el, i) => {
    let newCode = el.nodeCode;
    for (let j = 0; j <= i; j++) {
      if (newCode.length < testArrFilt2.length) {
        newCode = '0' + newCode;
      }
    }
    return (el.nodeCode = newCode);
  });
}
// console.log('testArrFilt2', testArrFilt2);

// генерация кодовой строки
const allCodes = [...testArrFilt1, ...testArrFilt2];
// console.log(allCodes);

let codeArr = [];
for (let i = 0; i < str.length; i++) {
  codeArr.push(allCodes.find((el) => Object.keys(el)[0] === str[i]).nodeCode);
}
const codeStr = codeArr.join('');

// отображение решения в нужной последовательности
console.log(allCodes.length, codeStr.length);
for (let i = 0; i < allCodes.length; i++) {
  console.log(
    `${Object.keys(allCodes[i])[0]}: ${Object.values(allCodes[i])[1]}`,
  );
}
console.log(codeStr);
