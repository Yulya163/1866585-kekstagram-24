import '../nouislider/nouislider.js';
import {closeImgUploadOverlay, setImgUploadFormSubmit} from './form.js';
import {showAlert} from './utils.js';
import {getData} from './api.js';
import {setStartValueFilterBtn, setFilterDefaultClick, setFilterRandomClick, setFilterDiscussedClick} from './filters.js';
import {thumbnailsRender, thumbnailsRandomRender, thumbnailsDiscussedRender} from './thumbnails-render.js';
import {RERENDER_DELAY} from './constants.js';
import {debounce} from './utils.js';

getData(
  'https://24.javascript.pages.academy/kekstagram/data',
  (photos) => {
    thumbnailsRender(photos);
    setStartValueFilterBtn();
    setFilterDefaultClick(debounce(
      () => thumbnailsRender(photos),
      RERENDER_DELAY,
    ));
    setFilterRandomClick(debounce(
      () => thumbnailsRandomRender(photos),
      RERENDER_DELAY,
    ));
    setFilterDiscussedClick(debounce(
      () => thumbnailsDiscussedRender(photos),
      RERENDER_DELAY,
    ));
  },
  () => showAlert('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу'),
);

setImgUploadFormSubmit(closeImgUploadOverlay);
