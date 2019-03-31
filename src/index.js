import './styles/main.scss';

const pageNav = document.querySelector('.page-navigation');
const hamburgerMenu = document.querySelector('.hamburger-menu');
hamburgerMenu.addEventListener('click', () => {
  pageNav.classList.toggle('active');
});
