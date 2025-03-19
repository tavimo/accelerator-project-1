// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';



//Жюри слайдер
  new Swiper(".juri__slider-wrapper", {
    loop: true, // Бесконечный цикл
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1, // Один слайд на экране
    spaceBetween: 40, // Отступ между слайдами
    breakpoints: {
      768: {
        slidesPerView: 2, // На планшете — 2 слайда
      },
      1366: {
        slidesPerView: 4, // На десктопе — 3 слайда
      },
    },
  });



//Секция с вопросами

document.addEventListener('DOMContentLoaded', () => {
  // Переключение вкладок
  const tabs = document.querySelectorAll('.faq__sorting-item');
  const lists = document.querySelectorAll('.faq__list');

  // Сохраняем состояние вкладок
  const activeTab = localStorage.getItem('activeTab') || 'центр';

  // Функция для отображения активной вкладки
  function setActiveTab(tab) {
    tabs.forEach((tabItem) => {
      tabItem.classList.remove('faq__sorting-item--current'); // Убираем класс с всех вкладок
    });
    const activeTabElement = [...tabs].find((tabItem) => tabItem.querySelector('button').textContent.toLowerCase() === tab);
    if (activeTabElement) {
      activeTabElement.classList.add('faq__sorting-item--current'); // Добавляем класс активной вкладке
    }

    lists.forEach((list) => {
      list.style.display = 'none'; // Прячем все списки
    });
    const activeList = document.querySelector(`.faq__list[data-tab="${tab}"]`);
    if (activeList) {
      activeList.style.display = 'block'; // Показываем только активный список
    }
  }

  // Инициализация вкладки, основываясь на сохраненном состоянии
  setActiveTab(activeTab);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabName = tab.querySelector('button').textContent.toLowerCase();
      setActiveTab(tabName);
      localStorage.setItem('activeTab', tabName); // Сохраняем активную вкладку в локальное хранилище
    });
  });

  // Работа с аккордеонами
  const items = document.querySelectorAll('.faq__item');

  items.forEach((item) => {
    const toggleButton = item.querySelector('.faq__item-button');

    toggleButton.addEventListener('click', () => {
      item.classList.toggle('faq__item--open');
    });
  });
});
