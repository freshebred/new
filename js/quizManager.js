export class QuizManager {
  constructor() {
    this.currentScore = 0;
    this.answeredQuestions = new Set();
    this.currentQuizIndex = null;
  }

  showQuiz(quiz, quizIndex) {
    const modal = document.getElementById('quiz-modal');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const retryMessage = document.getElementById('retry-message');

    this.currentQuizIndex = quizIndex;
    questionText.textContent = quiz.question;
    optionsContainer.innerHTML = '';
    retryMessage.textContent = '';

    quiz.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = option;
      button.onclick = () => this.handleAnswer(index === quiz.correctAnswer, button, quiz);
      optionsContainer.appendChild(button);
    });

    // Ensure modal is displayed on top of fullscreen video
    modal.style.display = 'block';
    if (document.fullscreenElement) {
      document.fullscreenElement.appendChild(modal);
    }
  }

  handleAnswer(isCorrect, button, quiz) {
    const modal = document.getElementById('quiz-modal');
    const scoreElement = document.getElementById('score');
    const retryMessage = document.getElementById('retry-message');
    const buttons = document.querySelectorAll('.option-button');
    
    buttons.forEach(btn => btn.disabled = true);
    button.classList.add(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      this.currentScore += 10;
      scoreElement.textContent = this.currentScore;
      this.answeredQuestions.add(this.currentQuizIndex);
      
      setTimeout(() => {
        modal.style.display = 'none';
        // Move modal back to body when hiding
        if (modal.parentElement !== document.body) {
          document.body.appendChild(modal);
        }
        window.player.play();
      }, 1500);
    } else {
      retryMessage.textContent = 'Incorrect! Try again.';
      setTimeout(() => {
        buttons.forEach(btn => {
          btn.disabled = false;
          btn.classList.remove('incorrect');
        });
      }, 1500);
    }
  }
}