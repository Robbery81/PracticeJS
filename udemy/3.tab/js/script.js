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
        parentSelector: ['.menu .container'],
        classes: ['menu__item'],
    };

    function createMenuItem(content) {
        let countItem = content.img.length;
        for (let i = 0; i < countItem; i++) {
            new MenuItem(
                content.img[i],
                content.alt[i],
                content.sub[i],
                content.descr[i],
                content.total[i],
                content.parentSelector[0],
                content.classes).render();
        }
    }
    createMenuItem(menuItemContent);

    //Request to server

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        succes: 'Succes!',
        failure: 'Fail'
    };

    forms.forEach((item) => {
        postData(item);
    });

    function postData(form) {
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
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            fetch('server.php', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
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
});