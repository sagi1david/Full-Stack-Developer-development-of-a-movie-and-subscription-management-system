const movieDAL = require("../DAL/moviesWS");
const subscriptionDAL = require("../DAL/subscriptionsWS");

//Get all movies Data
const getAllMovies = async () => {
  return movieDAL.getAllMovies();
};

//Get all movie data by id
const getMovieById = async (id) => {
  return movieDAL.getMovieById(id);
};

//Create a new movie
const createNewMovie = async (obj) => {
  return movieDAL.createNewMovie(obj);
};

//Update a movie
const updateMovie = async (id, obj) => {
  return movieDAL.updateMovie(id, obj);
};

//Delete a movie
const deleteMovie = async (id) => {
  const subscriptions = subscriptionDAL.getAllSubscriptions();

  subscriptions.map((subscription) => {
    const obj = subscription;
    const movie = subscription.movies.find((movie) => {
      return movie.movieId === id;
    });

    console.log(obj);

    obj.movies.splice(movie._id, 1);
    
    console.log(obj);

    subscriptionDAL.updateSubscription(subscription._id, obj);
  });

  movieDAL.deleteMovie(id);

  return "Deleted!";
};

module.exports = {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie,
};
