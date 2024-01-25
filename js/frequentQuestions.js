const questions = document.querySelectorAll('.question-txt-and-arrow-box');
const questionsArrows = document.querySelectorAll('.question-arrow');
const ALL_NEED_PLUS_HEIGHT = 11.5;
const QUESTION_FIXED_HEIGHT = 80;

// When you click on a question, it rotates its arrow and calculates how high the question container should grow
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

    if (Number(activeQuestionHeight) === QUESTION_FIXED_HEIGHT) {
      activeQuestion.style.height = `${
        activeQuestionAnswerHeight / 10 + ALL_NEED_PLUS_HEIGHT
      }rem`;
      activeArrow.classList.add('question-arrow-rotate');
    }
  });
});
