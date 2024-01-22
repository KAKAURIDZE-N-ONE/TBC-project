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

  if (windowWidth > 320) return;

  if (window.scrollY > oldScrolledPixels) {
    navBar.style.top = '-30%';
    mobileNavButton.style.top = '-20%';
  } else {
    navBar.style.top = '0';
    mobileNavButton.style.top = '2.3rem';
  }

  oldScrolledPixels = window.scrollY;
}

window.addEventListener('scroll', screenScrolledpixels);

screenScrolledpixels();

//////////////////////////////////mobile nav bar moving on scroll//////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
let selectedPartnersPage = 0;
let autoSwitchingIsPauesed = true;
let oldSelectedPartnersPage;

const navDots = document.querySelectorAll('.dot');
const partnerImgs = document.querySelectorAll('.partner-img');
const partnerImgs1 = document.querySelectorAll('.partner-img-1');
const partnerImgs2 = document.querySelectorAll('.partner-img-2');
const partnerImgs3 = document.querySelectorAll('.partner-img-3');

updatePartnerImgs();
updateNavDots();

navDots.forEach((el, i) => {
  el.addEventListener('click', function () {
    autoSwitchingIsPauesed = true;
    setTimeout(autoSwitchingOn, 8000);

    selectedPartnersPage = i;

    slideLeftOrRight(oldSelectedPartnersPage, selectedPartnersPage);
    updatePartnerImgs();
    updateNavDots();
    oldSelectedPartnersPage = selectedPartnersPage;
  });
});

function autoSwitchingOn() {
  autoSwitchingIsPauesed = false;
}

const rightArrow = document.querySelector('.partner-right-arrow');
if (rightArrow)
  rightArrow.addEventListener('click', function () {
    autoSwitchingIsPauesed = true;
    setTimeout(autoSwitchingOn, 8000);

    selectedPartnersPage++;
    updatePartnerImgs();
    updateNavDots();
  });

const leftArrow = document.querySelector('.partner-left-arrow');
if (leftArrow)
  leftArrow.addEventListener('click', function () {
    autoSwitchingIsPauesed = true;
    setTimeout(autoSwitchingOn, 8000);

    selectedPartnersPage--;
    updatePartnerImgs();
    updateNavDots();
  });

function updateTimeWithInterval() {
  if (autoSwitchingIsPauesed) return;
  selectedPartnersPage++;

  updatePartnerImgs();
  updateNavDots();
}

// setInterval(updateTimeWithInterval, 3000);

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

const partnerArrows = document.querySelectorAll('.partner-arrow');
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
  if (newValue - oldValue > 0) {
    switchSide = 'right';
    updateSlider(switchSide);
  }
  if (newValue - oldValue < 0) {
    switchSide = 'left';
    updateSlider(switchSide);
  }
}

function updateSlider(side) {
  const partnersCenterBox = document.querySelector('.partners-center-box');

  if (side === 'right') {
    const partnersRightBox = document.createElement('div');
    partnersRightBox.classList.add('partners-right-box');
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
}

////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
const questions = document.querySelectorAll('.question-txt-and-arrow-box');
const questionsArrows = document.querySelectorAll('.question-arrow');

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
        activeQuestionAnswerHeight / 10 + 11.5
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
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  windowWidth = width;

  if (width <= 340) updateQuestionsForMobile();
  else updateQuestionsForComputer();
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
let mobileNavButtonIsActive = false;
let customerCanClickNavButton = true;

const hamburgerMenuList = document.querySelector('.hamburger-menu-list');

const hamburgerMenu = document.querySelector('.hamburger-menu');

const hamburgerMenuDarkBackground = document.querySelector(
  '.hamburger-menu-dark-background'
);

const MobileNavButtonTopPiece = document.querySelector('.top-piece');
const MobileNavButtonCenterPiece = document.querySelector('.center-piece');
const MobileNavButtonBottomPiece = document.querySelector('.bottom-piece');

mobileNavButton.addEventListener('click', function () {
  hamburgerMenuAnimations();
});
hamburgerMenuDarkBackground.addEventListener('click', function () {
  hamburgerMenuAnimations();
});

function throwAwayDarkBackground() {
  customerCanClickNavButton = false;
  const timeout = setTimeout(function () {
    hamburgerMenuDarkBackground.style.left = '-100%';
    customerCanClickNavButton = true;
  }, 600);
}

function hamburgerMenuAnimations() {
  if (!customerCanClickNavButton) return;

  if (mobileNavButtonIsActive) {
    mobileNavButtonIsActive = false;

    document.body.style.overflowY = 'scroll';

    mobileNavButton.style.transform = 'rotate(0deg)';

    MobileNavButtonTopPiece.style.left = '0';
    MobileNavButtonTopPiece.style.top = '0';
    MobileNavButtonTopPiece.style.transform = 'unset';

    MobileNavButtonBottomPiece.style.right = '0';
    MobileNavButtonBottomPiece.style.bottom = '0';
    MobileNavButtonBottomPiece.style.transform = 'unset';

    MobileNavButtonTopPiece.style.backgroundColor = '#dbdbdb';
    MobileNavButtonCenterPiece.style.backgroundColor = '#dbdbdb';
    MobileNavButtonBottomPiece.style.backgroundColor = '#dbdbdb';

    hamburgerMenuList.style.right = '21.8rem';

    hamburgerMenu.style.right = '-20rem';
    hamburgerMenu.style.backgroundColor = '#ffffff00';

    throwAwayDarkBackground();
    hamburgerMenuDarkBackground.style.backgroundColor = '#ffffff00';

    mobileNavButton.style.zIndex = '3';
  } else {
    mobileNavButtonIsActive = true;

    document.body.style.overflowY = 'hidden';

    mobileNavButton.style.transform = 'rotate(-45deg)';

    MobileNavButtonTopPiece.style.left = '50%';
    MobileNavButtonTopPiece.style.top = '11.47%';
    MobileNavButtonTopPiece.style.transform =
      'translate(-50%,0) rotate(-90deg)';

    MobileNavButtonBottomPiece.style.right = '50%';
    MobileNavButtonBottomPiece.style.bottom = '11.47%';
    MobileNavButtonBottomPiece.style.transform =
      'translate(50%,0) rotate(-90deg)';

    MobileNavButtonTopPiece.style.backgroundColor = '#767676';
    MobileNavButtonCenterPiece.style.backgroundColor = '#767676';
    MobileNavButtonBottomPiece.style.backgroundColor = '#767676';

    hamburgerMenu.style.right = '0';
    hamburgerMenu.style.transform = 'translate(0,0)';
    hamburgerMenu.style.backgroundColor = '#212121';

    hamburgerMenuList.style.right = '1.8rem';

    hamburgerMenuDarkBackground.style.left = '0%';
    hamburgerMenuDarkBackground.style.backgroundColor = '#1616169e';

    mobileNavButton.style.zIndex = '4';
  }
}
