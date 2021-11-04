import {isEscapeKey, showAndCloseStatusMessage} from './utils.js';
import {hashtagValidate, commentValidate} from './validate.js';
import {SCALE_NUMBER_MIN, SCALE_NUMBER_MAX, SCALE_NUMBER_STEP} from './constants.js';
import {onEffectChange} from '../nouislider/nouislider-effect-level.js';
import {sendData} from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

const uploadFileInput = document.querySelector('#upload-file');
const scaleControlInput = document.querySelector('.scale__control--value');
const effectLevelInput = document.querySelector('.effect-level__value');

const hashtagsText = imgUploadOverlay.querySelector('.text__hashtags');
const commentText = imgUploadOverlay.querySelector('.text__description');

const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');

const resetForm = () => {
  uploadFileInput.value = '';
  scaleControlInput.value = '100%';
  imgUploadPreview.style.transform = 'scale(1)';
  hashtagsText.value = '';
  commentText.value = '';
};

const onChangeBtnClick = (evt) => {
  let scaleNumber = scaleControlInput.value.slice(0, -1);
  scaleNumber = Number(scaleNumber);
  if (evt.target === scaleSmallerBtn && scaleNumber !== SCALE_NUMBER_MIN) {
    scaleNumber -= SCALE_NUMBER_STEP;
  } else if (evt.target === scaleBiggerBtn && scaleNumber !== SCALE_NUMBER_MAX) {
    scaleNumber += SCALE_NUMBER_STEP;
  }
  scaleControlInput.value = `${scaleNumber}%`;
  imgUploadPreview.style.transform = `scale(${ (scaleNumber / 100) })`;
};

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgUploadOverlayEscKeydown);
  scaleSmallerBtn.removeEventListener('click', onChangeBtnClick);
  scaleBiggerBtn.removeEventListener('click', onChangeBtnClick);
  resetForm();
};

function onImgUploadOverlayEscKeydown(evt) {
  if (hashtagsText !== document.activeElement && commentText !== document.activeElement) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeImgUploadOverlay();
    }
  }
}

const changeScale = () => {
  scaleSmallerBtn.addEventListener('click', onChangeBtnClick);
  scaleBiggerBtn.addEventListener('click', onChangeBtnClick);
};

const openImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  changeScale();
  hashtagValidate();
  commentValidate();
  onEffectChange();
  document.addEventListener('keydown', onImgUploadOverlayEscKeydown);
};

uploadFileInput.addEventListener('change', () => {
  openImgUploadOverlay();
});

uploadCancel.addEventListener('click', () => {
  closeImgUploadOverlay();
});

const setImgUploadFormSubmit = (onResponse) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      'https://24.javascript.pages.academy/kekstagram',
      () => {
        showAndCloseStatusMessage('success');
        onResponse();
      },
      () => {
        showAndCloseStatusMessage('error');
        onResponse();
      },
      new FormData(evt.target),
    );
  });
};

export {hashtagsText, commentText, uploadFileInput, imgUploadPreview, effectLevelInput, closeImgUploadOverlay, setImgUploadFormSubmit};
