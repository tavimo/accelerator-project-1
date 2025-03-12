// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';


const items = document.querySelectorAll('.faq__item'); 

items.forEach(item => {
  const toggleButton = item.querySelector('.faq__item-button'); 

  toggleButton.addEventListener('click', () => {
    item.classList.toggle('faq__item--open'); 
  });
});