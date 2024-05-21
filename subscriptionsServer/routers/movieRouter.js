const express = require("express");
const moviesDAL = require("../DAL/moviesDAL");

// Entry point: http://localhost:3000/movies

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await moviesDAL.getAllMovies();
    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesDAL.getMovieById(id);
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = req.body;
    const result = await moviesDAL.addMovie(movie);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = req.body;
    const result = await moviesDAL.updateMovie(id, movie);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("david")
    const { id } = req.params;
    const result = await moviesDAL.deleteMovie(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
