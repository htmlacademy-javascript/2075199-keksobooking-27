import {OFFERS_COUNT} from './utils.js';
import {createCardOffer} from './card.js';

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const initMap = (coordinate) => {
  map.setView(coordinate, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.setLatLng(coordinate);
  mainPinMarker.addTo(map);
};

const createAdPinMarkers = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng
      },
      {
        icon: adPinIcon
      }
    );

    marker.addTo(markerGroup).bindPopup(createCardOffer(offer));
  });
};

const setAdPins = (offers) => {
  markerGroup.clearLayers();
  createAdPinMarkers(offers.slice(0, OFFERS_COUNT));
};

const setOnMainPinMove = (cb) => {
  mainPinMarker.on('move', (evt) => cb(evt.target.getLatLng()));
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const resetMainMarker = (coordinate) => {
  mainPinMarker.setLatLng(coordinate);
  map.setView(coordinate, 10);
};

export {initMap, setAdPins, setOnMainPinMove, setOnMapLoad, resetMainMarker};
