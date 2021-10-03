const NAMES = [
  'Артем',
  'Сан Саныч',
  'Семён',
  'Иван',
  'Джон',
  'Катя',
  'Петр Петров',
  'Добрыня',
  'Алиса',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Не мог не выложить это фото...',
  'Как вам обработка фотографии?',
  'Люблю природу осенью',
  'Моя обновка, зацените',
  'Удачный кадр...',
  'Наконец собрались с друзьями! Было весело!',
  'Найдите меня на фотографии)))',
];

const getRandomInt = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const COMMENT_ID = [];

const MAX_COMMENTS_NUMBER = 4;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createCommentId = (index) => {

  COMMENT_ID.push(index);
  return COMMENT_ID.length;
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

const userPhotos = Array.from({length: 25}, (item, key) => createPhoto(key + 1));
console.log(userPhotos);

const checkMaxStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;
checkMaxStringLength();
