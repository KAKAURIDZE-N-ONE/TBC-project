window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const navBar = document.querySelector('.nav-bar-box');
const mobileNavButton = document.querySelector('.menu-button-for-mobile');

const questionFixedHeigh = 80;

let windowWidth;

let oldScrolledPixels = 0;

function screenScrolledpixels() {
  if (window.scrollY > 0) {
    navBar.classList.add('nav-bar-second-color');
  } else {
    navBar.classList.remove('nav-bar-second-color');
  }

  if (windowWidth > 320 || window.scrollY <= 0) return;

  window.scrollY > oldScrolledPixels
    ? pullUpAndDownMobileNavBar('up')
    : pullUpAndDownMobileNavBar('down');

  oldScrolledPixels = window.scrollY;
}

window.addEventListener('scroll', screenScrolledpixels);

screenScrolledpixels();

//////////////////////////////////mobile nav bar moving on scroll//////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
let selectedPartnersPage = 0;
let autoSwitchingIsPauesed = false;
let draggingIsPaused = false;
let oldSelectedPartnersPage = 0;

// ამ ყველაფერს ვანიჭებ ლისთენერს, რათა მაუს ენთერის დროს აუტომატური სლაიდების გადასვლა გაითიშოს
// და ამავდროულად შეინარჩუნონ თავიანთი ფუნქციები, რადგან ზოგი მათგანის პოზიცია აბსოლუტია და z-index_ით
// არიან წინ გადმოწეულნი

const divForAutoSwitchingPause = document.querySelector(
  '.div-for-auto-switching-pause'
);
const partnerArrows = document.querySelectorAll('.partner-arrow');
const dotsBox = document.querySelector('.dots-for-navigation-partners');

function handleMouseEnter() {
  autoSwitchingIsPauesed = true;
}

function handleMouseLeave() {
  autoSwitchingIsPauesed = false;
}

divForAutoSwitchingPause.addEventListener('mouseenter', handleMouseEnter);
divForAutoSwitchingPause.addEventListener('mouseleave', handleMouseLeave);
partnerArrows[0].addEventListener('mouseenter', handleMouseEnter);
partnerArrows[0].addEventListener('mouseleave', handleMouseLeave);
partnerArrows[1].addEventListener('mouseenter', handleMouseEnter);
partnerArrows[1].addEventListener('mouseleave', handleMouseLeave);
dotsBox.addEventListener('mouseenter', handleMouseEnter);
dotsBox.addEventListener('mouseleave', handleMouseLeave);
//////////////////////////////////////////////////////////////////////////////////////////////////
let turnedOffPartnersArrowsButton = false;

const navDots = document.querySelectorAll('.dot');
const partnerImgs = document.querySelectorAll('.partner-img');
const partnerImgs1 = document.querySelectorAll('.partner-img-1');
const partnerImgs2 = document.querySelectorAll('.partner-img-2');
const partnerImgs3 = document.querySelectorAll('.partner-img-3');

updatePartnerImgs();
updateNavDots();

let delayAutoSwitching;

navDots.forEach((el, i) => {
  el.addEventListener('click', function () {
    if (draggingIsPaused) return;

    oldSelectedPartnersPage = selectedPartnersPage;
    selectedPartnersPage = i;

    slideLeftOrRight(oldSelectedPartnersPage, selectedPartnersPage);
    updatePartnerImgs();
    updateNavDots();
    clearTimeout(delayAutoSwitching);
    delayAutoSwitching = setTimeout(
      () => (autoSwitchingIsPauesed = false),
      6000
    );
  });
});

const rightArrow = document.querySelector('.partner-right-arrow');
if (rightArrow)
  rightArrow.addEventListener('click', function () {
    if (turnedOffPartnersArrowsButton) return;

    oldSelectedPartnersPage = selectedPartnersPage;
    selectedPartnersPage++;
    updatePartnerImgs();
    updateNavDots();

    turnedOffPartnersArrowsButton = true;
    setTimeout(() => (turnedOffPartnersArrowsButton = false), 1000);
  });

