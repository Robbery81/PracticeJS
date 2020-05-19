'use strict';
document.addEventListener('DOMContentLoaded', function () {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    let adv = document.querySelectorAll(".promo__adv img");
    adv.forEach(item => item.remove());

    document.getElementsByClassName("promo__genre")[0].textContent = "Драма";

    document.getElementsByClassName("promo__bg")[0].style.background = "URL('img/bg.jpg') top";

    function showList(listArr) {
        let list = document.querySelector(".promo__interactive-list");
        list.innerHTML = "";
        listArr.sort();
        listArr.forEach((film, i) => {
            list.innerHTML += `
    <li class="promo__interactive-item">${i+1}. ${film}
        <div class="delete"></div>
    </li>`
        });
    }

    showList(movieDB.movies);

    let form = document.getElementsByClassName("add")[0],
        input = document.querySelector(".adding__input"),
        checkbox = document.querySelectorAll("input"),
        btn = form.lastElementChild,
        deleteBtns = document.querySelectorAll(".delete");

    checkbox.forEach(input => {
        if (input.type == "checkbox") {
            checkbox = input;
        }
    });

    function addFilm(filmName) {
        movieDB.movies.push(filmName);
        showList(movieDB.movies);

        deteteFilmCheck();
        form.reset();
    }

    function trimNameFilm(filmName) {
        filmName = filmName.slice(0, 19); //1111111111111106789212345
        return filmName + "...";
    }

    function checkInput(e) {
        e.preventDefault();

        let filmName = input.value;
        let mostLoveFilm = checkbox.checked;

        e.target.reset();

        if (mostLoveFilm) {
            console.log("Добавляем любимый фильм");
        }
        if (filmName == "") {
            return;
        }
        if (filmName.length <= 21) {
            return addFilm(filmName);
        } else {
            filmName = trimNameFilm(filmName);
            return addFilm(filmName);
        }
    }



    function deleteFilm(e) {
        let numElement = +(e.target.parentElement.firstChild.nodeValue[0]);
        let index = numElement - 1;
        movieDB.movies.splice(index, 1);
        showList(movieDB.movies);

        deteteFilmCheck();
    }

    function deteteFilmCheck() {
        deleteBtns = document.querySelectorAll(".delete");
        deleteBtns.forEach(delBtn => {
            delBtn.addEventListener("click", deleteFilm);
        });
    }
    form.addEventListener("submit", e => checkInput(e));
    deteteFilmCheck();

}, false);