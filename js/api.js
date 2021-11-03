const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => {
      if(response.ok) {
        return response;
      }
      throw new Error('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу');
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (url, onPositiveResult, onFailResult, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onPositiveResult();
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      onFailResult(err);
    });
};

export {getData, sendData};
