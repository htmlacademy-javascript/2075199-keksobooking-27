import {turnAddFormOff, turnAddFormOn, setAddress, resetForm, setOnFormSubmit, setResetButtonClick} from './form.js';
import {turnFiltersOff, turnFiltersOn, getFilteredOffers, setOnFilterChange, resetFilter} from './filter.js';
import {initMap, setAdPins, setOnMainPinMove, setOnMapLoad, resetMainMarker} from './map.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {showAlert, debounce} from './utils.js';
import {getData, sendData} from './api.js';

const START_COORDINATE = {
  lat: 35.66023,
  lng: 139.73007,
};

const RERENDER_DELAY = 500;

const resetCoorditate = () => {
  setAddress(START_COORDINATE);
};

const reset = () => {
  resetForm();
  resetFilter();
  resetMainMarker(START_COORDINATE);
};

setResetButtonClick(reset);

const onGetDataSuccess = (offers) => {
  turnFiltersOn();
  setAdPins(offers);
  setOnFilterChange(debounce(
    () => setAdPins(offers.filter(getFilteredOffers))
  ), RERENDER_DELAY);
};

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

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

turnFiltersOff();
turnAddFormOff();
initMap(START_COORDINATE);

getData(onGetDataSuccess, showAlert);
