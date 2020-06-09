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
        clearInterval(modalTimerId);
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

    const modalTimerId = setTimeout(showModal, 10000);

    window.addEventListener('scroll', showModalByScroll);

});