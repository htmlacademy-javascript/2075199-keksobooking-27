import {housePrices} from './utils.js';

const filtersField = document.querySelector('.map__filters');
const housingTypeElement = filtersField.querySelector('#housing-type');
const housingPriceElement = filtersField.querySelector('#housing-price');
const housingRoomsElement = filtersField.querySelector('#housing-rooms');
const housingGuestsElement = filtersField.querySelector('#housing-guests');
const featuresCheckboxes = filtersField.querySelectorAll('.map__checkbox');

const resetFilter = () => {
  filtersField.reset();
};

const turnFiltersOff = () => {
  filtersField.classList.add('ad-form--disabled');
  const filterElements = filtersField.querySelectorAll('.map__filter');
  filterElements.forEach((filterElement) => {
    filterElement.disabled = true;
  });
};

const turnFiltersOn = () => {
  filtersField.classList.remove('ad-form--disabled');
  const filterElements = filtersField.querySelectorAll('.map__filter');
  filterElements.forEach((filterElement) => {
    filterElement.disabled = false;
  });
};

const filterByType = (offer) => {
  if (housingTypeElement.value === 'any') {
    return true;
  }
  return offer.offer.type === housingTypeElement.value;
};

const filterByPrice = (offer) => {
  switch (housingPriceElement.value) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < housePrices.MIDDLE;
    case 'middle':
      return offer.offer.price < housePrices.HIGH && offer.offer.price > housePrices.MIDDLE;
    case 'high':
      return offer.offer.price >= housePrices.MIDDLE;
  }
};

const filterByRooms = (offer) => {
  if (housingRoomsElement.value === 'any') {
    return true;
  }
  return offer.offer.rooms === +housingRoomsElement.value;
};

const filterByGuests = (offer) => {
  if (housingGuestsElement.value === 'any') {
    return true;
  }
  return offer.offer.guests === +housingGuestsElement.value;
};

const filterByFeatures = (offer) => {
  const featuresChecked = [];
  featuresCheckboxes.forEach((feature) => {
    if (feature.checked) {
      featuresChecked.push(feature.value);
    }
  });

  if (featuresChecked.length > 0 && offer.offer.features === undefined) {
    return false;
  }
  return featuresChecked.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffers = (offer) =>
  offer.filter((value) =>
    filterByType(value) &&
    filterByPrice(value) &&
    filterByRooms(value) &&
    filterByGuests(value) &&
    filterByFeatures(value));

const setOnFilterChange = (cb) => {
  filtersField.addEventListener('change', () => {
    cb();
  });
};

export {turnFiltersOff, turnFiltersOn, getFilteredOffers, setOnFilterChange, resetFilter};
