const OFFERS_COUNT = 10;
const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filtersField = document.querySelector('.map__filters');
const housingTypeElement = filtersField.querySelector('#housing-type');
const housingPriceElement = filtersField.querySelector('#housing-price');
const housingRoomsElement = filtersField.querySelector('#housing-rooms');
const housingGuestsElement = filtersField.querySelector('#housing-guests');
const featuresCheckboxes = filtersField.querySelectorAll('.map__checkbox');

const turnFiltersOff = () => {
  filtersField.classList.add('ad-form--disabled');
  for (const filterElement of filtersField.children) {
    filterElement.disabled = true;
  }
};

const turnFiltersOn = () => {
  filtersField.classList.remove('ad-form--disabled');
  for (const filterElement of filtersField.children) {
    filterElement.disabled = false;
  }
};

const filterByType = (offer, type) => type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return offer.offer.price < Price.HIGH && offer.offer.price > Price.MIDDLE;
    case 'high':
      return offer.offer.price >= Price.MIDDLE;
  }
};

const filterByRooms = (offer, rooms) => rooms === 'any' || offer.offer.rooms === +rooms;

const filterByGuests = (offer, guests) => guests === 'any' || offer.offer.guests === +guests;

const filterByFeatures = (offer, features) => {
  if (!features.length) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffers = (offers) => {
  const selectedType = housingTypeElement.value;
  const selectedPrice = housingPriceElement.value;
  const selectedRooms = housingRoomsElement.value;
  const selectedGuests = housingGuestsElement.value;

  const selectedFeatures = [];
  const filteredOffers = [];
  featuresCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });
  for (const offer of offers) {
    if (filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
    if (
      filterByType(offer, selectedType) &&
      filterByPrice(offer, selectedPrice) &&
      filterByRooms(offer, selectedRooms) &&
      filterByGuests(offer, selectedGuests) &&
      filterByFeatures(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
    return filteredOffers;
  }
};

const setOnFilterChange = (cb) => {
  filtersField.addEventListener('change', () => {
    cb();
  });
};

export {turnFiltersOff, turnFiltersOn, getFilteredOffers, setOnFilterChange};
