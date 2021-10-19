import {isEscapeKey} from './helpers.js';

const MAX_HASHTAG_QUANTITY = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uloadCancel = imgUploadOverlay.querySelector('#upload-cancel');

const uploadFileInput = document.querySelector('#upload-file');
const scaleControlInput = document.querySelector('.scale__control--value');
const effectLevelInput = document.querySelector('.effect-level__value');

const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');
const commentText = imgUploadOverlay.querySelector('.text__description');

const onImgUploadOverlayEscKeydown = (evt) => {
  if (hashtagsInput !== document.activeElement && commentText !== document.activeElement) {
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

  hashtagsInput.value = '';
}

uploadFileInput.addEventListener('change', () => {
  openImgUploadOverlay();
});

uloadCancel.addEventListener('click', () => {
  closeImgUploadOverlay();
});

function hashtagValidate() {
  hashtagsInput.addEventListener('change', () => {
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    hashtagsInput.value = hashtagsInput.value.replaceAll('  ', ' ');
    if (hashtagsInput.value[hashtagsInput.value.length - 1] === ' ') {
      hashtagsInput.value = hashtagsInput.value.slice(0,-1);
    }
    const hashtagsArr = hashtagsInput.value.split(' ');
    const invalidHashtags = [];
    hashtagsArr.forEach((hashtag) => {
      if (!hashtag.match(re)) {
        if (hashtag === '') {
          invalidHashtags.push(hashtag);
        } else {
          hashtagsArr.pop();
        }
      }
      if (!hashtag.match(re)) {
        invalidHashtags.push(hashtag);
      }
    });
    const duplicates = hashtagsArr.filter((hashtag, index, arr) => arr.indexOf(hashtag) !== index);

    if (duplicates && duplicates.length !== 0) {
      hashtagsInput.setCustomValidity(`Пожалуйста, удалите повторяющиеся хэш-теги: ${ duplicates.join(', ') }`);
    } else if (hashtagsArr.length > MAX_HASHTAG_QUANTITY) {
      hashtagsInput.setCustomValidity(`Нельзя указывать больше ${ MAX_HASHTAG_QUANTITY } хэш-тегов. Просьба удалить лишние ${ hashtagsArr.length - MAX_HASHTAG_QUANTITY }`);
    } else if (invalidHashtags.length !== 0) {
      hashtagsInput.setCustomValidity(`Некорректно введен хэш-тег: ${ invalidHashtags.join(', ') }`);
    } else {
      hashtagsInput.setCustomValidity('');
    }
    hashtagsInput.reportValidity();
  });
}
function commentValidate() {
  commentText.addEventListener('input', () => {
    const valueLength = commentText.value.length;
    if (valueLength > MAX_COMMENT_LENGTH) {
      commentText.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
    } else {
      commentText.setCustomValidity('');
    }
    commentText.reportValidity();
  });
}

