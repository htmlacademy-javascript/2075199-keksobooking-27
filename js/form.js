import {ROOMS_FOR_GUESTS, GUEST_FOR_ROOMS, HOUSES_COST, FILE_TYPES, AVATAT_CHANGES, getRandomArrayElement} from './utils.js';

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
const resetButton = addFormField.querySelector('.ad-form__reset');
const avatarField = addFormField.querySelector('#avatar');
const previewAvatar = addFormField.querySelector('.ad-form-header__preview img');
const photoField = addFormField.querySelector('#images');
const containerPhotos = addFormField.querySelector('.ad-form__photo');

const sliderConfig = {
  MIN: 0,
  MAX: 100000,
  START: priceOfHousesElement.placeholder,
  STEP: 1
};

const checkFileTypes = (fileName) => FILE_TYPES.some((it) => fileName.toLowerCase().endsWith(it));

avatarField.addEventListener('change', () => {
  const file = avatarField.files[0];
  if (checkFileTypes(file.name)) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

photoField.addEventListener('change', () => {
  const files = photoField.files;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (checkFileTypes(file.name)) {
      const image = document.createElement('img');
      image.src = URL.createObjectURL(file);
      image.classList.add('ad-form__photo');
      fragment.appendChild(image);
    }
  }
  containerPhotos.appendChild(fragment);
});

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
  ROOMS_FOR_GUESTS[roomsNumbersElement.value].includes(capacityElement.value);

const validatorTypesHousing = () => {
  if (HOUSES_COST[typesHousingElement.value] <= +priceOfHousesElement.value) {
    return true;
  } else {
    return false;
  }
};

const setAddress = (coordinate) => {
  addressElement.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
};

const getCapacityErrorMessage = () =>
  `Указанное количество комнат вмещает ${ROOMS_FOR_GUESTS[roomsNumbersElement.value].join(' или ')} гостей.`;


const getRoomsErrorMessage = () =>
  `Для указанного количества гостей требуется ${GUEST_FOR_ROOMS[capacityElement.value].join(' или ')} комнат.`;

const getCoastErrorMessage = () =>
  `Для указанного типа жилья стоимость должна быть не меньше ${HOUSES_COST[typesHousingElement.value]}`;

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

const onPriceChange = () => {
  sliderElement.noUiSlider.set(priceOfHousesElement.value);
};

const onTypeHousingPlaceholderChange = () => {
  priceOfHousesElement.placeholder = HOUSES_COST[typesHousingElement.value];
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

const setResetButtonClick = (reset) => {
  resetButton.addEventListener('click', reset);
};

const resetForm = () => {
  addFormField.reset();
  sliderElement.noUiSlider.set(priceOfHousesElement.placeholder);
  previewAvatar.src = getRandomArrayElement(AVATAT_CHANGES);
  containerPhotos.innerHTML = '';
};

capacityElement.addEventListener('change', onCapacityRoomsChange);
roomsNumbersElement.addEventListener('change', onCapacityRoomsChange);
typesHousingElement.addEventListener('change', onTypeHousingPlaceholderChange);
timeInElement.addEventListener('change', onTimeInChange);
timeOutElement.addEventListener('change', onTimeOutChange);
sliderElement.noUiSlider.on('update', onSliderChange);
priceOfHousesElement.addEventListener('change', onPriceChange);

export {
  turnAddFormOff,
  turnAddFormOn,
  setAddress,
  resetForm,
  setOnFormSubmit,
  setResetButtonClick
};
