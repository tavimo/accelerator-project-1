// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

//-----------------------------------------Абонементы цена
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все элементы вкладок и списков карт
  const tabs = document.querySelectorAll('.price__item');
  const cardsLists = document.querySelectorAll('.price__cards-list');

  // Функция для скрытия всех списков карт
  function hideAllLists() {
    cardsLists.forEach((list) => {
      list.style.display = 'none';
    });
  }

  // Функция для отображения списка, соответствующего вкладке
  function showList(tab) {
    const tabName = tab.textContent.trim().toLowerCase(); // Получаем имя вкладки (например, "1 месяц")
    const activeList = document.querySelector(`.price__cards-list[data-tab="${tabName}"]`);

    if (activeList) {
      activeList.style.display = 'flex'; // Показываем список с картами для выбранной вкладки
    }
  }

  // Добавляем обработчики событий для вкладок
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((tabItem) => tabItem.classList.remove('price__item--active')); // Убираем класс активности у всех вкладок
      tab.classList.add('price__item--active'); // Добавляем класс активности выбранной вкладке

      hideAllLists(); // Скрываем все списки
      showList(tab); // Показываем соответствующий список
    });
  });

  // Инициализация: скрываем все списки, показываем первый по умолчанию
  hideAllLists();
  if (tabs.length > 0) {
    tabs[0].classList.add('price__item--active'); // Устанавливаем активной первую вкладку
    showList(tabs[0]); // Показываем список для первой вкладки
  }
});





//------------------------------------------Жюри слайдер
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


//----------------------------------------------Блок вопросы
document.addEventListener('DOMContentLoaded', () => {
  // Вкладки
  const tabs = document.querySelectorAll('.faq__sorting-item');
  const lists = document.querySelectorAll('.faq__list');

  // Функция для отображения активной вкладки
  function setActiveTab(tab) {
    tabs.forEach((tabItem) => tabItem.classList.remove('faq__sorting-item--current'));
    lists.forEach((list) => list.style.display = 'none');

    const activeTabElement = [...tabs].find((tabItem) => tabItem.querySelector('button').textContent.toLowerCase() === tab);
    const activeList = document.querySelector(`.faq__list[data-tab="${tab}"]`);

    if (activeTabElement) {
      activeTabElement.classList.add('faq__sorting-item--current');
    }
    if (activeList) {
      activeList.style.display = 'block';
    }
  }

  // Инициализация первого таба
  const firstTabName = tabs.length > 0 ? tabs[0].querySelector('button').textContent.toLowerCase() : null;
  if (firstTabName) {
    setActiveTab(firstTabName);
  }

  // Обработка клика по вкладке
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabName = tab.querySelector('button').textContent.toLowerCase();
      setActiveTab(tabName);
    });

    // Поддержка навигации клавишами (ArrowLeft, ArrowRight, Enter)
    tab.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const tabName = tab.querySelector('button').textContent.toLowerCase();
        setActiveTab(tabName);
      } else if (event.key === 'ArrowRight') {
        let nextTab = tab.nextElementSibling || tabs[0]; // Переход к следующей вкладке
        nextTab.querySelector('button').focus(); // Фокус на следующую вкладку
      } else if (event.key === 'ArrowLeft') {
        let prevTab = tab.previousElementSibling || tabs[tabs.length - 1]; // Переход к предыдущей вкладке
        prevTab.querySelector('button').focus(); // Фокус на предыдущую вкладку
      }
    });
  });

  // Аккордеоны
  const items = document.querySelectorAll('.faq__item');

  items.forEach((item) => {
    const toggleButton = item.querySelector('.faq__item-button');

    toggleButton.addEventListener('click', () => {
      item.classList.toggle('faq__item--open');
    });

    // Поддержка клавиши пробел для аккордеона
    toggleButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        item.classList.toggle('faq__item--open');
      }
    });

    // Дополнительная поддержка пробела для переключения состояния аккордеона
    toggleButton.addEventListener('keypress', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        item.classList.toggle('faq__item--open');
      }
    });
  });
});

