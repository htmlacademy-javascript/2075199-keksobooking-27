import {roomsForGuests, guestsForRooms, housingCoast} from './utils.js';

const addFormField = document.querySelector('.ad-form');
const roomsNumbersElement = addFormField.querySelector('#room_number');
const capacityElement = addFormField.querySelector('#capacity');
const typesHousingElement = addFormField.querySelector('#type');
const priceOfHousesElement = addFormField.querySelector('#price');
const timeInElement = addFormField.querySelector('#timein');
const timeOutElement = addFormField.querySelector('#timeout');
const addressElement = addFormField.querySelector('#address');
const sliderElement = addFormField.querySelector('#price-slider');
const submitButton = addFormField.querySelector('.ad-form__submit');

const sliderConfig = {
  MIN: 0,
  MAX: 100000,
  START: priceOfHousesElement.placeholder,
  STEP: 1
};

const turnAddFormOff = () => {
  addFormField.classList.add('ad-form--disabled');
  const addFormElements = addFormField.querySelectorAll('fieldset');
  addFormElements.forEach((addFormElement) => {
    addFormElement.disabled = true;
  });
};

const turnAddFormOn = () => {
  addFormField.classList.remove('ad-form--disabled');
  const addFormElements = addFormField.querySelectorAll('fieldset');
  addFormElements.forEach((addFormElement) => {
    addFormElement.disabled = false;
  });
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  addFormField.reset();
  sliderElement.noUiSlider.set(priceOfHousesElement.value);
};

const pristine = new Pristine(
  addFormField,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element'
  },
  true
);

noUiSlider.create(sliderElement, {
  range: {
    min: sliderConfig.MIN,
    max: sliderConfig.MAX
  },
  start: sliderConfig.START,
  step: sliderConfig.STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    }
  }
});

const validateCopacity = () =>
  roomsForGuests[roomsNumbersElement.value].includes(capacityElement.value);

const validatorTypesHousing = () => {
  if (housingCoast[typesHousingElement.value] <= +priceOfHousesElement.value) {
    return true;
  } else {
    return false;
  }
};

const setAddress = (coordinate) => {
  addressElement.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
};

const getCapacityErrorMessage = () =>
  `Указанное количество комнат вмещает ${roomsForGuests[roomsNumbersElement.value].join(' или ')} гостей.`;


const getRoomsErrorMessage = () =>
  `Для указанного количества гостей требуется ${guestsForRooms[capacityElement.value].join(' или ')} комнат.`;

const getCoastErrorMessage = () =>
  `Для указанного типа жилья стоимость должна быть не меньше ${housingCoast[typesHousingElement.value]}`;

const onCapacityRoomsChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomsNumbersElement);
};

const onTypeHousingChange = () => {
  pristine.validate(priceOfHousesElement);
};

const onSliderChange = () => {
  priceOfHousesElement.value = sliderElement.noUiSlider.get();
};

const onTypeHousingPlaceholderChange = () => {
  priceOfHousesElement.placeholder = housingCoast[typesHousingElement.value];
  onTypeHousingChange();
};

const onTimeInChange = () => {
  timeOutElement.value = timeInElement.value;
};

const onTimeOutChange = () => {
  timeInElement.value = timeOutElement.value;
};

pristine.addValidator (
  capacityElement,
  validateCopacity,
  getCapacityErrorMessage
);

pristine.addValidator (
  roomsNumbersElement,
  validateCopacity,
  getRoomsErrorMessage
);

pristine.addValidator (
  priceOfHousesElement,
  validatorTypesHousing,
  getCoastErrorMessage
);

const setOnFormSubmit = (cb) => {
  addFormField.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate;

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

capacityElement.addEventListener('change', onCapacityRoomsChange);
roomsNumbersElement.addEventListener('change', onCapacityRoomsChange);
typesHousingElement.addEventListener('change', onTypeHousingPlaceholderChange);
timeInElement.addEventListener('change', onTimeInChange);
timeOutElement.addEventListener('change', onTimeOutChange);
sliderElement.noUiSlider.on('update', onSliderChange);

export {
  turnAddFormOff,
  turnAddFormOn,
  setAddress,
  resetForm,
  setOnFormSubmit
};
