import {popup} from './popup.js';

const picturesWrap = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const usersPhotoListFragment = document.createDocumentFragment();

const thumbnailsRender = (userPhotos) => {
  userPhotos.forEach(({url, likes, comments}) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    usersPhotoListFragment.appendChild(photoElement);
  });

  picturesWrap.appendChild(usersPhotoListFragment);

  popup(userPhotos);
};

export {thumbnailsRender, picturesWrap};
