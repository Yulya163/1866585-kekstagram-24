import {commentsWrap} from './full-size-picture-render.js';
import {MAX_START_VISIBLE_COMMENTS_NUMBER, UPLOAD_COMMENTS_NUMBER} from './constants.js';

const commentsLoaderBtn = document.querySelector('.comments-loader');
const commentUploadCount = document.querySelector('.comments-upload-count');

const showComments = () => {
  const comments = Array.from(commentsWrap.children);
  const commentsNumber = comments.length;
  const uploadedСomments = [];

  comments.forEach((comment) => {
    comment.classList.add('hidden');
  });

  if (commentsNumber > MAX_START_VISIBLE_COMMENTS_NUMBER) {
    for (let i = 0; i < MAX_START_VISIBLE_COMMENTS_NUMBER; i++) {
      comments[i].classList.remove('hidden');
      uploadedСomments.push(comments[i]);
    }
    commentUploadCount.textContent = uploadedСomments.length;
    commentsLoaderBtn.classList.remove('hidden');
    commentsLoaderBtn.addEventListener('click', onCommentsLoaderBtnClick);
  } else {
    comments.forEach((comment) => {
      comment.classList.remove('hidden');
    });
    commentsLoaderBtn.classList.add('hidden');
    commentUploadCount.textContent = comments.length;
  }

  function onCommentsLoaderBtnClick() {
    const uploadedСommentsLength = uploadedСomments.length;
    for (let i = uploadedСommentsLength; i < (uploadedСommentsLength + UPLOAD_COMMENTS_NUMBER); i++) {
      if(comments[i]) {
        comments[i].classList.remove('hidden');
        uploadedСomments.push(comments[i]);
        commentUploadCount.textContent = uploadedСomments.length;
      }
    }

    if (uploadedСomments.length === commentsNumber) {
      commentsLoaderBtn.classList.add('hidden');
      commentsLoaderBtn.removeEventListener('click', onCommentsLoaderBtnClick);
    }
  }
};
export {showComments};
