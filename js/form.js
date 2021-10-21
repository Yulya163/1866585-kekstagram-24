import {isEscapeKey} from './utils.js';
import {hashtagValidate,commentValidate} from './validate.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uloadCancel = imgUploadOverlay.querySelector('#upload-cancel');

const uploadFileInput = document.querySelector('#upload-file');
const scaleControlInput = document.querySelector('.scale__control--value');
const effectLevelInput = document.querySelector('.effect-level__value');

const hashtagsText = imgUploadOverlay.querySelector('.text__hashtags');
const commentText = imgUploadOverlay.querySelector('.text__description');

const onImgUploadOverlayEscKeydown = (evt) => {
  if (hashtagsText !== document.activeElement && commentText !== document.activeElement) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeImgUploadOverlay();
    }
  }
};

function openImgUploadOverlay() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  hashtagValidate();
  commentValidate();
  document.addEventListener('keydown', onImgUploadOverlayEscKeydown);
}

function closeImgUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgUploadOverlayEscKeydown);
  uploadFileInput.value = '';
  scaleControlInput.value = '100%';
  effectLevelInput.value = '';
  hashtagsText.value = '';
  commentText.value = '';
}

uploadFileInput.addEventListener('change', () => {
  openImgUploadOverlay();
});

uloadCancel.addEventListener('click', () => {
  closeImgUploadOverlay();
});

export {hashtagsText, commentText};
