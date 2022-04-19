// const strInn = 'accepted';
const strInn = 'aaaabbbbccd';
// const strInn = 'accepteda';
// const strInn = 'accepotedqsbk';
// const strInn = 'jjacceptedas';
// const strInn = 'abacabad';
// const strInn = 'a     ';
// const strInn = 'aaaaa';

// обрезка пробелов входной строки на старте
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

// разделение 2 сценариев с 1 и 2 деревьями
const length = sortedArr.length;
let finalArr = [];
if (
  sortedArr.length > 2 &&
  Object.values(sortedArr[length - 1])[0] ===
    Object.values(sortedArr[length - 2])[0]
) {
  // генерация первоначальных кодов верхних элементов
  sortedArr[length - 1].nodeCode = '01';
  sortedArr[length - 2].nodeCode = '10';

  // ... и остальных тоже
  for (let i = 0; i < length - 2; i++) {
    sortedArr[i].nodeCode = '';
  }
  // console.log('sortedArr', sortedArr);

  // генерация кодов остальных элементов 2 деревьев
  // let prdk = 0;
  // let count = 1;
  // let base = 6;
  // for (let i = length - 3; i >= 0; i--) {
  // console.log(sortedArr[i]);
  // console.log(base);
  // // if (count % 4 === 0 || count % 4 === 3) {
  // //   let newItem = '';
  // //   for (let j = 0; j < sortedArr[i + 1].nodeCode.length; j++) {
  // //     if (j === sortedArr[i + 1].nodeCode.length - 1) {
  // //       newItem = newItem + String(count % 2);
  // //     } else {
  // //       newItem = newItem + '0';
  // //     }
  // //   }
  // //   sortedArr[i].nodeCode = newItem;
  // // } else {
  // //   sortedArr[i].nodeCode = base.toString(2);
  // //   count !== 0 && count % 2 === 0 ? (base *= 2) : (base += 1);
  // // }
  //
  // count += 1;
  // }
  // console.log(prdk);
  // console.log('sortedArr', sortedArr);

  // генерация кодов остальных элементов 2 деревьев - v2
  // const firstArr = sortedArr.slice(0, Math.ceil((length - 2) / 2));
  // const secondArr = sortedArr.slice(Math.ceil((length - 2) / 2), length - 2);
  const firstArr = [];
  const secondArr = [];
  for (let i = 0; i < sortedArr.length - 2; i++) {
    if (i % 2 === 0) {
      firstArr.push(sortedArr[i]);
    } else {
      secondArr.push(sortedArr[i]);
    }
  }

  // 1
  for (let i = 0; i < firstArr.length; i++) {
    i === 0 ? (firstArr[i].nodeCode = '11') : (firstArr[i].nodeCode = '10');
  }
  let x = firstArr.length;
  while (x > 1) {
    for (let i = 0; i < x; i++) {
      firstArr[i].nodeCode = '1' + firstArr[i].nodeCode;
    }
    x--;
  }

  // 2
  for (let i = 0; i < secondArr.length; i++) {
    i === 0 ? (secondArr[i].nodeCode = '00') : (secondArr[i].nodeCode = '01');
  }
  let y = secondArr.length;
  while (y > 1) {
    for (let i = 0; i < y; i++) {
      secondArr[i].nodeCode = '0' + secondArr[i].nodeCode;
    }
    y--;
  }

  // console.log(firstArr);
  // console.log(secondArr);

  finalArr = [
    ...sortedArr.slice(sortedArr.length - 2),
    ...firstArr,
    ...secondArr,
  ];
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
  // console.log('sortedArr(1tree)', sortedArr);

  finalArr = [...sortedArr];
}

// console.log('finalArr', finalArr);

// генерация итоговой кодовой строки
let codeArr = [];
for (let i = 0; i < str.length; i++) {
  codeArr.push(finalArr.find((el) => Object.keys(el)[0] === str[i]).nodeCode);
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
