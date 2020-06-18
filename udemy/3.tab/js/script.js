document.addEventListener("DOMContentLoaded", function () {

    //Tab
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) => {
        let target = e.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    const deadline = "2020-06-09T14:00:00";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (24 * 60 * 60 * 1000)),
            hours = Math.floor((t / (60 * 60 * 1000)) % 24),
            min = Math.floor((t / (60 * 1000)) % 60),
            sec = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            days,
            hours,
            min,
            sec
        };
    }

    function setTimeRemaining(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function getZero(num) {
            return num >= 10 ? num : `0${num}`;
        }

        function updateClock() {
            const t = getTimeRemaining(endtime);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                return;
            }

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.min);
            seconds.innerHTML = getZero(t.sec);


        }
    }

    setTimeRemaining('.timer', deadline);

    //Modal
    let modalBtns = document.querySelectorAll("[data-modal]"),
        modalWindow = document.querySelector(".modal");

    modalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            showModal();
        });
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    function showModal() {
        modalWindow.style.display = "block";
        document.body.style.overflow = "hidden";
        //clearInterval(modalTimerId);
    }

    function hideModal() {
        modalWindow.style.display = "none";
        document.body.style.overflow = "";
    }

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') === "") {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.style.display === "block") {
            hideModal();
        }
    });

    //const modalTimerId = setTimeout(showModal, 10000);

    window.addEventListener('scroll', showModalByScroll);

    //Menu

    class MenuItem {
        constructor(imgUrl, alt, subtitle, descr, total, parentSelector, ...classes) {
            this.imgUrl = imgUrl;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }


        changeToUAH() {
            this.total *= this.transfer;
        }

        render() {
            let element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes.push("menu__item");
            }

            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
            <img src=${this.imgUrl} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
            </div>`;
            this.parent.append(element);
        }

    }

    let getResourses = async (url) => {
        let req = await fetch(url);

        if (!req.ok) {
            throw new Error(`Could not fetch ${url} ${req.status}`);
        }
        return await req.json();
    };

    function createMenuItem() {
        getResourses('http://localhost:3000/menu')
            .then(data => {
                data.forEach(({
                    img,
                    alt,
                    title,
                    descr,
                    price
                }) => {
                    new MenuItem(img, alt, title, descr, price,
                        '.menu .container',
                        'menu__item').render();
                });
            });
    }
    createMenuItem();

    //Request to server

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        succes: 'Succes!',
        failure: 'Fail'
    };

    forms.forEach((item) => {
        formPostData(item);
    });

    let postData = async (url, data) => {

        let req = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });
        return await req.json();
    };

    function formPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            /* let r = new XMLHttpRequest();
            r.open('POST', 'server.php');
            r.setRequestHeader('Content-type', 'application/json'); 
            r.send(json);*/

            let formData = new FormData(form);
            /* const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            }); */

            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    showMessage(message.succes);
                    statusMessage.remove();
                }).catch(() => {
                    showMessage(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showMessage(message) {
        showModal();
        let oldModalContent = document.querySelector('.modal__content');
        oldModalContent.classList.add('hide');

        let messageDiv = document.createElement('div');
        messageDiv.classList.add('modal__content');
        messageDiv.innerHTML = `
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
        `;
        document.querySelector('.modal__dialog').append(messageDiv);
        setTimeout(() => {
            hideModal();
            messageDiv.remove();
            oldModalContent.classList.remove('hide');
        }, 2000);
    }

    //Slider
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

    let slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        offerSlideTotalNode = document.querySelector('#total'),
        slideCurentCounterNode = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
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





    /* 
        showSlides(slideCurent);

        function checkNum(num) {
            return num >= 10 ? num : `0${num}`;
        }


        function showSlides(n) {
            if (n > slides.length) {
                slideCurent = 1;
            }

            if (n < 1) {
                slideCurent = slides.length;
            }

            slides.forEach(slide => slide.classList.add('hide'));

            slideCurentCounterNode.textContent = checkNum(slideCurent);
            slides[slideCurent - 1].classList.remove('hide');
        }

        function plusSlides(n) {
            showSlides(slideCurent += n);
        }

        prev.addEventListener('click', (e) => {
            plusSlides(-1);
        });

        next.addEventListener('click', (e) => {
            plusSlides(1);
        }); */

    // Calc

    let calcResult = document.querySelector('.calculating__result>span');


    let sex,
        ratio,
        weight,
        height,
        age;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
        let elementBlock = document.querySelectorAll(`#gender div`);
        elementBlock.forEach(block => {
            if (block.id == sex) {
                block.classList.add('calculating__choose-item_active');
            } else {
                block.classList.remove('calculating__choose-item_active');
            }
        });
    } else {
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
        let elementBlock = document.querySelectorAll('.calculating__choose_big div');
        elementBlock.forEach(block => {
            if ((block.getAttribute("data-ratio")) == ratio) {
                block.classList.add('calculating__choose-item_active');
            } else {
                block.classList.remove('calculating__choose-item_active');
            }
        });
    } else {
        localStorage.setItem('ratio', 1.375);
    }

    function calculateCalories() {
        if (!weight || !height || !age) {
            calcResult.textContent = "___";
            return;
        }
        if (sex === "female") {
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calculateCalories();

    function checkFieldBtn(parentSelector, activeClass) {
        let elementBlock = document.querySelectorAll(`${parentSelector} div`);
        elementBlock.forEach(block => {
            block.addEventListener('click', (e) => {
                elementBlock.forEach(block => block.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                if (e.target.hasAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else if (e.target.id == "male") {
                    localStorage.setItem('sex', 'male');
                    sex = "male";
                } else {
                    localStorage.setItem('sex', 'female');
                    sex = "female";
                }

                calculateCalories();
            });
        });
    }

    function checkInput(input) {
        let inputField = document.querySelector(input);
        inputField.addEventListener('input', (e) => {
            if (e.target.value.match(/\D/g)) {
                e.target.style.border = "1px solid red";
            } else {
                e.target.style.border = "none";
            }
            switch (e.target.id) {
                case 'height':
                    height = +e.target.value;
                    break;
                case 'weight':
                    weight = +e.target.value;
                    break;
                case 'age':
                    age = +e.target.value;
                    break;
            }
            calculateCalories();
        });
    }

    checkFieldBtn('#gender', 'calculating__choose-item_active');
    checkFieldBtn('.calculating__choose_big', 'calculating__choose-item_active');
    checkInput('#height');
    checkInput('#weight');
    checkInput('#age');
});