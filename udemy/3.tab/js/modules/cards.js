import {getResourses} from '../services/services';
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
}

export default cards;