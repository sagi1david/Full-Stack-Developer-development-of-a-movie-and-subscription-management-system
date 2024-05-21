const moviesDAL = require("../DAL/moviesDAL");
const moviesWS = require("../DAL/moviesWS");

// Load movies data to DB
const moviesLoadData = async () => {
  const  movies = await moviesDAL.getAllMovies();

  if (movies.length === 0) {
    const { data: movies } = await moviesWS.getAllMovies();

    movies.forEach((movie) => {
      console.log(movie.premiered.substring(0, 10))

      const obj = {
        name: movie.name,
        genres: movie.genres,
        image: movie.image.medium,
        premiered: movie.premiered.substring(0, 10),
      };

      console.log(obj.premiered)

      moviesDAL.addMovie(obj);
    });
  }
};

module.exports = {
  moviesLoadData,
};
