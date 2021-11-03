import {thumbnailsRender, thumbnailsRandomRender, thumbnailsDiscussedRender} from './thumbnails-render.js';
import {RERENDER_DELAY} from './constants.js';
import {debounce} from './utils.js';

const filtersWrap = document.querySelector('.img-filters');
const filtersForm = filtersWrap.querySelector('.img-filters__form');
const filtersFormBtns = filtersWrap.querySelectorAll('.img-filters__button');

const setStartValueFilterBtn = () => {
  filtersWrap.classList.remove('img-filters--inactive');

  filtersFormBtns.forEach((filtersFormBtn) => {
    filtersFormBtn.classList.remove('img-filters__button--active');
    if (filtersFormBtn === document.getElementById('filter-default')) {
      filtersFormBtn.classList.add('img-filters__button--active');
    }
  });
};

const filterPhotos = (evt, photos) => {
  if (evt.target === document.getElementById('filter-default')) {
    filtersFormBtns.forEach((filtersFormBtn) => {
      filtersFormBtn.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    thumbnailsRender(photos);
  }
  if (evt.target === document.getElementById('filter-random')) {
    filtersFormBtns.forEach((filtersFormBtn) => {
      filtersFormBtn.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    thumbnailsRandomRender(photos);
  }
  if (evt.target === document.getElementById('filter-discussed')) {
    filtersFormBtns.forEach((filtersFormBtn) => {
      filtersFormBtn.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    thumbnailsDiscussedRender(photos);
  }
};

const debounced = debounce(filterPhotos, RERENDER_DELAY);

export {setStartValueFilterBtn, debounced, filtersForm};
