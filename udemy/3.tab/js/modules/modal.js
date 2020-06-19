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

export default modal;
export {showModal};
export {hideModal};