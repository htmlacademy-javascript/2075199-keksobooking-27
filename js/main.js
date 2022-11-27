import {turnAddFormOff, turnAddFormOn, setAddress, resetForm, setOnFormSubmit, setResetButtonClick} from './form.js';
import {turnFiltersOff, turnFiltersOn, setOnFilterChange, resetFilter, getFilteredOffers} from './filter.js';
import {initMap, setAdPins, setOnMainPinMove, setOnMapLoad, resetMainMarker} from './map.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {RERENDER_DELAY, startCoordinate, showAlert, debounce} from './utils.js';
import {getData, sendData} from './api.js';

const resetCoorditate = () => {
  setAddress(startCoordinate);
};

const onGetDataSuccess = (offers) => {
  turnFiltersOn();
  setAdPins(offers);
  setOnFilterChange(debounce(
    () => setAdPins(getFilteredOffers(offers))
  ), RERENDER_DELAY);
};

const reset = () => {
  resetCoorditate();
  resetForm();
  resetFilter();
  resetMainMarker(startCoordinate);
  getData(onGetDataSuccess, showAlert);
};

setResetButtonClick(reset);

const onSendDataSuccess = ( ) => {
  resetForm();
  resetCoorditate();
  showSuccessMessage();
};

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  turnAddFormOn();
  resetCoorditate();
});

setOnFormSubmit((data) => {
  sendData(onSendDataSuccess, showErrorMessage, data);
  // reset();
});

turnFiltersOff();
turnAddFormOff();
initMap(startCoordinate);

getData(onGetDataSuccess, showAlert);
