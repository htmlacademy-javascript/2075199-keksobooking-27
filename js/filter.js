const filtersField = document.querySelector('.map__filters');

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

export {turnFiltersOff, turnFiltersOn};
