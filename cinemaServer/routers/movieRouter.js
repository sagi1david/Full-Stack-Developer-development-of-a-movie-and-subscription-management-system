const express = require("express");
const jwt = require("jsonwebtoken");
const movieBLL = require("../DAL/moviesWS");

// Entry point: http://localhost:4000/movies

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await movieBLL.getAllMovies();
    const data = { ...req.body.data, movies };
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const movie = movieBLL.getMovieById(id);
    const data = { ...req.body.data, movie };
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", checkToken, (req, res) => {
  try {
    const obj = req.body;
    const result = movieBLL.addMovie(obj);
    const data = { ...req.body.data, result };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = movieBLL.updateMovie(id, obj);
    const data = { ...req.body.data, result };
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const result = movieBLL.deleteMovie(id);
    const data = { ...req.body.data, result };
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

function checkToken(req, res, next) {
  const token = req.headers["access-token"];
  console.log(req.headers)

  if (!token) {
    return res.status(400).json({ msg: "No token provided" });
  }

  const ACCESS_SECRET_TOKEN = "someKey";

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, user) => {
    if (err) {
      return res.status(500).send("Failed to authenticate token");
    }

    const data = { obj: { ...req.body }, token: token, user: user };
    req.body.data = data;

    next();
  });
}

module.exports = router;
