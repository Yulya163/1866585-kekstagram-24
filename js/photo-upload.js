import {uploadFileInput, imgUploadPreview} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

uploadFileInput.addEventListener('change', () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
});
