/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
import Swiper from 'swiper';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';

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
    loop: true,
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
        slidesPerView: 'auto',
        centeredSlides: true,
      }
    }
  });

})
Swiper.use([Keyboard, Mousewheel])
document.addEventListener("DOMContentLoaded", initSwiper);

function initSwiper(direction = 'vertical') {
  return new Swiper ('.swiper-vertical-container', {
    direction,
    loop: true,
    slidesPerView: 4,
    slideActiveClass: 'active',
    mousewheel: {
      sensitivity: 5,
    },
    allowTouchMove: true,
    speed: 500,
    centeredSlides: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
        direction: 'horizontal'
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 15,
        direction: 'horizontal'
      },
      1010: {
        //slidesPerView: 3,
        // direction: 'horizontal',
      }
    }
  })
}
// timeline window resize change direction
let direction = 'vertical';
let swiper = initSwiper(direction);

function changeDirection() {
  const width = window.innerWidth;
  if (width < 1010) {
    direction = 'horizontal';
  } else if (width >= 1010) {
    direction = 'vertical';
  }

  let slideIndex = swiper?.activeIndex;
  swiper?.destroy(true, true);
  swiper = initSwiper(direction);
  swiper?.slideTo(slideIndex,0);
}

document.addEventListener('DOMContentLoaded', function () {
  const swiperPromo = new Swiper('.swiper-promo-container', {
    slidesPerView: 1,
    enabled: window.innerWidth < 768,
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
        spaceBetween: 0,
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && swiperPromo.enabled) {
      swiperPromo.disable();
    } else if (window.innerWidth < 768 && !swiperPromo.enabled) {
      swiperPromo.enable();
    }
  });

  const swiper2 = new Swiper('.swiper-promotions-container', {
    slidesPerView: 1,
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


      },
      768: {

      }
    }
  });
})

window.addEventListener('resize', changeDirection);
window.addEventListener('DOMContentLoaded', changeDirection);
// stop scroll right side
document.querySelector('#stop-scroll')?.addEventListener('wheel', (e) => {
  e.stopPropagation();
});
// save instruction for don`t show
const storageKey = 'blockShown';
let instruction = document.querySelector('#instruction');

if (!localStorage.getItem(storageKey)) {
  if (instruction) {
    setTimeout(() => {
      instruction?.remove();
      localStorage.setItem(storageKey, true);
    }, 3000);
  }
} else {
  instruction?.remove();
}
// remove instruction after scroll
instruction?.addEventListener('wheel', (e) => {
  e.stopPropagation();
  e.preventDefault();
  instruction?.remove();
});
// toggle faq-questions
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
// move map block under container
const block = document.querySelector('.block-to-move');
const container1 = document.querySelector('.container-1');
const container2 = document.querySelector('.container-2');

function moveBlock() {
  const width = window.innerWidth;

  if (width < 768 && block?.parentElement !== container2) {
    container2?.appendChild(block);
  } else if (width >= 768 && block?.parentElement !== container1) {
    container1?.appendChild(block);
  }
}

// При загрузке страницы
window.addEventListener('DOMContentLoaded', moveBlock);

// При изменении размера окна
window.addEventListener('resize', moveBlock);

// move images promo block
function movePromoImage() {
  const screenWidth = window.innerWidth;

  const promoBlocks = document.querySelectorAll('.js-swiper-slide');

  promoBlocks.forEach((block) => {
    const promoImg = block.querySelector('.js-promo-img');
    const promoTitle = block.querySelector('.js-promo-title');
    const promoLeft = block.querySelector('.promotions-section__left');
    const promoRight = block.querySelector('.promotions-section__right');

    if (!promoImg || !promoTitle) return;

    if (screenWidth < 768) {
      // Переместить после заголовка, если ещё не там
      if (promoTitle.nextElementSibling !== promoImg) {
        promoLeft?.insertBefore(promoImg, promoTitle.nextElementSibling);
      }
    } else {
      // Вернуть обратно в правую колонку, если он не там
      promoLeft?.after(promoImg);
    }
  });
}

window.addEventListener('DOMContentLoaded', movePromoImage);
window.addEventListener('resize', movePromoImage);

// Показ текста этапа строительства
const stageTitle = document.querySelectorAll('.js-show-text');

stageTitle.forEach(block => {
  block.addEventListener('click', (e) => {
    const parentSelector = e.target.closest('.stages-construction-section__item');
    if (parentSelector) {
      parentSelector.classList.toggle('active');
    }
  })
})

// Обработчик бургер кнопки
const burger = document.querySelector('.mm_trigger');
const body = document.body;

burger?.addEventListener('click', (e) => {
  if (body.classList.contains('active')) {
    body.classList.remove('active');
  } else {
    body.classList.add('active');
  }
})

// обработчик кнопки "up"
const upBtn = document.querySelector('.up');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    upBtn?.classList.add('show');
    if (!upBtn) return;
    setTimeout(() => upBtn.style.display = 'block', 500);
  } else {
    upBtn?.classList.remove('show');
    if (!upBtn) return;
    setTimeout(() => upBtn.style.display = 'none', 500);

  }
})
upBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})

// анимация пальца
// Можно переиспользовать для нескольких блоков
const targets = document.querySelectorAll('.animated-target');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const finger = entry.target.querySelector('.finger');
      finger.classList.add('animate');

      // Убираем анимацию через 5 секунд
      setTimeout(() => {
        finger.classList.remove('animate');
      }, 5000);
    }
  });
}, {
  threshold: 0.5 // Когда видно 50% блока
});

targets.forEach(target => observer.observe(target));
