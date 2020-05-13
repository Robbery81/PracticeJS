let numberOfFilms,
    genre;

function start() {
    numberOfFilms = +prompt("How many film you are watch?", "");

    while ((numberOfFilms == "") || (numberOfFilms == null) || isNaN(numberOfFilms)) {

        numberOfFilms = +prompt("How many film you are watch?", "");
    }
}

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};

function detectPersonalLvl() {
    if (numberOfFilms < 10) {
        console.log("Просмотрено довольно мало фильмов");
    } else if ((numberOfFilms < 30) && (numberOfFilms >= 10)) {
        console.log("Вы классический зритель");
    } else if (numberOfFilms >= 30) {
        console.log("Вы киноман");
    } else {
        console.log("Произошла ошибка");
    }
}

function enterCheck(a) {
    if ((a == "") || (a == null) || (a.length > 50)) {
        return 0;
    }
    return 1;
}

function rememberNyFilms() {
    for (let i = 0; i < 2; i++) {
        while (true) {
            let film = prompt("Film?", "logan");
            let mark = prompt(`Mark for ${film}`, "8");
            if (enterCheck(film) && enterCheck(mark)) {
                personalMovieDB.movies[film] = mark;
                break;
            }
            continue;
        }
    }
}

function showMyDB(obj) {
    return (obj.privat == false) ? console.log(obj) : false;
}

function writeYourGenres(obj) {
    for (obj.genres.length; obj.genres.length < 3;) {
        genre = prompt("writeYourGenres", "");
        if ((genre == "") || (genre == null)) {
            continue;
        } else {
            obj.genres.push(genre);
        }

    }
}

writeYourGenres(personalMovieDB);