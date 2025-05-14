/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
import Swiper, { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper';

import BaseHelpers from './helpers/BaseHelpers.js';
import PopupManager from './modules/PopupManager';
import BurgerMenu from './modules/BurgerMenu';
import Tabs from './modules/Tabs';
import Accordion from './modules/Accordion.js';
import { initMap } from './modules/main-map.js';

BaseHelpers.checkWebpSupport();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

ymaps.ready(initMap);

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/**
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

new Tabs('tabs-example', {});

new Accordion('.accordion', {
  shouldOpenAll: false, // true
  defaultOpen: [], // [0,1]
  collapsedClass: 'open',
});

Swiper.use([Navigation]);
Swiper.use([Pagination]);
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-container', {
    //mousewheel: true,
    slidesPerView: 'auto',
    //spaceBetween: 30,
    centeredSlides: true,
    //centeredSlidesBounds: true,
    loop: true,
    //loopAdditionalSlides: 2,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      768: {
        //spaceBetween: 16,
      }
    }
  });

})
Swiper.use([Keyboard, Mousewheel])
document.addEventListener("DOMContentLoaded", () => {
  const mySwiper = new Swiper ('.swiper-vertical-container', {
    direction: 'vertical',
    loop: true,
    slidesPerView: 4,
    slideActiveClass: 'active',
    mousewheel: {
      sensitivity: 1,
    },
    speed: 300,
    centeredSlides: true,
  })

  // const mySwiper = new Swiper ('.swiper-vertical-container', {
  //   direction: 'vertical',
  //   effect: 'slide',
  //   mousewheel: true,
  //   slideActiveClass: 'active',
  //   slidesPerView: 4,
  //   centeredSlides: false,
  //   loop: true,
  // })
});

document.querySelector('#stop-scroll').addEventListener('wheel', (e) => {
  e.stopPropagation();
});

let instruction = document.querySelector('#instruction');

setTimeout(() => instruction.remove(), 3000);

instruction.addEventListener('wheel', (e) => {
  e.stopPropagation();
  e.preventDefault();
  instruction.remove();
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

