import {showModal, hideModal} from './modal';
import {postData} from '../services/services';

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
        showModal('.modal', modalTimerId);
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
            hideModal('.modal');
            messageDiv.remove();
            oldModalContent.classList.remove('hide');
        }, 2000);
    }

}

export default forms;