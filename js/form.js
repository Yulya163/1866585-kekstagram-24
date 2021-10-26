import {isEscapeKey} from './utils.js';
import {hashtagValidate, commentValidate} from './validate.js';
import {onEffectChange} from '../nouislider/nouislider-effect-level.js';

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
  changeScale();
  hashtagValidate();
  commentValidate();
  onEffectChange();
  document.addEventListener('keydown', onImgUploadOverlayEscKeydown);
}

const onScaleSmallerBtnClick = () => {
  let scaleNumber = scaleControlInput.value.slice(0, -1);
  if (scaleNumber !== '25') {
    scaleNumber -= 25;
  }
  scaleControlInput.value = `${scaleNumber}%`;
  imgUploadPreview.style.transform = `scale(${ (scaleNumber / 100) })`;
};

const onScaleBiggerBtnClick = () => {
  let scaleNumber = scaleControlInput.value.slice(0, -1);
  if (scaleNumber !== '100') {
    scaleNumber = Number(scaleNumber);
    scaleNumber += 25;
  }
  scaleControlInput.value = `${scaleNumber}%`;
  imgUploadPreview.style.transform = `scale(${ (scaleNumber / 100) })`;
};

function changeScale() {
  scaleSmallerBtn.addEventListener('click', onScaleSmallerBtnClick);
  scaleBiggerBtn.addEventListener('click', onScaleBiggerBtnClick);
}

function closeImgUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgUploadOverlayEscKeydown);
  uploadFileInput.value = '';
  scaleControlInput.value = '100%';
  imgUploadPreview.style.transform = 'scale(1)';
  hashtagsText.value = '';
  commentText.value = '';
  scaleSmallerBtn.removeEventListener('click', onScaleSmallerBtnClick);
  scaleBiggerBtn.removeEventListener('click', onScaleBiggerBtnClick);
}

uploadFileInput.addEventListener('change', () => {
  openImgUploadOverlay();
});

uploadCancel.addEventListener('click', () => {
  closeImgUploadOverlay();
});

export {hashtagsText, commentText, imgUploadPreview, effectLevelInput};
