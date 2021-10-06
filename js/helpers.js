const getRandomInt = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const checkMaxStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;
checkMaxStringLength('Проверка работы', 10);

export {getRandomInt, getRandomArrayElement};
