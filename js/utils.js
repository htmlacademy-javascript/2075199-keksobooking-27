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

//

const typesHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const housingCoast = {
  flat: '1000',
  bungalow: '0',
  house: '5000',
  palace: '10000',
  hotel: '3000'
};

// Валидация количесива гостей и количества комнат

const roomsForGuests = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

const guestsForRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3']
};

export {getRangeIntegerNumber, getRangePointNumber, getRandomArrayElement, typesHousing, roomsForGuests, guestsForRooms, housingCoast};
