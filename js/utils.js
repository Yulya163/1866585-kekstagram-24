const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.bottom = 0;
  alertContainer.style.right = 0;
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.width = '30%';
  alertContainer.style.height = '30%';
  alertContainer.style.borderRadius = '15%';
  alertContainer.style.display = 'flex';
  alertContainer.style.justifyContent = 'center';
  alertContainer.style.alignItems = 'center';
  alertContainer.style.padding = '20px 50px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.lineHeight = 1.5;
  alertContainer.style.backgroundColor = '#e8b91cf2';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function showAndCloseStatusMessage(status) {
  const messageTemplate = document.querySelector(`#${status}`)
    .content
    .querySelector(`.${status}`);
  const  message =  messageTemplate.cloneNode(true);
  const messageCloseBtn = message.querySelector('button');
  document.body.appendChild(message);

  const onShowMessageBtnEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  document.addEventListener('keydown', onShowMessageBtnEscKeydown);

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onShowMessageBtnEscKeydown);
  }

  message.addEventListener('click', (evt) => {
    if(evt.target === message || evt.target === messageCloseBtn) {
      closeMessage();
    }
  });
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, showAlert, showAndCloseStatusMessage, debounce};
