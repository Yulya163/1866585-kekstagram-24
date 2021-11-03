import {MAX_HASHTAG_QUANTITY, MAX_COMMENT_LENGTH} from './constants.js';
import {hashtagsText, commentText} from './form.js';

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const onHashtagsTextInput = () => {
  hashtagsText.value = hashtagsText.value.replaceAll('  ', ' ');

  const hashtagsArr = hashtagsText.value.split(' ');
  const invalidHashtagsArr = [];

  if (hashtagsArr[0] === '') {
    hashtagsArr.shift();
  }
  if (hashtagsArr[hashtagsArr.length - 1] === '') {
    hashtagsArr.pop();
  }
  hashtagsArr.forEach((hashtag) => {
    if (!hashtag.match(re)) {
      invalidHashtagsArr.push(hashtag);
    }
  });

  for (let i = 0; i < hashtagsArr.length; i++) {
    hashtagsArr[i] = hashtagsArr[i].toLowerCase();
  }

  const duplicateHashtagsArr = hashtagsArr.filter((hashtag, index, arr) => arr.indexOf(hashtag) !== index);

  if (duplicateHashtagsArr && duplicateHashtagsArr.length !== 0) {
    hashtagsText.setCustomValidity(`Пожалуйста, удалите повторяющиеся хэш-теги: ${ duplicateHashtagsArr.join(', ') }`);
    hashtagsText.style.borderColor = 'red';
  } else if (hashtagsArr.length > MAX_HASHTAG_QUANTITY) {
    hashtagsText.setCustomValidity(`Нельзя указывать больше ${ MAX_HASHTAG_QUANTITY } хэш-тегов. Просьба удалить лишние ${ hashtagsArr.length - MAX_HASHTAG_QUANTITY }`);
    hashtagsText.style.borderColor = 'red';
  } else if (invalidHashtagsArr.length !== 0) {
    hashtagsText.setCustomValidity(`Некорректно введен хэш-тег: ${ invalidHashtagsArr.join(', ') }`);
    hashtagsText.style.borderColor = 'red';
  } else {
    hashtagsText.setCustomValidity('');
    hashtagsText.style.borderColor = '';
  }
  hashtagsText.reportValidity();
};

const onCommentTextInput = () => {
  const valueLength = commentText.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    commentText.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
    commentText.style.borderColor = 'red';
  } else {
    commentText.setCustomValidity('');
    commentText.style.borderColor = '';
  }
  commentText.reportValidity();
};

const hashtagValidate = () => {
  hashtagsText.addEventListener('input', onHashtagsTextInput);
};

const commentValidate = () => {
  commentText.addEventListener('input', onCommentTextInput);
};

export {hashtagValidate,commentValidate};
