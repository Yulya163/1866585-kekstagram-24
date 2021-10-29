import {thumbnailsRender} from './thumbnails-render.js';
import {closeImgUploadOverlay, setImgUploadFormSubmit} from './form.js';
import {showAlert} from './utils.js';
import {getData} from './api.js';

getData(
  (photos) => {
    thumbnailsRender(photos);
  },
  () => showAlert('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу'),
);

setImgUploadFormSubmit(closeImgUploadOverlay);
