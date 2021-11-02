const filtersWrap = document.querySelector('.img-filters');
const filtersForm = filtersWrap.querySelector('.img-filters__form');
const filtersFormBtns = filtersForm.querySelectorAll('.img-filters__button');
const filterDefaultBtn = filtersForm.querySelector('#filter-default');
const filterRandomBtn = filtersForm.querySelector('#filter-random');
const filterDiscussedBtn = filtersForm.querySelector('#filter-discussed');

const setStartValueFilterBtn = () => {
  filtersWrap.classList.remove('img-filters--inactive');

  filtersFormBtns.forEach((filtersFormBtn) => {
    filtersFormBtn.classList.remove('img-filters__button--active');
    if (filtersFormBtn === document.getElementById('filter-default')) {
      filtersFormBtn.classList.add('img-filters__button--active');
    }
  });
};

const setFilterDefaultClick = (cb) => {
  filterDefaultBtn.addEventListener('click', (evt) => {
    filtersFormBtns.forEach((filtersFormBtn) => {
      filtersFormBtn.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    cb();
  });
};

const setFilterRandomClick = (cb) => {
  filterRandomBtn.addEventListener('click', (evt) => {
    filtersFormBtns.forEach((filtersFormBtn) => {
      filtersFormBtn.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    cb();
  });
};

const setFilterDiscussedClick = (cb) => {
  filterDiscussedBtn.addEventListener('click', (evt) => {
    filtersFormBtns.forEach((filtersFormBtn) => {
      filtersFormBtn.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    cb();
  });
};

export {setStartValueFilterBtn, setFilterDefaultClick, setFilterRandomClick, setFilterDiscussedClick};
