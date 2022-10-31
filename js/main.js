import {createOffers} from '../js/data.js';
import {createCardOffer} from '../js/card.js';
import './form.js';
import {turnFiltersOff, turnFiltersOn, turnAddFormOff, turnAddFormOn} from './form.js';


createOffers();
document.querySelector('#map-canvas').append(createCardOffer(createOffers()[1]));
turnFiltersOff();
turnFiltersOn();
turnAddFormOff();
turnAddFormOn();
