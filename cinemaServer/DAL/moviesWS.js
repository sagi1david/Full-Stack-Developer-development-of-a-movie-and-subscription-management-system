const axios = require("axios");

const urlMovies = "http://localhost:3000/movies";

// Get All
const getAllMovies =  async () => {
  const {data: movies} = await axios.get(urlMovies);
  return  movies;
};

// Get By ID
const getMovieById = (id) => {
  return axios.get(`${urlMovies}/${id}`);
};

// Post
const addMovie = (obj) => {
  axios.post(urlMovies,obj)
  return "Created!";
};

// Put
const updateMovie = (id, obj) => {
  axios.put(`${urlMovies}/${id}`, obj);
  return "Updated!";
};

//Delete
const deleteMovie = (id) => {
  axios.delete(`${urlMovies}/${id}`);
  return "Deleted!";
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};

