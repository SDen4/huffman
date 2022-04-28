const strInn = 'accepted';
// const strInn = 'aaaabbbbccd';
// const strInn = 'accepteda';
// const strInn = 'jjacceptedas';
// const strInn = 'abacabad';
// const strInn = 'aaaaa';

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

let testArr = sortedArr.concat();
let length = sortedArr.length;
let finalArr = [];

if (
  length > 2 &&
  Object.values(testArr[length - 1])[0] ===
    Object.values(testArr[length - 2])[0] &&
  sortedArr.length > Object.values(sortedArr[sortedArr.length - 1])[0]
) {
  const innArr1 = [testArr[length - 1]];
  const innArr2 = [testArr[length - 2]];

  for (let i = length - 3; i >= 0; i--) {
    if (i % 2 === 0) {
      innArr1.push(testArr[i]);
    } else {
      innArr2.push(testArr[i]);
    }
  }

  // console.log('innArr1', innArr1);
  // console.log('innArr2', innArr2);

  if (innArr1.length === 1 || innArr2.length === 1) {
    const littleArr = innArr1.length === 1 ? innArr1 : innArr2;
    const bigArr = innArr1.length === 1 ? innArr2 : innArr1;

    littleArr[0].code = '1';

    for (let i = 0; i < bigArr.length; i++) {
      bigArr[i].code = i === bigArr.length - 1 ? '1' : '0';
    }
    bigArr.forEach((el, i) => {
      let code = el.code;
      for (let j = 0; j <= i; j++) {
        if (code.length < bigArr.length) {
          code = '1' + code;
        }
      }
      return (el.code = code);
    });

    // console.log('littleArr', littleArr);
    // console.log('bigArr', bigArr);

    finalArr = [...littleArr, ...bigArr];
  } else {
    for (let i = 0; i < innArr1.length; i++) {
      innArr1[i].code = i === innArr1.length - 1 ? '0' : '1';
    }
    for (let i = 0; i < innArr2.length; i++) {
      innArr2[i].code = i === innArr2.length - 1 ? '1' : '0';
    }

    // добавить коды
    innArr1.forEach((el, i) => {
      let code = el.code;
      for (let j = 0; j <= i; j++) {
        if (code.length < innArr1.length) {
          code = '0' + code;
        }
      }
      return (el.code = code);
    });
    innArr2.forEach((el, i) => {
      let code = el.code;
      for (let j = 0; j <= i; j++) {
        if (code.length < innArr2.length) {
          code = '1' + code;
        }
      }
      return (el.code = code);
    });
    // console.log('innArr1', innArr1);
    // console.log('innArr2', innArr2);
  }

  finalArr = [...innArr1, ...innArr2];
} else {
  // сценарий с одним деревом
  for (let i = 0; i < sortedArr.length; i++) {
    i === 0 ? (sortedArr[i].code = '1') : (sortedArr[i].code = '0');
  }

  let j = sortedArr.length - 1;

  while (j > 1) {
    for (let i = 0; i < j; i++) {
      sortedArr[i].code = '1' + sortedArr[i].code;
    }
    j--;
  }
  // console.log('sortedArr(1tree)', sortedArr);

  finalArr = [...sortedArr];
}

// console.log('finalArr', finalArr);

// генерация итоговой кодовой строки
let codeArr = [];
for (let i = 0; i < str.length; i++) {
  codeArr.push(finalArr.find((el) => Object.keys(el)[0] === str[i]).code);
}
const codeStr = codeArr.join('');

// отображение решения в нужной последовательности
console.log(finalArr.length, codeStr.length);
for (let i = 0; i < finalArr.length; i++) {
  console.log(
    `${Object.keys(finalArr[i])[0]}: ${Object.values(finalArr[i])[1]}`,
  );
}
console.log(codeStr);
