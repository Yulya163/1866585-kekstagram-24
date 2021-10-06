import {NAMES, MESSAGE, DESCRIPTION, MAX_COMMENTS_NUMBER, USER_PHOTOS_COUNT} from './constants.js';
import {getRandomInt, getRandomArrayElement} from './helpers.js';

const commentIds = [];

const createCommentId = (index) => {
  commentIds.push(index);
  return commentIds.length;
};

const createComments = (index) => ({
  id: createCommentId(index),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  userName: getRandomArrayElement(NAMES),
});

const userComments = () => Array.from({length: getRandomInt(0, MAX_COMMENTS_NUMBER)}, (item, key) => createComments(key + 1));

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInt(15, 200),
  comments: userComments(),
});

const userPhotos = Array.from({length: USER_PHOTOS_COUNT}, (item, key) => createPhoto(key + 1));

export {userPhotos};
