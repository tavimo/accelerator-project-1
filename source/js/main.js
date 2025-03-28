/* global Swiper */
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
new Swiper('.juri__slider-wrapper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 40,
  allowTouchMove: true,
  breakpoints: {
    768: {
      slidesPerView: 2,
      allowTouchMove: true,
    },
    1366: {
      slidesPerView: 4,
      allowTouchMove: false,
    },
  },
});


//---------------------------------------Блок вопросы

document.addEventListener('DOMContentLoaded', () => {
  // Вкладки
  const tabs = document.querySelectorAll('.faq__sorting-item');
  const lists = document.querySelectorAll('.faq__list');

  // Сохранение состояния аккордеонов при смене вкладки
  const accordionStates = {};

  // Функция для отображения активной вкладки
  function setActiveTab(tab) {
    tabs.forEach((tabItem) => tabItem.classList.remove('faq__sorting-item--current'));
    lists.forEach((list) => {
      list.style.display = 'none';
    });

    const activeTabElement = [...tabs].find((tabItem) => tabItem.querySelector('button').textContent.toLowerCase() === tab);
    const activeList = document.querySelector(`.faq__list[data-tab="${tab}"]`);

    if (activeTabElement) {
      activeTabElement.classList.add('faq__sorting-item--current');
    }
    if (activeList) {
      activeList.style.display = 'block';

      // Восстановление состояния аккордеонов при переключении вкладки
      const listItems = activeList.querySelectorAll('li');
      listItems.forEach((item, index) => {
        if (accordionStates[tab] && accordionStates[tab][index]) {
          item.classList.add('faq__item--open');
        }
      });

      // Открытие первого аккордеона по умолчанию в каждом табе
      if (listItems.length > 0) {
        listItems[0].classList.add('faq__item--open');
        const tabName = activeList.getAttribute('data-tab');
        if (!accordionStates[tabName]) {
          accordionStates[tabName] = {};
        }
        accordionStates[tabName][0] = true;
      }
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
        const nextTab = tab.nextElementSibling || tabs[0]; // Переход к следующей вкладке
        nextTab.querySelector('button').focus(); // Фокус на следующую вкладку
      } else if (event.key === 'ArrowLeft') {
        const prevTab = tab.previousElementSibling || tabs[tabs.length - 1]; // Переход к предыдущей вкладке
        prevTab.querySelector('button').focus(); // Фокус на предыдущую вкладку
      }
    });
  });

  // Аккордеоны
  const items = document.querySelectorAll('.faq__list li');

  items.forEach((item, index) => {
    const toggleButton = item.querySelector('.faq__item-button');
    const list = item.closest('.faq__list'); // Находим родительский список для хранения состояния

    toggleButton.addEventListener('click', () => {
      // Переключаем класс для открытия/закрытия аккордеона
      item.classList.toggle('faq__item--open');

      // Сохраняем состояние аккордеона для текущей вкладки
      const tabName = list.getAttribute('data-tab');
      if (!accordionStates[tabName]) {
        accordionStates[tabName] = {};
      }
      accordionStates[tabName][index] = item.classList.contains('faq__item--open');
    });

    // Поддержка клавиши пробел для аккордеона
    toggleButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        item.classList.toggle('faq__item--open');

        // Сохраняем состояние аккордеона для текущей вкладки
        const tabName = list.getAttribute('data-tab');
        if (!accordionStates[tabName]) {
          accordionStates[tabName] = {};
        }
        accordionStates[tabName][index] = item.classList.contains('faq__item--open');
      }
    });

    // Дополнительная поддержка пробела для переключения состояния аккордеона
    toggleButton.addEventListener('keypress', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        item.classList.toggle('faq__item--open');

        // Сохраняем состояние аккордеона для текущей вкладки
        const tabName = list.getAttribute('data-tab');
        if (!accordionStates[tabName]) {
          accordionStates[tabName] = {};
        }
        accordionStates[tabName][index] = item.classList.contains('faq__item--open');
      }
    });

    // Открытие первого аккордеона по умолчанию при загрузке вкладки
    if (index === 0 && list.getAttribute('data-tab') === firstTabName) {
      item.classList.add('faq__item--open');
      const tabName = list.getAttribute('data-tab');
      if (!accordionStates[tabName]) {
        accordionStates[tabName] = {};
      }
      accordionStates[tabName][index] = true;
    }
  });

});


//------------------------------------- Запуск видео

document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.querySelector('.about__iframe');
  const playButton = videoContainer.querySelector('.about__iframe-button');

  playButton.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/9TZXsZItgdw?autoplay=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');

    videoContainer.style.background = 'none';
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
  });
});

//------------------------------------------Отзывы слайдер
new Swiper('.reviews__slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  allowTouchMove: true,
  breakpoints: {
    768: {
      allowTouchMove: true,
    },
    1366: {
      allowTouchMove: false,
    },
  },
});
