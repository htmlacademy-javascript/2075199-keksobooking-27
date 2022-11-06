import {roomsForGuests, guestsForRooms, housingCoast} from './utils.js';

const filters = document.querySelector('.map__filters');
const addForm = document.querySelector('.ad-form');
const roomsNumbers = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const typesHousing = addForm.querySelector('#type');
const priceOfHouses = addForm.querySelector('#price');

const turnFiltersOff = () => {
  filters.classList.add('ad-form--disabled');
  for (const filterElement of filters.children) {
    filterElement.disabled = true;
  }
};

const turnFiltersOn = () => {
  filters.classList.remove('ad-form--disabled');
  for (const filterElement of filters.children) {
    filterElement.disabled = false;
  }
};

const turnAddFormOff = () => {
  addForm.classList.add('ad-form--disabled');
  const addFormElements = addForm.querySelectorAll('fieldset');
  addFormElements.forEach((addFormElement) => {
    addFormElement.disabled = true;
  });
};

const turnAddFormOn = () => {
  addForm.classList.remove('ad-form--disabled');
  const addFormElements = addForm.querySelectorAll('fieldset');
  addFormElements.forEach((addFormElement) => {
    addFormElement.disabled = false;
  });
};

const pristine = new Pristine(
  addForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element'
  },
  true
);

const validateCopacity = () =>
  roomsForGuests[roomsNumbers.value].includes(capacity.value);

const validatorTypesHousing = () => {
  if (housingCoast[typesHousing.value] <= +priceOfHouses.value) {
    return true;
  } else {
    return false;
  }
};

const getCapacityErrorMessage = () =>
  `Указанное количество комнат вмещает ${roomsForGuests[roomsNumbers.value].join(' или ')} гостей.`;


const getRoomsErrorMessage = () =>
  `Для указанного количества гостей требуется ${guestsForRooms[capacity.value].join(' или ')} комнат.`;

const getCoastErrorMessage = () =>
  `Для указанного типа жилья стоимость должна быть не меньше ${housingCoast[typesHousing.value]}`;

const onCapacityRoomsChange = () => {
  pristine.validate(capacity);
  pristine.validate(roomsNumbers);
};

const onTypeHousingChange = () => {
  pristine.validate(priceOfHouses);
};

pristine.addValidator (
  capacity,
  validateCopacity,
  getCapacityErrorMessage
);

pristine.addValidator (
  roomsNumbers,
  validateCopacity,
  getRoomsErrorMessage
);

pristine.addValidator (
  priceOfHouses,
  validatorTypesHousing,
  getCoastErrorMessage
);

capacity.addEventListener('change', onCapacityRoomsChange);
roomsNumbers.addEventListener('change', onCapacityRoomsChange);
typesHousing.addEventListener('change', () => {
  priceOfHouses.placeholder = housingCoast[typesHousing.value];
  onTypeHousingChange();
});
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    addForm.submit();
  }
});

export {turnFiltersOff, turnFiltersOn, turnAddFormOff, turnAddFormOn};
