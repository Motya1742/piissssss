let numberOfFilms;
do{
    numberOfFilms = +prompt('Сколько фильмов посмотрели?', '');
}while (isNaN(numberOfFilms)||numberOfFilms===0);

const personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};

for (let i = 0; i < numberOfFilms; i++){
    let filmTitle, filmRating;
    do {
        filmTitle = prompt('Один из последних просмотренных фильмов?','');
    }while (filmTitle === '' || filmTitle.length > 50);
    do {
        filmRating = +prompt('На сколько оцените его от 1 до 10?', '')
    }while (isNaN(filmRating) || filmRating < 1 || filmRating > 10);

    personalMovieDB.movies[filmTitle] = filmRating
}

console.log(personalMovieDB)
