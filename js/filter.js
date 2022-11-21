const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const setAnyValue = (id) => {
  const field = document.querySelector(`#${id}`);
  field.value = 'any';
};

const resetFilter = () => {
  setAnyValue('housing-type');
  setAnyValue('housing-price');
  setAnyValue('housing-rooms');
  setAnyValue('housing-guests');
  const features = document.querySelectorAll('.map__features input');
  features.forEach((element) => {
    element.checked = false;
  });
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
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return offer.offer.price < Price.HIGH && offer.offer.price > Price.MIDDLE;
    case 'high':
      return offer.offer.price >= Price.MIDDLE;
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
  filterByType(offer) &&
  filterByPrice(offer) &&
  filterByRooms(offer) &&
  filterByGuests(offer) &&
  filterByFeatures(offer);

const setOnFilterChange = (cb) => {
  housingTypeElement.addEventListener('change', () => {
    cb();
  });
  housingPriceElement.addEventListener('change', () => {
    cb();
  });
  housingRoomsElement.addEventListener('change', () => {
    cb();
  });
  housingGuestsElement.addEventListener('change', () => {
    cb();
  });
  featuresCheckboxes.forEach((feature) => feature.addEventListener('click', () => {
    cb();
  }));
};

export {turnFiltersOff, turnFiltersOn, getFilteredOffers, setOnFilterChange, resetFilter};
