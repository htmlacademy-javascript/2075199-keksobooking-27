import {API_SEND, API_GET} from './utils.js';

const getData = (onSuccess, onFail) => {
  fetch(API_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onFail(`Ошибка загрузки данных ${error}`);
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
