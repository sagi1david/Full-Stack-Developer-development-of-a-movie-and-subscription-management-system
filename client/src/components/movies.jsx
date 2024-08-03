import { useEffect, useState } from "react";
import AllMovies from "./allMovies";
import AddMovie from "./addMovie";
import EditMovie from "./editMovie";
import { useDispatch, useSelector } from "react-redux";

const urlMovies = "http://localhost:4000/movies";

function movies(props) {
  const dispatch = useDispatch();
  const userOnline = useSelector((state) => state.userOnline);

  const accessToken = sessionStorage["accessToken"];

  const [visibleAddMovieButton, setVisibleAddMovieButton] = useState(true);
  const [visibleAllMoviesButton, setVisibleAllMoviesButton] = useState(true);
  const [visibleAllMovies, setVisibleAllMovies] = useState(true);
  const [visibleAddMovie, setVisibleAddMovie] = useState(true);
  const [visibleEditMovie, setVisibleEditMovie] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userOnline != 'undefined') {
        userOnline.permissions.forEach((permission) => {
          if (permission === "Create Movies") setVisibleAddMovieButton(false);
          if (permission === "View Movies") setVisibleAllMoviesButton(false);
        });
      }
    };
    fetchData();
  }, [userOnline]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(urlMovies, {
        method: "GET",
        headers: {
          "x-access-token": accessToken,
        },
      });

      const data = await resp.json();

      dispatch({ type: "Laod_Movies", payload: data.movies });
    };
    fetchData();
  }, [visibleAllMovies, visibleAddMovie, visibleEditMovie]);

  return (
    <div>
      <h3>Movies</h3>

      <div hidden={!visibleEditMovie}>
        <button
          hidden={visibleAllMoviesButton}
          onClick={() => {
            setVisibleAllMovies(!visibleAllMovies);
            if (!visibleAddMovie) setVisibleAddMovie(!visibleAddMovie);
          }}
        >
          All Movies
        </button>
        <button
          hidden={visibleAddMovieButton}
          onClick={() => {
            setVisibleAddMovie(!visibleAddMovie);
            if (!visibleAllMovies) setVisibleAllMovies(!visibleAllMovies);
          }}
        >
          Add Movie
        </button>

        <b>Find movie:</b>
        <input type="search"></input>

        <button type="button">Find</button>

        <div hidden={visibleAllMovies}>
          <AllMovies
            setVisibleEditMovie={setVisibleEditMovie}
            visibleEditMovie={visibleEditMovie}
            setVisibleAllMovies={setVisibleAllMovies}
          />
        </div>
        <div hidden={visibleAddMovie}>
          <AddMovie
            setVisibleAddMovie={setVisibleAddMovie}
            visibleAddMovie={visibleAddMovie}
            setVisibleAllMovies={setVisibleAllMovies}
            visibleAllMovies={visibleAllMovies}
          />
        </div>
      </div>
      <div hidden={visibleEditMovie}>
        <EditMovie
          setVisibleEditMovie={setVisibleEditMovie}
          visibleEditMovie={visibleEditMovie}
        />
      </div>
    </div>
  );
}

export default movies;
