const filters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

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
  adForm.classList.add('ad-form--disabled');
  const addFormElements = adForm.querySelectorAll('fieldset');
  addFormElements.forEach((addFormElement) => {
    addFormElement.disabled = true;
  });
};

const turnAddFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  const addFormElements = adForm.querySelectorAll('fieldset');
  addFormElements.forEach((addFormElement) => {
    addFormElement.disabled = false;
  });
};

export {turnFiltersOff, turnFiltersOn, turnAddFormOff, turnAddFormOn};
