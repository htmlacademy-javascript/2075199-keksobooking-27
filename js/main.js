import {createOffers} from '../js/data.js';
import {turnAddFormOff, turnAddFormOn, setAddress} from './form.js';
import {turnFiltersOff, turnFiltersOn} from './filter.js';
import {initMap, setAdPins, setOnMainPinMove, setOnMapLoad} from './map.js';


const START_COORDINATE = {
  lat: 35.66023,
  lng: 139.73007,
};

const getOffers = createOffers();

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  setAddress(START_COORDINATE);
  turnAddFormOn();
  setAdPins(getOffers);
  turnFiltersOn();
});
turnFiltersOff();
turnAddFormOff();

initMap(START_COORDINATE);


