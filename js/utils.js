// Целое случайное число в заданном диапазоне

const getRangeIntegerNumber = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  } if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

// Случайное число с плавающей точкой в заданном диапазоне

const getRangePointNumber = (min, max, digitalAfterPoint = 1) => {
  if (min < 0 || max < 0 || min === max || digitalAfterPoint < 0) {
    return NaN;
  } if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  const randomNumber = Math.random() * (max - min) + min;

  return +randomNumber.toFixed(digitalAfterPoint);
};

// Получение случайного элемента массива

const getRandomArrayElement = (array) =>
  array[getRangeIntegerNumber(0, array.length - 1)];

const typesHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

export{getRangeIntegerNumber, getRangePointNumber, getRandomArrayElement, typesHousing};
