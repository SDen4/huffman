const strInn = 'accepteda';
// const strInn = 'jjacceptedas';
// const strInn = 'abacabad';
// const strInn = 'aaaaa';

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

// new variant
let testArr = sortedArr.concat();
let length = sortedArr.length;
let finalArr = [];

if (
  sortedArr.length > 2 &&
  Object.values(sortedArr[length - 1])[0] ===
    Object.values(sortedArr[length - 2])[0] &&
  sortedArr.length > Object.values(sortedArr[sortedArr.length - 1])[0]
) {
  while (length > 1) {
    const newObj = {};

    const name = `${Object.keys(sortedArr[0])[0]}${
      Object.keys(sortedArr[1])[0]
    }`;
    const value = Number(
      Object.values(sortedArr[0])[0] + Object.values(sortedArr[1])[0],
    );
    newObj[name] = value;

    if (!sortedArr[0]?.code && sortedArr[1]?.code) {
      newObj.code = sortedArr[1]?.code;
      (sortedArr[0].code === sortedArr[1]?.code) === '1' ? '0' : '1';
    } else if (sortedArr[0]?.code && sortedArr[1]?.code) {
      newObj.code = sortedArr[1]?.code;
    } else {
      sortedArr[0].code = '0';
      sortedArr[1].code = '1';
      newObj.code = length % 2 === 0 ? '1' : 0;
    }

    // sortedArr[0] = sortedArr[1] = undefined;
    delete sortedArr[0];
    delete sortedArr[1];

    length -= 1;

    sortedArr = sortedArr.filter((el) => el !== undefined);

    let index = 0;
    for (let i = 0; i < sortedArr.length; i++) {
      if (
        Object.values(sortedArr[i])[0] >= value &&
        name.length < Object.keys(sortedArr[i])[0].length
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

    // console.log('sortedArr2', sortedArr);

    testArr.push(newObj);
  }

  finalArr = [...testArr.slice(0, testArr.length - 1)];

  finalArr.forEach((el) => {
    let nodeCode = '';

    for (let i = 0; i < finalArr.length; i++) {
      if (Object.keys(finalArr[i])[0].includes(Object.keys(el)[0])) {
        nodeCode += finalArr[i].code;
      }
    }

    return (el.nodeCode = nodeCode);
  });
  finalArr = finalArr.filter((el) => Object.keys(el)[0].length === 1);

  // console.log('finalArr', finalArr);
} else {
  // сценарий с одним деревом
  for (let i = 0; i < sortedArr.length; i++) {
    i === 0 ? (sortedArr[i].nodeCode = '1') : (sortedArr[i].nodeCode = '0');
  }

  let j = sortedArr.length - 1;

  while (j > 1) {
    for (let i = 0; i < j; i++) {
      sortedArr[i].nodeCode = '1' + sortedArr[i].nodeCode;
    }
    j--;
  }

  finalArr = [...sortedArr];
  // console.log('finalArr', finalArr);
}

// console.log('testArr final', testArr);
// console.log('sortedArr final', sortedArr);

// генерация итоговой кодовой строки
let codeArr = [];
for (let i = 0; i < str.length; i++) {
  codeArr.push(finalArr.find((el) => Object.keys(el)[0] === str[i]).nodeCode);
}
const codeStr = codeArr.join('');

// отображение решения в нужной последовательности
console.log(finalArr.length, codeStr.length);
for (let i = 0; i < finalArr.length; i++) {
  console.log(`${Object.keys(finalArr[i])[0]}: ${finalArr[i].nodeCode}`);
}
console.log(codeStr);
