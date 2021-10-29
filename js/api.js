const getData = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(response.ok) {
        return response;
      }
      throw new Error('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу');
    })
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onPositiveResult, onFailResult, onFinallyResult, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onPositiveResult('success');
      } else {
        onFailResult('error');
      }
    })
    .catch(() => {
      onPositiveResult('error');
    })
    .finally(() => {
      onFinallyResult();
    });
};

export {getData, sendData};
