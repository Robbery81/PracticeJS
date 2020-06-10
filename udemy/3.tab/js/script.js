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
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.min);
            seconds.innerHTML = getZero(t.sec);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setTimeRemaining('.timer', deadline);

    //Modal
    let modalBtns = document.querySelectorAll("[data-modal]"),
        closeModal = document.querySelector('[data-close]'),
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

    closeModal.addEventListener("click", hideModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
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
        constructor(imgUrl, alt, subtitle, descr, total, parentSelector) {
            this.imgUrl = imgUrl;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }


        changeToUAH() {
            this.total *= this.transfer;
        }

        render() {
            let element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
            <img src=${this.imgUrl} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
            </div>
            </div>`;
            console.log(this.parent);
            console.log(element);
            this.parent.append(element);
        }

    }

    let menuItemContent = {
        img: ["img/tabs/post.jpg", "img/tabs/elite.jpg", "img/tabs/vegy.jpg"],
        alt: ["post", "elite", "vegy"],
        sub: ['Меню "Постное"', 'Меню “Премиум”', 'Меню "Фитнес"'],
        descr: [
            "Меню“ Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
            "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
            "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!"
        ],
        total: [430, 550, 229],
        parentSelector: ['.menu .container']
    };

    function createMenuItem(content) {
        let countItem = content.img.length;
        console.log("object");
        for (let i = 0; i < countItem; i++) {
            new MenuItem(
                content.img[i],
                content.alt[i],
                content.sub[i],
                content.descr[i],
                content.total[i],
                content.parentSelector[0]).render();
        }
    }
    createMenuItem(menuItemContent);
});