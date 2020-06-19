function slider({container, slide, nextArrow, prevArrow, totalCounter, curentCounter, wrapper, field}) {

let slideCurent = 1;
let slideOfset = 0;


function checkLocalStorege() {
    if (localStorage.getItem('slideCurent')) {
        slideCurent = +localStorage.getItem('slideCurent');
        showSlide(slideCurent, "first");
    } else {
        slideCurent = 1;
        saveLocalStorage();
    }
}

function saveLocalStorage() {
    localStorage.setItem('slideCurent', slideCurent);
}

let slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    offerSlideTotalNode = document.querySelector(totalCounter),
    slideCurentCounterNode = document.querySelector(curentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;
// heigth = window.getComputedStyle(slides[0]).height;

let dotWrapper = document.createElement('div');
dotWrapper.classList.add('carousel-indicators');
slider.style.position = 'relative';
slider.append(dotWrapper);

createDot(slides.length);
let dot = document.querySelectorAll('.dot');

let dots = document.querySelectorAll('.dot');

checkLocalStorege();

function createDot(count) {
    for (let i = 1; i <= count; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-number', `${i}`);
        dotWrapper.append(dot);
        if (i == slideCurent) {
            dot.style.backgroundColor = 'red';
        }
    }
}

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        whiteDots();
        dot.style.backgroundColor = 'red';
        showSlide(+dot.dataset.number);

    });
});

slidesField.style.width = 100 * slides.length + '%'; //reserv width for slides
//slidesField.style.heigth = 100 * slides.length + '%'; //reserv width for slides
slidesField.style.display = 'flex';
//slidesField.style.flexDirection = 'column'; for vertical carousel
slidesField.style.transition = '0.5s all';

//slidesWrapper.style.height = heigth;
slidesWrapper.style.overflow = 'hidden';
slides.forEach(slide => slide.style.width = width);

offerSlideTotalNode.textContent = checkNum(slides.length);
slideCurentCounterNode.textContent = checkNum(slideCurent);

function checkNum(num) {
    return num >= 10 ? num : `0${num}`;
}

function delNoDigit(str) {
    return +str.replace(/\D/g, '');
}

function slideCounter(i) {
    if (i == 0) {
        i = slides.length;
    } else if (i > slides.length) {
        i = 1;
    }
    slideCurentCounterNode.textContent = checkNum(i);
    return i;
}

function nextSlide() {
    if (slideOfset == delNoDigit(width) * (slides.length - 1)) {
        slideOfset = 0;
    } else {
        slideOfset += delNoDigit(width);
    }
    slidesField.style.transform = `translateX(-${slideOfset}px)`;
    slideCurent = slideCounter(++slideCurent);
    saveLocalStorage();
    whiteDots();
    dot[slideCurent - 1].style.backgroundColor = 'red';
}

function prevSlide() {
    if (slideOfset == 0) {
        slideOfset = delNoDigit(width) * (slides.length - 1);
    } else {
        slideOfset -= delNoDigit(width);
    }
    slidesField.style.transform = `translateX(-${slideOfset}px)`;
    slideCurent = slideCounter(--slideCurent);
    saveLocalStorage();
    whiteDots();
    dot[slideCurent - 1].style.backgroundColor = 'red';
}

next.addEventListener('click', (e) => {
    nextSlide();
});

prev.addEventListener('click', (e) => {
    prevSlide();
});

function whiteDots() {
    dots.forEach(d => d.style.backgroundColor = 'white');
}

function showSlide(num = slideCurent, str = 'simple') {
    let delta = num - slideCurent;

    if (delta) {
        for (let i = 0; i < delta; i++) {
            nextSlide();
        }
    }
    if (delta < 0) {
        for (let i = 0; i > delta; i--) {
            prevSlide();
        }
    }
    slideCurentCounterNode.textContent = checkNum(slideCurent);
    if (str == "first") {
        whiteDots();
        dot[slideCurent - 1].style.backgroundColor = 'red';
        for (let i = 1; i < slideCurent; i++) {
            slideOfset += +width.replace(/\D/g, '');
        }
        slidesField.style.transform = `translateX(-${slideOfset}px)`;
    }
}
}

export default slider;