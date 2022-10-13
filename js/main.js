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

getRangeIntegerNumber (1, 10);

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

getRangePointNumber(1.2, 30.9, 3);

// Создание случайного обьекта
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 10;
const priceMin = 10000;
const priceMax = 100000;
const OFFERS_COUNT = 10;

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const checkTime = ['12:00', '13:00', '14:00'];

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const titles = ['Гельвеция', 'Лахта Плаза', 'Лахта Плаза', 'Пушка Инн'];

const descriptions = ['В числе удобств номеров письменный стол и общая ванная комната.', 'Каждое утро в отеле MFC Erfurter Seen сервируют континентальный завтрак и завтрак «шведский стол».', 'Номера курортного отеля оснащены кондиционером, сейфом и телевизором с плоским экраном и кабельными каналами.', 'Это любимая часть города Миртл-Бич среди наших гостей согласно независимым отзывам.'];


const getRandomArrayElement = (array) =>
  array[getRangeIntegerNumber(0, array.length - 1)];

const getAvatarNumber = () => {
  const avatatNumber = getRangeIntegerNumber(MIN_AVATAR_COUNT ,MAX_AVATAR_COUNT).padStart(2, '0');
  return avatatNumber;
};

const createAuthorData = () => ({
  avatar: `img/avatars/user${getAvatarNumber()}.png`
});

const createOfferData = () => ({
  title: getRandomArrayElement(titles),
  address: `${getRangePointNumber(MIN_LAT, MAX_LAT, 5)}, ${getRangePointNumber(MIN_LNG, MAX_LNG, 5)}`,
  price: getRangeIntegerNumber(priceMin, priceMax),
  type: getRandomArrayElement(types),
  rooms: getRangeIntegerNumber(1, 3),
  guests: getRangeIntegerNumber(1, 4),
  checkin: getRandomArrayElement(checkTime),
  checkout: getRandomArrayElement(checkTime),
  features: getRandomArrayElement(features),
  description: getRandomArrayElement(descriptions),
  photos: getRandomArrayElement(photos),
});

const createLocationData = () => ({
  lat: getRangePointNumber(MIN_LAT, MAX_LAT, 5),
  lng: getRangePointNumber(MIN_LNG, MAX_LNG, 5)
});

const createOffer = () => ({
  author: createAuthorData(),
  offer: createOfferData(),
  location: createLocationData(),
});

const createOffres = Array.from({length: OFFERS_COUNT}, createOffer);

createOffres();
