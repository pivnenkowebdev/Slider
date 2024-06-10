const slider = document.querySelector('#slider');
const slides = slider.querySelectorAll('[data-slide]');
const track = slider.querySelector('#track');
const controllList = Array.from(slider.querySelectorAll('[data-button-controll]'));
const gapBetweenSlides = parseFloat(getComputedStyle(track).columnGap);
const slideWidth = slides[0].offsetWidth;
const moveWidth = slideWidth + gapBetweenSlides;
let counterSlide = 0;

const motion = (e) => {
    const isRightArrow = e.target.closest('[data-arrow="right"]');
    const isLeftArrow = e.target.closest('[data-arrow="left"]');
    const isControllButton = e.target.closest('[data-button-controll]');

    if (isControllButton) {
        const indexCurrentBtnControll = controllList.indexOf(e.target.closest('[data-button-controll]'));
        btnControllStyle(isControllButton);
        counterSlide = indexCurrentBtnControll;
    }

    if (isRightArrow) {
        counterSlide = (counterSlide < slides.length - 1) ? counterSlide + 1 : 0;
    } else if (isLeftArrow) {
        counterSlide = (counterSlide > 0) ? counterSlide - 1 : slides.length - 1;
    }
    track.style.transform = `translateX(-${moveWidth * counterSlide}px)`;
}

const btnControllStyle = (currentBtn) => {
    const activeBtn = slider.querySelector('button.active');
    activeBtn.classList.remove('active');
    currentBtn.classList.add('active');
}

slider.addEventListener('click', motion);
