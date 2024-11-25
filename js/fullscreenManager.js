export class FullscreenManager {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.container = document.querySelector('.video-container');
  }

  async requestFullscreen() {
    try {
      if (document.fullscreenEnabled) {
        await this.container.requestFullscreen();
        return true;
      }
      console.warn('Fullscreen not supported');
      return false;
    } catch (error) {
      console.error('Fullscreen request failed:', error);
      return false;
    }
  }

  handleFullscreenChange() {
    const isFullscreen = document.fullscreenElement !== null;
    this.container.classList.toggle('fullscreen', isFullscreen);
    document.body.classList.toggle('in-fullscreen', isFullscreen);
  }

  init() {
    document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
  }
}