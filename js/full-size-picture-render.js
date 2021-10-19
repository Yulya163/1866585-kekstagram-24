import {userPhotos} from './create-photo.js';

const bigPicture = document.querySelector('.big-picture');

const commentsWrap = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsWrap.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

const fullSizePictureRender = (evt) => {
  const pictureSrc = evt.target.src;
  bigPicture.querySelector('.big-picture__img img').src = pictureSrc;

  const userPhotoCurrent = userPhotos.find((userPhoto) => pictureSrc.indexOf(userPhoto.url) !== -1);

  const userPhotoCurrentComments = userPhotoCurrent.comments;

  bigPicture.querySelector('.likes-count').textContent = userPhotoCurrent.likes;
  bigPicture.querySelector('.comments-count').textContent = userPhotoCurrent.comments.length;
  bigPicture.querySelector('.social__caption').textContent = userPhotoCurrent.description;

  userPhotoCurrentComments.forEach((item) => {
    commentsWrap.innerHTML = '';
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = item.avatar;
    newComment.querySelector('.social__picture').alt = item.userName;
    newComment.querySelector('.social__text').textContent = item.message;
    commentsFragment.appendChild(newComment);
  });

  commentsWrap.appendChild(commentsFragment);

};
const commentsWrapClear = () => {
  commentsWrap.innerHTML = '';
};

export {fullSizePictureRender, bigPicture, commentsWrapClear};