const leftArrow = document.querySelector('.partner-left-arrow');
if (leftArrow)
  leftArrow.addEventListener('click', function () {
    if (turnedOffPartnersArrowsButton) return;

    oldSelectedPartnersPage = selectedPartnersPage;
    selectedPartnersPage--;
    updatePartnerImgs();
    updateNavDots();

    turnedOffPartnersArrowsButton = true;
    setTimeout(() => (turnedOffPartnersArrowsButton = false), 1000);
  });

function updateTimeWithInterval() {
  if (autoSwitchingIsPauesed || draggingIsPaused) return;
  selectedPartnersPage++;

  updatePartnerImgs();
  updateNavDots();
  slideLeftOrRight(selectedPartnersPage - 1, selectedPartnersPage);
}

setInterval(updateTimeWithInterval, 2500);

function updatePartnerImgs() {
  if (selectedPartnersPage === -1) selectedPartnersPage = 2;
  if (selectedPartnersPage === 3) selectedPartnersPage = 0;

  partnerImgs.forEach(el => (el.style.opacity = '0'));
  if (partnerImgs1[selectedPartnersPage])
    partnerImgs1[selectedPartnersPage].style.opacity = '1';
  if (partnerImgs2[selectedPartnersPage])
    partnerImgs2[selectedPartnersPage].style.opacity = '1';
  if (partnerImgs3[selectedPartnersPage])
    partnerImgs3[selectedPartnersPage].style.opacity = '1';
}

function updateNavDots() {
  navDots.forEach(el => (el.style.backgroundColor = '#afafaf'));
  navDots[selectedPartnersPage].style.backgroundColor = '#fff';
}

partnerArrows.forEach(el => {
  el.addEventListener('mouseenter', function () {
    const path = el.querySelector('path');
    el.src = 'svgs/partner-arrow-hover.svg';
  });
  el.addEventListener('mouseleave', function () {
    el.src = 'svgs/partner-arrow.svg';
  });
});

////////////////////////////partners animation for mobile/////////////////////
let switchSide;

const slidersContainer = document.querySelector(
  '.partners-container-for-mobile'
);

function slideLeftOrRight(oldValue, newValue) {
  selectedPartnersPage = newValue < 0 ? 2 : newValue > 2 ? 0 : newValue;
  if (newValue - oldValue > 0) {
    updateSlider('right', selectedPartnersPage);
  }
  if (newValue - oldValue < 0) {
    updateSlider('left', selectedPartnersPage);
  }
  updateNavDots();
}

function updateSlider(side, pageIndex) {
  const partnersCenterBox = document.querySelector('.partners-center-box');

  if (side === 'right') {
    const partnersRightBox = document.createElement('div');
    partnersRightBox.classList.add('partners-right-box');

    const partnersMobileImgs = Array.from({ length: 3 }, () =>
      document.createElement('img')
    ).map((image, imgIndex) => {
      image.classList.add('partners-mobile-img');
      partnersRightBox.append(image);
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
    });

    slidersContainer.append(partnersRightBox);

    setTimeout(function () {
      partnersRightBox.classList.remove('partners-right-box');
      partnersRightBox.classList.add('partners-center-box');
      partnersCenterBox.classList.remove('partners-center-box');
      partnersCenterBox.classList.add('partners-left-box');
    }, 10);
    setTimeout(function () {
      partnersCenterBox.remove();
    }, 1000);
  }
  if (side === 'left') {
    const partnersLeftBox = document.createElement('div');
    partnersLeftBox.classList.add('partners-left-box');

    const partnersMobileImgs = Array.from({ length: 3 }, () =>
      document.createElement('img')
    ).map((image, imgIndex) => {
      image.classList.add('partners-mobile-img');
      partnersLeftBox.append(image);
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
    });

    slidersContainer.prepend(partnersLeftBox);

    setTimeout(function () {
      partnersLeftBox.classList.remove('partners-left-box');
      partnersLeftBox.classList.add('partners-center-box');
      partnersCenterBox.classList.remove('partners-center-box');
      partnersCenterBox.classList.add('partners-right-box');
    }, 10);
    setTimeout(function () {
      partnersCenterBox.remove();
    }, 1000);
  }
  draggingIsPaused = true;
  handleTurnOnDragging();
}

///////////////////////////////dragging slide/////////////////////////////
let isDragging = false;
let startX = 0;

