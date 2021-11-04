import {MAX_HASHTAG_QUANTITY, MAX_COMMENT_LENGTH} from './constants.js';
import {hashtagsText, commentText} from './form.js';

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const onHashtagsTextInput = () => {
  hashtagsText.value = hashtagsText.value.replaceAll('  ', ' ');

  const hashtags = hashtagsText.value.split(' ');
  const invalidHashtags = [];

  if (hashtags[0] === '') {
    hashtags.shift();
  }
  if (hashtags[hashtags.length - 1] === '') {
    hashtags.pop();
  }
  hashtags.forEach((hashtag) => {
    if (!hashtag.match(re)) {
      invalidHashtags.push(hashtag);
    }
  });

  for (let i = 0; i < hashtags.length; i++) {
    hashtags[i] = hashtags[i].toLowerCase();
  }

  const duplicateHashtags = hashtags.filter((hashtag, index, array) => array.indexOf(hashtag) !== index);

  if (duplicateHashtags && duplicateHashtags.length !== 0) {
    hashtagsText.setCustomValidity(`Пожалуйста, удалите повторяющиеся хэш-теги: ${ duplicateHashtags.join(', ') }`);
    hashtagsText.style.borderColor = 'red';
  } else if (hashtags.length > MAX_HASHTAG_QUANTITY) {
    hashtagsText.setCustomValidity(`Нельзя указывать больше ${ MAX_HASHTAG_QUANTITY } хэш-тегов. Просьба удалить лишние ${ hashtags.length - MAX_HASHTAG_QUANTITY }`);
    hashtagsText.style.borderColor = 'red';
  } else if (invalidHashtags.length !== 0) {
    hashtagsText.setCustomValidity(`Некорректно введен хэш-тег: ${ invalidHashtags.join(', ') }`);
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
