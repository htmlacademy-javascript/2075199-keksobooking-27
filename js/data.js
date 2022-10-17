import {getRangeIntegerNumber, getRangePointNumber, getRandomArrayElement} from './utils.js';

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

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const CHECK_TIME = ['12:00', '13:00', '14:00'];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const TITILES = ['Гельвеция', 'Лахта Плаза', 'Лахта Плаза', 'Пушка Инн'];

const DESCRIPTIONS = ['В числе удобств номеров письменный стол и общая ванная комната.', 'Каждое утро в отеле MFC Erfurter Seen сервируют континентальный завтрак и завтрак «шведский стол».', 'Номера курортного отеля оснащены кондиционером, сейфом и телевизором с плоским экраном и кабельными каналами.', 'Это любимая часть города Миртл-Бич среди наших гостей согласно независимым отзывам.'];

const getAvatarNumber = () =>
  getRangeIntegerNumber(MIN_AVATAR_COUNT ,MAX_AVATAR_COUNT).toString().padStart(2, '0');

const createAuthorData = () => ({
  avatar: `img/avatars/user${getAvatarNumber()}.png`
});

const createOfferData = () => ({
  title: getRandomArrayElement(TITILES),
  address: `${getRangePointNumber(MIN_LAT, MAX_LAT, 5)}, ${getRangePointNumber(MIN_LNG, MAX_LNG, 5)}`,
  price: getRangeIntegerNumber(priceMin, priceMax),
  type: getRandomArrayElement(TYPES),
  rooms: getRangeIntegerNumber(1, 3),
  guests: getRangeIntegerNumber(1, 4),
  checkin: getRandomArrayElement(CHECK_TIME),
  checkout: getRandomArrayElement(CHECK_TIME),
  features: FEATURES.slice(0, getRangeIntegerNumber(0, FEATURES.length)),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: Array.from({length: getRangeIntegerNumber(0, 10)}, () => getRandomArrayElement(PHOTOS))
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

const createOffers = () =>
  Array.from({length: OFFERS_COUNT}, createOffer);

export {createOffers};

