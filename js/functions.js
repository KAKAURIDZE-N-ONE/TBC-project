const HAMBURGER_MENU_DARK_BACKGROUND_TRANSITION = 600;

function throwAwayDarkBackground() {
  customerCanClickNavButton = false;
  const timeout = setTimeout(function () {
    hamburgerMenuDarkBackground.style.left = '-100%';
    customerCanClickNavButton = true;
  }, HAMBURGER_MENU_DARK_BACKGROUND_TRANSITION);
}

function pullUpAndDownMobileNavBar(upOrDown) {
  navBar.style.top = upOrDown === 'up' ? '-6.9rem' : '0';
  mobileNavButton.style.top = upOrDown === 'up' ? '-6.9rem' : '0';
}

function addImgsInsideBoxSlide(partnersRightOrLeftBox, pageIndex) {
  return Array.from({ length: 3 }, () => document.createElement('img')).map(
    (image, imgIndex) => {
      image.classList.add('partners-mobile-img');
      partnersRightOrLeftBox.append(image);
      if (pageIndex === 0) {
        image.src = `./imgs/partners/${
          imgIndex === 0
            ? 'usaid.webp'
            : imgIndex === 1
            ? 'space int.webp'
            : 'tineti.webp'
        }`;
        image.style.width =
          imgIndex === 0 ? '21.9rem' : imgIndex === 1 ? '20rem' : '25rem';
      }
      if (pageIndex === 1) {
        image.src = `./imgs/partners/${
          imgIndex === 0
            ? 'tegeta.webp'
            : imgIndex === 1
            ? 'spectre.webp'
            : 'tibisi.webp'
        }`;
        image.style.width =
          imgIndex === 0 ? '18rem' : imgIndex === 1 ? '13.1rem' : '22rem';
      }
      if (pageIndex === 2 && imgIndex === 1) {
        image.src = './imgs/partners/ufc.webp';
        image.style.width = '23.2rem';
      }
    }
  );
}

const TIME_OF_CHANGING_CLASS = 50;

function addAndRemoveClassesMobileSlider(
  partnersLeftOrRightBox,
  partnersCenterBox,
  side
) {
  setTimeout(function () {
    partnersLeftOrRightBox.classList.remove(`partners-${side}-box`);
    partnersLeftOrRightBox.classList.add('partners-center-box');
    partnersCenterBox.classList.remove('partners-center-box');
    partnersCenterBox.classList.add(
      `partners-${side === 'right' ? 'left' : 'right'}-box`
    );
  }, TIME_OF_CHANGING_CLASS);
  setTimeout(function () {
    partnersCenterBox.remove();
  }, PARTNER_IMG_TRANSITION_TIME);
}
