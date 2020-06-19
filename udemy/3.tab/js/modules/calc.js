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

export default calc; 