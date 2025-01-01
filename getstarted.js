let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let isVideoPlaying = false;

function showSlides() {
  if (!isVideoPlaying) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
    });
  }
}

// Change slide manually with arrows
function changeSlide(direction) {
  slideIndex = (slideIndex + direction + totalSlides) % totalSlides; // Loop around
  showSlides();
}

// Auto-slide every 5 seconds, but pause if the video is playing
setInterval(() => {
  if (!isVideoPlaying) {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlides();
  }
}, 5000);

// Pause auto-slide when the video is playing
const videoSlide = document.querySelector('video');
videoSlide.addEventListener('play', () => {
  isVideoPlaying = true;
});

videoSlide.addEventListener('pause', () => {
  isVideoPlaying = false;
});
