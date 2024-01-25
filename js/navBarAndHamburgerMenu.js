let navButtonIsActive = false;
let customerCanClickNavButton = true;

const navBar = document.querySelector('.nav-bar-box');
const mobileNavButton = document.querySelector('.menu-button-for-mobile');
const hamburgerMenuList = document.querySelector('.hamburger-menu-list');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerMenuDarkBackground = document.querySelector(
  '.hamburger-menu-dark-background'
);
const MobileNavButtonTopPiece = document.querySelector('.top-piece');
const MobileNavButtonCenterPiece = document.querySelector('.center-piece');
const MobileNavButtonBottomPiece = document.querySelector('.bottom-piece');

mobileNavButton.addEventListener('click', hamburgerMenuAnimations);
hamburgerMenuDarkBackground.addEventListener('click', hamburgerMenuAnimations);

//The Nav Bar and Hamburger Menu classes are added and removed via a toggle.
function hamburgerMenuAnimations() {
  if (!customerCanClickNavButton) return;

  MobileNavButtonTopPiece.classList.toggle(
    'rotate-mobile-nav-button-top-piece'
  );
  MobileNavButtonBottomPiece.classList.toggle(
    'rotate-mobile-nav-button-bottom-piece'
  );
  hamburgerMenu.classList.toggle('pull-left-hamburger-menu');

  document.body.style.overflowY = navButtonIsActive ? 'scroll' : 'hidden';
  mobileNavButton.style.transform = navButtonIsActive
    ? 'rotate(0deg)'
    : 'rotate(-45deg)';
  MobileNavButtonCenterPiece.style.backgroundColor = navButtonIsActive
    ? '#dbdbdb'
    : '#767676';
  hamburgerMenuList.style.right = navButtonIsActive ? '21.8rem' : '1.8rem';
  mobileNavButton.style.zIndex = navButtonIsActive ? '8' : '10';
  navButtonIsActive && window.scrollY > 0 && pullUpAndDownMobileNavBar('up');
  navButtonIsActive && throwAwayDarkBackground();
  hamburgerMenuDarkBackground.style.backgroundColor = navButtonIsActive
    ? '#ffffff00'
    : '#1616169e';
  hamburgerMenuDarkBackground.style.left = !navButtonIsActive && '0%';
  navButtonIsActive = !navButtonIsActive;
}

// It remembers the old scrolled pixel, then compares with the new one,
// and if scrolled then pulls the nav bar up, else down.
let oldScrolledPixels = 0;

function screenScrolledpixels() {
  if (window.scrollY > 0) {
    navBar.classList.add('nav-bar-second-color');
  } else {
    navBar.classList.remove('nav-bar-second-color');
  }

  if (window.innerWidth > 320 || window.scrollY <= 0) return;

  window.scrollY > oldScrolledPixels
    ? pullUpAndDownMobileNavBar('up')
    : pullUpAndDownMobileNavBar('down');

  oldScrolledPixels = window.scrollY;
}

window.addEventListener('scroll', screenScrolledpixels);
screenScrolledpixels();
