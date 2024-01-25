//The page starts from the bottom
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let selectedPartnersPage = 0;
let autoSwitchingIsPauesed = false;
let draggingIsPaused = false;
let oldSelectedPartnersPage = 0;

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

//Provides automatic switching off when the mouse is hovered
divForAutoSwitchingPause.addEventListener('mouseenter', handleMouseEnter);
divForAutoSwitchingPause.addEventListener('mouseleave', handleMouseLeave);
partnerArrows[0].addEventListener('mouseenter', handleMouseEnter);
partnerArrows[0].addEventListener('mouseleave', handleMouseLeave);
partnerArrows[1].addEventListener('mouseenter', handleMouseEnter);
partnerArrows[1].addEventListener('mouseleave', handleMouseLeave);
dotsBox.addEventListener('mouseenter', handleMouseEnter);
dotsBox.addEventListener('mouseleave', handleMouseLeave);
//////////////////////////////////////////////////////////////////////////////////////////////////
let turnedOffPartnersArrowButtons = false;

const navDots = document.querySelectorAll('.dot');
const partnerImgs = document.querySelectorAll('.partner-img');
const partnerImgs1 = document.querySelectorAll('.partner-img-1');
const partnerImgs2 = document.querySelectorAll('.partner-img-2');
const partnerImgs3 = document.querySelectorAll('.partner-img-3');

//The slider refreshes as soon as the page loads
updatePartnerImgs();
updateNavDots();

const AUTO_SWITCH_DELAY_TIME = 6000;
let delayAutoSwitching;

//Dotted navigation for both mobile and desktop versions
navDots.forEach((el, i) => {
  el.addEventListener('click', function () {
    if (draggingIsPaused) return;

    oldSelectedPartnersPage = selectedPartnersPage;
    selectedPartnersPage = i;
    //slider for mobile version
    window.innerWidth <= 320 &&
      slideLeftOrRightMobile(oldSelectedPartnersPage, selectedPartnersPage);

    updatePartnerImgs();
    updateNavDots();
    //Don't let navigation work until you slide
    clearTimeout(delayAutoSwitching);
    delayAutoSwitching = setTimeout(
      () => (autoSwitchingIsPauesed = false),
      AUTO_SWITCH_DELAY_TIME
    );
  });
});

//partner sections slider for computer screen
const PARTNER_IMG_TRANSITION_TIME = 1000; //1 second

const leftArrow = document.querySelector('.partner-left-arrow');
const rightArrow = document.querySelector('.partner-right-arrow');
const partnersArrows = [leftArrow, rightArrow];
partnerArrows.forEach((el, i) => {
  if (el) {
    el.addEventListener('click', () => {
      if (turnedOffPartnersArrowButtons) return;
      oldSelectedPartnersPage = selectedPartnersPage;
      i === 0 ? selectedPartnersPage-- : selectedPartnersPage++;
      updatePartnerImgs();
      updateNavDots();

      //Don't let navigation work until you slide
      turnedOffPartnersArrowButtons = true;
      setTimeout(
        () => (turnedOffPartnersArrowButtons = false),
        PARTNER_IMG_TRANSITION_TIME
      );
    });
  }
});

const AUTO_SWITCH_INTERVAL = 2500; //2.5second

function updateTimeWithInterval() {
  if (autoSwitchingIsPauesed || draggingIsPaused) return;
  selectedPartnersPage++;

  updatePartnerImgs();
  updateNavDots();
  slideLeftOrRightMobile(selectedPartnersPage - 1, selectedPartnersPage);
}
// Automatic switching is performed at intervals
setInterval(updateTimeWithInterval, AUTO_SWITCH_INTERVAL);

//This function selects which page to load for the PC version of the slider and disables the old one
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

//it is changing src of arrows after hover
partnerArrows.forEach(el => {
  el.addEventListener('mouseenter', function () {
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

// This function determines from which side the next page should be loaded
function slideLeftOrRightMobile(oldValue, newValue) {
  selectedPartnersPage = newValue < 0 ? 2 : newValue > 2 ? 0 : newValue;
  if (newValue - oldValue > 0) {
    updateSlider('right', selectedPartnersPage);
    updateNavDots();
  }
  if (newValue - oldValue < 0) {
    updateSlider('left', selectedPartnersPage);
    updateNavDots();
  }
}

//To implement the animation
function updateSlider(side, pageIndex) {
  const partnersCenterBox = document.querySelector('.partners-center-box');
  const partnersLeftOrRightBox = document.createElement('div');
  partnersLeftOrRightBox.classList.add(`partners-${side}-box`);
  //I add photos in the div with the appropriate index. The function is located in function.js
  addImgsInsideBoxSlide(partnersLeftOrRightBox, pageIndex);

  side === 'right'
    ? slidersContainer.append(partnersLeftOrRightBox)
    : slidersContainer.prepend(partnersLeftOrRightBox);
  //When added to the appropriate side, change the classes to center and left or right div
  //The function is located in function.js
  addAndRemoveClassesMobileSlider(
    partnersLeftOrRightBox,
    partnersCenterBox,
    side
  );

  //Pauses the next touch before loading the slide
  draggingIsPaused = true;
  handleTurnOnDragging();
}

///////////////////////////////dragging slide/////////////////////////////
let isDragging = false;
let startX = 0;

slidersContainer.addEventListener('touchstart', handleTouchStart, {
  passive: true,
});
slidersContainer.addEventListener('touchmove', handleTouchMove, {
  passive: true,
});
slidersContainer.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(e) {
  isDragging = true;
  startX = e.touches[0].clientX;
  autoSwitchingIsPauesed = true;
}

//The countdown starts over for every action
let cancelDragging;
function handleTurnOnDragging() {
  clearTimeout(cancelDragging);
  cancelDragging = setTimeout(
    () => (draggingIsPaused = false),
    PARTNER_IMG_TRANSITION_TIME
  );
}
//after touch move activates slide on appropriate side
function handleTouchMove(e) {
  autoSwitchingIsPauesed = true;
  const PIXELS_NEED_TO_SLIDE = 50;

  if (!isDragging || draggingIsPaused) return;
  currentX = e.touches[0].clientX;
  const differenceBetweenStartAndCurrent = currentX - startX;

  if (Math.abs(differenceBetweenStartAndCurrent) >= PIXELS_NEED_TO_SLIDE) {
    differenceBetweenStartAndCurrent > 0
      ? slideLeftOrRightMobile(selectedPartnersPage, --selectedPartnersPage)
      : slideLeftOrRightMobile(selectedPartnersPage, ++selectedPartnersPage);
  }
  //Pauses the next touch before loading the slide and The countdown starts over for every action
  clearTimeout(delayAutoSwitching);
  delayAutoSwitching = setTimeout(
    () => (autoSwitchingIsPauesed = false),
    AUTO_SWITCH_DELAY_TIME
  );
}

function handleTouchEnd() {
  isDragging = false;
  autoSwitchingIsPauesed = true;
}

////////////////////////////////////////////functions/////////////////////////////////////////
