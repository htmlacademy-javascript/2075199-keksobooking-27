import {createOffers} from '../js/data.js';
import {createCardOffer} from '../js/card.js';

createOffers();
document.querySelector('#map-canvas').append(createCardOffer(createOffers()[1]));
