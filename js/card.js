const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typesHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const renderFeatures = (cardElement, features) => {
  const featuresList = cardElement.querySelector('.popup__features');
  const featuresItems = cardElement.querySelectorAll('.popup__feature');
  if (featuresItems && featuresItems.length) {
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
  photoElement.width = 45;
  photoElement.height = 40;
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
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.price').textContent = offer.price;
  cardElement.querySelector('.popup__type').textContent = typesHousing[offer.type];
  cardElement.querySelector('.popup__text--capacity')
    .textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time')
    .textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  renderFeatures(cardElement, offer.features);
  renderDescriptions(cardElement, offer.description);
  renderPhoto(cardElement, offer.photos, offer.title);

  return cardElement;
};

export {createCardOffer};
