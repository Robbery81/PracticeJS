let numberOfFilms = +prompt("How many film you are watch?", "");

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};

console.log(personalMovieDB);

for (let i = 0; i < 2; i++) {
    let film = prompt("Film?", "logan");
    let mark = prompt("Mark", "8");
    personalMovieDB.movies[film] = mark;
}

console.log(personalMovieDB);