const slider = document.querySelector('#slider');
const slides = slider.querySelectorAll('[data-slide]');
const track = slider.querySelector('#track');
const gapBetweenSlides = parseFloat(getComputedStyle(track).columnGap);
const slideWidth = slides[0].offsetWidth;
const moveWidth = slideWidth + gapBetweenSlides;
let counterSlide = 0;

const motion = (e) => {
    if (counterSlide < slides.length - 1) {
        if (e.target.closest('[data-arrow="right"]')) {
            counterSlide++;
        }
    }
    if (counterSlide > 0) {
        if (e.target.closest('[data-arrow="left"]')) {
            counterSlide--;
        }
    }
    track.style.transform = `translateX(-${moveWidth * counterSlide}px)`;
    
}

slider.addEventListener('click', motion);