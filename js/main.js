const slider = document.querySelector('#slider');
const slides = slider.querySelectorAll('[data-slide]');
const track = slider.querySelector('#track');
const controllList = Array.from(slider.querySelectorAll('[data-button-controll]'));
const gapBetweenSlides = parseFloat(getComputedStyle(track).columnGap);
const slideWidth = slides[0].offsetWidth;
const moveWidth = slideWidth + gapBetweenSlides;
const minMove = 20;
let counterSlide = 0;
let startPoint = 0;
let endPoint = 0;
let currentMove = 0;

const motion = () => {
    track.style.transform = `translateX(-${moveWidth * counterSlide}px)`;
    btnControllStyle(counterSlide);
}

const handlerControllElements = (e) => {
    const isRightArrow = e.target.closest('[data-arrow="right"]');
    const isLeftArrow = e.target.closest('[data-arrow="left"]');
    const isControllButton = e.target.closest('[data-button-controll]');

    if (isControllButton) {
        const indexCurrentBtnControll = controllList.indexOf(isControllButton);
        counterSlide = indexCurrentBtnControll;
    }

    if (isRightArrow) {
        choiceOfDirection('right');
    } else if (isLeftArrow) {
        choiceOfDirection('left');
    }

    motion(counterSlide);
}

const choiceOfDirection = (direction) => {
    if (direction === 'right') {
        counterSlide = (counterSlide < slides.length - 1) ? counterSlide + 1 : 0;
    } else if (direction === 'left') {
        counterSlide = (counterSlide > 0) ? counterSlide - 1 : slides.length - 1;
    }
}

const handlerMoveAction = () => {
    currentMove = startPoint - endPoint;
    if (Math.abs(currentMove) > minMove) {
        if (currentMove > 0) {
            choiceOfDirection('right');
        } else {
            choiceOfDirection('left');
        }
    }
    motion(counterSlide);
}

const startHandler = (e) => {
    const point = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    startPoint = point;
    endPoint = startPoint;
}

const endHandler = (e) => {
    const point = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
    endPoint = point;
    handlerMoveAction();
}

const btnControllStyle = (indexCurrentBtn) => {
    const activeBtn = slider.querySelector('button.active');
    if (activeBtn) activeBtn.classList.remove('active');
    controllList[indexCurrentBtn].classList.add('active');
}

slider.addEventListener('click', handlerControllElements);
track.addEventListener('mousedown', startHandler);
track.addEventListener('mouseup', endHandler);
track.addEventListener('touchstart', startHandler);
track.addEventListener('touchend', endHandler);