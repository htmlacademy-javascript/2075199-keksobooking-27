import {API_SEND, API_GET} from './utils.js';

const getData = (onSuccess) => {
  fetch(API_GET)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(API_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму!');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму!');
    });
};

export { getData, sendData };
