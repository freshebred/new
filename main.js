import quizData from './data.json';
import { videoConfig } from './js/videoConfig.js';
import { QuizManager } from './js/quizManager.js';
import { FullscreenManager } from './js/fullscreenManager.js';

let player;
let fullscreenManager;
const quizManager = new QuizManager();

async function startExperience() {
  const startScreen = document.getElementById('start-screen');
  const container = document.querySelector('.container');
  
  startScreen.style.display = 'none';
  container.style.display = 'block';
  
  await initializeVideo();
}

async function initializeVideo() {
  player = videojs('my-video', videoConfig);
  window.player = player;

  const videoElement = document.querySelector('#my-video');
  fullscreenManager = new FullscreenManager(videoElement);
  fullscreenManager.init();

  const fullscreenGranted = await fullscreenManager.requestFullscreen();
  if (fullscreenGranted) {
    player.play();
  }

  player.on('timeupdate', checkForQuiz);
}

function checkForQuiz() {
  const currentTime = Math.floor(player.currentTime());
  
  quizData.quizzes.forEach((quiz, index) => {
    if (currentTime === quiz.timestamp && !quizManager.answeredQuestions.has(index)) {
      player.pause();
      quizManager.showQuiz(quiz, index);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', startExperience);
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (player) {
    player.dispose();
  }
});