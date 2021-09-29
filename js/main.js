const getRandomInt = function(from, to) {
  if (from >=0 && to >= 0) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  return 'Введите положительный диапазон';
};
getRandomInt();

const checkMaxStringLength = function(checkedString, maxLength) {
  if (checkedString.length <= maxLength) {
    return true;
  }
  return false;
};
checkMaxStringLength();
