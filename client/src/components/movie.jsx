import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Movie(props) {
  const dispatch = useDispatch();
  const userOnline = useSelector((state) => state.userOnline);

  const [visibleDeleteMovieButton, setVisibleDeleteMovieButton] = useState(true);
  const [visibleEditMovieButton, setVisibleEditMovieButton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      userOnline.permissions.forEach((permission) => {
        if (permission === "Delete Movies") setVisibleDeleteMovieButton(false);
        if (permission === "Update Movies") setVisibleEditMovieButton(false);
      });
    };
    fetchData();
  }, []);

  const deleteMovie = async () => {
    const urlMovies = "http://localhost:4000/movies";

    props.setVisibleAllMovies(true);

    const resp = await fetch(`${urlMovies}/${props.movie._id}`, {
      method: "DELETE",
    });

    props.setVisibleAllMovies(false);
  };

  return (
    <div>
      <b>
        {props.movie.name} ,{props.movie.premiered.substring(0, 4)}
      </b>
      <br />
      Genres:{" "}
      {props.movie.genres.map((genre) => {
        return genre + ",";
      })}
      <br />
      <img src={props.movie.image} height="100 px" />
      <br />
      <button hidden={visibleEditMovieButton}
        onClick={() => {
          props.setVisibleEditMovie(!props.visibleEditMovie);
          dispatch({ type: "Send_Movie", payload: props.movie });
        }}
      >
        Edit
      </button>
      <button hidden={visibleDeleteMovieButton} onClick={deleteMovie}>Delete</button>
      <br />
      <br />
    </div>
  );
}

export default Movie;
