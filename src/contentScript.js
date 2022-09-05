const contentSelector = 'body';
const popupId = 'meo-woof-popup';
const initialText = document.querySelector(contentSelector).innerHTML;
let favouriteAnimal;

const popupStyle = `
  .meo-woof-popup {
    position: absolute;
    width: 400px;
    height: 270px;
    background: #FFFFFF;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    z-index: 1000;
  }
  .meo-woof-popup__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
  }
  .meo-woof-popup__titile {
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
  }
  .meo-woof-popup__close {
    display: block;
    width: 12px;
    height: 12px;
    position: relative;
  }
  .meo-woof-popup__close:hover {
    opacity: 0.7;
  }
  .meo-woof-popup__close::before,
  .meo-woof-popup__close::after {
    content: '';
    display: block;
    width: 12px;
    height: 2px;
    background: #000;
    transform: rotate(45deg);
    position: absolute;
    top: 6px;
  }
  .meo-woof-popup__close::after {
    transform: rotate(-45deg);
  }
  .meo-woof-popup figure {
    margin: 0;
    width: 400px;
    height: 225px;
  }
  .meo-woof-popup img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  `;

function hightlightAnimals() {
  Promise.all([
    chrome.storage.sync.get(['cats']),
    chrome.storage.sync.get(['dogs'])
  ]).then(([{cats}, {dogs}]) => {
    if (cats !== dogs) {
      favouriteAnimal = cats === 'true' ? 'cats' : 'dogs';
      const body = document.querySelector(contentSelector).innerHTML;
      const newWord = cats === 'true' ? 'cats' : 'dogs';
      const searchWord = cats === 'true' ? 'dogs' : 'cats';
      var regex = new RegExp(searchWord, 'gmi');
      document.querySelector(contentSelector).innerHTML = body.replace(regex, '<mark>' + newWord + '</mark>');
      document.querySelectorAll('mark').forEach(item => {
        item.addEventListener('click', showAnimalPopup);
      });
    } else {
      document.querySelectorAll('mark').forEach(item => {
        item.removeEventListener('click', showAnimalPopup);
      });
      document.querySelector(contentSelector).innerHTML = initialText;
    }
  });
}

function showAnimalPopup(e) {
  e.preventDefault();

  var style = document.createElement('style');
  style.id = popupId + '-style';
  style.innerHTML = popupStyle;
  document.querySelector('body').appendChild(style);

  getAnimalData(favouriteAnimal).then((res) => {
    const photoUrl = favouriteAnimal === 'cats' ? res[0]?.url : res?.message;
    const parent = document.querySelector(contentSelector);
    const popup = document.createElement('div');
    popup.id = popupId;
    popup.className = popupId;

    const coordX = (e.pageY + 270) < document.documentElement.clientHeight + window.pageYOffset ? e.pageY : e.pageY - 270;
    const coordY = (e.pageX + 400) < document.documentElement.clientWidth + window.pageXOffset ? e.pageX : e.pageX - 400;

    popup.style.top = `${coordX}px`;
    popup.style.left = `${coordY}px`;

    const header = document.createElement('header');
    header.className = 'meo-woof-popup__header';

    const title = document.createElement('div');
    title.innerHTML = `<b>Look!</b> It’s a ${favouriteAnimal === 'cats' ? 'cat' : 'dog'}!`;
    title.className = 'meo-woof-popup__titile';

    const closeBtn = document.createElement('a');
    closeBtn.className = 'meo-woof-popup__close';
    closeBtn.addEventListener('click', function () {
      hidePopup();
    });
    header.appendChild(title)
    header.appendChild(closeBtn);

    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = photoUrl;
    image.alt = favouriteAnimal;
    figure.appendChild(image);

    popup.appendChild(header)
    popup.appendChild(figure);

    parent.appendChild(popup);
  });
}

function hidePopup() {
  const parent = document.querySelector(contentSelector);
  parent.removeChild(document.querySelector(`#${popupId}`));
  parent.removeChild(document.querySelector(`#${popupId}-style`));
}

async function getAnimalData(type) {
  const url = type === 'cats' ? 'https://api.thecatapi.com/v1/images/search' :
    'https://dog.ceo/api/breeds/image/random';
  const response = await fetch(url);
  return await response.json();
}

document.addEventListener('click', (e) => {
  const popup = document.querySelector(`#${popupId}`);
  const withinBoundaries = e.composedPath().includes(popup);

  if (!withinBoundaries) {
    hidePopup();
  }
})

window.addEventListener('load', () => {
  hightlightAnimals();
});

chrome.storage.onChanged.addListener(() => {
  hightlightAnimals();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === "onActivated") {
    hightlightAnimals();
  }
});
