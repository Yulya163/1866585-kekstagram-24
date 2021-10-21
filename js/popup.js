import {fullSizePictureRender, commentsWrapClear, bigPicture} from './full-size-picture-render.js';
import {picturesWrap} from './thumbnails-render.js';
import {isEscapeKey} from './utils.js';

const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(evtEl) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullSizePictureRender(evtEl);
  document.addEventListener('keydown', onBigPictureEscKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsWrapClear();
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

picturesWrap.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    openBigPicture(evt);
  }
});

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});
