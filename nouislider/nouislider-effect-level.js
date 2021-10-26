import {imgUploadPreview, effectLevelInput} from '../js/form.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const onEffectChange = () => {
  sliderElement.style.display = 'none';
  effectLevelInput.value = '';
  imgUploadPreview.style.filter = 'none';
  effectsList.querySelector('#effect-none').checked = true;

  effectsList.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case 'chrome' :
        sliderElement.style.display = 'block';
        effectLevelInput.value = 1;
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
        });
        sliderElement.noUiSlider.set(1);
        sliderElement.noUiSlider.on('update', (values, handle) => {
          effectLevelInput.value = values[handle];
          imgUploadPreview.style.filter = `grayscale(${values[handle]})`;
        });
        break;
      case 'sepia' :
        sliderElement.style.display = 'block';
        effectLevelInput.value = 1;
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
        });
        sliderElement.noUiSlider.set(1);
        sliderElement.noUiSlider.on('update', (values, handle) => {
          effectLevelInput.value = values[handle];
          imgUploadPreview.style.filter = `sepia(${values[handle]})`;
        });
        break;
      case 'marvin' :
        sliderElement.style.display = 'block';
        effectLevelInput.value = 100;
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          step: 1,
        });
        sliderElement.noUiSlider.set(100);
        sliderElement.noUiSlider.on('update', (values, handle) => {
          effectLevelInput.value = values[handle];
          imgUploadPreview.style.filter = `invert(${values[handle]}%)`;
        });
        break;
      case 'phobos' :
        sliderElement.style.display = 'block';
        effectLevelInput.value = 3;
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          step: 0.1,
        });
        sliderElement.noUiSlider.set(3);
        sliderElement.noUiSlider.on('update', (values, handle) => {
          effectLevelInput.value = values[handle];
          imgUploadPreview.style.filter = `blur(${values[handle]}px)`;
        });
        break;
      case 'heat' :
        sliderElement.style.display = 'block';
        effectLevelInput.value = 3;
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          step: 0.1,
        });
        sliderElement.noUiSlider.set(3);
        sliderElement.noUiSlider.on('update', (values, handle) => {
          effectLevelInput.value = values[handle];
          imgUploadPreview.style.filter = `brightness(${values[handle]})`;
        });
        break;
      case 'none' :
        imgUploadPreview.style.filter = 'none';
        sliderElement.style.display = 'none';
        effectLevelInput.value = '';
        break;
    }
  });
};

export {onEffectChange};
