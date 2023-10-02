'use strict';

// делаем бегущую строку

// Получаем элементы
const marqueeWrapper = document.querySelector('.marquee');
const marquee = document.querySelector('.marquee__description');

// ширины элементов
const marqueeWrapperWidth = marqueeWrapper.offsetWidth;
const marqueeWidth = marquee.scrollWidth;

const moveMarquee = () => {
  try {
    let currentTX = getComputedStyle(marquee).transform.split(',');

    if (currentTX[4] === undefined) {
      currentTX = -1;
    } else {
      currentTX = parseFloat(currentTX[4]) - 1;
    }

    if (-currentTX >= marqueeWidth) {
      marquee.style.transform = 'translateX(' + marqueeWrapperWidth + 'px)';
    } else {
      marquee.style.transform = 'translateX(' + currentTX + 'px)';
    }
  } catch (error) {
    console.error(error);
  }
};

// перезаписываемое значение
let interval = setInterval(moveMarquee, 20);

// обработчик событий состояния полоски
const marqueeStateHandler = (event) => {
  event.preventDefault;

  if (event.type === 'mouseover') {
    clearInterval(interval);
  }

  if (event.type === 'mouseout') {
    interval = setInterval(moveMarquee, 20);
  }
};

// слушаем событие: "курсор мыши наведен на элемент", и вызываем обработчик событий
const marqueeAnimationStop = marquee.addEventListener('mouseover', (event) => {
  marqueeStateHandler(event);
});

// слушаем событие "курсор мыши убран с элемента", и вызываем обработчик событий
const marqueeAnimationStart = marquee.addEventListener('mouseout', (event) => {
  marqueeStateHandler(event);
});

// Burger menu
const btnBurger = document.querySelector('.btn-burger-menu');
const burgerNavMenu = document.querySelector('.burger-nav');
const bodyEl = document.querySelector('.body-wrapper');

const btnBurgerHandler = btnBurger.addEventListener('click', (event) => {
  event.preventDefault;

  burgerNavMenu.classList.toggle('is-active');
  bodyEl.classList.toggle('burger-menu-activated');
  btnBurger.classList.toggle('is-clicked');
});
