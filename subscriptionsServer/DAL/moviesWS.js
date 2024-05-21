const axios = require("axios");

const urlMovies = "https://api.tvmaze.com/shows";

const getAllMovies = async () => {
  return await axios.get(urlMovies);
};

const getMovieById = async (id) => {
  return await axios.get(`${urlMovies}/${id}`);
};

module.exports = { getAllMovies, getMovieById };