function handleTouchStart(e) {
  isDragging = true;
  startX = e.touches[0].clientX;
  autoSwitchingIsPauesed = true;
}

let cancelDragging;
function handleTurnOnDragging() {
  clearTimeout(cancelDragging);
  cancelDragging = setTimeout(() => (draggingIsPaused = false), 1050);
}

function handleTouchMove(e) {
  autoSwitchingIsPauesed = true;
  const PIXELS_NEED_TO_SLIDE = 50;

  if (!isDragging || draggingIsPaused) return;
  currentX = e.touches[0].clientX;
  const differenceBetweenStartAndCurrent = currentX - startX;

  if (Math.abs(differenceBetweenStartAndCurrent) >= PIXELS_NEED_TO_SLIDE) {
    differenceBetweenStartAndCurrent > 0
      ? slideLeftOrRight(selectedPartnersPage, --selectedPartnersPage)
      : slideLeftOrRight(selectedPartnersPage, ++selectedPartnersPage);
  }

  clearTimeout(delayAutoSwitching);
  delayAutoSwitching = setTimeout(() => (autoSwitchingIsPauesed = false), 6000);
}

function handleTouchEnd() {
  isDragging = false;
  autoSwitchingIsPauesed = true;
}

slidersContainer.addEventListener('touchstart', handleTouchStart, {
  passive: true,
});
slidersContainer.addEventListener('touchmove', handleTouchMove, {
  passive: true,
});
slidersContainer.addEventListener('touchend', handleTouchEnd);

//////////////////////////////////////////////////////////////////////
const questions = document.querySelectorAll('.question-txt-and-arrow-box');
const questionsArrows = document.querySelectorAll('.question-arrow');
const ALL_NEED_PLUS_HEIGHT = 11.5;

questions.forEach((el, i) => {
  el.addEventListener('click', function (e) {
    const activeQuestion = questions[i].closest('.question');
    const activeArrow = questionsArrows[i];
    const activeQuestionHeight = activeQuestion.offsetHeight;
    const activeQuestionAnswerHeight =
      activeQuestion.querySelector('.question-answer').offsetHeight;

    questions.forEach((el, i) => {
      el.closest('.question').style.height = '8rem';
      questionsArrows[i].classList.remove('question-arrow-rotate');
    });

    if (Number(activeQuestionHeight) === questionFixedHeigh) {
      activeQuestion.style.height = `${
        activeQuestionAnswerHeight / 10 + ALL_NEED_PLUS_HEIGHT
      }rem`;
      activeArrow.classList.add('question-arrow-rotate');
    }
  });
});

/////////////////////////////for questions/////////////////////////////
const allQuestionTxt = document.querySelector('.all-question');
const questionsSection = document.querySelector('.frequent-questions-section');
const flexContainerForAllQuestion = document.querySelector(
  '.flex-container-for-all-question'
);

function handleResizeScreen() {
  window.innerWidth <= 320
    ? updateQuestionsForMobile()
    : updateQuestionsForComputer();
}

window.addEventListener('resize', handleResizeScreen);
handleResizeScreen();

function updateQuestionsForComputer() {
  if (allQuestionTxt) allQuestionTxt.remove();
  flexContainerForAllQuestion.append(allQuestionTxt);
}

function updateQuestionsForMobile() {
  if (allQuestionTxt) allQuestionTxt.remove();
  questionsSection.append(allQuestionTxt);
}

////////////////mobile nav button animation and hamburger menu/////////////////////////////////////////////////
let navButtonIsActive = false;
let customerCanClickNavButton = true;

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
//////////////////////////////////////////////////////////////
////////////////////////////////////////////functions/////////////////////////////////////////
function throwAwayDarkBackground() {
  customerCanClickNavButton = false;
  const timeout = setTimeout(function () {
    hamburgerMenuDarkBackground.style.left = '-100%';
    customerCanClickNavButton = true;
  }, 600);
}

function pullUpAndDownMobileNavBar(upOrDown) {
  if (upOrDown === 'up') {
    navBar.style.top = '-6.9rem';
    mobileNavButton.style.top = '-6.9rem';
  } else {
    navBar.style.top = '0';
    mobileNavButton.style.top = '0';
  }
}
