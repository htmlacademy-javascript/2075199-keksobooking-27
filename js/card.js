import {CARD_PHOTO_WIDTH, CARD_PHOTO_HEIGHT, typesHouses} from './utils.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderFeatures = (cardElement, features) => {
  const featuresList = cardElement.querySelector('.popup__features');
  const featuresItems = cardElement.querySelectorAll('.popup__feature');
  if (features && features.length) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    featuresItems.forEach((featuresItem) => {
      const modifier = featuresItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featuresItem.remove();
      }
    });
  } else {
    featuresList.remove();
  }
};

const renderDescriptions = (cardElement, description) => {
  const descriptionElement = cardElement.querySelector('.popup__description');
  if (description) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }
};

const createPhoto = (photo, title) => {
  const photoElement = document.createElement('img');
  photoElement.classList.add('popup__photo');
  photoElement.src = photo;
  photoElement.alt = title;
  photoElement.width = CARD_PHOTO_WIDTH;
  photoElement.height = CARD_PHOTO_HEIGHT;
  return photoElement;
};

const renderPhoto = (cardElement, photos, title) => {
  const photosList = cardElement.querySelector('.popup__photos');
  if (photos) {
    photosList.innerHTML = '';
    photos.forEach((photo) => {
      const photoElement = createPhoto(photo, title);
      photosList.append(photoElement);
    });
  } else {
    photosList.remove();
  }
};

const createCardOffer = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  if (author.avatar) {
    cardElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').remove();
  }
  if (offer.title) {
    cardElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    cardElement.querySelector('.popup__title').remove();
  }
  if (offer.address) {
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').remove();
  }
  if (offer.price) {
    cardElement.querySelector('.price').textContent = offer.price;
  } else {
    cardElement.querySelector('.price').remove();
  }
  if (offer.type) {
    cardElement.querySelector('.popup__type').textContent = typesHouses[offer.type];
  } else {
    cardElement.querySelector('.popup__type').remove();
  }
  if (offer.rooms && offer.guests) {
    cardElement.querySelector('.popup__text--capacity')
      .textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }
  if (offer.checkin && offer.checkout) {
    cardElement.querySelector('.popup__text--time')
      .textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }

  renderFeatures(cardElement, offer.features);
  renderDescriptions(cardElement, offer.description);
  renderPhoto(cardElement, offer.photos, offer.title);

  return cardElement;
};

export {createCardOffer};
