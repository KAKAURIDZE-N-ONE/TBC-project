const navBar = document.querySelector('.nav-bar-box');

const questionFixedHeigh = 80;

function screenScrolledpixels() {
  if (window.scrollY > 0) {
    navBar.classList.add('nav-bar-second-color');
  } else {
    navBar.classList.remove('nav-bar-second-color');
  }
}

window.addEventListener('scroll', screenScrolledpixels);

screenScrolledpixels();
///////////////////////////////////////////////////////////////////
let selectedPartnersPage = 0;
let autoSwitchingIsPauesed = false;

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
    updatePartnerImgs();
    updateNavDots();
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

setInterval(updateTimeWithInterval, 3000);

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
        activeQuestionAnswerHeight / 10 + 12.5
      }rem`;
      activeArrow.classList.add('question-arrow-rotate');
    }
  });
});

/////////////////////////////for questions/////////////////////////////
let windowWidth;
const questionsSection = document.querySelector('.frequent-questions-section');

function handleResizeScreen() {
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  windowWidth = width;

  if (windowWidth <= 520) updateQuestions();
}

window.addEventListener('resize', handleResizeScreen);

handleResizeScreen();

function updateQuestions() {
  const allQuestionTxt = document.querySelector('.all-question');
  console.log(questionsSection, allQuestionTxt);
  if (allQuestionTxt) allQuestionTxt.remove();
  questionsSection.append(allQuestionTxt);
}
