/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {

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
}

/* harmony default export */ __webpack_exports__["default"] = (calc); 

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {

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

    

    function createMenuItem() {
        Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResourses"])('http://localhost:3000/menu')
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
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        succes: 'Succes!',
        failure: 'Fail'
    };

    forms.forEach((item) => {
        formPostData(item);
    });

    

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

            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
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
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showModal"])('.modal', modalTimerId);
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
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["hideModal"])('.modal');
            messageDiv.remove();
            oldModalContent.classList.remove('hide');
        }, 2000);
    }

}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, showModal, hideModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModal", function() { return showModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideModal", function() { return hideModal; });
function showModal(modalSelector, modalTimerId) {
    let modalWindow = document.querySelector(modalSelector);
    modalWindow.style.display = "block";
    document.body.style.overflow = "hidden";
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function hideModal(modalSelector) {
    let modalWindow = document.querySelector(modalSelector);
    modalWindow.style.display = "none";
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    let modalBtns = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    modalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            showModal(modalSelector, modalTimerId);
        });
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') === "") {
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.style.display === "block") {
            hideModal(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabActive) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(tabActive);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add(tabActive);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) => {
        let target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
//Timer

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

setTimeRemaining(id, deadline);

}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
    
    
    
    
    
    
    
    

document.addEventListener("DOMContentLoaded", function () {

    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_4__["showModal"])('.modal', modalTimerId), 50000);

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', ".tabcontent", ".tabheader__items", "tabheader__item_active");
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', modalTimerId);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow:'.offer__slider-prev', 
        totalCounter: '#total', 
        curentCounter: '#current',
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'

    });
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2020-06-29T14:00:00");

});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResourses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourses", function() { return getResourses; });
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

let getResourses = async (url) => {
    let req = await fetch(url);

    if (!req.ok) {
        throw new Error(`Could not fetch ${url} ${req.status}`);
    }
    return await req.json();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map