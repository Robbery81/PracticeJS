let personalMovieDB = {
    count: 5,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start() {
        this.count = +prompt("How many film you are watch?", "");

        while ((this.count == "") || (this.count == null) || isNaN(this.count)) {
            this.count = +prompt("How many film you are watch?", "");
        }
    },
    detectPersonalLvl() {
        if (this.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if ((this.count < 30) && (this.count >= 10)) {
            console.log("Вы классический зритель");
        } else if (this.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },
    rememberNyFilms() {
        function enterCheck(a) {
            if ((a == "") || (a == null) || (a.length > 50)) {
                return 0;
            }
            return 1;
        }

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
    },
    showMyDB() {
        return (this.privat == false) ? console.log(this) : console.log(false);
    },
    writeYourGenres() {
        for (this.genres.length; this.genres.length < 3;) {
            let genre = prompt("writeYourGenres", "");
            if ((genre == "") || (genre == null)) {
                continue;
            } else {
                this.genres.push(genre);
            }
        }
        this.genres.forEach((item, index) => console.log(`Любимый жанр ${index+1} - это ${item}`));
    },
    toggleVisibleMyDB() {
        this.privat = !(this.privat);
    },
};

personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB();