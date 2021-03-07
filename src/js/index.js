/* Task 2.1 */
/* 1 */
const arrayDiff = (arr1, arr2) => {
  let newSet = new Set(arr1);

  for (let item of arr2) {
    newSet.delete(item);
  }
  return newSet;
};
console.log(arrayDiff([1, 2, 2, 2, 3], [2]));

/* 2 */
const arrayDiff2 = (arr1, arr2) => {
  let result = arr1.filter(item => !arr2.includes(item));

  return result;
};

console.log(arrayDiff2([1, 2, 2, 2, 3], [2]));

/* Task 2.2 */
/* 1 */
const squareEveryDigit = num => {
  let numArray = num
    .toString()
    .split('')
    .map(el => el * el)
    .join('');

  return numArray;
};

console.log(squareEveryDigit(101));

/* 2 */
const squareEveryDigit2 = num => {
  let numArr = num.toString().split('');
  let length = numArr.length;

  let result = '';

  for (let i = 0; i < length; i++) {
    result += numArr[i] * numArr[i];
  }
  return result;
};

console.log(squareEveryDigit2(101));

/* Task 2.3 */
/* 1 */
const alphabetPosition = str => {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';

  let strArr = str.toLocaleLowerCase().split('');
  let alphabetArr = alphabet.split('');

  let cleanStr = strArr.filter(item => item.match(/[a-z]/));

  let result = cleanStr.map(item => alphabetArr.indexOf(item) + 1);

  return result;
};

console.log(alphabetPosition("The sunset sets at twelve o' clock."));
