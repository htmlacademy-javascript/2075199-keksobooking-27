const API_SEND = 'https://27.javascript.pages.academy/keksobooking';

const API_GET = 'https://27.javascript.pages.academy/keksobooking/data';

const CARD_PHOTO_WIDTH = 45;

const CARD_PHOTO_HEIGHT = 40;

const HOUSE_PRICE = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const TYPES_HOUSES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const ROOMS_FOR_GUESTS = {
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

// Вспрывающее окно об ощибке отправки

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.right = '0';
  alert.style.top = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

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

// Оптимизация

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  API_SEND,
  API_GET,
  getRangeIntegerNumber,
  getRangePointNumber,
  getRandomArrayElement,
  typesHousing,
  roomsForGuests,
  guestsForRooms,
  housingCoast,
  showAlert,
  debounce
};
